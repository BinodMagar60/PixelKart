

import { useEffect, useState } from "react"
import { type UserType, useUserContext } from "../../context/UserContext"
import { updateUserProfile} from "../../api/AccountAPI";
import { toast } from "react-toastify";
import isEqual from "lodash.isequal";


const Profile = () => {

    const { userInfo, setUserInfo } = useUserContext()
    const [userDetail, setUserDetail] = useState<UserType | null>(userInfo);
    
    useEffect(() => {
        if (userInfo) {
            setUserDetail(userInfo)
        }
    }, [userInfo])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserDetail(prev => ({
        ...prev!,
        [name]: type === "number"
            ? Number(value)
            : name === "firstName" || name === "secondName"
                ? value.toUpperCase()
                : value
    }));
};


    const onSubmitHandle = async () => {
        if (!isEqual(userInfo,userDetail)) {
            const newData = {
                _id: userDetail?._id ?? "",
                firstName: userDetail?.firstName.trim().toUpperCase() ?? "",
                secondName: userDetail?.secondName?.trim().toUpperCase() ?? "",
                Address: userDetail?.Address?.trim() ?? "",
                phone: userDetail?.phone ?? 0
            }

            const response = await updateUserProfile('account/profileupdate', newData)
            if(response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: "light",
                })
                return
            }
            setUserInfo(userDetail)
        }
    }


    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md space-y-5">
            <div>
                <div className="text-black font-semibold text-xl">
                    User Details
                </div>
                <div className="text-gray-600 text-sm">
                    Update your personal information
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <div className="font-semibold">First Name</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" onChange={handleChange} placeholder="John" name="firstName" value={userDetail?.firstName} /></div>
                </div>
                <div className="space-y-1">
                    <div className="font-semibold">Second Name</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="Doe" name="secondName" value={userDetail?.secondName} onChange={handleChange} /></div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Email</div>
                <div><input type="email" className="border border-gray-300 w-full px-4 py-1 rounded-md bg-gray-50" placeholder="john@gmail.com" name="email" value={userDetail?.email} onChange={handleChange} disabled /></div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Phone Number</div>
                <div><input type="number" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="9800000000" name="phone" value={userDetail?.phone ?? ""} onChange={handleChange} /></div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Address</div>
                <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="Bharatpur-10, Chitwan" name="Address" value={userDetail?.Address} onChange={handleChange} /></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <div className="font-semibold">Role</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md bg-gray-50" placeholder="Worker" disabled name="role" value={userDetail?.role} onChange={handleChange} /></div>
                </div>
                <div className="space-y-1">
                    <div className="font-semibold">Gender</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md bg-gray-50" placeholder="Male" value={userDetail?.gender} disabled /></div>
                </div>
            </div>
            <div>
                <button className="py-2 px-3 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer" onClick={onSubmitHandle}>Save changes</button>
            </div>
        </div>
    )
}

export default Profile