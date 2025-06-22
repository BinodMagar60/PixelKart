import { Check, Edit, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"
import z from "zod"
import { addCategorySchema, addNewCategory } from "../../api/ProductAPI";
import { toast } from "react-toastify";

const Categories = () => {
    const [isOpen, setOpen] = useState(false);
    const [warning, setWarning] = useState(false)
    const [editableId, setEditablId] = useState<number | null>(null)
    const [categoriesData, setCategoriesData] = useState([
        {
            id: 1,
            categoryName: "Laptop",
            Product: 123,
        },
        {
            id: 2,
            categoryName: "GPU",
            Product: 123,
        },
        {
            id: 3,
            categoryName: "Motherboard",
            Product: 123,
        },
        {
            id: 4,
            categoryName: "Monitor",
            Product: 123,
        },
        {
            id: 5,
            categoryName: "Pc",
            Product: 123,
        },
        {
            id: 6,
            categoryName: "RAM",
            Product: 0,
        },
    ])


    const onCategoryNameChange = (newValue: string, id: number) => {
        const newData = categoriesData.map(item => {
            if (id === item.id) {
                return { ...item, categoryName: newValue }
            }
            return item
        })
        setCategoriesData(newData)
    }

    const handleDelete = (id: number, productCount: number) => {
        if (productCount > 0) {
            setWarning(true);
        } else {
            setCategoriesData(prev => prev.filter(item => item.id !== id));
        }
    };


    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
            <div className="flex justify-between">
                <div>
                    <div className="text-black font-semibold text-xl">Product Categories</div>
                    <div className="text-gray-600 text-sm">Manage product categories and subcategories</div>
                </div>
                <div>
                    <button className="p-2 border border-gray-300 rounded-md flex items-center gap-1 bg-black text-white hover:bg-gray-800 cursor-pointer" onClick={() => setOpen(true)}><span><Plus size={20} /></span> <span>Add Category</span></button>
                </div>
            </div>

            <div className={`w-full flex justify-between items-center my-2 bg-red-600  px-4 py-2 text-gray-100 rounded-md ${warning ? "block" : "hidden"}`}>
                <span >There are items that are on the category</span>
                <button className={`border border-gray-300 p-1 cursor-pointer rounded-md text-white`} onClick={() => setWarning(false)}><X size={16} /></button>
            </div>

            <div>
                <div className="mt-10">
                    <table className="w-full" >
                        <thead>
                            <tr className="hover:bg-gray-100 rounded-md">
                                <td className="py-3 pl-3">Category Name</td>
                                <td className="py-3 text-center">Products Number</td>
                                <td className="text-center py-3">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoriesData.map(item => (
                                    <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                        <td className="py-3 pl-3 max-w-18"><input type="text" value={item.categoryName} className={`w-full font-semibold border rounded-md px-3 py-1 ${editableId === item.id ? "border-gray-300" : "border-transparent"}`} onChange={(e) => onCategoryNameChange(e.target.value, item.id)} disabled={editableId !== item.id} /></td>
                                        <td className="py-3 text-center">{item.Product}</td>
                                        <td className="pr-2">
                                            <div className="flex gap-2 justify-center">
                                                <button className="p-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => setEditablId(editableId === item.id ? null : item.id)}>{editableId === item.id ? <Check size={16} /> : <Edit size={16} />}</button>
                                                <button className="p-2 border border-red-300 rounded-md bg-red-500 text-white cursor-pointer" onClick={() => handleDelete(item.id, item.Product)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                isOpen && <AddCategory setOpen={setOpen} />
            }
        </div>
    )
}

const AddCategory = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [category, setCategory] = useState("")
    
    const handleSubmit = async() => {
        
        const parsed = addCategorySchema.safeParse({category})
        if(!parsed.success){
            // console.log(parsed.error.flatten().fieldErrors.category)
            return toast.error(parsed.error.flatten().fieldErrors.category![0], {
                autoClose: 1000,
                theme: "light"
            })
        }

        const response = await addNewCategory('addcategory',{category})
        // console.log(response)
        if(response.status === 400 || response.status === 500){
            toast.error(response?.data?.message,{
                autoClose: 1000,
                theme: "light",
            })
            return
        }
        setOpen(false)
    }
    return (

        <div className="absolute top-0 left-0 z-60 w-full h-full min-h-screen bg-[#c4c4c450] flex justify-center overflow-auto py-10">
            <div className="bg-white rounded-md p-4 min-w-70 max-w-30/100 w-full mt-20 lg:mt-45 h-fit">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Add New Category</div>
                    <div>
                        <button className="border border-gray-300 px-3 py-1 rounded-md" onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
                <div className="space-y-3 mt-3">
                    <div>Product Categories</div>
                    <div><input type="text" className="w-full border rounded-md border-gray-300 active:bg-gray-100 px-3 py-1" placeholder="e.g., Laptop" onChange={(e)=>(setCategory(e.target.value))} value={category}/></div>
                </div>
                <div>
                    <button className="w-full px-4 py-1 bg-black text-white hover:bg-gray-800 rounded-md mt-4" onClick={handleSubmit}>Add Category</button>
                </div>
            </div>
        </div>
    )
}


export default Categories