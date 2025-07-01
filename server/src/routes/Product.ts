import authHandler from "../middleware/auth";
import Category from "../models/Category";
import z, { object, promise } from "zod";
import { response, Router } from "express";
import { Product } from "../models/Product";
import User from "../models/Users";
import mongoose from "mongoose";
import { getSystemErrorMessage } from "util";
import { Order } from "../models/Order";
import { generateOrderId, generateRandomAlphanumericString } from "../utils/RandomOrderGenerator";
import { Review } from "../models/Review";

interface PhotoData {
  id: number;
  url: string;
}


interface ProductResponse {
  id: string;
  poster: string;
  role: string;
  productName: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  condition: string;
  qty: number;
  photo: PhotoData[];
  featured: boolean;
  views: number;
  soldNumber: number;
  createdAt: Date;
  userWishlist: mongoose.Types.ObjectId[]
}

export interface OrderItemT {
    id: string,
    orderNumber: string;
    productId: string;
    productName: string;
    productQTY: number,
    photo: string,
    price: number,
    orderQty: number;
    shippingAddress: string;
    shippingZipcode: string;
    shippingMethod: string;
    trackingNumber: string;
    status:
    "Cart"
    | "Ordered"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
    deliveryCharge: number;
    sellerName: string;
    sellerId: string;
    buyerName: string;
    buyerId: string;
    buyerContact: number;
    isReviewed: boolean;
    orderData: Date | null;
}





const categoryaddValidatorSchema = z.object({
  category: z.string().min(2, "Minimum length required is 2"),
});
const addProductSchema = z
  .object({
    poster: z.string(),
    role: z.string(),
    productName: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    originalPrice: z.coerce.number().optional(),
    category: z.string().min(1, "Category is required"),
    condition: z.string().min(1, "Condition is required"),
    qty: z.coerce.number().min(1, "Quantity must be at least 1"),
    photo: z.array(z.string().url())
      .min(1, "At least one photo is required")
      .max(5, "Maximum of 5 photos allowed"),
  })
  .refine(
    (data) => {
      if (data.originalPrice !== undefined) {
        return data.originalPrice >= data.price;
      }
      return true;
    },
    {
      message: "Original price must be greater than or equal to price",
      path: ["originalPrice"],
    }
  );
const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).json({ message: "Category fetched", data });
  } catch (error) {
    res.status(500).json({ message: "Server Error", data: error });
  }
});

router.post("/addcategory", async (req, res) => {
  try {
    const parsed = categoryaddValidatorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    const { category } = parsed.data;

    const existingUser = await Category.findOne({ category });
    if (existingUser) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const newData = new Category({
      category,
    });
    const Data = await newData.save();

    res.status(200).json({ message: "Category Added", newData: Data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});





router.post("/addnewproduct", async (req, res) => {
  const parsed = addProductSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
    return
  }

  const {
    poster,
    role,
    productName,
    description,
    price,
    originalPrice,
    category,
    condition,
    qty,
    photo,
  } = parsed.data;

  try {
    const newProduct = new Product({
      poster,
      role,
      productName,
      description,
      price,
      originalPrice,
      category,
      condition,
      qty,
      photo,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


router.get('/allproducts', async (req, res) => {
  try {
    const allproducts = await Product.find({});

    const filteredData = await Promise.all(
      allproducts.map(async (item) => {
        let userData = null;

        if (item.role === "User") {
          userData = await User.findById(item.poster);
        }

        const photoData= item.photo.map((item, index) => ({
          id: index+1,
          url: item
        }))

        const productReviews = await Review.find({productId: item._id})
        let totalRating = 0
        let totalRated = productReviews.length
        productReviews.forEach(item => totalRating += item.reviewStar)
        let avgRating = totalRated === 0? 0 : (totalRating/totalRated)

        return {
          id: item._id,
          poster: item.role === "User"
            ? `${userData?.firstName || "Unknown"} ${userData?.secondName || ""}`
            : "PixelKart",
          role: item.role,
          productName: item.productName,
          description: item.description,
          price: item.price,
          originalPrice: item.originalPrice,
          category: item.category,
          condition: item.condition,
          qty: item.qty,
          photo: photoData,
          featured: item.featured,
          views: item.views,
          soldNumber: 0,
          createdAt: item.createdAt,
          userWishlist: item.userWishlist,
          totalRated: totalRated,
          avgRating: avgRating,
        };
      })
    );

    res.status(200).json({ message: "Products pulled", data: filteredData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



router.get('/review/:productId', async(req, res) => {
  try {

    const {productId} = req.params
    console.log(productId)
    console.log('first')
    const allReivew = await Review.find({productId: productId}).select("-__v -updatedAt")
    res.status(200).json({message: "Product Review received", data: allReivew})
  } catch (error) {
   res.status(500).json({message: "Server error", error}) 
  }
})


router.put("/updatefavourite", authHandler, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = (req as any).user._id;

    const product = await Product.findById(id);
    if (!product){
      res.status(400).json({ message: "Product not found" });
      return
    }

    const isWishlisted = product.userWishlist.includes(userId);

    let updatedProduct;

    if (isWishlisted) {
  
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $pull: { userWishlist: userId } },
        { new: true }
      );
    } else {
    
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $addToSet: { userWishlist: userId } }, 
        { new: true }
      );
    }

    res.status(200).json({
      message: `Successfully ${isWishlisted ? "removed from" : "added to"} wishlist`,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
});




//cart
router.post('/cart', authHandler, async(req, res)=> {
  try {
      const {productId, qty} = req.body
      const userDetail = (req as any).user
      const productDetail = await Product.findById(productId)
      if(!productDetail){
        res.status(400).json({message:"Product not found"})
        return
      }

      const sellerDetail = await User.findOne({_id: productDetail.poster})
      if(!sellerDetail){
        res.status(400).json("User not found. Please relogin")
      }
      const newdata = new Order({
        orderNumber: "",
        productId: productDetail._id,
        orderQty: 1,
        price: productDetail.price,
        shippingAddress: "",
        shippingZipcode: "",
        shippingMethod: "Standard Shipping",
        trackingNumber: "",
        status: "Cart",
        deliverCharge: productDetail.price < 1500? 150 : 0,
        sellerId: sellerDetail._id,
        buyerId: userDetail._id,
        buyerContact: 0,
        isReviewed: false,
        orderData: null
      })

      if(newdata.buyerId === newdata.sellerId){
        res.status(400).json({message: "Seller cannot buy their own item"})
        return
      }

      const inCart = await Order.findOne({productId: newdata.productId, buyerId: newdata.buyerId, status: "Cart"})
      if(inCart){
        res.status(401).json({message: "The item is already on your cart"})
        return
      }
      const finalData = await newdata.save()
      res.status(200).json({message: "Product added to cart", finalData})
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
})


router.get('/cart', authHandler, async(req, res) => {
  try {
    const userDetails = (req as any).user
    const cartItems = await Order.find({buyerId: userDetails._id, status: "Cart"})

    const safeData = await Promise.all(cartItems.map(async(item)=> {
      const productDetail = await Product.findById(item.productId)
      const sellerDetail = await User.findOne({_id: productDetail?.poster})
      
      return {
        id: item._id,
        orderNumber: item.orderNumber,
        productId: item.productId,
        productName: productDetail?.productName,
        productQTY: productDetail?.qty,
        photo: productDetail?.photo[0],
        price: productDetail?.price,
        orderQty: item.orderQty,
        shippingAddress: item.shippingAddress,
        shippingZipcode: item.shippingZipcode,
        shippingMethod: item.shippingMethod,
        trackingNumber: item.trackingNumber,
        status: item.status,
        deliveryCharge: productDetail?.price! < 1500? 150 : 0,
        sellerName: sellerDetail.role === "User"? sellerDetail.firstName+" "+sellerDetail?.secondName: "PixelKart",
        sellerId: sellerDetail._id,
        buyerName: userDetails.firstName + " " + userDetails?.secondName,
        buyerId: userDetails._id,
        buyerContact: item.buyerContact,
        isReviewed: item.isReviewed,
        orderData: item.orderData,
      }
    }))

    res.status(200).json({message: "Cart items received", data: safeData})
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
})



router.delete('/cart', async(req, res)=> {
  try {
    const {id} = req.body
    const existingOrder = await Order.findByIdAndDelete(id)
    if(!existingOrder){
      res.status(400).json({message: 'Cart item not found. Please reload the page'})
      return
    }
    res.status(200).json({message: "Cart item removed"})
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
})



router.put('/placeorder', authHandler, async(req, res) => {
  try {
    const data: OrderItemT[] = req.body
    const userData = (req as any).user

    const newData = await Promise.all(data.map(async(item)=> {
      const productExist = await Product.findOne({_id: item.productId})
      if(!productExist){
        res.status(400).json({message: "One or more product might not be available"})
        return
      }
      if( item.orderQty > productExist.qty ){
        res.status(400).json({message: "The product quantity is greater than available product"})
        return
      }
      return {
        ...item,
        orderQty: item.orderQty,
        deliveryCharge: item.deliveryCharge,
        shippingAddress: item.shippingAddress,
        shippingZipcode: item.shippingZipcode,
        orderNumber: generateOrderId(),
        trackingNumber: generateRandomAlphanumericString(),
        status: "Ordered",
        orderData: new Date(),
        buyerContact: item.buyerContact,
      }
    }))


    const SavedData = await Promise.all(newData.map(async(item)=> {
      const productDetail = await Product.findOne({_id: item?.productId})
      const newQty = productDetail?.qty! - item?.orderQty!
      const productupdate = await Product.findOneAndUpdate({_id: item?.productId},
        {
          qty: newQty,
        },
        {
          new: true
        }
      )
      const data = await Order.findOneAndUpdate({_id: item?.id}, 
        {
          orderQty: item?.orderQty,
          deliverCharge: item?.deliveryCharge,
          shippingAddress: item?.shippingAddress,
          shippingZipcode: item?.shippingZipcode,
          orderNumber: item?.orderNumber,
          trackingNumber: item?.trackingNumber,
          status: item?.status,
          orderData: item?.orderData,
          buyerContact: item?.buyerContact,
        }, {new: true})
        return data
    }))

    res.status(200).json({message: "Order Placed"})
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
})




export default router;
