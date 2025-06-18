import { Eye, Heart, Trash2 } from 'lucide-react'
import React, { useState } from 'react'




const Wishlist = () => {

    const [myWishlist, setMyWishlist] = useState([
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
        },
    ])


    return (
        <div className='w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md'>
            <div>
                <div className="text-black font-semibold text-xl">My Wishlist</div>
                <div className="text-gray-600 text-sm">Items you want to buy later</div>
            </div>
            <div className='mt-8'>
                {
                    myWishlist.length === 0 ? (
                        <div className='w-full flex flex-col items-center gap-2 min-h-70 rounded-md justify-center'>
                            <div className='text-gray-500'><Heart size={46} /></div>
                            <div className='text-gray-600 text-xl'>Your wishlist is empty</div>
                            <div><button className='px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer'>Browse Products</button></div>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            {
                                myWishlist.map(item => (
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

                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default Wishlist