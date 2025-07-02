import { AlertTriangle, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getOverViewDetails } from "../../api/AccountAPI";



interface OrdersTypes {
    id: string,
    order: string,
    name: string,
    price: number,
    status: string,
}

interface AlertsTypes {
    id: string,
    name: string,
    number: number,
}

const Overview = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [RecentOrders, setRecentOrders] = useState<OrdersTypes[]>([])
    const [stockAlerts, setstockAlerts] = useState<AlertsTypes[]>([])
    const [animatedValues, setAnimatedValues] = useState({
        users: 0,
        products: 0,
        sales: 0,
        orders: 0,
    });


    const animationRefs = useRef({
        users: 0,
        products: 0,
        sales: 0,
        orders: 0,
    });

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
    };

    useEffect(()=> {
        const callAPI = async() => {
            try {
                const response = await getOverViewDetails()
                setTotalUsers(response.data.totalUsers)
                setTotalProducts(response.data.totalProducts)
                setTotalSales(response.data.totalSales)
                setTotalOrders(response.data.totalOrders)
                setRecentOrders(response.data.recentOrders)
                setstockAlerts(response.data.systemAlerts)
            } catch (error) {
                console.log(error)
            }
        }
        callAPI()
    },[])

    useEffect(() => {
        animateValue("users", totalUsers);
        animateValue("products", totalProducts);
        animateValue("sales", totalSales);
        animateValue("orders", totalOrders);

        return () => {
            Object.values(animationRefs.current).forEach(cancelAnimationFrame);
        };
    }, [totalUsers, totalProducts, totalSales, totalOrders]);

    const iconSize = 32;

    const topPart = [
        {
            id: 1,
            name: "Total Users",
            number: animatedValues.users,
            icon: <Users size={iconSize} />,
            color: "#2563EB",
        },
        {
            id: 2,
            name: "Total Products",
            number: animatedValues.products,
            icon: <Package size={iconSize} />,
            color: "#9333EA",
        },
        {
            id: 3,
            name: "Total Sales",
            number: animatedValues.sales,
            icon: <DollarSign size={iconSize} />,
            color: "#18A44B",
        },
        {
            id: 4,
            name: "Orders",
            number: animatedValues.orders,
            icon: <ShoppingCart size={iconSize} />,
            color: "#EA580C",
        },
    ];

    

    const sortedStockAlert = [...(stockAlerts.filter(item => item.number < 11))].sort((a, b) => a.number - b.number)

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
                <div className="bg-white rounded-md p-5 h-full shadow-sm">
                    <div className="leading-8 mb-4">
                        <div className="text-xl font-semibold">Recent Orders</div>
                        <div className="text-gray-600 text-sm">Latest customer orders</div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto overflow-hidden" style={{
                        scrollbarWidth: "none"
                    }}>
                        {
                            RecentOrders.length === 0 ? (
                                <div className="w-full flex flex-col h-full justify-center items-center p-20">
                                    <div className="text-2xl font-semibold text-gray-500">No Orders</div>
                                </div>
                            ) :
                                (
                                    RecentOrders.map((item, index) => (
                                        <div className="flex justify-between p-3  bg-gray-100 rounded-md" key={index}>
                                            <div className="leading-7">
                                                <div>{item.order}</div>
                                                <div className="text-sm text-gray-600">{item.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div>Rs. {item.price}</div>
                                                <div className={`border border-gray-300 rounded-full text-sm px-3  ${item.status === "Delivered" ? "text-white bg-black" : item.status === "Cancelled" ? "text-red-600" : ""}`}>{item.status}</div>
                                            </div>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>


                {/* system alerts */}
                <div className="bg-white rounded-md p-5 h-full shadow-sm">
                    <div className="leading-8 mb-4">
                        <div className="text-xl font-semibold">System Alerts</div>
                        <div className="text-gray-600 text-sm">Latest customer orders</div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto overflow-hidden" style={{
                        scrollbarWidth: "none"
                    }}>
                        {
                            sortedStockAlert.length === 0 ? (
                                <div className="w-full flex flex-col h-full justify-center items-center p-20">
                                    <div className="p-5 text-yellow-400"><AlertTriangle size={52} /></div>
                                    <div className="text-2xl font-semibold text-gray-500">No alerts at the moment</div>
                                </div>
                            ) :
                                (

                                    sortedStockAlert.map(item => (
                                        <div className={`flex items-center h-full w-full p-3 rounded-md ${item.number < 4 ? "bg-red-100" : "bg-yellow-100"}`} key={item.id}>
                                            <div className={`${item.number < 4 ? "text-red-600" : "text-yellow-600"}`}>
                                                <AlertTriangle size={30} />
                                            </div>
                                            <div className="leading-7 ml-4">
                                                <div className="font-semibold">{item.name}'s Low Stock Alert</div>
                                                <div className="text-sm text-gray-600">{item.number} item left on inventory</div>
                                            </div>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
