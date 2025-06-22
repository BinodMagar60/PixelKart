import authHandler from "../middleware/auth";
import Category from "../models/Category";
import z, { object } from "zod";
import { Router } from "express";
import { Product } from "../models/Product";
import { upload } from "../middleware/multer";

const categoryaddValidatorSchema = z.object({
  category: z.string().min(2, "Minimum length required is 2"),
});

const addProductValidationSchema = z
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
  })
  .refine(
    (data) => {
      if (data.originalPrice !== undefined) {
        return data.originalPrice > data.price;
      }
      return true;
    },
    {
      message: "Original price must be greater than price",
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
router.post("/addnewproduct", upload.array("photos", 5), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log(files)
    console.log(req.body.photo)
    // Check image files
    if (!files || files.length === 0) {
      res.status(400).json({ message: "At least one photo is required" });
      return
    }
    if (files.length > 5) {
      res.status(400).json({ message: "Maximum 5 photos allowed" });
      return
    }

    // Validate the rest of the data
    const parsed = addProductValidationSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log(parsed.error.flatten());
      res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
      return
    }

    const photoPaths = files.map((file) => `/uploads/${file.filename}`);

    const newProduct = new Product({
      ...parsed.data,
      photo: photoPaths,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload product" });
  }
});
export default router;

