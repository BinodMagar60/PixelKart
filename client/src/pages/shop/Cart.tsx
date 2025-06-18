import { useState } from "react"
import Navbar from "../../components/Navbar"
import { Eye, ShoppingCart, Trash2 } from "lucide-react"

const Cart = () => {

    const [cartItems, setCartItems] = useState([
         {
            id: 1,
            productName: "Gaming Laptop",
            seller: "Binod",
            OrderedDate: "20 Jun, 2020",
            price: 12000,
            status: "Order Placed",
            shippingAddress: "123 Main st, city, akdf",
            orderNo: "#ORD123",
            qty: 2,
            trackingNo: "123123123456456456789789",
            photo: "/carousel/gpu.png",
            isProductAvailable: true,
        },
        {
            id: 2,
            productName: "Gaming Laptop",
            seller: "Binod",
            OrderedDate: "20 Jun, 2020",
            price: 12000,
            status: "Delivered",
            shippingAddress: "123 Main st, city, akdf",
            orderNo: "#ORD123",
            qty: 1,
            trackingNo: "123123123456456456789789",
            photo: "/carousel/gpu.png",
            isProductAvailable: false,
        },
        {
            id: 3,
            productName: "Gaming Laptop",
            seller: "Binod",
            OrderedDate: "20 Jun, 2020",
            price: 12000,
            status: "Shipping",
            shippingAddress: "123 Main st, city, akdf",
            orderNo: "#ORD123",
            qty: 1,
            trackingNo: "123123123456456456789789",
            photo: "/carousel/gpu.png",
            isProductAvailable: true,
        },
        {
            id: 4,
            productName: "Gaming Laptop",
            seller: "Binod",
            OrderedDate: "20 Jun, 2020",
            price: 12000,
            status: "Cancelled",
            shippingAddress: "123 Main st, city, akdf",
            orderNo: "#ORD123",
            qty: 1,
            trackingNo: "123123123456456456789789",
            photo: "/carousel/gpu.png",
            isProductAvailable: true,
        },])



    return (
        <div>
            <Navbar />
            <div className="w-full px-10 sm:px-15 xl:px-30 mt-8">
                <div className={`${cartItems.length !== 0 ? "grid grid-cols-1 lg:grid-cols-3 gap-6" : ""}`}>
                    <div className={cartItems.length !== 0 ? "lg:col-span-2" : ""}>
                        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-8">Shopping cart ({cartItems.length} items)</div>
                            {
                                cartItems.length !== 0 ? (
                                <div className='space-y-2'>
                            {
                                cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between border border-gray-300 rounded-md p-3">

                                        <div className="flex gap-2">
                                            <div className="h-18 w-18"><img src={item.photo} alt={item.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                                            <div>
                                                <div className="text-lg font-semibold">{item.productName}</div>
                                                <div className="text-sm text-gray-600">by {item.seller}</div>
                                                <div className="text-sm text-gray-600">Rs {item.price}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer shadow-sm"><Eye strokeWidth={1.2} /></button>
                                            <button className="p-2 border border-red-300 text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer shadow-sm"><Trash2 strokeWidth={1.2} /></button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>) : (<div className="w-full min-h-64 bg-gray-100 rounded-md flex flex-col gap-2 items-center justify-center text-gray-600">
                                    <div><ShoppingCart size={42} strokeWidth={1.5}/></div>
                                    <div className="text-xl font-semibold">No Cart Items</div>
                                    <div><button className="px-3 py-1 text-white bg-black cursor-pointer hover:bg-gray-800 rounded-md">Browse Products</button></div>
                                </div>)
                            }
                        </div>
                    </div>
                    {
                        cartItems.length !== 0 ? (
                            <div className="col-span-1">
                                <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                                    <div className="text-black font-semibold text-xl">Order Summary</div>
                                    <div className="space-y-3 mt-8">
                                        <div className="w-full flex justify-between"><span>Subtotal:</span><span>Rs. </span></div>
                                        <div className="w-full flex justify-between"><span>Shipping:</span><span>Rs. </span></div>
                                        <div className="w-full flex justify-between border-t border-gray-300 pt-4"><span>Total:</span><span>Rs.</span></div>
                                    </div>
                                    <div className="mt-5">
                                        <button className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer">Proceed to Checkout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart