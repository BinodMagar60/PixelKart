import authHandler from "../middleware/auth";
import Category from "../models/Category";
import z, { object } from "zod";
import { Router } from "express";
import { Product } from "../models/Product";
import User from "../models/Users";
import mongoose from "mongoose";

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
          userWishlist: item.userWishlist
        };
      })
    );

    res.status(200).json({ message: "Products pulled", data: filteredData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



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

export default router;
