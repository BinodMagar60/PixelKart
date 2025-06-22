import { Check, ChevronDown, X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import Tiptap from "../../components/Tiptap"
import { addnewproduct, getCategoriesFields } from "../../api/ProductAPI"
import { toast } from "react-toastify"
import { useUserContext } from "../../context/UserContext"
import z from 'zod'

const productDataValidation = z.object({
    poster: z.string(),
    role: z.string(),
    productName: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    originalPrice: z.number().optional(),
    category: z.string().min(1, "Category is required"),
    condition: z.string().min(1, "Condition is required"),
    qty: z.number().min(1, "Quantity must be at least 1"),
    photo: z.array(z.instanceof(File))
        .min(1, "At least one photo is required")
        .max(5, "Maximum number of photo can only be 5"),
}).refine((data) => {
    if (data.originalPrice !== undefined) {
        return data.originalPrice < data.price;
    }
    return true;
}, {
    message: "Price cannot be greater than original price",
    path: ["price"] 
});


export type productDataType = z.infer<typeof productDataValidation>



interface propsType {
    setAddCardOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

interface conditoinsType {
    _id: string,
    category: string,
    createdAt: Date,
    updatedAt: Date
}

const AddProduct = ({ setAddCardOpen }: propsType) => {
    const { userInfo } = useUserContext()
    const [conditionOpen, setConditionOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dropcategorydownRef = useRef<HTMLDivElement>(null)
    const [selectedCondition, setSelectedCondition] = useState("Brand New")
    const [selectedCategory, setSelectedCategory] = useState("Laptop")
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [descriptionValue, setDescriptionValue] = useState("")
    const [category, setCategory] = useState<conditoinsType[]>([])

    const [formData, setFormData] = useState({
        poster: userInfo?._id,
        role: userInfo?.role,
        productName: "",
        description: descriptionValue,
        price: 0,
        originalPrice: 0,
        category: selectedCategory,
        condition: selectedCondition,
        qty: 0,
    })


    const condition = [
        "Brand New",
        "Like New",
        "Used"
    ]



    useEffect(() => {
        const getCategory = async () => {
            const response = await getCategoriesFields();
            // console.log(response.data)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: "light"
                })
                return
            }
            setCategory(response?.data)
        }
        getCategory()
    }, [])


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setConditionOpen(false)
            }
            if (dropcategorydownRef.current && !dropcategorydownRef.current.contains(event.target as Node)) {
                setCategoryOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            setSelectedImages(prev => [...prev, ...filesArray])
        }
    }

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
    }


    const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newData:productDataType = {
        poster: formData.poster ?? "",
        role: formData.role ?? "",
        productName: formData.productName,
        description: descriptionValue,
        price: formData.price,
        originalPrice: formData.originalPrice,
        category: selectedCategory,
        condition: selectedCondition,
        qty: formData.qty,
        photo: selectedImages,
    }

    const parsed = productDataValidation.safeParse(newData)
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const firstError = Object.values(errors)[0]?.[0];
        toast.error(firstError || "Validation error", {
            autoClose: 1000,
            theme: "light",
        });
        return;
    }

    try {
        const response = await addnewproduct('addnewproduct', newData)

        if (response?.status === 400 || response?.status === 500) {
            toast.error(response.data.message, {
                autoClose: 1000,
                theme: "light"
            })
            return
        }
        toast.success("Product added successfully")
        console.log(response)
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong", {
            autoClose: 1000,
            theme: "light"
        })
    }
}



    return (
        <div>
            <div className="flex justify-between mb-6">
                <div>
                    <div className="font-semibold text-xl">Add New Product</div>
                    <div className="text-sm text-gray-600">Fill in the details to add new product to the inventory</div>
                </div>
                <div>
                    <button className="px-4 py-1 hover:bg-gray-100 cursor-pointer border border-gray-300 rounded-md" onClick={(e) => {
                        e.preventDefault();
                        setAddCardOpen(false)}}>Close</button>
                </div>
            </div>
            <>
                <div className="space-y-6">
                    <div>
                        <div className="font-semibold mb-2">Product Name*</div>
                        <div><input type="text" placeholder="e.g., Gaming Laptop RTX 4070" className="w-full border border-gray-300 rounded-md px-3 py-1.5" name="productName" value={formData.productName} onChange={handleChange} /></div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Description*</div>
                        <div>
                            <Tiptap descriptionValue={descriptionValue} setDescriptionValue={setDescriptionValue} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="font-semibold mb-2">Price (Rs)*</div>
                            <div><input type="number" placeholder="10000" className="w-full border border-gray-300 rounded-md px-3 py-1.5" name="price" value={formData.price} onChange={handleChange} /></div>
                        </div>
                        <div>
                            <div className="font-semibold mb-2">Original Price (Rs)</div>
                            <div><input type="number" placeholder="10000" className="w-full border border-gray-300 rounded-md px-3 py-1.5" name="originalPrice" value={formData.originalPrice} onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="font-semibold mb-2">Category*</div>
                            <div className="w-full relative" ref={dropcategorydownRef}>
                                <button type="button" className="w-full border border-gray-300 rounded-md px-3 py-1.5 flex justify-between select-none hover:bg-gray-100" onClick={(e) => {
                                    e.preventDefault()
                                    setCategoryOpen(prev => !prev)
                                }}>
                                    <span>{selectedCategory}</span>
                                    <span className="text-gray-600 flex items-center"><ChevronDown size={18} /></span>
                                </button>
                                {
                                    categoryOpen && (
                                        <div className="w-full absolute border border-gray-300 rounded-md">
                                            <ul className="bg-white p-1">
                                                {
                                                    category.map((item) => (
                                                        <li className="flex items-center w-full hover:bg-gray-100 rounded-md pl-2 py-2 cursor-pointer gap-2" onClick={() => setSelectedCategory(item.category)} key={item._id}>
                                                            <span><Check size={18} visibility={item.category === selectedCategory ? "visible" : "hidden"} /></span>
                                                            <span>{item.category}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mb-2">Condition*</div>
                            <div className="w-full relative" ref={dropdownRef}>
                                <button type="button" className="w-full border border-gray-300 rounded-md px-3 py-1.5 flex justify-between select-none hover:bg-gray-100" onClick={(e) => {
                                    e.preventDefault()
                                    setConditionOpen(prev => !prev)
                                }}>
                                    <span>{selectedCondition}</span>
                                    <span className="text-gray-600 flex items-center"><ChevronDown size={18} /></span>
                                </button>
                                {
                                    conditionOpen && (
                                        <div className="w-full absolute border border-gray-300 rounded-md">
                                            <ul className="bg-white p-1">
                                                {
                                                    condition.map((item, index) => (
                                                        <li className="flex items-center w-full hover:bg-gray-100 rounded-md pl-2 py-2 cursor-pointer gap-2" onClick={() => setSelectedCondition(item)} key={index}>
                                                            <span><Check size={18} visibility={item === selectedCondition ? "visible" : "hidden"} /></span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Product Quantity*</div>
                        <div><input type="number" placeholder="e.g., 10" className="w-full border border-gray-300 rounded-md px-3 py-1.5" name="qty" value={formData.qty} onChange={handleChange} /></div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Product Images*</div>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Img files only</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" accept="Image/*" onChange={handleFileChange} />
                                </label>
                            </div>
                            {selectedImages.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="relative group w-24 h-24">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`preview-${index}`}
                                                className="object-cover w-full h-full rounded-md border border-gray-300 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-0 right-0 bg-red-500 cursor-pointer bg-opacity-60 text-white text-xs px-1 rounded hover:bg-opacity-80 hidden group-hover:block "
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <button className="text-white bg-black hover:bg-gray-900 text-lg px-4 py-2 w-full rounded-md cursor-pointer" onClick={onSubmit}>Add Product</button>
                </div>
            </>
        </div>

    )
}

export default AddProduct