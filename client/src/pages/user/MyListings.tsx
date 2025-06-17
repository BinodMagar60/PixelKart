import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import AddProduct from "../commonComponents/AddProduct"



const MyListings = () => {

    const [isAddCardOpen, setAddCardOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [itemsDetail, setItemsDetail] = useState([
        {
            id: 1,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: true,
        },
        {
            id: 2,
            productName: "Gaming Laptop RTX 4070",
            category: "Motherboard",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: true,
        },
        {
            id: 3,
            productName: "Gaming Laptop RTX 4070",
            category: "GPU",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 4,
            productName: "Keybaord",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 5,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 6,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 7,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 8,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 9,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: true,
            sales: 10,
            featured: false,
        },
        {
            id: 10,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: false,
            sales: 10,
            featured: false,
        },
        {
            id: 11,
            productName: "Gaming Laptop RTX 4070",
            category: "Laptop",
            price: 200000,
            condition: "Used",
            views: 20,
            stock: 15,
            status: false,
            sales: 10,
            featured: false,
        },
    ])

    const filteredItems = itemsDetail.filter(item => {
        return (
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
            {
                !isAddCardOpen && (
                    <>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-black font-semibold text-xl">My Listing</div>
                                <div className="text-gray-600 text-sm">Manage your listing</div>
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
                            <table className="w-full">
                                <thead>
                                    <tr className="hover:bg-gray-100 rounded-md">
                                        <td className="py-3 pl-3">Product Name</td>
                                        <td className="py-3 text-center">Category</td>
                                        <td className="py-3 text-center">Price</td>
                                        <td className="py-3 text-center">Quantity</td>
                                        <td className="py-3 text-center">Condition</td>
                                        <td className="py-3 text-center pr-3">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredItems.map(item => (
                                            <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                                <td className="py-3 pl-3">{item.productName}</td>
                                                <td className="py-3 text-center whitespace-nowrap truncate">{item.category}</td>
                                                <td className="py-3 text-center">{item.price}</td>
                                                <td className="py-3 text-center">{item.stock}</td>
                                                <td className="py-3 text-center">{item.condition}</td>
                                                <td>
                                                    <div className="flex justify-center gap-3">

                                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white"><Eye size={20} /></button>
                                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white" ><Edit size={20} /></button>

                                                        <button className="p-2 cursor-pointer border border-red-500 rounded-md text-white bg-red-500 hover:bg-red-400 hover:border-red-400" ><Trash2 size={20} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
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




// const EditProduct = ({ setEditOpen, selectedProduct, handleUpdate, warning, setWarning }: EditProductPropsTypes) => {
//     const [newData, setData] = useState<productTypes>(selectedProduct)
//     const handleChangeValues = (e: { target: { name: string; value: string } }) => {
//         const { name, value } = e.target
//         setData(prev => ({ ...prev, [name]: value }))
//     }
//     return (
//         <div className="absolute top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
//             <div className="bg-white rounded-md p-4 min-w-70 max-w-50/100 w-full mt-20 lg:mt-45 h-fit">
//                 <div className="w-full flex justify-between mb-4">
//                     <div className="text-lg font-semibold">Edit Product</div>
//                     <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => {
//                         setEditOpen(false)
//                         setWarning({message: "", color: "", isOpen: false})
//                     }}>Close</button>
//                 </div>
//                 {
//                     warning.isOpen && 
//                     <div className={`w-full px-3 py-1 my-2 border rounded-md flex justify-between ${warning.color}`}>
//                         <div>{warning.message}</div>
//                         <button className="cursor-pointer" onClick={()=>setWarning({message: "", color: "", isOpen: false})}><X size={20}/></button>
//                     </div>
//                 }
//                 <div className="space-y-4">
//                     <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-2">
//                         <div className="space-y-2">
//                             <div>Product Name</div>
//                             <div><input type="text" name="productName" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., Gaming Laptop" value={newData.productName} onChange={handleChangeValues} /></div>
//                         </div>
//                         <div className="space-y-2">
//                             <div>Category</div>
//                             <div>
//                                 <select name="category" id="" className="w-full border border-gray-300 rounded-md px-3 py-1.5" value={newData.category}
//                                     onChange={handleChangeValues}>
//                                     <option value="Laptop" >Laptop</option>
//                                     <option value="GPU" >GPU</option>
//                                     <option value="Motherboard" >Motherboard</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-4">
//                         <div className="space-y-2">
//                             <div>Price (Rs)</div>
//                             <div><input type="number" name="price" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., 10000" value={newData.price} onChange={handleChangeValues} /></div>
//                         </div>
//                         <div className="space-y-2">
//                             <div>Stock</div>
//                             <div><input type="number" name="stock" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., 10" value={newData.stock} onChange={handleChangeValues} /></div>
//                         </div>
//                     </div>
//                     <div>
//                         <div>Featured</div>
//                         <div>
//                             <button className={`w-14 h-fit border rounded-full border-gray-300 flex cursor-pointer transition-all duration-100 ease-in-out ${newData.featured ? "bg-green-300 justify-end" : ""}`} style={{ padding: "1px" }} onClick={() => setData(prev => ({ ...prev, featured: !prev.featured }))}>
//                                 <div className={`h-6 w-6 border border-gray-300 shadow top-0 rounded-full ${newData.featured ? "bg-white" : ""}`}></div>
//                             </button>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex justify-end mt-4">
//                     <button className="px-3 py-1 flex bg-black hover:bg-gray-800 text-white rounded-md gap-2 items-center cursor-pointer" onClick={() =>
//                         handleUpdate(newData)
//                     }><Save size={20} />Update</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default MyListings