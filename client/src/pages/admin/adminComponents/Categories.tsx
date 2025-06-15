import { Check, Edit, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"

const Categories = () => {
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
            if( id === item.id){
                return {...item, categoryName: newValue}
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
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            <div className="flex justify-between">
                <div>
                    <div className="text-black font-semibold text-xl">Orders</div>
                    <div className="text-gray-600 text-sm">Track and manage all customer orders</div>
                </div>
                <div>
                    <button className="p-2 border border-gray-300 rounded-md flex items-center gap-1 bg-black text-white hover:bg-gray-800 cursor-pointer"><span><Plus size={20}/></span> <span>Add Category</span></button>
                </div>
            </div>
            
                    <div className={`w-full flex justify-between items-center my-2 bg-red-300 px-4 py-2 text-gray-100 rounded-md ${warning? "block": "hidden"}`}>
                        <span >Items on inventory with the category</span>
                        <button className={`border border-gray-300 p-1 cursor-pointer rounded-md text-white`} onClick={()=> setWarning(false)}><X size={16}/></button>
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
                                    <td className="py-3 pl-3 max-w-18"><input type="text" value={item.categoryName} className={`w-full font-semibold border rounded-md px-3 py-1 ${editableId === item.id? "border-gray-300":"border-transparent"}`} onChange={(e)=>onCategoryNameChange(e.target.value, item.id)} disabled={editableId !== item.id}/></td>
                                    <td className="py-3 text-center">{item.Product}</td>
                                    <td className="pr-2">
                                        <div className="flex gap-2 justify-center">
                                            <button className="p-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => setEditablId(editableId === item.id ? null : item.id)}>{editableId === item.id ? <Check size={16}/>:<Edit size={16}/>}</button>
                                            <button className="p-2 border border-red-300 rounded-md bg-red-500 text-white cursor-pointer" onClick={()=> handleDelete(item.id, item.Product)}><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Categories