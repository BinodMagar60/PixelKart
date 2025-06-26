import authHandler from "../middleware/auth";
import User, { IUser } from "../models/Users";
import bcrypt from "bcrypt";
import { Router } from "express";
import { UserUpdateSchema } from "../validation/userValidation";
import z from "zod";
import { log } from "console";
import Category from "../models/Category";
import { Product } from "../models/Product";

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
    const safeUser = allUsers.map((item) => {
      return {
        id: item._id,
        firstName: item.firstName,
        lastName: item.secondName,
        email: item.email,
        joinedDate: item.createdAt,
        orders: 10,
        totalSpent: 12000,
        address: item.Address,
        phoneNumber: item.phone,
        role: item.role,
        gender: item.gender,
        listedItems: 5,
      };
    });
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
      res
        .status(400)
        .json({
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
router.get("/inventory", async (req, res) => {
  try {
    const allData = await Product.find();
    const safeData = allData.map(item =>({
      id: item._id,
      productName: item.productName,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice,
      stock: item.qty,
      sales: 0,
      featured: item.featured
    }))

    res.status(200).json({message: 'Data sent', safeData})
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



router.put('/inventory', async(req, res) => {
  try {
    const {id, productName, category, price, originalPrice, stock, featured} = req.body
    const updatedData = await Product.findByIdAndUpdate(id,
      {
        productName: productName,
        category: category,
        price: price,
        originalPrice: originalPrice,
        qty: stock,
        featured: featured
      },
      {new: true}
    )
    if(!updatedData){
      res.status(400).json({message: 'Couldnt find the product'})
      return
    }
    res.status(200).json({message: 'Product updated', updatedData})

  } catch (error) {
    res.status(500).json({message:'Server error', error})
  }
})





export default router;
