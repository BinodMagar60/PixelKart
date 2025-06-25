import { Eye, Info, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { getallusers, resetpasswordAPI } from "../../api/AccountAPI"
import { toast } from "react-toastify"
import { formatDateToReadable } from "../../utils/DateConverter"



interface userDetailType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    joinedDate: string,
    orders: number,
    totalSpent: number,
    address: string,
    phoneNumber: number,
    role: string,
    gender: string,
    listedItems: number,
}

interface UserDetailsCardProps {
    userDetail: userDetailType,
    setUserDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Users = () => {

    const [isUserDetailsOpen, setUserDetailsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [noOfItems, setNoOfItems] = useState(10)
    const [userDetail, setUserDetail] = useState<userDetailType>({
        id: '',
        firstName: "",
        lastName: "",
        email: "",
        joinedDate: "",
        orders: 0,
        totalSpent: 0,
        address: '',
        phoneNumber: 0,
        role: "",
        gender: "",
        listedItems: 0,
    })


    const [usersData, setUsersData] = useState<userDetailType[]>([])

    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getallusers('account/usermanagement')
                if (response.status === 400 || response.status === 500) {
                    toast.error(response.data.message, {
                        autoClose: 1000,
                        theme: 'light'
                    })
                    return
                }
                setUsersData(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [])

    const filteredUsers = usersData.filter((user) => {
        const fullName = (user.firstName + " " + user.lastName).toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) || user.email.includes(searchQuery.toLowerCase())
        )
    })



    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            <div className="flex justify-between">
                <div>
                    <div className="text-black font-semibold text-xl">User Management</div>
                    <div className="text-gray-600 text-sm">Manage user accounts</div>
                </div>
                <div className="">
                    <form className="flex" onSubmit={(e) => (e.preventDefault())}>
                        <input type="text" placeholder="Search here..." className="border border-gray-300 h-fit px-3 py-1.5 w-70 rounded-tl-md rounded-bl-md focus:bg-gray-100" value={searchQuery} onChange={(e) => (setSearchQuery(e.target.value))} />
                        <button className="border-1 h-fit p-1.5 px-2 bg-black text-white rounded-br-md rounded-tr-md border-black hover:bg-gray-900 cursor-pointer"><Search size={24} /></button>
                    </form>

                </div>
            </div>
            <div className="mt-10">
                <table className="w-full">
                    <thead>
                        <tr className="hover:bg-gray-100 rounded-md">
                            <td className="py-3 pl-3">Name</td>
                            <td className="py-3">Email</td>
                            <td className="text-center py-3">Join Data</td>
                            <td className="text-center py-3">Orders</td>
                            <td className="text-center py-3">Totall Spent</td>
                            <td className="text-center py-3 pr-3">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.slice(0, noOfItems).map(item => (
                                <tr key={item.id} className="hover:bg-gray-100 rounded-md border-t border-gray-300">
                                    <td className="py-3 pl-3 capitalize ">{item.firstName + " " + item.lastName}</td>
                                    <td className="py-3">{item.email}</td>
                                    <td className="text-center py-3">{formatDateToReadable(item.joinedDate)}</td>
                                    <td className="text-center py-3">{item.orders}</td>
                                    <td className="text-center py-3">{item.totalSpent}</td>
                                    <td className="flex justify-center gap-3 py-3 pr-3">
                                        <button className="p-2 flex gap-2 items-center cursor-pointer border border-gray-300 rounded-md hover:bg-white" onClick={() => {
                                            setUserDetail(item)
                                            setUserDetailsOpen(true)
                                        }}><Eye size={20} /> <span>View</span></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="w-full flex justify-center">
                    <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out ${noOfItems > usersData.length ? "hidden" : "block"}`} onClick={() => (setNoOfItems(prev => prev + 10))}>Load More</button>
                </div>
            </div>

            {
                isUserDetailsOpen && <UserDetailsCard userDetail={userDetail} setUserDetailsOpen={setUserDetailsOpen} />
            }

        </div>
    )
}






const UserDetailsCard = ({ userDetail, setUserDetailsOpen }: UserDetailsCardProps) => {

    const resetpassword = async () => {

        try {
            const response = await resetpasswordAPI('account/resetpassword', { id: userDetail.id })
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            toast.success('Password Resetted', {
                autoClose: 1000,
                theme: 'light'
            })

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="absolute top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
            <div className="bg-white rounded-md max-w-70/100 w-full h-fit mt-10 lg:mt-25 p-6">
                <div className="flex justify-between mb-6">
                    <div className="text-2xl font-semibold capitalize">User Details: {userDetail.firstName + " " + userDetail.lastName}</div>
                    <div><button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setUserDetailsOpen(false)}>Close</button></div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>Name</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 capitalize">{userDetail.firstName + " " + userDetail.lastName}</div>
                        </div>
                        <div className="space-y-3">
                            <div>Email</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{userDetail.email}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>Joined Date</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{formatDateToReadable(userDetail.joinedDate)}</div>
                        </div>
                        <div className="space-y-3">
                            <div>Address</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{userDetail.address ? userDetail.address : "Not provided"}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>Phone</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{userDetail.phoneNumber ? userDetail.phoneNumber : "Not provided"}</div>
                        </div>
                        <div className="space-y-3">
                            <div>Reset Password</div>
                            <div className="flex gap-3">
                                <button className="px-3 py-2 text-white bg-black cursor-pointer rounded-md hover:bg-gray-900" onClick={resetpassword}>Reset Password</button>
                                <span className="text-sm text-gray-600 flex items-end gap-1"><Info size={20} /> <span className="font-semibold">Reseted password will be: 12345678</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">

                    </div>
                </div>
                <div className="space-y-4 mt-8">
                    <div className="text-xl font-semibold">User Statistics</div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="flex shadow-sm rounded-md flex-col items-center py-6 leading-7">
                            <div className="font-semibold text-xl">{userDetail.orders}</div>
                            <div className="text-sm text-gray-600">Total Orders</div>
                        </div>
                        <div className="flex shadow-sm rounded-md flex-col items-center py-6 leading-7">
                            <div className="font-semibold text-xl">{userDetail.totalSpent}</div>
                            <div className="text-sm text-gray-600">Total Spent</div>
                        </div>
                        <div className="flex shadow-sm rounded-md flex-col items-center py-6 leading-7">
                            <div className="font-semibold text-xl">{userDetail.listedItems}</div>
                            <div className="text-sm text-gray-600">Items Listed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users