import { Eye } from "lucide-react"
import { useState } from "react"

interface orderDataType {
            id: number,
            productName: string,
            seller: string,
            OrderedDate: string,
            price: number,
            status: string,
            shippingAddress: string,
            orderNo: string,
            qty: number,
            trackingNo: string,
            photo: string,
            isProductAvailable: boolean,
        }



const MyPurchases = () => {

    const [openDetail, setOpenDetail] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<orderDataType>({
            id: 0,
            productName: "",
            seller: "",
            OrderedDate: "",
            price: 0,
            status: "",
            shippingAddress: "",
            orderNo: "",
            qty: 1,
            trackingNo: "",
            photo: "",
            isProductAvailable: true,
        })

    const [orderData, setOrderData] = useState([
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



    const handleCancel = (id: number) => {
        const newData = orderData.map(item => {
            if(id === item.id) {
                return {...item, status: "Cancelled"}
            }
            return item
        })
        setOrderData(newData)
        if (selectedProduct.id === id) {
        setSelectedProduct(prev => ({ ...prev, status: "Cancelled" }));
    }
    }


    return (
        <>
            {
                !openDetail && (
                    <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">

                <div>
                    <div className="text-black font-semibold text-xl">My Purchases</div>
                    <div className="text-gray-600 text-sm">Track your orders and purchase history</div>
                </div>
                <div className="w-full mt-8 space-y-2">
                    {
                        orderData.map(item => (
                            <div key={item.id} className="flex justify-between border border-gray-300 rounded-md p-3">

                                <div className="flex gap-2">
                                    <div className="h-18 w-18"><img src={item.photo} alt={item.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                                    <div>
                                        <div className="text-lg font-semibold">{item.productName}</div>
                                        <div className="text-sm text-gray-600">by {item.seller}</div>
                                        <div className="text-sm text-gray-600">Ordered on {item.OrderedDate}</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div>
                                        <div className="font-semibold text-right">Rs {item.price}</div>
                                        <div className={`text-sm px-3 py-0.5 rounded-full ${item.status === "Delivered" ? "bg-black text-white" : item.status === "Cancelled" ? "bg-red-500 text-white" : " bg-gray-200"}`}>{item.status}</div>
                                    </div>
                                    <div>
                                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer shadow-sm" onClick={()=> {
                                            setSelectedProduct(item);
                                            setOpenDetail(true)
                                        }}><Eye strokeWidth={1.2} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
                )
            }
            {
                openDetail && <MyOrderList setOpenDetail={setOpenDetail} selectedProduct={selectedProduct} handleCancel={handleCancel}/>
            }
        </>
    )
}

interface MyOrderListTypes {
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>,
    selectedProduct: orderDataType,
    handleCancel: (id: number)=> void
}

const MyOrderList = ({setOpenDetail, selectedProduct,  handleCancel}:MyOrderListTypes) => {
    return (
        <div className="w-full">
            <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-black font-semibold text-xl">{selectedProduct.orderNo}</div>
                        <div className="text-gray-600 text-sm">Placed on {selectedProduct.OrderedDate}</div>
                    </div>
                    <button className="px-3 py-2 hover:bg-gray-200 cursor-pointer w-fit h-fit border border-gray-300 rounded-md" onClick={()=>setOpenDetail(false)}>Close</button>
                </div>
                <div className="flex justify-between items-center border border-gray-300 rounded-md p-3 mt-8">
                    <div className="flex gap-3 items-center">
                        <div className="w-24 h-24"><img src={selectedProduct.photo} alt={selectedProduct.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                        <div>
                            <div className="text-lg font-semibold">{selectedProduct.productName}</div>
                            <div className="text-gray-600 text-sm">Quantity: {selectedProduct.qty}</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-bold pr-2 text-right">Rs. {selectedProduct.price}</div>
                        <div><button className="text-sm px-2 py-1 border border-black rounded-md bg-black text-white cursor-pointer hover:bg-gray-800">Visit Product</button></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">

                    <div className="text-black font-semibold text-xl">Shipping Details & Order Status</div>

                    <div className="space-y-2 mt-8 leading-6">
                        <div >
                            <div className="font-semibold">Shipping Address:</div>
                            <div className=" text-gray-600">{selectedProduct.shippingAddress}</div>
                        </div>
                        <div >
                            <div className="font-semibold">Shipping Method:</div>
                            <div className=" text-gray-600">Standard Shipping</div>
                        </div>
                        <div >
                            <div className="font-semibold">Tracking Number:</div>
                            <div className=" text-gray-600">{selectedProduct.trackingNo}</div>
                        </div>
                        <div >
                            <div className="font-semibold">Status</div>
                            <div className="text-sm text-gray-600">{selectedProduct.status === "Cancelled"? <span className="text-red-500">Cancelled</span> : selectedProduct.status}</div>
                        </div>
                        <div>
                            {
                                selectedProduct.status === "Order Placed" && (
                                    <button className="w-full px-3 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 cursor-pointer mt-6" onClick={()=> handleCancel(selectedProduct.id)}>Cancel</button>
                                ) 
                            }
                        </div>
                    </div>

                </div>
                <div>
                    <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">

                    <div className="text-black font-semibold text-xl">Order Summary</div>
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <div>Subtotal:</div>
                            <div>Rs. {selectedProduct.price}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Quantity:</div>
                            <div>Rs. {selectedProduct.qty}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Delivery</div>
                            <div>Rs. 0</div>
                        </div>
                        <div className="flex justify-between border-t border-gray-300 pt-4">
                            <div>Total</div>
                            <div>Rs. {selectedProduct.price * selectedProduct.qty}</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}




export default MyPurchases