import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  poster: string;
  role: string;
  productName: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  condition: string;
  qty: number;
  photo: string[];
}

const ProductSchema = new Schema<IProduct>({
  poster: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Worker", "User"] },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  qty: { type: Number, required: true },
  photo: [{ type: String }],
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
