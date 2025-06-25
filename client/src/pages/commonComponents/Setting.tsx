import { AlertCircle, Eye, EyeOff, Save, X } from "lucide-react"
import { useState } from "react"
import { changepasswordAPI } from "../../api/AccountAPI"
import { toast } from "react-toastify"


export interface passowordType {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

interface passowordShowType {
  currentPassword: boolean,
  newPassword: boolean,
  confirmPassword: boolean
}

type fieldType = "currentPassword" | "newPassword" | "confirmPassword"

const Setting = () => {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [password, setPassword] = useState<passowordType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordShow, setPasswordShow] = useState<passowordShowType>({
    currentPassword: true,
    newPassword: false,
    confirmPassword: false,
  })

  const [errors, setErrors] = useState<passowordType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })



  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setPassword((prev) => ({
      ...prev,
      [name]: value
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  }

  const handleToggle = (field: fieldType) => {
    setPasswordShow(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }


  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let isValid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };


    if (!password.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }


    if (!password.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    }

    else if (password.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!passwordRegex.test(password.newPassword)) {
      newErrors.newPassword = "Password doesn't meet the requirements.";
      isValid = false;
    }

    if (password.newPassword !== password.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async () => {
    try {
      setLoading(true)
      setSuccessMessage('')
      if (!validateForm()) {
        return
      }

      const response = await changepasswordAPI('account/changepassword', password)
      // console.log(response)
      if (response.status === 400 || response.status === 500) {
        toast.error(response.data.message, {
          autoClose: 1000,
          theme: 'light'
        })
        setLoading(false)
        return
      }
      setTimeout(() => {

        setSuccessMessage("Sucessfully password changed")

        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false)
      }, 1500);
    }
    catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
      <div className="mb-4">
        <div className="text-black font-semibold text-xl">Setting</div>
        <div className="text-gray-600 text-sm">Ensure your account remains secure by creating a strong password</div>
      </div>
      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex justify-between">
          <span>{successMessage}</span>
          <button className="hover:text-green-800 cursor-pointer" onClick={() => setSuccessMessage(null)}><X size={20} /></button>
        </div>
      )}
      <div className="font-semibold text-lg mb-4">Change password</div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div>Current Password</div>
          <div className="relative">
            <input type={passwordShow.currentPassword ? "text" : "password"} className="w-full py-1.5 pl-3 pr-10 border border-gray-300 rounded-md" maxLength={16} name="currentPassword" value={password.currentPassword} placeholder="Enter current password" onChange={handleChange} />
            <button className="absolute right-2 top-1.5" onClick={() => handleToggle("currentPassword")}>{passwordShow.currentPassword ? <EyeOff strokeWidth={1} /> : <Eye strokeWidth={1} />}</button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.currentPassword}
            </p>
          )}
        </div>
        <div>
          <div>New Password</div>
          <div className="relative">
            <input type={passwordShow.newPassword ? "text" : "password"} className="w-full py-1.5 pl-3 pr-10 border border-gray-300 rounded-md" maxLength={16} name="newPassword" value={password.newPassword} placeholder="Enter new password" onChange={handleChange} />
            <button className="absolute right-2 top-1.5" onClick={() => handleToggle("newPassword")}>{passwordShow.newPassword ? <EyeOff strokeWidth={1} /> : <Eye strokeWidth={1} />}</button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.newPassword}
            </p>
          )}
        </div>
        <div>
          <div>Confirm Password</div>
          <div className="relative">
            <input type={passwordShow.confirmPassword ? "text" : "password"} className="w-full py-1.5 pl-3 pr-10 border border-gray-300 rounded-md" maxLength={16} name="confirmPassword" value={password.confirmPassword} placeholder="Confirm new passoword" onChange={handleChange} />
            <button className="absolute right-2 top-1.5" onClick={() => handleToggle("confirmPassword")}>{passwordShow.confirmPassword ? <EyeOff strokeWidth={1} /> : <Eye strokeWidth={1} />}</button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      <div className="my-4 py-4 border-y border-gray-300">
        <div className="font-semibold mb-2">Password Requirements:</div>
        <ul className="list-disc text-gray-600 pl-8">
          <li>At least 8 characters long</li>
          <li>Include at least one uppercase letter</li>
          <li>Include at least one number</li>
          <li>Include at least on special character</li>
          <li>At most 16 characters long</li>
        </ul>
      </div>
      <div className="flex justify-end">
        <button className="bg-black rounded-md text-white flex px-3 gap-2 cursor-pointer py-2 items-center hover:bg-gray-800" onClick={handleSubmit} disabled={loading}><span><Save size={20} /></span><span>Update Password</span></button>
      </div>
    </div>
  )
}

export default Setting