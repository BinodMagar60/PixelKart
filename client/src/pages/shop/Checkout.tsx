import { useState } from "react"
import Navbar from "../../components/Navbar"
import { Eye, Trash2 } from "lucide-react"

const Checkout = () => {

    const [CheckoutItems, setCheckoutItems] = useState([
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
            <div className="w-full px-10 sm:px-15 xl:px-30 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="relative">
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Order Summary</div>
                            <div className='space-y-2'>
                            {
                                CheckoutItems.map(item => (
                                    <div key={item.id} className="flex justify-between border border-gray-300 rounded-md p-3">

                                        <div className="flex gap-2">
                                            <div className="h-18 w-18"><img src={item.photo} alt={item.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                                            <div>
                                                <div className="text-lg font-semibold">{item.productName}</div>
                                                <div className="text-sm text-gray-600">by {item.seller}</div>
                                                <div className="text-sm text-gray-600">Rs {item.price}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            Qty: {item.qty}
                                        </div>
                                        <div className="flex items-center">
                                            Rs. {item.qty * item.price}
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="text-black font-semibold text-xl my-4">Order Summary</div>
                                    <div className="space-y-3">
                                        <div className="w-full flex justify-between"><span>Subtotal:</span><span>Rs. </span></div>
                                        <div className="w-full flex justify-between"><span>Shipping:</span><span>Rs. </span></div>
                                        <div className="w-full flex justify-between border-t border-gray-300 pt-4"><span>Total:</span><span>Rs.</span></div>
                                    </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="space-y-3">
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Contact Information</div>
                            <div className="space-y-2">
                                <div>Phone number</div>
                                <div><input type="number" className="w-full border border-gray-300 px-3 py-1.5 rounded-md" placeholder="98XXXXXXXX" /></div>
                            </div>
                        </div>
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Shipping Information</div>
                            <div className="space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div>First Name</div>
                                        <div><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Binod" /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>Last Name</div>
                                        <div><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Magar" /></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div>Address</div>
                                        <div><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Hakim Chowk, Bharatpur" /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>ZIP code</div>
                                        <div><input type="number" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Binod" /></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div>First Name</div>
                                        <div><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Binod" /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>First Name</div>
                                        <div><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-1.5" placeholder="Binod" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Payment</div>
                            <div>
                                <div className="border p-3 border-gray-300 rounded-md flex items-center gap-3 mb-5 cursor-pointer">
                                    <div className="w-4 h-4 p-0.5 border border-gray-300 rounded-full">
                                        <div className="w-full h-full bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>Esewa</div>
                                </div>
                            </div>
                            <div>
                                <button className="w-full px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout