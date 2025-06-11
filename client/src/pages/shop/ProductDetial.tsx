import { useEffect, useState, type ReactNode } from "react"
import Navbar from "../../components/Navbar"
import { Heart, RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react"

interface productTypes {
    id: number,
    url: string,
    name: string,
}

interface cardType {
    icon: ReactNode,
    title: string,
    detail: string,
}

const productImages: productTypes[] = [
    {
        id: 1,
        url: "/carousel/Pc.png",
        name: "Pc",
    },
    {
        id: 2,
        url: "/carousel/gpu.png",
        name: "GPU",
    },
    {
        id: 3,
        url: "/carousel/Monitor.png",
        name: "Monitor",
    },
    {
        id: 4,
        url: "/carousel/Laptop.jpg",
        name: "Laptop",
    },
]


    const iconSize = 32
    const iconStrokeWidth = 1.5

    const cardInfo: cardType[] = [
        
        {
            icon: <Truck size={iconSize} strokeWidth={iconStrokeWidth} color="#2563EB"/>,
            title: "Free Shipping",
            detail: "On orders over $50",
        },
        {
            icon: <RotateCcw size={iconSize} strokeWidth={iconStrokeWidth} color="#16A34A"/>,
            title: "24/7 Support",
            detail: "30-day return policy",
        },
        {
            icon: <Shield size={iconSize} strokeWidth={iconStrokeWidth} color="#9333EA"/>,
            title: "Warranty",
            detail: "1-year manufacturer",
        },
    ]


const ProductDetial = () => {
    const [selectedImg, setSelectedImg] = useState(1)
    const [favourite, setfavourite] = useState(true)

    useEffect(()=> {
        const interval = setInterval(()=> {
            setSelectedImg(prev => (prev === productImages.length ? 1 : (prev + 1) as typeof selectedImg))
        },7000)
        return ()=>clearInterval(interval)
    },[])

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full px-30 py-10">
                <div className="w-full flex">
                    <div className="w-1/2 space-y-5 mr-10">
                        <div className="w-full relative h-140">
                            {
                                productImages.map(item => (
                                    <img key={item.id} src={item.url} alt={item.name} className={`h-full w-full border rounded-md object-cover absolute transition-all duration-500 ease-in-out ${item.id === selectedImg
                                ? "opacity-100 z-10"
                                : "opacity-50 "}`} />
                                ))
                            }
                        </div>
                        <div className="w-1/2 flex gap-2">
                            {
                                productImages.map(item => (
                                    <div key={item.id} className="h-25 w-25"><img src={item.url} alt={item.name} className={`w-full h-full object-cover rounded-md cursor-pointer ${selectedImg === item.id? "ring-3 ring-blue-400": ""}`} onClick={()=>{setSelectedImg(item.id)}}/></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-1/2 space-y-3">
                        <div className="bg-black text-white text-xs font-semibold w-fit px-3 py-0.5 hover:bg-gray-800 rounded-2xl">Brand New</div>
                        <div className="text-4xl font-bold">Gaming Laptop RTX 4070</div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2"><span><Star color="orange" fill="orange" size={20}/></span> <span className="font-semibold">4.8</span> <span className="text-gray-600">(124 reviews)</span></span>
                            <span className="text-gray-600">by Binod Magar</span>
                        </div>
                        <div className="flex gap-2">
                            <span>$1299.99</span>
                            <span className="line-through text-sm text-gray-600">$1499.99</span>
                            <span className="ml-2 text-white bg-red-500 px-3 py-0.5 rounded-full">Save $200.00</span>
                        </div>
                        <div className="text-green-600 font-semibold text-md">Free shipping</div>
                        <div className="text-md mt-6">
                            <span className="">Quantity: </span>
                            <span>
                                <select name="" id="" className="border bg-white px-2 py-0.5 border-gray-300 rounded-sm mx-2">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <span className="text-gray-600 text-sm">(5 available)</span>
                            </span>
                        </div>
                        <div className="flex w-full gap-2 items-center">
                            <button className=" border w-full bg-black text-white font-semibold flex p-2 justify-center items-center rounded-md cursor-pointer gap-2 hover:bg-gray-800">
                                <span><ShoppingCart size={18}/></span>
                                <span>Add to Cart</span>
                            </button>
                            <button className=" border border-gray-300 w-full bg-white text-black font-semibold p-2 rounded-md cursor-pointer hover:bg-gray-200">Buy Now</button>
                            <button className="border p-2.5 rounded-md cursor-pointer border-gray-300 bg-white hover:bg-gray-200 transition-all ease-in-out" onClick={()=> setfavourite(!favourite)}><Heart size={20} color={favourite? "red":"black"} fill={favourite? "red": "white"}/></button>
                        </div>
                        <div className="w-full border-t border-gray-300 my-4"></div>
                        <div className="flex justify-evenly pt-5">
                            {
                                cardInfo.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center space-y-1">
                                        <div>{item.icon}</div>
                                        <div className="font-semibold text-md">{item.title}</div>
                                        <div className="text-gray-600">{item.detail}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetial