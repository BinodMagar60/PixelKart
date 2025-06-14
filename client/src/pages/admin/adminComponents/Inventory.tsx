import { Eye, Info, Search, SendToBack, Trash2, UserPlus } from "lucide-react"
import { useState } from "react"




interface AddWorkerCardProps {
    setAddCardOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Inventory = () => {

    const [isAddCardOpen, setAddCardOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [noOfItems, setNoOfItems] = useState(10)
    const [itemsDetail, setItemsDetail] = useState([
        {
            id: 1,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 2,
            productName: "Gaming Laptop RTX 4070",
            category: "Motherboard",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 3,
            productName: "Gaming Laptop RTX 4070",
            category: "GUP",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 4,
            productName: "Keybaord",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 5,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 6,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 7,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 8,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 9,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 10,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "active",
            sales: 10
        },
        {
            id: 11,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: "Deactive",
            sales: 10
        },
    ])


    const filteredItems = itemsDetail.filter((item) => {
        const productName = item.productName.toLowerCase();
        return (
            productName.includes(searchQuery.toLowerCase()) || (item.category.toLowerCase()).includes(searchQuery.toLowerCase())
        )
    })

    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            <div className="flex justify-between">
                <div>
                    <div className="text-black font-semibold text-xl">Inventory Management</div>
                    <div className="text-gray-600 text-sm">Manage product inventory and stock levels</div>
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
                <table className="w-full" >
                    <thead>
                        <tr className="hover:bg-gray-100 rounded-md">
                            <td className="py-3 pl-3">Product Name</td>
                            <td className="py-3">Category</td>
                            <td className="text-center py-3">Price</td>
                            <td className="text-center py-3">Stocks</td>
                            <td className="text-center py-3">Status</td>
                            <td className="text-center py-3">Sales</td>
                            <td className="text-center py-3">Visiblility</td>
                            <td className="text-center py-3 pr-3">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredItems.map((item) => (
                                <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                    <td className="py-3 pl-3">{item.productName}</td>
                                    <td className="py-3 capitalize">{item.category}</td>
                                    <td className="text-center py-3">{item.price}</td>
                                    <td className="text-sm"><div className="flex justify-center"><input type="number" className="border border-gray-300 rounded-md px-3 py-1 max-w-20" value={item.stock} /></div></td>
                                    <td className="text-sm"><div className="flex justify-center"><div className="rounded-full px-3 py-0.5 bg-black text-white w-fit">{item.status}</div></div></td>
                                    <td className="text-center">{item.sales}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button className="w-10 border rounded-full border-gray-300">
                                                <div className="w-full relative h-5">
                                                    <div className="h-5  w-5  bg-gray-800 rounded-full absolute right-0"></div>
                                                </div>
                                            </button>
                                        </div>
                                    </td>
                                    <td className=" py-3 pr-3">
                                        <div className="flex justify-center gap-3">
                                            <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white"><Eye size={20} /></button>
                                            <button className="p-2 cursor-pointer border border-red-500 rounded-md text-white bg-red-500 hover:bg-red-400 hover:border-red-400" ><Trash2 size={20} /></button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="w-full flex justify-center">
                    <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out `} onClick={() => (setNoOfItems(prev => prev + 10))}>Load More</button>
                </div>
            </div>



            {
                isAddCardOpen && <AddWorkerCard setAddCardOpen={setAddCardOpen} />
            }

        </div>
    )
}






const AddWorkerCard = ({ setAddCardOpen }: AddWorkerCardProps) => {
    return (
        <div>
            <div className="absolute top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
                <div className="bg-white rounded-md max-w-50/100 w-full h-fit mt-25 lg:mt-25 p-6">
                    <div className="flex justify-between mb-6">
                        <div className="text-2xl font-semibold capitalize">Add Worker</div>
                        <div><button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setAddCardOpen(false)}>Close</button></div>
                    </div>
                    <div className="space-y-4">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="space-y-3">
                                <div>First Name</div>
                                <div><input type="text" placeholder="John" className="border px-3 py-1 border-gray-300 rounded-md w-full" /></div>
                            </div>
                            <div className="space-y-3">
                                <div>Last Name</div>
                                <div><input type="text" placeholder="Doe" className="border px-3 py-1 border-gray-300 rounded-md w-full" /></div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div className="space-y-3">
                                <div>Address</div>
                                <div><input type="text" placeholder="Chitwan, Nepal" className="border px-3 py-1 border-gray-300 rounded-md w-full" /></div>
                            </div>
                            <div className="space-y-3">
                                <div>Contact No.</div>
                                <div><input type="number" placeholder="9800000000" className="border px-3 py-1 border-gray-300 rounded-md w-full" /></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>Email</div>
                            <div><input type="email" placeholder="john@gmail.com" className="border px-3 py-1 border-gray-300 rounded-md w-full" /></div>
                        </div>
                        <div className="flex gap-2 text-gray-600">
                            <span><Info size={20} /></span>
                            <span className="text-sm">Default password will be: <span className="font-bold">12345678</span></span>
                        </div>
                        <div className="w-full flex justify-center mt-10">
                            <button className="w-full px-4 py-2 border bg-black text-white rounded-md cursor-pointer hover:bg-gray-800">Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Inventory