import { Plus, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { addCategorySchema, addNewCategory } from "../../api/ProductAPI";
import { toast } from "react-toastify";
import { deletecategory, getcategory} from "../../api/AccountAPI";


export interface categoriesDataType {
    id: string;
    categoryName: string;
    Product: number;
}

const Categories = () => {
    const [change, setchange] = useState(false)
    const [isOpen, setOpen] = useState(false);
    const [warning, setWarning] = useState(false)
    const [categoriesData, setCategoriesData] = useState<categoriesDataType[]>([])

    useEffect(() => {
        const api = async () => {
            try {
                const response = await getcategory('account/category')
                if (response.status === 400 || response.status === 500) {
                    toast.error(response.data.message, {
                        autoClose: 1000,
                        theme: 'light'
                    })
                    return
                }
                setCategoriesData(response.safeData)
            }
            catch (error) {
                console.log(error)
            }
        }
        api()
    }, [change])


    const onchangehandle = () => {
        return null
    }

 

    const handleDelete = async (id: string, productCount: number) => {
        try {
            if (productCount > 0) {
                setWarning(true);
                return
            }
            const response = await deletecategory('account/category', { id })
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            setchange(prev => !prev)
        }
        catch (error) {
            console.log(error)
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

            <div className={`w-full flex justify-between items-center my-2 border bg-red-300 text-red-500 border-red-600  px-4 py-2 rounded-md ${warning ? "block" : "hidden"}`}>
                <span >The category you are trying to delete is being used by products</span>
                <button className={`border border-red-500 text-red-500 p-1 cursor-pointer rounded-md`} onClick={() => setWarning(false)}><X size={16} /></button>
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
                                categoriesData.map((item) => (
                                    <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                        <td className="py-3 pl-3 max-w-18"><input type="text" value={item.categoryName} className={`w-full font-semibold rounded-md px-3 py-1 border-0`} onChange={onchangehandle} disabled/></td>
                                        <td className="py-3 text-center">{item.Product}</td>
                                        <td className="pr-2">
                                            <div className="flex gap-2 justify-center">
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
                isOpen && <AddCategory setOpen={setOpen} setchange={setchange} />
            }
        </div>
    )
}

const AddCategory = ({ setOpen, setchange }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, setchange: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [category, setCategory] = useState("")

    const handleSubmit = async () => {

        const parsed = addCategorySchema.safeParse({ category })
        if (!parsed.success) {
            return toast.error(parsed.error.flatten().fieldErrors.category![0], {
                autoClose: 1000,
                theme: "light"
            })
        }

        const response = await addNewCategory('addcategory', { category })
        if (response.status === 400 || response.status === 500) {
            toast.error(response?.data?.message, {
                autoClose: 1000,
                theme: "light",
            })
            return
        }
        setOpen(false)
        setchange(prev => !prev)
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
                    <div><input type="text" className="w-full border rounded-md border-gray-300 active:bg-gray-100 px-3 py-1" placeholder="e.g., Laptop" onChange={(e) => (setCategory(e.target.value))} value={category} /></div>
                </div>
                <div>
                    <button className="w-full px-4 py-1 bg-black text-white hover:bg-gray-800 rounded-md mt-4" onClick={handleSubmit}>Add Category</button>
                </div>
            </div>
        </div>
    )
}


export default Categories