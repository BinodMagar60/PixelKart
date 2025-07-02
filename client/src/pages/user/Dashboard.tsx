import { Boxes, Heart, Package, ShoppingBag, Store } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { getDashboardDetails } from "../../api/AccountAPI";

interface IRecent {
    id: string,
    name: string,
    orderedDate: string,
    status: string,
}

interface IActive {
    id: string,
    name: string,
    qty: number,
    price: number,
}

const iconSize = 32;


const Dashboard = () => {

    const [totalItemsSales, setTotalItemsSales] = useState(0)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [totalItemsSold, setTotalItemsSold] = useState(0)
    const [totalWishlist, setTotalWishlist] = useState(0)
    const [recentPurchases, setrecentPurchases] = useState<IRecent[]>([])
    const [activeListings, setactiveListings] = useState<IActive[]>([])

    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getDashboardDetails()
                setTotalItemsSales(response.data.totalItemsForSales )
                setTotalPurchase(response.data.totalItemPurchased   )
                setTotalItemsSold(response.data.totalItemSold   )
                setTotalWishlist(response.data.totalItemWishlisted  )
                setrecentPurchases(response.data.recentPurchasesData    )
                setactiveListings(response.data.activeItemListing   )
            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [])

    const [animatedValues, setAnimatedValues] = useState({
        sales: 0,
        purchases: 0,
        sold: 0,
        wishlist: 0,
    })

    const animationRefs = useRef({
        sales: 0,
        purchases: 0,
        sold: 0,
        wishlist: 0,
    })

    const animateValue = (key: keyof typeof animatedValues, target: number, duration = 1000) => {
        const start = performance.now();
        const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(progress * target);
            setAnimatedValues((prev) => ({ ...prev, [key]: value }));

            if (progress < 1) {
                animationRefs.current[key] = requestAnimationFrame(step);
            }
        };
        animationRefs.current[key] = requestAnimationFrame(step);
    }


    useEffect(() => {
        animateValue("sales", totalItemsSales);
        animateValue("purchases", totalPurchase);
        animateValue("sold", totalItemsSold);
        animateValue("wishlist", totalWishlist);

        return () => {
            Object.values(animationRefs.current).forEach(cancelAnimationFrame);
        };
    }, [totalItemsSales, totalPurchase, totalItemsSold, totalWishlist]);


    const topPart = [
        {
            id: 1,
            name: "Items for Sale",
            number: animatedValues.sales,
            icon: <Store size={iconSize} />,
            color: "#2563EB"
        },
        {
            id: 2,
            name: "Purchases",
            number: animatedValues.purchases,
            icon: <ShoppingBag size={iconSize} />,
            color: "#9333EA"
        },
        {
            id: 3,
            name: "Items Sold",
            number: animatedValues.sold,
            icon: <Package size={iconSize} />,
            color: "#18A44B"
        },
        {
            id: 4,
            name: "Wishlist",
            number: animatedValues.wishlist,
            icon: <Heart size={iconSize} />,
            color: "#EA580C"
        }
    ]

    return (
        <div className="w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topPart.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-5 shadow-sm rounded-md flex justify-between items-center"
                    >
                        <div className="leading-8">
                            <div className="text-gray-600">{item.name}</div>
                            <div className="text-2xl font-semibold">{item.number}</div>
                        </div>
                        <div style={{ color: item.color }}>{item.icon}</div>
                    </div>
                ))}
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pb-2">
                <div className="bg-white rounded-md p-5 h-fit shadow-sm">
                    <div className="leading-8 mb-4">
                        <div className="text-xl font-semibold">Recent Purchases</div>
                        <div className="text-gray-600 text-sm">Your Latest Purchases</div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto overflow-hidden" style={{
                        scrollbarWidth: "none"
                    }}>
                        {
                            recentPurchases.length === 0 ? (<div className="w-full flex flex-col h-full justify-center items-center p-20">
                                <div className="text-2xl font-semibold text-gray-500">No Orders</div>
                            </div>) : (
                                recentPurchases.map((item) => (
                                    <div className="flex justify-between p-3 bg-gray-100 rounded-md" key={item.id}>
                                        <div className="leading-7">
                                            <div className="whitespace-nowrap truncate max-w-120">{item.name}</div>
                                            <div className="text-sm text-gray-600">{item.orderedDate}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`border border-gray-300 rounded-full text-sm px-3  ${item.status === "Delivered" ? "text-white bg-black" : item.status === "Cancelled" ? "text-red-600" : ""}`}>{item.status}</div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>


                {/* system alerts */}
                <div className="bg-white rounded-md p-5 h-fit shadow-sm">
                    <div className="leading-8 mb-4">
                        <div className="text-xl font-semibold">Active Listings</div>
                        <div className="text-gray-600 text-sm">Your recent current items for sales</div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto overflow-hidden" style={{
                        scrollbarWidth: "none"
                    }}>
                        {
                            activeListings.length === 0 ? (<div className="w-full flex flex-col h-full justify-center items-center p-20">
                                <div className="text-2xl font-semibold text-gray-500">No Listing</div>
                            </div>) : (
                                activeListings.map((item) => (
                                    <div className="flex justify-between p-3 bg-gray-100 rounded-md" key={item.id}>
                                        <div className="leading-8">
                                            <div className="whitespace-nowrap truncate max-w-120">{item.name}</div>
                                            <div className="text-sm text-gray-600 flex gap-1 items-center"><span><Boxes size={16} /></span>{item.qty}</div>
                                        </div>
                                        <div className="text-right flex items-center">
                                            <div className="font-semibold text-lg">Rs {item.price}</div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard