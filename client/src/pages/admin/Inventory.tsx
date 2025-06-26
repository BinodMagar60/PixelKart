import { Edit, Eye, Plus, Save, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import AddProduct from "../commonComponents/AddProduct"
import { getcategory, getinventory, updateinventory } from "../../api/AccountAPI"
import { toast } from "react-toastify"
import z from 'zod'
import type { categoriesDataType } from "./Categories"


export interface productTypes {
    id: string,
    productName: string,
    category: string,
    price: number,
    originalPrice: number,
    stock: number,
    sales: number,
    featured: boolean,
}

const productValidation = z.object({
    id: z.string({required_error: 'Product id error'}),
    productName: z.string({required_error: 'Product name is required'}),
    category: z.string({required_error: 'Category is required'}),
    price: z.number({required_error: 'Price is required'}),
    originalPrice: z.number({required_error: 'Original price is required'}),
    stock: z.number(),
    sales: z.number(),
    featured: z.boolean(),
}).refine((data) => {
    return data.originalPrice >= data.price
},
    {
        path: ["originalPrice"],
        message: 'Price cannot be greater than original price'
    })

const Inventory = () => {
    const [change, setchange] = useState(false)
    const [isAddCardOpen, setAddCardOpen] = useState(false)
    const [isEditOpen, setEditOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [noOfItems, setNoOfItems] = useState(10)
    const [itemsDetail, setItemsDetail] = useState<productTypes[]>([])
    const [category, setcategory] = useState<categoriesDataType[]>([])
    const [selectedProduct, setSelectedProduct] = useState<productTypes>({
        id: '',
        productName: "",
        category: '',
        price: 0,
        originalPrice: 0,
        stock: 0,
        sales: 0,
        featured: false,
    })

    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getinventory('account/inventory')
                const response2 = await getcategory('account/category')

                if (response.status === 400 || response.status === 500) {
                    toast.error(response.data.message, {
                        autoClose: 1000,
                        theme: 'light'
                    })
                    return
                }
                setItemsDetail(response.safeData)
                setcategory(response2.safeData)

            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [change])

   
    const filteredItems = itemsDetail.filter((item) => {
        const productName = item.productName.toLowerCase();
        return (
            productName.includes(searchQuery.toLowerCase()) || (item.category.toLowerCase()).includes(searchQuery.toLowerCase())
        )
    })

    const handleUpdate = async (Data: productTypes) => {
        try {
            console.log(Data)
            const parsed = productValidation.safeParse(Data);
            if (!parsed.success) {
                const errors = parsed.error.flatten().fieldErrors;
                console.log(errors)
                const firstError = Object.values(errors).flat()[0];
                toast.error(firstError || "Validation failed", {
                    autoClose: 1000,
                    theme: "light",
                });
                return;
            }
            
            const response = await updateinventory('account/inventory', Data);
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: "light",
                });
                return;
            }

            toast.success(response.message, {
                autoClose: 1000,
                theme: "light",
            });
            setchange(prev => !prev);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
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
                                        <td className="text-center py-3">Price (Rs)</td>
                                        <td className="text-center py-3">Stocks</td>

                                        <td className="text-center py-3">Sales</td>

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
                                                <td className="text-sm"><div className="flex justify-center">{item.stock}</div></td>

                                                <td className="text-center">{item.sales}</td>

                                                <td className=" py-3 pr-3">
                                                    <div className="flex justify-center gap-3">

                                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white"><Eye size={20} /></button>
                                                        <button className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white" onClick={() => {
                                                            setEditOpen(true)
                                                            setSelectedProduct(item)
                                                        }}><Edit size={20} /></button>
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

            {
                isEditOpen && <EditProduct setEditOpen={setEditOpen} selectedProduct={selectedProduct} handleUpdate={handleUpdate} category={category} />
            }

        </div>
    )
}

interface EditProductPropsTypes {
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedProduct: productTypes,
    handleUpdate: (updatedData: productTypes) => void,
    category: categoriesDataType[]
}

const EditProduct = ({ setEditOpen, selectedProduct, handleUpdate, category }: EditProductPropsTypes) => {
    const [newData, setData] = useState<productTypes>(selectedProduct)
    const handleChangeValues = (e: { target: { name: string; value: string; type: string } }) => {
        const { name, value, type } = e.target
        setData(prev => ({ ...prev, [name]: type === 'number'? Number(value): value }))
    }
   

    return (
        <div className="fixed top-0 left-0 z-60 w-full h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
            <div className="bg-white rounded-md p-4 min-w-70 max-w-50/100 w-full mt-20 lg:mt-45 h-fit">
                <div className="w-full flex justify-between mb-4">
                    <div className="text-lg font-semibold">Edit Product</div>
                    <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => {
                        setEditOpen(false)
                    }}>Close</button>
                </div>
                <div className="space-y-4">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-2">
                        <div className="space-y-2">
                            <div>Product Name</div>
                            <div><input type="text" name="productName" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., Gaming Laptop" value={newData.productName} onChange={handleChangeValues} /></div>
                        </div>
                        <div className="space-y-2">
                            <div>Category</div>
                            <div>
                                <select name="category" id="" className="w-full border border-gray-300 rounded-md px-3 py-1.5" value={newData.category}
                                    onChange={handleChangeValues}>
                                    {
                                        category.map(item => (
                                            <option key={item.id} value={item.categoryName}>{item.categoryName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-4">
                        <div className="space-y-2">
                            <div>Price (Rs)</div>
                            <div><input type="number" name="price" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., 10000" value={newData.price} onChange={handleChangeValues} /></div>
                        </div>
                        <div className="space-y-2">
                            <div>Original Price</div>
                            <div><input type="number" name="originalPrice" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., 10" value={newData.originalPrice} onChange={handleChangeValues} /></div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-4">
                        <div className="space-y-2">
                            <div>Stock</div>
                            <div><input type="number" name="stock" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="e.g., 10" value={newData.stock} onChange={handleChangeValues} /></div>
                        </div>
                        <div className="space-y-2">
                            <div>Featured</div>
                            <div>
                                <button className={`w-14 h-fit border rounded-full border-gray-300 flex cursor-pointer transition-all duration-100 ease-in-out ${newData.featured ? "bg-green-300 justify-end" : ""}`} style={{ padding: "1px" }} onClick={() => setData(prev => ({ ...prev, featured: !prev.featured }))}>
                                    <div className={`h-6 w-6 border border-gray-300 shadow top-0 rounded-full ${newData.featured ? "bg-white" : ""}`}></div>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-3 py-1 flex bg-black hover:bg-gray-800 text-white rounded-md gap-2 items-center cursor-pointer" onClick={() =>
                        handleUpdate(newData)
                    }><Save size={20} />Update</button>
                </div>
            </div>
        </div>
    )
}


export default Inventory