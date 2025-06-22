import { ArrowLeft, Check, Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { registerUser } from "../../api/LoginRegisterAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Logout from "../../components/Logout";



const Register = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo} = useUserContext()
  useEffect(()=>{
      if(userInfo){
        navigate('/')
      }
    },[])
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    gender: "Male",
    password: "",
    cPassword: "",
  })

  const [error, setError] = useState({
    firstName: false,
    email: false,
    password: false,
    cPassword: false,
  })

  const [warning, setWarning] = useState({
    isOn: false,
    message: "",
  })

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");
  const [tos, setTos] = useState(false);

  const showPassoword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPassoword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const handleTosChange = () => {
    setTos(!tos);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: name === 'email'? value.toLowerCase() : value
    }))
  }

  const validate = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!userData.firstName.trim()) {
      setError(prev => ({ ...prev, firstName: true }));
      setWarning({ isOn: true, message: "First Name is required" });
      return false;
    } else {
      setError(prev => ({ ...prev, firstName: false }));
    }

    if (!userData.email.trim()) {
      setError(prev => ({ ...prev, email: true }));
      setWarning({ isOn: true, message: "Email is required" });
      return false;
    } else if (!regex.test(userData.email.trim())) {
      setError(prev => ({ ...prev, email: true }));
      setWarning({ isOn: true, message: "Email must end with @gmail.com" });
      return false;
    } else {
      setError(prev => ({ ...prev, email: false }));
    }

    if (!userData.password) {
      setError(prev => ({ ...prev, password: true }));
      setWarning({ isOn: true, message: "Password is required" });
      return false;
    } else if (userData.password.length < 8) {
      setError(prev => ({ ...prev, password: true }));
      setWarning({ isOn: true, message: "Password must be at least 8 characters" });
      return false;
    } else {
      setError(prev => ({ ...prev, password: false }));
    }

    if (userData.password !== userData.cPassword) {
      setError(prev => ({ ...prev, cPassword: true }));
      setWarning({ isOn: true, message: "Passwords do not match" });
      return false;
    } else {
      setError(prev => ({ ...prev, cPassword: false }));
    }

    if (!tos) {
      setWarning({ isOn: true, message: "Please agree to the Terms of Service" });
      return false;
    }

    setWarning({ isOn: false, message: "" });
    return true;
  };



  const handleSubmit = async () => {

    if (validate()) {
      setLoading(true)
      try {
        const response = await registerUser("auth/users/register", {
          firstName: userData.firstName, email: userData.email, password: userData.password, gender: userData.gender, secondName: userData.secondName
        })
        if (response?.status === 400 || response?.status === 500) {
          toast.error(response?.data?.message, {
            theme: "light",
            autoClose: 1000,
          })
          setLoading(false)
          return
        }
        setUserData({
          firstName: "",
          secondName: "",
          email: "",
          gender: "Male",
          password: "",
          cPassword: "",
        })
        
        toast.success(response.message, {
          theme: "light",
          autoClose: 1000,
        })
        
        setTimeout(() => {
          navigate("/")
          setUserInfo(response.user)
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
  }


  return (
    <div className="w-full min-h-screen flex justify-center pt-16 pb-10">
      <div className="min-w-64 max-w-110 w-full text-gray-600">
        <div>
          <button className="flex justify-center items-center gap-2 hover:text-gray-950" onClick={()=>(navigate('/'))}>
            <ArrowLeft size={18} />
            <span>Back to PixelKart</span>
          </button>
        </div>
        <div className="bg-white px-6 py-8 mt-2 rounded-md shadow">
          <div className="text-center mb-8">
            <div className="text-black font-semibold text-2xl">
              Join PixelKart
            </div>
            <div className="text-sm">Create your account to get started</div>
          </div>
          <div className="space-y-2">
            {
              warning.isOn && (
                <div className={`w-full border border-red-600 bg-red-100 text-red-500 rounded-sm py-1 px-4`} >
                  {warning.message}
                </div>
              )
            }
            <div className="flex space-x-2">
              <div className="space-y-2">
                <div className="text-black">
                  <label htmlFor="firstname">First Name*</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="firstname"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={`border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black ${error.firstName ? "border-red-600" : ""}`}
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-black">
                  <label htmlFor="lastname">Last Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="lastname"
                    name="secondName"
                    value={userData.secondName}
                    onChange={handleChange}
                    className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black "
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>
            <div className="text-black">
              <label htmlFor="email">Email*</label>
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black ${error.email ? "border-red-600" : ""}`}
                placeholder="Enter your email"
              />
            </div>
            <div className="text-black">
              <label htmlFor="gender">Gender</label>
            </div>
            <div>
              <select id="gender" name="gender" value={userData.gender} className="w-full border border-gray-300 rounded-md py-1 pl-2 text-black" onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="text-black">
              <label htmlFor="password">Password*</label>
            </div>
            <div className="relative flex">
              <input
                type={passwordType}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className={`border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8 ${error.password ? "border-red-600" : ""}`}
                placeholder="Create a password"
              />
              <div
                className="absolute right-2 top-[50%] -translate-y-[50%] flex cursor-pointer transition-all"
                onClick={showPassoword}
              >
                {passwordType === "password" ? (
                  <EyeClosed size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </div>
            </div>
            <div className="text-black">
              <label htmlFor="confirmPassword">Confirm Password*</label>
            </div>
            <div className="relative flex">
              <input
                type={confirmPasswordType}
                id="confirmPassword"
                name="cPassword"
                value={userData.cPassword}
                onChange={handleChange}
                className={`border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8 ${error.cPassword ? "border-red-600" : ""}`}
                placeholder="Confirm your password"
              />
              <div
                className="absolute right-2 top-[50%] -translate-y-[50%] flex cursor-pointer transition-all"
                onClick={showConfirmPassoword}
              >
                {confirmPasswordType === "password" ? (
                  <EyeClosed size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </div>
            </div>
            <div className="text-xs text-black select-none">
              <input
                type="checkbox"
                id="TOS"
                hidden
                onChange={handleTosChange}
                checked={tos}
              />
              <div className="flex gap-2">
                <div
                  className="border-1 rounded-sm border-gray-400 cursor-pointer"
                  onClick={handleTosChange}
                >
                  {tos ? (
                    <Check size={14} />
                  ) : (
                    <Check size={14} visibility={"hidden"} />
                  )}
                </div>
                <div>
                  <span onClick={handleTosChange}>I agree to the</span>{" "}
                  <span className="text-blue-600 font-semibold">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-semibold">
                    Privacy Policy
                  </span>
                </div>
              </div>
            </div>
            <div className="my-4">
              <button className="select-none w-full bg-black text-white p-2 rounded-md cursor-pointer transition-all hover:bg-gray-900" disabled={loading} onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
            <div className="text-center text-sm space-y-2">
              <div className="select-none border-t-1 border-gray-300 my-2"></div>
              <div className="select-none mt-4">
                Already have an account?{" "}
                <span className="select-none text-blue-600 hover:text-blue-700 cursor-pointer" onClick={()=>(navigate("/login"))}>
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        userInfo && <Logout/>
      }
    </div>
  );
};

export default Register;
