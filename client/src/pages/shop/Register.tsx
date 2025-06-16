import { ArrowLeft, Check, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const Register = () => {
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

  return (
    <div className="w-full min-h-screen flex justify-center pt-16 pb-10">
      <div className="min-w-64 max-w-110 w-full text-gray-600">
        <div>
          <button className="flex justify-center items-center gap-2 hover:text-gray-950">
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
            <div className="flex space-x-2">
              <div className="space-y-2">
                <div className="text-black">
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="firstname"
                    className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black "
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
                    className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black "
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>
            <div className="text-black">
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black "
                placeholder="Enter your email"
              />
            </div>
            <div className="text-black">
              <label htmlFor="gender">Gender</label>
            </div>
            <div>
              <select name="" id="gender" className="w-full border border-gray-300 rounded-md py-1 pl-2 text-black">
                <option value="Male" selected>Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="text-black">
              <label htmlFor="password">Password</label>
            </div>
            <div className="relative flex">
              <input
                type={passwordType}
                id="password"
                className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8"
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
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="relative flex">
              <input
                type={confirmPasswordType}
                id="confirmPassword"
                className="border-1 w-full py-1 rounded-md border-gray-300 pl-2 text-black pr-8"
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
              <button className="select-none w-full bg-black text-white p-2 rounded-md cursor-pointer transition-all hover:bg-gray-900">
                Sign Up
              </button>
            </div>
            <div className="text-center text-sm space-y-2">
              <div className="select-none border-t-1 border-gray-300 my-2"></div>
              <div>Or Sign with</div>
              <div className="select-none">
                <button className="w-full p-2 relative border-1 border-gray-300 text-center rounded-md cursor-pointer hover:shadow-md transition-all text-black">
                  <span className="absolute left-5 top-[50%] -translate-[50%]">
                    <img src="/google.png" alt="google.png" className="w-4" />
                  </span>
                  <span>Signup with Google</span>
                </button>
              </div>
              <div className="select-none">
                Already have an account?{" "}
                <span className="select-none text-blue-600 hover:text-blue-700 cursor-pointer">
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
