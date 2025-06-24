import mongoose, { Document, Schema } from "mongoose";
import { ref } from "process";
import { boolean } from "zod";

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
  featured: boolean
  views: Number,
  createdAt: Date,
  userWishlist: mongoose.Types.ObjectId[], 
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
  featured: {type: Boolean, default: false},
  views: {type: Number, default: 0},
  userWishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
},{
  timestamps: true
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
