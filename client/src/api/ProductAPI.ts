import axios, { AxiosError } from "axios";
import z from "zod"
const URI = import.meta.env.VITE_API_URL
const URL = URI + "product/"
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

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


export const addnewproduct = async(route: string, data:unknown) => {
    try{
        const response = await axios.post(URL+route, data)
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}



export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url; // ✅ String URL (as Zod expects)
  } catch (err: any) {
    console.error("Cloudinary upload error:", err?.response?.data || err.message);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}