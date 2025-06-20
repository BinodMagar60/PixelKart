import axios, { AxiosError } from "axios";
const URI = import.meta.env.VITE_API_URL

interface registerUserType {
    firstName: string,
    secondName?: string,
    email: string,
    gender: string,
    password: string,
}


interface loginUserType {
    email: string,
    password: string,
}

export const registerUser = async(route:string, data:registerUserType) => {
    try{
        const response = await axios.post(URI+route, data,{
            withCredentials: true
        })
        return response.data

    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}



export const LoginUser = async(route: string, data: loginUserType) => {
    try{
        const response = await axios.post(URI+route, data ,{
            withCredentials: true
        })
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}


export const logoutUser = async(route: string) => {
    try{
        const response = await axios.get(URI+route,{
            withCredentials: true
        })
        return response.data
    }
    catch(error){
        const err = error as AxiosError
        return err?.response
    }
}

