import mongoose from "mongoose";

export interface IUser extends Document {
  [x: string]: any;
  firstName: string;
  secondName?: string;
  email: string;
  gender: "Male" | "Female";
  password: string;
  role?: "Worker" | "Admin" | "User";
  phone?: number | null;
  Address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, default: "" },
    email: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
      default: "Male",
    },
    password: { type: String, default: "" },
    role: { type: String, enum: ["Worker", "Admin", "User"], default: "User" },
    phone: { type: Number, default: null },
    Address: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
