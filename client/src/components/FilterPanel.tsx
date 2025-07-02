import { useEffect, useState, type SetStateAction } from "react";
import '../index.css'
import { Check, ChevronDown } from "lucide-react";
import { getcategory } from "../api/AccountAPI";
import type { IFilter } from "../pages/shop/ProductPage";


type propsTypes = {
    isFilterActive: boolean,
    setIsFilterActive: React.Dispatch<SetStateAction<boolean>>,
    filteringdata: IFilter,
    setfilteringdata: React.Dispatch<React.SetStateAction<IFilter>>,
}


const FilterPanel = ({ isFilterActive, setIsFilterActive, filteringdata, setfilteringdata }: propsTypes) => {

    type categoryType = {
        id: string,
        categoryName: string,
        Product: number,
    }

    type conditionType = "All" | "Brand New" | "Like New" | "Used"

    const [categoryes, setcategoryes] = useState<categoryType[]>([])



    const conditions: conditionType[] = [
        "All",
        "Brand New",
        "Like New",
        "Used"
    ]


    const maxPrice = 1500000;
    const [price, setPrice] = useState(filteringdata.price);
    const [selectedCategory, setSelectedCategory] = useState(filteringdata.category)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [selectedCondition, setSelectedCondition] = useState<conditionType | string>(filteringdata.condition)
    const [conditionOpen, setConditionOpen] = useState(false)

    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getcategory("account/category")
                const newdata = [{
                    id: 1,
                    categoryName: "All",
                    Product: 0,
                }, ...response.safeData]
                setcategoryes(newdata)
            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value <= maxPrice && value >= 0) {
            setPrice(value);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value, 10));
        setfilteringdata(item => ({ ...item, price: parseInt(e.target.value, 10) }))
    };

    return (
        <div className={` h-full w-68 ${isFilterActive ? "mx-auto w-80 " : "relative hidden lg:block"}`}>
            <div className={`bg-white shadow px-2 py-3 rounded-md space-y-2 sticky top-20 ${isFilterActive ? "px-4" : ""}`}>
                <div className="font-semibold">Filters</div>
                <div>Category</div>
                <div>
                    <div className="relative w-full text-sm">
                        <button
                            className="border border-gray-300 p-2 rounded-md w-full flex justify-between items-center bg-white"
                            onClick={() => setCategoryOpen(!categoryOpen)}
                        >
                            <span>{selectedCategory}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {categoryOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md">
                                {categoryes.map((option) => (
                                    <li
                                        key={option.id}
                                        onClick={() => {
                                            setSelectedCategory(option.categoryName);
                                            setCategoryOpen(false);
                                            setfilteringdata(prev => ({ ...prev, category: option.categoryName }))
                                        }}
                                        className="p-0.5"
                                    >
                                        <div className="flex gap-2 p-2 hover:bg-gray-200 rounded-sm cursor-pointer select-none">
                                            <span>{selectedCategory === option.categoryName ? <Check size={16} /> : <Check size={16} visibility={"hidden"} />}</span>
                                            <span>{option.categoryName}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div>Condition</div>
                <div>
                    <div className="relative w-full text-sm">
                        <button
                            className="border border-gray-300 p-2 rounded-md w-full flex justify-between items-center bg-white"
                            onClick={() => setConditionOpen(!conditionOpen)}
                        >
                            <span>{selectedCondition}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {conditionOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md">
                                {conditions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setSelectedCondition(option);
                                            setConditionOpen(false);
                                            setfilteringdata(prev => ({ ...prev, condition: option }))
                                        }}
                                        className="p-0.5"
                                    >
                                        <div className="flex gap-2 p-2 hover:bg-gray-200 rounded-sm cursor-pointer select-none">
                                            <span>{selectedCondition === option ? <Check size={16} /> : <Check size={16} visibility={"hidden"} />}</span>
                                            <span>{option}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div>Price Range</div>
                <div className="space-y-1">
                    <input
                        type="number"
                        value={price}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-sm p-2 w-full rounded-sm"
                        placeholder={`Max price up to ${maxPrice}`}
                        min={0}
                        max={maxPrice}
                    />
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={price}
                        onChange={handleSliderChange}
                        className="w-full custom-slider"
                        style={{
                            background: `linear-gradient(to right, black 0%, black ${(
                                (price / maxPrice) *
                                100
                            ).toFixed(1)}%, white ${((price / maxPrice) * 100).toFixed(1)}%, white 100%)`,
                        }}
                    />
                </div>

                <div>
                    <button className="w-full border p-2 rounded-md border-gray-300 font-semibold cursor-pointer hover:bg-gray-100 transition-all hover:shadow mt-4" onClick={() => {
                        setfilteringdata({
                            category: "All",
                            condition: "All",
                            sorting: "Highest Rated",
                            price: 1500000,
                        })
                        setPrice(maxPrice)
                        setSelectedCategory("All")
                        setSelectedCondition("All")


                    }}>
                        Clear Filters
                    </button>
                    {
                        isFilterActive && (
                            <button className="w-full border p-2 rounded-md text-white bg-black font-semibold cursor-pointer hover:bg-gray-900 transition-all hover:shadow mt-4" onClick={() => setIsFilterActive(false)}>
                                Close
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
