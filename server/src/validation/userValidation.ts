import {number, z} from "zod";

export const RegistreSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    secondName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 digit long"),
    gender: z.enum(["Male","Female"]),
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 digit long")
})


export const UserUpdateSchema = z.object({
    _id: z.string(),
    firstName: z.string().min(1, "First name is required"),
    secondName: z.string().optional(),
    phone: z.number().optional(),
    Address: z.string().optional()
})