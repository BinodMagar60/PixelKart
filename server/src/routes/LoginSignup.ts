import User from "../models/Users";
import { Router, Request, Response } from "express";
import { IUser } from "../models/Users";
const router = Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, secondName, email, password, gender } = req.body as IUser;

    const existingUsers = await User.findOne({ email });
    if(existingUsers){
      res.status(400).json({message: "User already exists"});
      return
    }

    const newUser  = new User({firstName, secondName, email, role: "User", password, gender})
    await newUser.save();

    res.status(200).json({message:"User registered successfully", user: newUser})

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



export default router;
