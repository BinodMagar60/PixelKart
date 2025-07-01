import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../context/UserContext"


const ProtectedCartRoute = () => {
const {userInfo} = useUserContext()

if(userInfo?.role !== "User"){
    return <Navigate to='/' replace/>
}

return <Outlet/>
}

export default ProtectedCartRoute