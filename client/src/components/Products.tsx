import { useState } from "react";
import Card from "./Card"
import { Check, ChevronDown } from "lucide-react";
import { useProductContext } from "../context/ProductContext";


type PropsTypes = {
        setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>,
        searchQuery: string
    }

const Products = ({setIsFilterActive, searchQuery}:PropsTypes) => {

    const {products} = useProductContext()

    const options: optionType[] = [
        "Highest Rated",
        "Price: Low to High",
        "Price: High to Low",
        "Newest",
    ];

    

    type optionType = "Price: Low to High" | "Price: High to Low" | "Highest Rated" | "Newest"

    const [Product, setProduct] = useState(products)
    const [selected, setSelected] = useState<optionType>("Highest Rated");
    const [open, setOpen] = useState(false);
    const [loadmore, setLoadmore] = useState(16)

    const handleLoadMore = () => {
        if(loadmore < products.length){
            setLoadmore(prev => prev + 12)
        }
    }

    const filteredData = Product.filter(item=> {
        return item.productName.toLowerCase().includes(searchQuery)
    })

    

    return (
        <div className="w-full pb-8">
            <div className="flex justify-between">
                <div className="hidden sm:block">
                    <div className="font-semibold text-xl">Products</div>
                    <div className="text-sm text-gray-600 font-semibold">{products.length} products found</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="lg:hidden">
                        <button className="border py-1 px-2 rounded-md border-gray-300 bg-white cursor-pointer" onClick={()=>setIsFilterActive(true)}>Filter</button>
                    </div>
                    <div className="relative w-48 text-sm">
                    <button
                        className="border border-gray-300 p-2 rounded-md w-full flex justify-between items-center bg-white"
                        onClick={() => setOpen(!open)}
                    >
                        <span>{selected}</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {open && (
                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md">
                            {options.map((option) => (
                                <li
                                    key={option}
                                    onClick={() => {
                                        setSelected(option);
                                        setOpen(false);
                                    }}
                                    className="p-0.5"
                                >
                                    <div className="flex gap-2 p-2 hover:bg-gray-200 rounded-sm cursor-pointer select-none">
                                        <span>{selected === option? <Check size={16} /> : <Check size={16} visibility={"hidden"}/>}</span>
                                        <span>{option}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                </div>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-x-2 gap-y-4">
               {
                filteredData.slice(0,loadmore).map(item => (
                    <span key={item.id}><Card product={item}/></span>
                ))
               }
            </div>
            <div className="mb-14 mt-8 w-full flex justify-center"><button className={`px-4 py-2 bg-black border border-gray-300 rounded-md text-white cursor-pointer hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out ${loadmore>=filteredData.length? 'hidden':'block'}`} onClick={handleLoadMore}>Load More</button></div>
        </div>
    )
}

export default Products