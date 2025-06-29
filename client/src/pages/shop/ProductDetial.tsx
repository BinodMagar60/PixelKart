import { useEffect, useMemo, useState, type ReactNode } from "react"
import Navbar from "../../components/Navbar"
import { Cpu, Heart, Laptop, Monitor, Package, RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react"
import { useParams } from "react-router-dom"
import { useProductContext } from "../../context/ProductContext"
import { useUserContext } from "../../context/UserContext"
import DOMPurify from 'dompurify';
import { addToCart, favouriteUpdate } from "../../api/ProductAPI"
import { toast } from "react-toastify"


interface cardType {
    icon: ReactNode,
    title: string,
    detail: string,
}

type productdetailTypes = "Description" | "Reviews" | "Shipping & Returns"

const iconSize = 32
const iconStrokeWidth = 1.5

const cardInfo: cardType[] = [

    {
        icon: <Truck size={iconSize} strokeWidth={iconStrokeWidth} color="#2563EB" />,
        title: "Free Shipping",
        detail: "On orders over Rs 1499",
    },
    {
        icon: <RotateCcw size={iconSize} strokeWidth={iconStrokeWidth} color="#16A34A" />,
        title: "24/7 Support",
        detail: "30-day return policy",
    },
    {
        icon: <Shield size={iconSize} strokeWidth={iconStrokeWidth} color="#9333EA" />,
        title: "Warranty",
        detail: "1-year manufacturer",
    },
]


interface shippingAndReturnsType {
    title: string,
    details: string[]
}


const shippingAndReturns: shippingAndReturnsType[] = [
    {
        title: "Shipping Information",
        details: [
            "Free standard shipping on orders over $50",
            "Express shipping available for $15.99",
            "Orders processed within 1-2 business days",
            "Tracking information provided via email",
        ]
    },
    {
        title: "Return Policy",
        details: [
            "30-day return window from delivery date",
            "Items must be in original condition and packaging",
            "Free return shipping for defective items",
            "Refunds processed within 5-7 business days",
        ]
    }
]


interface userReviewersTypes {
    id: number,
    rating: number,
    name: string,
    description: string,
}

const userReviewers: userReviewersTypes[] = [
    {
        id: 1,
        rating: 1,
        name: "Binod Magar",
        description: "Excellent gaming laptop! The RTX 4070 handles all my games at high settings. Fast delivery and great packaging."
    },
    {
        id: 2,
        rating: 4,
        name: "Bijan Adhakari",
        description: "Great performance for the price. Only minor complaint is the fan can get a bit loud under heavy load."
    }
]





const ProductDetial = () => {
    const { userInfo } = useUserContext()
    const [productDetailLoading, setProductDetailLoading] = useState(true)
    const { id } = useParams()
    const productId = id
    const { products, updateproductwishlist } = useProductContext()



    const product = useMemo(() => {
        return products.find(item => item.id === productId)
    }, [products, productId])


    const productImages = product?.photo;

    const [productDetails, setProductDetails] = useState<productdetailTypes>("Description")
    const [productRating, setProductRating] = useState<number>(0)
    const [productStarRating, setProductStarRating] = useState<number>(0)
    const [selectedImg, setSelectedImg] = useState(1)




    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedImg(prev =>
                prev === productImages?.length ? 1 : prev + 1
            );
        }, 7000);

        return () => clearInterval(interval);
    }, [productImages]);


    useEffect(() => {
        var totalRate = 0
        userReviewers.map(index => {
            totalRate = totalRate + index.rating
        })
        const newRate = totalRate / (userReviewers.length)
        const newStarRating = customRound(newRate)
        setProductRating(newRate)
        setProductStarRating(newStarRating)
    }, [])

    function customRound(num: number): number {
        if (num <= 0) return 0;
        if (num >= 5) return 5;

        return Math.floor(num);
    }



    const onDescriptionHandleChange = (value: productdetailTypes) => {
        setProductDetails(value)
    }

    useEffect(() => {
        if (product) {
            setTimeout(() => {
                setProductDetailLoading(false)
            }, 1500);
        }
    }, [product])



    const favourite = async () => {
        try {
            const response = await favouriteUpdate('updatefavourite', { id: productId })
            
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }

            if (productId && userInfo) {
                updateproductwishlist(productId, userInfo._id)
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleAddtoCart = async () => {
        try {
            const newData = {
                productId: productId ?? "",
            }

            const response = await addToCart('cart', newData)
            if(response.status === 400 || response.status === 500){
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            if(response.status === 401){
                toast.info(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
            }
            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light'
            })
        } catch (error) {
            console.log(error)
        }
    }


    if (!product) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        Product Not Found
                    </h1>
                    <p className="text-gray-600">
                        The product you're looking for doesn't exist or has been removed.
                    </p>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full px-10 sm:px-15 xl:px-30 py-10">
                {
                    productDetailLoading ? (
                        <div className="flex flex-col items-center justify-center h-120  sm:h-180 bg-gray-50">

                            <div className="flex gap-4 mb-6">
                                <Monitor className="w-12 h-12 text-blue-600 animate-pulse" />
                                <Laptop className="w-12 h-12 text-blue-600 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <Cpu className="w-12 h-12 text-blue-600 animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>


                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
                            <p className="text-gray-500">Please wait while we fetch your product</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="w-full space-y-5 mr-10">
                                    <div className="w-full relative h-140">
                                        {
                                            productImages?.map(item => (
                                                <img key={item.id} src={item.url} alt={product?.productName} className={`h-full w-full rounded-md object-contain absolute transition-all duration-500 ease-in-out bg-white shadow ${item.id === selectedImg
                                                    ? "opacity-100 z-10"
                                                    : "opacity-0 "}`} />
                                            ))
                                        }
                                    </div>
                                    <div className="w-1/2 flex gap-2">
                                        {
                                            productImages?.map(item => (
                                                <div key={item.id} className="h-25 min-w-25"><img src={item.url} alt={product?.productName} className={`w-full h-full object-cover rounded-md cursor-pointer ${selectedImg === item.id ? "ring-3 ring-blue-500" : ""}`} onClick={() => { setSelectedImg(item.id) }} /></div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="w-full space-y-3">
                                    <div className={`bg-black text-white text-xs font-semibold w-fit px-3 py-0.5 hover:bg-gray-800 rounded-2xl ${product.qty === 0 ? "bg-red-500" : ""}`}>{product.qty > 0 ? product?.condition : "Out of stock"}</div>
                                    <div className="text-4xl font-bold">{product?.productName}</div>
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-2"><span><Star color="orange" fill="orange" size={20} /></span> <span className="font-semibold">4.8</span> <span className="text-gray-600">(124 reviews)</span></span>
                                        <span className="text-gray-600">by {product?.poster}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-xl">Rs.{product?.price}</span>
                                        {
                                            product?.price !== product?.originalPrice && (
                                                <>
                                                    <span className="line-through text-sm text-gray-600">Rs.{product?.originalPrice}</span>
                                                    <span className="ml-2 text-white bg-red-500 px-3 py-0.5 rounded-full">Save Rs.{product?.originalPrice - product?.price}</span>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="text-green-600 font-semibold text-md">{product.price < 1500 ? "" : "Free Shipping"}</div>
                                    <div className="text-md mt-6">
                                        <span>Quantity: {product?.qty} available</span>
                                        
                                    </div>


                                    {/* this is the add to cart section */}
                                    {
                                        userInfo?.role === "User" && product.qty > 0 && (
                                            <div className="flex w-full gap-2 items-center">
                                                <button className=" border w-full bg-black text-white font-semibold flex p-2 justify-center items-center rounded-md cursor-pointer gap-2 hover:bg-gray-800" onClick={handleAddtoCart}>
                                                    <span><ShoppingCart size={18} /></span>
                                                    <span>Add to Cart</span>
                                                </button>
                                                <button className=" border border-gray-300 w-full bg-white text-black font-semibold p-2 rounded-md cursor-pointer hover:bg-gray-200">Buy Now</button>
                                                {
                                                    userInfo?.role === 'User' && (
                                                        <button className="border p-2.5 rounded-md cursor-pointer border-gray-300 bg-white hover:bg-gray-200 transition-all ease-in-out" onClick={() => favourite()}><Heart size={20} color={product.userWishlist.includes(userInfo?._id) ? "red" : "black"} fill={product.userWishlist.includes(userInfo?._id) ? "red" : "white"} /></button>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
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

                            <div className="w-full bg-white mt-10 p-4 rounded-md text-sm shadow-sm">
                                <div className="p-1 rounded-sm bg-gray-100 flex gap-0.5 w-fit">
                                    <button className={`px-2 py-1 rounded-sm transition-all duration-100 cursor-pointer ${productDetails === "Description" ? "bg-white text-black" : "text-gray-500"}`} onClick={() => { onDescriptionHandleChange("Description") }}>Description</button>
                                    <button className={`px-2 py-1 rounded-sm transition-all duration-100 cursor-pointer ${productDetails === "Reviews" ? "bg-white text-black" : "text-gray-500"}`} onClick={() => { onDescriptionHandleChange("Reviews") }}>Reviews (128)</button>
                                    <button className={`px-2 py-1 rounded-sm transition-all duration-100 cursor-pointer ${productDetails === "Shipping & Returns" ? "bg-white text-black" : "text-gray-500"}`} onClick={() => { onDescriptionHandleChange("Shipping & Returns") }}>Shipping & Returns</button>
                                </div>
                                {
                                    productDetails === "Description" && (
                                        <div className="mt-4 text-gray-600 py-4">
                                            <div
                                                className="prose prose-sm max-w-none
                                                                    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2
                                                                    [&_li]:my-1
                                                                    [&_strong]:font-bold
                                                                    [&_em]:italic
                                                                    [&_u]:underline
                                                                    [&_p]:my-2"
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product!.description) }}
                                            />
                                        </div>
                                    )
                                }
                                {
                                    productDetails === "Reviews" && (
                                        <div className="mt-4 py-4">
                                            <div className="w-fit text-center">
                                                <div className="text-2xl font-bold">{productRating}</div>
                                                <div className="flex">
                                                    {
                                                        Array.from({ length: 5 }, (_, i) => (
                                                            <Star key={i} strokeWidth={1} size={20} color={i < productStarRating ? "#ffd800" : "#adb5bd"} fill={i < productStarRating ? "#ffd800" : "white"} />
                                                        ))
                                                    }
                                                </div>
                                                <div className="text-gray-600">128 reviews</div>
                                            </div>
                                            <div>
                                                <div>
                                                    {
                                                        userReviewers.map((item) => (
                                                            <div key={item.id} className="py-4 border-b border-gray-300 leading-8 text-gray-600">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex">
                                                                        {
                                                                            Array.from({ length: 5 }, (_, i) => (
                                                                                <Star key={i} strokeWidth={1} size={16} color={i < item.rating ? "#ffd800" : "#adb5bd"} fill={i < item.rating ? "#ffd800" : "white"} />
                                                                            ))
                                                                        }
                                                                    </div>
                                                                    <div className="font-semibold text-black">{item.name}</div>
                                                                    <div className="border  px-2 border-gray-300 rounded-full text-xs py-0.5">Verified Purchase</div>
                                                                </div>
                                                                <div>
                                                                    {item.description}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    productDetails === "Shipping & Returns" && (
                                        <div className="mt-4 py-4">
                                            {
                                                shippingAndReturns.map((item, index) => (
                                                    <div key={index}>
                                                        <div className="py-2 text-lg text-black font-semibold">{item.title}</div>
                                                        <ul className="list-disc list-inside text-gray-600 pl-3 leading-7">
                                                            {
                                                                item.details.map((description, index) => (
                                                                    <li key={index}>{description}</li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default ProductDetial