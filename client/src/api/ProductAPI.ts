import axios, { AxiosError } from "axios";
import z from "zod"
import type { productDataType } from "../pages/commonComponents/AddProduct";
const URI = import.meta.env.VITE_API_URL
const URL = URI + "product/"

export const addCategorySchema = z.object({
    category: z.string().min(2, "Minimum length required is 2")
})

export type addcategoryType = z.infer<typeof addCategorySchema>



export const addNewCategory = async(route: string, data: addcategoryType) => {
    try{
        const response = await axios.post(URL+route, data)
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}



export const getCategoriesFields = async() => {
    try{
        const response = await axios.get(`${URL}categories`)
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}


export const addnewproduct = async(route: string, data:productDataType) => {
    try{
        const response = await axios.post(URL+route, data)
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}

