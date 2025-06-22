import authHandler from "../middleware/auth"
import User from "../models/Users"
import {Router} from 'express'
import { UserUpdateSchema } from "../validation/userValidation"

const router = Router()


router.put('/profileupdate', async(req, res)=> {
    try{
        const parsed = UserUpdateSchema.safeParse(req.body) 
        if(!parsed.success){
            res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors
            });
            return;
        }
        const { _id, firstName, secondName, phone, Address} = parsed.data 

        const existingUser = await User.findByIdAndUpdate(_id, {
            firstName, secondName, phone, Address
        }, {new: true})


        if(!existingUser){
            res.status(400).json({message: "User not found"})
            return
        }

        res.status(200).json({message: "User data Updated", updatedData: existingUser})
    }
    catch (error){
        res.status(500).json({message: "Server error", error})
    }
})











export default router