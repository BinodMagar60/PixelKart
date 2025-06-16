import { Eye, Info, Search, Trash2} from "lucide-react"
import { useState } from "react"



interface userDetailType {
    id: number,
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
        id: 0,
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

    const [usersData, setUsersData] = useState<userDetailType[]>([
        {
            id: 1,
            firstName: "binod",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 2,
            firstName: "binod1",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 3,
            firstName: "binod3",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 4,
            firstName: "binod4",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 5,
            firstName: "binod5",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 6,
            firstName: "Rajan",
            lastName: "chettri",
            email: "rajan@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 7,
            firstName: "binod",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 8,
            firstName: "binod1",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 9,
            firstName: "binod3",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 10,
            firstName: "binod4",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 11,
            firstName: "binod5",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 12,
            firstName: "Rajan",
            lastName: "chettri",
            email: "rajan@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 13,
            firstName: "binod",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 14,
            firstName: "binod1",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 15,
            firstName: "binod3",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 16,
            firstName: "binod4",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 17,
            firstName: "binod5",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 18,
            firstName: "Rajan",
            lastName: "chettri",
            email: "rajan@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 19,
            firstName: "binod",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 20,
            firstName: "binod1",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 21,
            firstName: "binod3",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 22,
            firstName: "binod4",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 23,
            firstName: "binod5",
            lastName: "kaucha",
            email: "kauchabinod88@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
        {
            id: 24,
            firstName: "rahul",
            lastName: "ranabhat",
            email: "rahul@gmail.com",
            joinedDate: "1 Jan, 2025",
            orders: 12,
            totalSpent: 12000,
            address: 'Bharatpur-10, chitwan',
            phoneNumber: 9800000000,
            role: "User",
            gender: "Male",
            listedItems: 3,
        },
    ])

    const filteredUsers = usersData.filter((user) => {
        const fullName = (user.firstName + " " + user.lastName).toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) || user.email.includes(searchQuery.toLowerCase())
        )
    })


    const onDelete = (id: number) => {
        const newData = usersData.filter(item => item.id != id)
        setUsersData(newData)
    }

    

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
                                    <td className="text-center py-3">{item.joinedDate}</td>
                                    <td className="text-center py-3">{item.orders}</td>
                                    <td className="text-center py-3">{item.totalSpent}</td>
                                    <td className="flex justify-center gap-3 py-3 pr-3">
                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white" onClick={() => {
                                            setUserDetail(item)
                                            setUserDetailsOpen(true)
                                        }}><Eye size={20} /></button>
                                        <button className="p-2 cursor-pointer border border-red-500 rounded-md text-white bg-red-500 hover:bg-red-400 hover:border-red-400" onClick={() => onDelete(item.id)}><Trash2 size={20} /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="w-full flex justify-center">
                    <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out ${noOfItems > usersData.length? "hidden":"block"}`} onClick={()=>(setNoOfItems(prev => prev + 10))}>Load More</button>
                </div>
            </div>

            {
                isUserDetailsOpen && <UserDetailsCard userDetail={userDetail} setUserDetailsOpen={setUserDetailsOpen} />
            }

        </div>
    )
}






const UserDetailsCard = ({ userDetail, setUserDetailsOpen }: UserDetailsCardProps) => {
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
                            <div>Join Date</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{userDetail.joinedDate}</div>
                        </div>
                        <div className="space-y-3">
                            <div>Address</div>
                            <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-800">{userDetail.address}</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                            <div>Reset Password</div>
                            <div className="flex gap-3">
                                <button className="px-3 py-2 text-white bg-black cursor-pointer rounded-md hover:bg-gray-900">Reset Password</button>
                                <span className="text-sm text-gray-600 flex items-end gap-1"><Info size={20} /> <span className="font-semibold">Reseted password will be: 12345678</span></span>
                            </div>
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