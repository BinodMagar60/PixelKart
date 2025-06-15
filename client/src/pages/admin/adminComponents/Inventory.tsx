import { Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import AddProduct from "../../../components/AddProduct"



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
            status: true,
            sales: 10
        },
        {
            id: 2,
            productName: "Gaming Laptop RTX 4070",
            category: "Motherboard",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 3,
            productName: "Gaming Laptop RTX 4070",
            category: "GUP",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 4,
            productName: "Keybaord",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 5,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 6,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 7,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 8,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 9,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: true,
            sales: 10
        },
        {
            id: 10,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: false,
            sales: 10
        },
        {
            id: 11,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            stock: 15,
            status: false,
            sales: 10
        },
    ])

    const handleStatusChange = (id: number) => {
        const newData = itemsDetail.map(item => {
            if (item.id === id) {
                return { ...item, status: !item.status }
            }
            return item
        })

        setItemsDetail(newData);
    };

    const handleStockChange = (id: number, value: number) => {
        const newData = itemsDetail.map(item=> {
            if (item.id === id){
                return {...item, stock: value}
            }
            return item
        })

        setItemsDetail(newData)
    }


    const filteredItems = itemsDetail.filter((item) => {
        const productName = item.productName.toLowerCase();
        return (
            productName.includes(searchQuery.toLowerCase()) || (item.category.toLowerCase()).includes(searchQuery.toLowerCase())
        )
    })

    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            {
                !isAddCardOpen && (
                    <>
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
                                    <button className="bg-black border text-white flex px-4 gap-2 py-1.5 rounded-md items-center hover:bg-gray-900 cursor-pointer" onClick={() => setAddCardOpen(true)}><Plus size={26} /><span className="text-lg">Add Product</span></button>
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
                                        filteredItems.slice(0, noOfItems).map((item) => (
                                            <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                                <td className="py-3 pl-3">{item.productName}</td>
                                                <td className="py-3 capitalize">{item.category}</td>
                                                <td className="text-center py-3">{item.price}</td>
                                                <td className="text-sm"><div className="flex justify-center"><input type="number" className="border border-gray-300 rounded-md px-3 py-1 max-w-20" value={item.stock} onChange={(e)=> handleStockChange(item.id, Number(e.target.value))}/></div></td>
                                                <td className="text-sm"><div className="flex justify-center"><div className="rounded-full px-3 py-0.5 bg-black text-white w-fit">{item.status ? "Active" : "Offline"    }</div></div></td>
                                                <td className="text-center">{item.sales}</td>
                                                <td>
                                                    <div className="flex justify-center">
                                                        <button className={`w-12 border rounded-full border-gray-300 transition-all ease-in-out ${item.status ? "bg-green-400" : "bg-white"}`} onClick={() => handleStatusChange(item.id)} style={{
                                                            padding: "1px"
                                                        }}>
                                                            <div className="w-full relative h-5">
                                                                <div className={`border border-gray-300 h-5 w-5 rounded-full absolute transition-all ease-in-out ${item.status ? "right-0 bg-white" : "left-0 bg-gray-100"}`}>
                                                                </div>
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
                                <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out ${filteredItems.length > noOfItems ? "block" : "hidden"}`} onClick={() => (setNoOfItems(prev => prev + 10))}>Load More</button>
                            </div>
                        </div>


                    </>
                )
            }

            {
                isAddCardOpen && <AddProduct setAddCardOpen={setAddCardOpen} />
            }

        </div>
    )
}


export default Inventory