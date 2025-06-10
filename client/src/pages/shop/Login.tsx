import { ArrowLeft, Eye, EyeClosed } from "lucide-react"
import { useState } from "react"

const Login = () => {

  const [passwordType, setPasswordType] = useState<"password" | "text">("password")

  const showPassoword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
    }
    else {
      setPasswordType("password")
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center pt-16 pb-10">
      <div className="min-w-64 max-w-90 w-full text-gray-600">
        <div>
          <button className="flex justify-center items-center gap-2 hover:text-gray-950"><ArrowLeft size={18} /><span>Back to PixelKart</span></button>
        </div>
        <div className="bg-white px-6 py-8 mt-2 rounded-md shadow">
          <div className="text-center mb-8">
            <div className="text-black font-semibold text-2xl">Welcom Back</div>
            <div className="text-sm">Sign in to your account</div>
          </div>
          <div className="space-y-2">
            <div className="text-black"><label htmlFor="email">Email</label></div>
            <div><input type="email" id="email" className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black " placeholder="Enter your email" /></div>
            <div className="text-black"><label htmlFor="password">Password</label></div>
            <div className="relative flex"><input type={passwordType} id="password" className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8" placeholder="Enter your password" />
              <div className="absolute right-2 top-[50%] -translate-y-[50%] flex cursor-pointer transition-all" onClick={showPassoword}>
                {
                  passwordType === "password" ? <EyeClosed size={16} /> : <Eye size={16} />
                }
              </div>
            </div>
            <div className="my-4"><button className="select-none w-full bg-black text-white p-2 rounded-md cursor-pointer transition-all hover:bg-gray-900">Sign In</button></div>
            <div className="text-center text-sm space-y-2">
              <div className="select-none text-blue-600 hover:text-blue-700 cursor-pointer">Forgot your password?</div>
              <div className="select-none border-t-1 border-gray-300 my-2"></div>
              <div>Or Sign with</div>
              <div className="select-none"><button className="w-full p-2 relative border-1 border-gray-300 text-center rounded-md cursor-pointer hover:shadow-md transition-all text-black"><span className="absolute left-5 top-[50%] -translate-[50%]"><img src="/google.png" alt="google.png" className="w-4" /></span><span>Login with Google</span></button></div>
              <div className="select-none">Don't have an account? <span className="select-none text-blue-600 hover:text-blue-700 cursor-pointer">Sign up</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login