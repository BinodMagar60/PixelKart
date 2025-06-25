import { CircleAlert, Eye, Info, Search, Trash2, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { addworker, deleteworker, getallusers, resetpasswordAPI } from "../../api/AccountAPI"
import { toast } from "react-toastify"
import { formatDateToReadable } from "../../utils/DateConverter"
import z from 'zod'



interface userDetailType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    joinedDate: string,
    address: string,
    phoneNumber: number,
    role: string,
    gender: string,
}

export interface workeraddtype {
    firstName: string;
    secondName: string;
    Address: string;
    phone: string | null;
    email: string;
    gender: string;
}

interface UserDetailsCardProps {
    userDetail: userDetailType,
    setUserDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

interface UserDeleteCardProps {
    userDetail: userDetailType,
    setDeleteCardOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setchange: React.Dispatch<React.SetStateAction<boolean>>,
}

interface AddWorkerCardProps {
    setAddCardOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setchange: React.Dispatch<React.SetStateAction<boolean>>,
}

const Workers = () => {
    const [change, setchange] = useState(false)
    const [isUserDetailsOpen, setUserDetailsOpen] = useState(false)
    const [isAddCardOpen, setAddCardOpen] = useState(false)
    const [isDeleteCardOpen, setDeleteCardOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [noOfItems, setNoOfItems] = useState(10)
    const [userDetail, setUserDetail] = useState<userDetailType>({
        id: '',
        firstName: "",
        lastName: "",
        email: "",
        joinedDate: "",
        address: '',
        phoneNumber: 0,
        role: "",
        gender: "",
    })

    const [usersData, setUsersData] = useState<userDetailType[]>([])
    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getallusers('account/workermanagement')
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
    }, [change])

    const filteredUsers = usersData.filter((user) => {
        const fullName = (user.firstName + " " + user.lastName).toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) || user.email.includes(searchQuery.toLowerCase())
        )
    })


    const onDelete = (item: userDetailType) => {
        setDeleteCardOpen(true)
        setUserDetail(item)
    }


    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            <div className="flex justify-between">
                <div>
                    <div className="text-black font-semibold text-xl">Worker Management</div>
                    <div className="text-gray-600 text-sm">Manage Worker accounts</div>
                </div>
                <div className="flex items-center gap-2">
                    <form className="flex" onSubmit={(e) => (e.preventDefault())}>
                        <input type="text" placeholder="Search here..." className="border border-gray-300 h-fit px-3 py-1.5 w-70 rounded-tl-md rounded-bl-md focus:bg-gray-100" value={searchQuery} onChange={(e) => (setSearchQuery(e.target.value))} />
                        <button className="border-1 h-fit p-1.5 px-2 bg-black text-white rounded-br-md rounded-tr-md border-black hover:bg-gray-900 cursor-pointer"><Search size={24} /></button>
                    </form>
                    <div>
                        <button className="bg-black border text-white flex px-4 gap-2 py-1.5 rounded-md items-center hover:bg-gray-900 cursor-pointer" onClick={() => setAddCardOpen(true)}><UserPlus size={26} /><span className="text-lg">Add User</span></button>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <table className="w-full">
                    <thead>
                        <tr className="hover:bg-gray-100 rounded-md">
                            <td className="py-3 pl-3">Name</td>
                            <td className="py-3">Email</td>
                            <td className="text-center py-3">Join Data</td>
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
                                    <td className="flex justify-center gap-3 py-3 pr-3">
                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white" onClick={() => {
                                            setUserDetail(item)
                                            setUserDetailsOpen(true)
                                        }}><Eye size={20} /></button>
                                        <button className="p-2 cursor-pointer border border-red-500 rounded-md text-white bg-red-500 hover:bg-red-400 hover:border-red-400" onClick={() => onDelete(item)}><Trash2 size={20} /></button>
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

            {
                isAddCardOpen && <AddWorkerCard setAddCardOpen={setAddCardOpen} setchange={setchange} />
            }

            {
                isDeleteCardOpen && <UserDeleteCard userDetail={userDetail} setDeleteCardOpen={setDeleteCardOpen} setchange={setchange}/>
            }

        </div>
    )
}


