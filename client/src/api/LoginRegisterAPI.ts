import axios from "axios";
const URI = import.meta.env.VITE_API_URL

interface registerUserType {
    firstName: string,
    secondName?: string,
    email: string,
    gender: string,
    password: string,
}

export const registerUser = async(route:string, data:registerUserType) => {
    try{
        console.log(URI)
        const response = await axios.post(URI+route, data)
        return response.data
    }
    catch(error){
        return error
    }
}



