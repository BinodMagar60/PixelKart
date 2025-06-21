import { ArrowLeft, Eye, EyeClosed } from "lucide-react"
import { useEffect, useState } from "react"
import { LoginUser } from "../../api/LoginRegisterAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import Logout from "../../components/Logout"
const Login = () => {
  const { userInfo, setUserInfo } = useUserContext()

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[])

  const [loading, setLoading] = useState(false)
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const [passwordType, setPasswordType] = useState<"password" | "text">("password")

  const showPassoword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
    }
    else {
      setPasswordType("password")
    }
  }


  const handleChange = (e: { target: { name: string, value: string } }) => {
    const { name, value } = e.target
    setUserDetail(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await LoginUser('auth/users/login', userDetail)
      if (response?.status === 400 || response?.status === 500) {
        toast.error(response?.data?.message, {
          theme: "light",
          autoClose: 1000
        })
        setLoading(false)
        return
      }
      setUserInfo(response?.data)
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      }, 1000);
    }
    catch (error) {
      console.log(error)
    }
    finally {
        setLoading(false)
    }
  }


  return (
    <div className="w-full min-h-screen flex justify-center pt-16 pb-10">
      <div className="min-w-64 max-w-90 w-full text-gray-600">
        <div>
          <button className="flex justify-center items-center gap-2 hover:text-gray-950" onClick={()=>(navigate("/"))}><ArrowLeft size={18} /><span>Back to PixelKart</span></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-6 py-8 mt-2 rounded-md shadow">
            <div className="text-center mb-8">
              <div className="text-black font-semibold text-2xl">Welcom Back</div>
              <div className="text-sm">Sign in to your account</div>
            </div>
            <div className="space-y-2">
              <div className="text-black"><label htmlFor="email">Email</label></div>
              <div><input type="email" id="email" className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black " required placeholder="Enter your email" onChange={handleChange} name="email" value={userDetail.email} /></div>
              <div className="text-black"><label htmlFor="password">Password</label></div>
              <div className="relative flex"><input type={passwordType} id="password" className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8" placeholder="Enter your password" required onChange={handleChange} name="password" value={userDetail.password} />
                <div className="absolute right-2 top-[50%] -translate-y-[50%] flex cursor-pointer transition-all" onClick={showPassoword}>
                  {
                    passwordType === "password" ? <EyeClosed size={16} /> : <Eye size={16} />
                  }
                </div>
              </div>
              <div className="my-4"><button className="select-none w-full bg-black text-white p-2 rounded-md cursor-pointer transition-all hover:bg-gray-900" disabled={loading}>Sign In</button></div>
              <div className="text-center text-sm space-y-2">
                <div className="select-none border-t-1 border-gray-300 my-2"></div>
                <div className="select-none mt-4">Don't have an account? <span className="select-none text-blue-600 hover:text-blue-700 cursor-pointer" onClick={()=>(navigate("/register"))} >Sign up</span></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {
        userInfo && <Logout/>
      }
    </div>
  )
}

export default Login