import { Check, ChevronDown, X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"





interface propsType {
    setAddCardOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddProduct = ({ setAddCardOpen }: propsType) => {
    const [conditionOpen, setConditionOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dropcategorydownRef = useRef<HTMLDivElement>(null)
    const [selectedCondition, setSelectedCondition] = useState("Brand New")
    const [selectedCategory, setSelectedCategory] = useState("Laptop")
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [descriptionValue, setDescriptionValue] = useState("")
    const conditions = [
        "Brand New",
        "Like New",
        "Used"
    ]

    const categoryes = [
        "Laptop",
        "Desktop",
        "GPU"
    ]

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            setSelectedImages(prev => [...prev, ...filesArray])
        }
    }

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
    }



    return (
        <div>
            <div className="flex justify-between mb-6">
                <div>
                    <div className="font-semibold text-xl">Add New Product</div>
                    <div className="text-sm text-gray-600">Fill in the details to add new product to the inventory</div>
                </div>
                <div>
                    <button className="px-4 py-1 hover:bg-gray-100 cursor-pointer border border-gray-300 rounded-md" onClick={() => setAddCardOpen(false)}>Close</button>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <div className="font-semibold mb-2">Product Name*</div>
                    <div><input type="text" placeholder="e.g., Gaming Laptop RTX 4070" className="w-full border border-gray-300 rounded-md px-3 py-1.5" /></div>
                </div>
                <div>
                    <div className="font-semibold mb-2">Description*</div>
                    <div>
                       
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div className="font-semibold mb-2">Price (Rs)*</div>
                        <div><input type="number" placeholder="10000" className="w-full border border-gray-300 rounded-md px-3 py-1.5" /></div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Original Price (Rs)</div>
                        <div><input type="number" placeholder="10000" className="w-full border border-gray-300 rounded-md px-3 py-1.5" /></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div className="font-semibold mb-2">Category*</div>
                        <div className="w-full relative" ref={dropcategorydownRef}>
                            <button className="w-full border border-gray-300 rounded-md px-3 py-1.5 flex justify-between select-none hover:bg-gray-100" onClick={() => setCategoryOpen(prev => !prev)}>
                                <span>{selectedCategory}</span>
                                <span className="text-gray-600 flex items-center"><ChevronDown size={18} /></span>
                            </button>
                            {
                                categoryOpen && (
                                    <div className="w-full absolute border border-gray-300 rounded-md">
                                        <ul className="bg-white p-1">
                                            {
                                                categoryes.map((item, index) => (
                                                    <li className="flex items-center w-full hover:bg-gray-100 rounded-md pl-2 py-2 cursor-pointer gap-2" onClick={() => setSelectedCategory(item)} key={index}>
                                                        <span><Check size={18} visibility={item === selectedCategory ? "visible" : "hidden"} /></span>
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
                    <div>
                        <div className="font-semibold mb-2">Condition*</div>
                        <div className="w-full relative" ref={dropdownRef}>
                            <button className="w-full border border-gray-300 rounded-md px-3 py-1.5 flex justify-between select-none hover:bg-gray-100" onClick={() => setConditionOpen(prev => !prev)}>
                                <span>{selectedCondition}</span>
                                <span className="text-gray-600 flex items-center"><ChevronDown size={18} /></span>
                            </button>
                            {
                                conditionOpen && (
                                    <div className="w-full absolute border border-gray-300 rounded-md">
                                        <ul className="bg-white p-1">
                                            {
                                                conditions.map((item, index) => (
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
                    <div className="font-semibold mb-2">Product Images</div>
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
                <button className="text-white bg-black hover:bg-gray-900 text-lg px-4 py-2 w-full rounded-md cursor-pointer">Add Product</button>
            </div>
        </div>

    )
}

export default AddProduct