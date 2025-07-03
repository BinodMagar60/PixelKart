import User from "../models/Users";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUser } from "../models/Users";
import { LoginSchema, RegistreSchema } from "../validation/userValidation";
import { JwtPayload } from "jsonwebtoken";
import authHandler from "../middleware/auth";
import { parse } from "path";
const router = Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
    const parsed = RegistreSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    const { firstName, secondName, email, password, gender } =
      parsed.data as IUser;

    const existingUsers = await User.findOne({ email });
    if (existingUsers) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName: firstName.toUpperCase(),
      secondName: secondName?.toUpperCase(),
      email: email,
      role: "User",
      password: hashedPassword,
      gender,
    });
    await newUser.save();

    const addedUser = await User.findOne({ email }).select("-password");

    const token = jwt.sign(
      {
        id: addedUser._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      } as jwt.SignOptions
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 1000 * 60 * 60 * 24,
    });

    const { password: _, ...safeUser } = addedUser.toObject();

    res
      .status(200)
      .json({ message: "User registered successfully", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    
    const parsed = LoginSchema.safeParse(req.body);
   
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation Error",
        errors: parsed?.error?.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = parsed.data;

    const existingUsers = (await User.findOne({ email })) as IUser;

    if (!existingUsers) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPassowordValid = await bcrypt.compare(
      password,
      existingUsers.password
    );

    if (!isPassowordValid) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      {
        id: existingUsers._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      } as jwt.SignOptions
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 1000 * 60 * 60 * 24,
    });

    const { password: _, ...safeUser } = existingUsers.toObject();

    res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/userinfo", authHandler, async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ message: "User found", userinfo: (req as any).user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/logout", authHandler, async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
