import { CircleAlert } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../api/LoginRegisterAPI"
import { toast } from "react-toastify"
import { useUserContext } from "../context/UserContext"
const Logout = () => {
    const navigate = useNavigate()
    const {setUserInfo} = useUserContext()
    const handleLogout = async () => {
        const response = await logoutUser('auth/users/logout')
        if (response.status === 400 || response.status === 500) {
            toast.error(response.data.message, {
                autoClose: 1000,
                theme: "light"
            })
            return
        }
        toast.success(response.message, {
            autoClose: 1000,
            theme: "light"
        })
        setUserInfo(null)
    }
    return (
        <div className="w-full min-h-screen h-full bg-[#00000022] absolute top-0">
            <div className="w-fit bg-white rounded-md px-6 py-8 mx-auto flex flex-col items-center  sm:mt-30 gap-3">
                <div className="text-red-500"><CircleAlert size={52} /></div>
                <div className="text-xl mb-4">You are already logged In</div>
                <div className="w-full"><button className="bg-black text-white w-full rounded-md px-4 py-2 text-lg cursor-pointer border border-black hover:bg-gray-800" onClick={handleLogout}>Logout</button></div>
                <div className="w-full"><button className="bg-white text-black w-full rounded-md px-4 py-2 text-lg cursor-pointer border border-gray-300 hover:bg-gray-100" onClick={() => (navigate('/'))}>Go Home</button></div>
            </div>
        </div>
    )
}

export default Logout