const UserDeleteCard = ({ userDetail, setDeleteCardOpen, setchange }: UserDeleteCardProps ) => {

    const userDelete = async() => {
        try{
            const response = await deleteworker('account/workermanagement',{id: userDetail.id})
            if(response.status === 400 || response.status === 500){
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light',
                })
                return
            }
            toast.success(response.message, {
                    autoClose: 1000,
                    theme: 'light',
                })
            setDeleteCardOpen(false)
            setchange(prev => !prev)
        }
        catch(error){
            console.log(error)
        }
    }
    

    return (
         <div className="absolute top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto pt-30 sm:pt-50">
            <div className="p-6 bg-white rounded-md h-fit space-y-3">
                <div className="flex justify-center text-red-500"><CircleAlert size={52}/></div>
                <div className="text-xl">Are you sure you want to delete this account?
                    <div className="text-center text-sm font-semibold">({userDetail.firstName+ ' ' + userDetail?.lastName})</div>
                </div>
                
                <div className="flex justify-center gap-3">
                    <button className="px-3 py-2 bg-red-500 rounded-md cursor-pointer text-white hover:bg-red-400" onClick={userDelete}>Delete</button>
                    <button className="px-3 py-2 bg-black rounded-md cursor-pointer text-white hover:bg-gray-800" onClick={()=>{setDeleteCardOpen(false)}}>Cancel</button>
                </div>
            </div>
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
            <div className="bg-white rounded-md max-w-70/100 w-full h-fit mt-25 lg:mt-25 p-6">
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
            </div>
        </div>
    )
}


const AddWorkerCard = ({ setAddCardOpen, setchange }: AddWorkerCardProps) => {

    const validation = z.object({
        firstName: z.string(),
        secondName: z.string().optional(),
        Address: z.string(),
        phone: z.number(),
        email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Email'),
        gender: z.enum(['Male', 'Female'])
    })

    const [loading, setlaoding] = useState(false)
    const [userdata, setuserdata] = useState<workeraddtype>({
        firstName: '',
        secondName: '',
        Address: '',
        phone: null,
        email: '',
        gender: 'Male'
    })

    const onChangeData = (e: { target: { name: string, value: string | number, type: string } }) => {
        const { name, value, type } = e.target
        setuserdata(prev => ({
            ...prev,
            [name]: name === 'firstName' ? String(value).toUpperCase() : name === 'secondName' ? String(value).toUpperCase() : type === 'number' ? Number(value) : value
        }))
    }

    const onSubmitData = async () => {
        try {
            setlaoding(true)
            const parsed = validation.safeParse(userdata)
            if (!parsed.success) {
                toast.error('Validation error', {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }

            const response = await addworker('account/workermanagement', userdata)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light',
                })
                return
            }
            setchange(prev => !prev)
            setuserdata({
                firstName: '',
                secondName: '',
                Address: '',
                phone: null,
                email: '',
                gender: 'Male'
            })
            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light',
            })
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setTimeout(() => {
                setlaoding(false)
            }, 1500);
        }
    }

    return (
        <div>
            <div className="absolute pb-10 top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
                <div className="bg-white rounded-md max-w-50/100 w-full h-fit mt-25 lg:mt-25 p-6">
                    <div className="flex justify-between mb-6">
                        <div className="text-2xl font-semibold capitalize">Add Worker</div>
                        <div><button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setAddCardOpen(false)}>Close</button></div>
                    </div>
                    <div className="space-y-4">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="space-y-3">
                                <div>First Name</div>
                                <div><input type="text" placeholder="John" className="border px-3 py-1 border-gray-300 rounded-md w-full" name="firstName" value={userdata.firstName} onChange={onChangeData} /></div>
                            </div>
                            <div className="space-y-3">
                                <div>Last Name</div>
                                <div><input type="text" placeholder="Doe" className="border px-3 py-1 border-gray-300 rounded-md w-full" name="secondName" value={userdata.secondName} onChange={onChangeData} /></div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="space-y-3">
                                <div>Address</div>
                                <div><input type="text" placeholder="Chitwan, Nepal" className="border px-3 py-1 border-gray-300 rounded-md w-full" name="Address" value={userdata.Address} onChange={onChangeData} /></div>
                            </div>
                            <div className="space-y-3">
                                <div>Contact No.</div>
                                <div><input type="number" placeholder="9800000000" className="border px-3 py-1 border-gray-300 rounded-md w-full" name="phone" value={userdata.phone ?? 0} onChange={onChangeData} /></div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="space-y-3">
                                <div>Email</div>
                                <div><input type="email" placeholder="john@gmail.com" className="border px-3 py-1 border-gray-300 rounded-md w-full" name="email" value={userdata.email} onChange={onChangeData} /></div>
                            </div><div className="space-y-3">
                                <div>Gender</div>
                                <div>
                                    <select className="border px-3 py-1 border-gray-300 rounded-md w-full" name="gender" value={userdata.gender} onChange={onChangeData}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 text-gray-600">
                            <span><Info size={20} /></span>
                            <span className="text-sm">Default password will be: <span className="font-bold">12345678</span></span>
                        </div>
                        <div className="w-full flex justify-center mt-10">
                            <button className="w-full px-4 py-2 border bg-black text-white rounded-md cursor-pointer hover:bg-gray-800" onClick={onSubmitData} disabled={loading}>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Workers