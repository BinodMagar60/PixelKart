import authHandler from "../middleware/auth";
import User, { IUser } from "../models/Users";
import bcrypt from "bcrypt";
import { Router } from "express";
import { UserUpdateSchema } from "../validation/userValidation";
import z from "zod";
import { log } from "console";
import Category from "../models/Category";
import { Product } from "../models/Product";
import mongoose from "mongoose";
import { Order } from "../models/Order";
import { Review } from "../models/Review";

const updatepasswordvalidation = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be atleast 8 charater long"),
    newPassword: z
      .string()
      .min(8, "Current password must be atleast 8 charater long"),
    confirmPassword: z
      .string()
      .min(8, "Current password must be atleast 8 charater long"),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    path: ["confirmPassword"],
    message: "Confirm passwor and new password doesn't match",
  });

const router = Router();

router.put("/profileupdate", async (req, res) => {
  try {
    const parsed = UserUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    const { _id, firstName, secondName, phone, Address } = parsed.data;

    const existingUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        secondName,
        phone,
        Address,
      },
      { new: true }
    );

    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User data Updated", updatedData: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/changepassword", authHandler, async (req, res) => {
  try {
    const parsed = updatepasswordvalidation.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { currentPassword, newPassword } = parsed.data;
    const user = (req as any).user as IUser;
    const userdata = await User.findById(user._id);
    const isPassowordValid = bcrypt.compareSync(
      currentPassword,
      userdata.password
    );
    if (!isPassowordValid) {
      res.status(400).json({ message: "Incorrect current password" });
      return;
    }

    const hashedpassowrd = await bcrypt.hash(newPassword, 12);

    const newdata = await User.findByIdAndUpdate(
      userdata._id,
      { password: hashedpassowrd },
      { new: true }
    );
    if (!newdata) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.put("/resetpassword", authHandler, async (req, res) => {
  try {
    const { id } = req.body;
    const password = "12345678";
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Password resetted", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/usermanagement", async (req, res) => {
  try {
    const allUsers = await User.find({ role: "User" }).select(
      "-password -updatedAt -__v"
    );
    const safeUser = await Promise.all(
      allUsers.map(async (item) => {
        const boughtOrders = await Order.find({ buyerId: item._id });
        const soldOrders = await Product.find({ poster: item._id });

        const validOrders = boughtOrders.filter((item) => {
          if (!["Cart", "Cancelled"].includes(item.status)) {
            return item;
          }
        });

        let totalMoneySpent = 0;
        validOrders.forEach((order) => {
          totalMoneySpent += order.price * order.orderQty;
        });
        return {
          id: item._id,
          firstName: item.firstName,
          lastName: item.secondName,
          email: item.email,
          joinedDate: item.createdAt,
          orders: validOrders.length,
          totalSpent: totalMoneySpent,
          address: item.Address,
          phoneNumber: item.phone,
          role: item.role,
          gender: item.gender,
          listedItems: soldOrders.length,
        };
      })
    );
    res.status(200).json({ message: "All user data", data: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/workermanagement", async (req, res) => {
  try {
    const { firstName, secondName, Address, phone, email, gender } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const password = bcrypt.hashSync("12345678", 12);
    const newUser = new User({
      firstName,
      secondName,
      Address,
      phone,
      email,
      gender,
      role: "Worker",
      password,
    });
    await newUser.save();
    res.status(200).json({ message: "Worker Added" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/workermanagement", async (req, res) => {
  try {
    const allUsers = await User.find({ role: "Worker" }).select(
      "-password -updatedAt -__v"
    );
    const safeUser = allUsers.map((item) => {
      return {
        id: item._id,
        firstName: item.firstName,
        lastName: item.secondName,
        email: item.email,
        joinedDate: item.createdAt,
        address: item.Address,
        phoneNumber: item.phone,
        role: item.role,
        gender: item.gender,
      };
    });
    res.status(200).json({ message: "All user data", data: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.delete("/workermanagement", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(400).json({ message: "User doesnt exist" });
      return;
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

//category
router.get("/category", async (req, res) => {
  try {
    const allData = await Category.find();
    const allproducts = await Product.find();
    const safeData = allData.map((item) => {
      const productCount = allproducts.filter(
        (product) => product.category === item.category
      ).length;
      return {
        id: item._id,
        categoryName: item.category,
        Product: productCount,
      };
    });
    res.status(200).json({ message: "Category data", safeData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/category", async (req, res) => {
  try {
    const { id } = req.body;
    const category = await Category.findById(id);
    const isCategoryBeingUsed = await Product.find({
      category: category?.category,
    });
    if (isCategoryBeingUsed.length > 0) {
      res.status(400).json({
        message:
          "The category you are trying to delete is being used by products",
      });
      return;
    }

    const deleteData = await Category.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ message: "No category found" });
      return;
    }
    res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//inventory
router.get("/inventory", authHandler, async (req, res) => {
  try {
    const userdetail = (req as any).user;

    if (userdetail.role !== "User") {
      const allData = await Product.find({
        role: { $in: ["Admin", "Worker"] },
      }).sort({ createdAt: -1 });
      const safeData = allData.map((item) => ({
        id: item._id,
        productName: item.productName,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice,
        stock: item.qty,
        sales: 0,
        featured: item.featured,
        condition: item.condition,
      }));

      res.status(200).json({ message: "Data sent", safeData });
    } else {
      const allData = await Product.find({ poster: userdetail._id }).sort({
        createdAt: -1,
      });
      const safeData = allData.map((item) => ({
        id: item._id,
        productName: item.productName,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice,
        stock: item.qty,
        sales: 0,
        featured: item.featured,
        condition: item.condition,
      }));

      res.status(200).json({ message: "Data sent", safeData });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/inventory", async (req, res) => {
  try {
    const {
      id,
      productName,
      category,
      price,
      originalPrice,
      stock,
      featured,
      condition,
    } = req.body;
    const updatedData = await Product.findByIdAndUpdate(
      id,
      {
        productName: productName,
        category: category,
        price: price,
        originalPrice: originalPrice,
        qty: stock,
        featured: featured,
        condition: condition,
      },
      { new: true }
    );
    if (!updatedData) {
      res.status(400).json({ message: "Couldnt find the product" });
      return;
    }
    res.status(200).json({ message: "Product updated", updatedData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/inventory", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedData = await Product.findById(id);
    if (!deletedData) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    const deletable = await Order.find({ productId: id });
    console.log(deletable);
    if (deletable.length !== 0) {
      res.status(400).json({
        message:
          "This Product cannot be removed because some information might be affected",
      });
      return;
    }

    const data = await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted", data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//wishlist

router.get("/wishlist", authHandler, async (req, res) => {
  try {
    const userdata = (req as any).user;
    const id: string = userdata._id;
    const wishlistProduct = await Product.find({ userWishlist: id }).sort({
      createdAt: -1,
    });
    const safeData = await Promise.all(
      wishlistProduct.map(async (item) => {
        const username = await User.findById(item.poster);
        return {
          id: item._id,
          productName: item.productName,
          photo: item.photo,
          seller: username.firstName + " " + username?.secondName,
          price: item.price,
        };
      })
    );

    res.status(200).json({ message: "Wishlist data", safeData: safeData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//mypurchase
router.get("/mypurchase", authHandler, async (req, res) => {
  try {
    const userDetails = (req as any).user;
    const cartItems = await Order.find({ buyerId: userDetails._id }).sort({
      createdAt: -1,
    });

    const safeData = await Promise.all(
      cartItems.map(async (item) => {
        const productDetail = await Product.findById(item.productId);
        const sellerDetail = await User.findOne({ _id: productDetail?.poster });
        const ReviewData = await Review.findOne({ orderId: item._id });
        if (item.status !== "Cart") {
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
            deliveryCharge: productDetail?.price! < 1500 ? 150 : 0,
            sellerName:
              sellerDetail.role === "User"
                ? sellerDetail.firstName + " " + sellerDetail?.secondName
                : "PixelKart",
            sellerId: sellerDetail._id,
            buyerName: userDetails.firstName + " " + userDetails?.secondName,
            buyerId: userDetails._id,
            buyerContact: item.buyerContact,
            isReviewed: ReviewData ? true : false,
            orderData: item.orderData,
          };
        }
      })
    );
    const validItems = safeData.filter(Boolean);
    res.status(200).json({ message: "Cart items received", data: validItems });
  } catch (error) {}
});

//review add
router.post("/review", authHandler, async (req, res) => {
  try {
    const userDetails = (req as any).user;
    const { orderId, productId, reviewStar, reviewComment } = req.body;

    if (
      !orderId ||
      !productId ||
      reviewStar === undefined ||
      reviewStar === null ||
      !reviewComment
    ) {
      res.status(400).json({ message: "Missing values" });
      return;
    }

    const orderDetail = await Order.findOne({ _id: orderId });
    if (orderDetail?.status !== "Delivered") {
      res.status(400).json({ message: "Couldnt add review" });
      return;
    }

    const existingReview = await Review.findOne({ orderId: orderId });
    if (existingReview) {
      res.status(400).json({ message: "Review already exists" });
      return;
    }

    const newdata = new Review({
      orderId: orderId,
      productId: productId,
      reviewerId: userDetails._id,
      reviewStar: reviewStar,
      reviewComment: reviewComment,
    });

    const addedReview = await newdata.save();
    const updatedProduct = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        isReviewed: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Review Added", data: addedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//get review datas
router.get("/review/:orderId", authHandler, async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderExist = await Order.findOne({ _id: orderId });
    if (!orderExist) {
      res.status(400).json({
        message: "Something went wrong with order details. Try again",
      });
      return;
    }
    const reviewData = await Review.findOne({ orderId: orderId }).select(
      "-__v -updatedAt"
    );
    if (!reviewData) {
      res.status(401).json({ message: "No review found" });
      return;
    }
    res.status(200).json({ message: "Review data retrive", data: reviewData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//update reviews data
router.put("/review", authHandler, async (req, res) => {
  try {
    const { reviewId, reviewStar, reviewComment } = req.body;
    console.log(reviewStar)
    if (
      !reviewId ||
      !reviewComment ||
      typeof reviewStar !== "number"
    ) {
      res.status(400).json({ message: "Missing field" });
      return;
    }

    const newdata = await Review.findOneAndUpdate(
      { _id: reviewId },
      { reviewStar: reviewStar, reviewComment: reviewComment },
      { new: true }
    );
    if (!newdata) {
      res.status(400).json({ message: "Failed to update review" });
      return;
    }
    res.status(200).json({message: "Update successfull", data: newdata})
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete('/review/:id', authHandler, async(req, res)=> {
  try {
    const {id} = req.params
    const deletedData = await Review.findByIdAndDelete(id)
    if(!deletedData){
      res.status(400).json({message: "Fail to delete review"})
      return
    }
    res.status(200).json({message: "Review deleted", data: deletedData})
  } catch (error) {
    res.status(500).json({message: "Server error", error})
  }
})

//Orders
router.get("/order", authHandler, async (req, res) => {
  try {
    const userDetails = (req as any).user;
    let filteredData;
    if (userDetails.role === "User") {
      const cartItems = await Order.find({ sellerId: userDetails._id }).sort({
        createdAt: -1,
      });
      filteredData = await Promise.all(
        cartItems.map(async (item) => {
          const sellerdetail = await User.findOne({ _id: item.sellerId });
          if (sellerdetail.role === "User" && item?.status !== "Cart") {
            return item;
          }
          return null;
        })
      );
    } else {
      const cartItems = await Order.find().sort({ createdAt: -1 });
      filteredData = await Promise.all(
        cartItems.map(async (item) => {
          const sellerdetail = await User.findOne({ _id: item.sellerId });
          if (sellerdetail.role !== "User" && item?.status !== "Cart") {
            return item;
          }
          return null;
        })
      );
    }

    const validItems = filteredData?.filter(Boolean);

    const safeData = await Promise.all(
      validItems!.map(async (item) => {
        const productDetail = await Product.findById(item?.productId);
        const sellerDetail = await User.findOne({ _id: productDetail?.poster });
        const buyerDetail = await User.findOne({ _id: item?.buyerId });

        return {
          id: item?._id,
          orderNumber: item?.orderNumber,
          productId: item?.productId,
          productName: productDetail?.productName,
          productQTY: productDetail?.qty,
          photo: productDetail?.photo[0],
          price: productDetail?.price,
          orderQty: item?.orderQty,
          shippingAddress: item?.shippingAddress,
          shippingZipcode: item?.shippingZipcode,
          shippingMethod: item?.shippingMethod,
          trackingNumber: item?.trackingNumber,
          status: item?.status,
          deliveryCharge: productDetail?.price! < 1500 ? 150 : 0,
          sellerName:
            sellerDetail.role === "User"
              ? sellerDetail.firstName + " " + sellerDetail?.secondName
              : "PixelKart",
          sellerId: sellerDetail._id,
          buyerName: buyerDetail.firstName + " " + buyerDetail?.secondName,
          buyerId: buyerDetail._id,
          buyerContact: item?.buyerContact,
          isReviewed: item?.isReviewed,
          orderData: item?.orderData,
        };
      })
    );

    res.status(200).json({ message: "Cart items received", data: safeData });
  } catch (error) {}
});

//handling cancelling processing and other stages of product ordered
router.put("/ordercancel", authHandler, async (req, res) => {
  try {
    const { orderId } = req.body;
    const orderDetail = await Order.findOne({ _id: orderId });
    if (!orderDetail) {
      res.status(400).json({ message: "Order not found" });
      return;
    }
    const productDetail = await Product.findOne({ _id: orderDetail.productId });

    if (orderDetail.status === "Ordered") {
      const newdata = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          status: "Cancelled",
        },
        {
          new: true,
        }
      );
      const newproduct = await Product.findOneAndUpdate(
        { _id: orderDetail.productId },
        {
          qty: (productDetail?.qty ?? 0) + orderDetail?.orderQty,
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json({ message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/changeproductstatus", authHandler, async (req, res) => {
  try {
    const { orderId } = req.body;
    const orderDetail = await Order.findOne({ _id: orderId });
    if (!orderDetail) {
      res.status(400).json({ message: "Order not found" });
      return;
    }
    const updatedData = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        status:
          orderDetail.status === "Ordered"
            ? "Processing"
            : orderDetail.status === "Processing"
            ? "Shipped"
            : "Delivered",
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: `Order ${updatedData?.status}` });
  } catch (error) {}
});

export default router;
