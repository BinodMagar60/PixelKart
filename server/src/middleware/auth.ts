
import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import User from "../models/Users"

const authHandler = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const cookiedata = req.cookies
    if(!cookiedata){
        res.status(400).json({message: "Token not found"})
        return
    }
    const verifiedJWT = jwt.verify(cookiedata.token, process.env.JWT_SECRET as string)
    const existingUsers = await User.findById((verifiedJWT as JwtPayload).id).select("-password")
    if(!existingUsers){
      res.status(400).json({message: "User not found"})
      return
    }
    (req as any).user = existingUsers
    next()
    }
    catch(error){
        res.status(500).json({message: "Server error", error})
    }
}

export default authHandler;