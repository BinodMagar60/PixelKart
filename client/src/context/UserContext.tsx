import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";




interface UserType{
   _id: string,
  firstName: string;
  secondName?: string;
  email: string;
  gender: "Male" | "Female";
  password: string;
  role?: "Worker" | "Admin" | "User";
  phone?: number;
  Address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface contextType {
    userInfo: UserType | null,
    setUserInfo: React.Dispatch<React.SetStateAction<UserType | null>>,
    userLoading: boolean
}


const UserContext = createContext<contextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userLoading, setUserLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<UserType | null>(null)

    useEffect(()=>{

        const apiCall = async()=> {
            setUserLoading(true)
            try{
                const response = await axios.get(`http://localhost:5000/auth/users/userinfo`,{
                    withCredentials: true
                })
                if(response?.status === 400 || response?.status === 500){
                    toast.error(response?.data?.message, {
                        theme: "light",
                        autoClose: 1000
                    })
                    setUserInfo(null)
                    return
                }
                setUserInfo(response.data.userinfo)
            }
            catch(error)
            {
                console.log(error)
            }
            finally{
                setUserLoading(false)
            }
        }
        // if(!userInfo){
        //     apiCall()
        // }
        apiCall()
    },[])

 
    return (
        <UserContext.Provider value={{userInfo, setUserInfo, userLoading}}>
            {children}
        </UserContext.Provider>
    )
}



export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error("useProductContext must be used within Product Provider")
    }
    return context
}


