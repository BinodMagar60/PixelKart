import mongoose, { Schema, Types } from "mongoose";
import { number, string } from "zod";

export interface IOrder extends Document {
  orderNumber: string;
  productId: Types.ObjectId;
  orderQty: number;
  price: number,
  shippingAddress: string;
  shippingZipcode: string;
  shippingMethod: string;
  trackingNumber: string;
  status:
    | "Cart"
    | "Ordered"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  deliverCharge: number;
  sellerId: string;
  buyerId: string;
  buyerContact: number;
  isReviewed: boolean;
  orderData: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, default: "" },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    orderQty: { type: Number, required: true },
    price: {type: Number, required: true},
    shippingAddress: { type: String, default: "" },
    shippingZipcode: { type: String, default: "" },
    shippingMethod: { type: String, default: "Standard Shipping" },
    trackingNumber: { type: String },
    status: {
      type: String,
      enum: [
        "Cart",
        "Ordered",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    deliverCharge: { type: Number },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    buyerContact: { type: Number, default: 0 },
    isReviewed: { type: Boolean, default: false },
    orderData: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
