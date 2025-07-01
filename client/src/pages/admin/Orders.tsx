import { useEffect, useState } from "react"
import type { purchaseType } from "../user/MyPurchases"
import { formatDateToReadable } from "../../utils/DateConverter"
import { cancelOrder, getOrdersAdmin, updateOrderStatus } from "../../api/AccountAPI"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useProductContext } from "../../context/ProductContext"
import { Search} from "lucide-react"

const Orders = () => {
    const { setApiChange } = useProductContext()
    const [searchQuery, setSearchQuery] = useState("")
    const [noOfItems, setNoOfItems] = useState(10)
    const [orderDatas, setOrderDatas] = useState<purchaseType[]>([])
    const [openDetail, setOpenDetail] = useState(false)
    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getOrdersAdmin('account/order')
                setOrderDatas(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [])

    const [selectedProduct, setSelectedProduct] = useState<purchaseType>({
        id: "",
        orderNumber: "",
        productId: '',
        productName: "",
        productQTY: 0,
        photo: "",
        price: 0,
        orderQty: 0,
        shippingAddress: "",
        shippingZipcode: "",
        shippingMethod: "",
        trackingNumber: "",
        status: "Cart",
        deliveryCharge: 0,
        sellerName: "",
        sellerId: "",
        buyerName: "",
        buyerId: "",
        buyerContact: 0,
        isReviewed: false,
        orderData: "",
    })


    const handleCancel = async (id: string) => {
        try {
            const response = await cancelOrder('account/ordercancel', { orderId: id })
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light'
            })
            const newData: purchaseType[] = orderDatas.map(item => {
                if (id === item.id) {
                    return { ...item, status: "Cancelled" }
                }
                return item
            })
            setOrderDatas(newData)
            if (selectedProduct.id === id) {
                setSelectedProduct(prev => ({ ...prev, status: "Cancelled" }));
            }
            setApiChange(prev => !prev)

        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateStatus = async (id: string) => {
        try {
            const response = await updateOrderStatus('account/changeproductstatus', { orderId: id })
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light'
            })
            const newData: purchaseType[] = orderDatas.map(item => {
                if (id === item.id) {
                    return { ...item, status: item.status === "Ordered" ? "Processing" : item.status === "Processing" ? "Shipped" : "Delivered" }
                }
                return item
            })
            setOrderDatas(newData)
            if (selectedProduct.id === id) {
                setSelectedProduct(prev => ({ ...prev, status: selectedProduct.status === "Ordered" ? "Processing" : selectedProduct.status === "Processing" ? "Shipped" : "Delivered" }));
            }
            setApiChange(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredData = orderDatas.filter((item) => {
        return ( item.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) || item.orderNumber.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || item.productName.toLowerCase().includes(searchQuery.toLowerCase()) )
    })


    return (
        <>
            {
                !openDetail && <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-black font-semibold text-xl">Orders</div>
                            <div className="text-gray-600 text-sm">Track and manage all customer orders</div>
                        </div>
                        <div >
                            <form className="flex" onSubmit={(e) => (e.preventDefault())}>
                                <input type="text" placeholder="Search here..." className="border border-gray-300 h-fit px-3 py-1.5 w-70 rounded-tl-md rounded-bl-md focus:bg-gray-100" value={searchQuery} onChange={(e) => (setSearchQuery(e.target.value))} />
                                <button className="border-1 h-fit p-1.5 px-2 bg-black text-white rounded-br-md rounded-tr-md border-black hover:bg-gray-900 cursor-pointer"><Search size={24} /></button>
                            </form>

                        </div>
                    </div>
                    <div>
                        <div className="mt-10">
                            <table className="w-full" >
                                <thead>
                                    <tr className="hover:bg-gray-100 rounded-md">
                                        <td className="py-3 pl-3">Order ID</td>
                                        <td className="py-3">Customer</td>
                                        <td className="py-3">Product</td>

                                        <td className="text-center py-3">Status</td>
                                        <td className="text-center py-3">Order Date</td>
                                        <td className="text-center py-3">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredData.slice(0, noOfItems).map(item => (
                                            <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300 text-sm" key={item.id}>
                                                <td className="py-3 pl-3 max-w-20">{item.orderNumber}</td>
                                                <td className="py-3 capitalize max-w-20 overflow-hidden whitespace-nowrap truncate text-ellipsis font-semibold pl-2">{item.buyerName}</td>
                                                <td className="py-3 overflow-hidden max-w-40 whitespace-nowrap truncate text-ellipsis">{item.productName}</td>

                                                <td className="text-center py-3 flex justify-center">
                                                    <div className={`w-fit px-4 py-0.5 border rounded-full ${item.status === "Cancelled" ? "bg-red-200 border-red-500 text-red-700" : item.status === "Delivered" ? "bg-green-200 border-green-500 text-green-700" : "border-gray-300 bg-gray-100"}`}>{item.status}</div>
                                                </td>
                                                <td className="py-3 text-center">{formatDateToReadable(item.orderData)}</td>
                                                <td className="pr-2 text-center max-w-35">
                                                    <button className="px-3 py-2 bg-black text-white border border-gray-300 rounded-md my-2 hover:bg-gray-800 cursor-pointer" onClick={() => {
                                                        setOpenDetail(true)
                                                        setSelectedProduct(item)
                                                    }}>View Details</button>
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="w-full flex justify-center">
                                <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out ${noOfItems > orderDatas.length ? "hidden" : "block"}`} onClick={() => (noOfItems < orderDatas.length ? setNoOfItems(prev => prev + 10) : "")}>Load More</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                openDetail && <MyOrderList setOpenDetail={setOpenDetail} selectedProduct={selectedProduct} handleCancel={handleCancel} handleUpdateStatus={handleUpdateStatus} />
            }
        </>
    )
}



interface MyOrderListTypes {
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>,
    selectedProduct: purchaseType,
    handleCancel: (id: string) => void,
    handleUpdateStatus: (id: string) => void,
}

const MyOrderList = ({ setOpenDetail, selectedProduct, handleCancel, handleUpdateStatus }: MyOrderListTypes) => {
    const navigate = useNavigate()
    return (
        <div className="w-full">
            <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-black font-semibold text-xl">{selectedProduct.orderNumber}</div>
                        <div className="text-gray-600 text-sm">Placed on {formatDateToReadable(selectedProduct.orderData)}</div>
                    </div>
                    <button className="px-3 py-2 hover:bg-gray-200 cursor-pointer w-fit h-fit border border-gray-300 rounded-md" onClick={() => setOpenDetail(false)}>Close</button>
                </div>
                <div className="flex justify-between items-center border border-gray-300 rounded-md p-3 mt-8">
                    <div className="flex gap-3 items-center">
                        <div className="w-24 h-24"><img src={selectedProduct.photo} alt={selectedProduct.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                        <div>
                            <div className="text-lg font-semibold">{selectedProduct.productName}</div>
                            <div className="text-gray-600 text-sm">Quantity: {selectedProduct.orderQty}</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-bold pr-2 text-right">Rs. {selectedProduct.price}</div>
                        <div><button className="text-sm px-2 py-1 border border-black rounded-md bg-black text-white cursor-pointer hover:bg-gray-800" onClick={() => { navigate(`/product/${selectedProduct.productId}`) }}>Visit Product</button></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">

                    <div className="text-black font-semibold text-xl">Shipping Details & Order Status</div>

                    <div className="space-y-2 mt-8 leading-6">
                        <div >
                            <div className="font-semibold">Buyer Name:</div>
                            <div className=" text-gray-600">{selectedProduct.buyerName}</div>
                        </div>
                        <div >
                            <div className="font-semibold">Buyer Contact:</div>
                            <div className=" text-gray-600">{selectedProduct.buyerContact}</div>
                        </div>
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
                            <div className=" text-gray-600">{selectedProduct.trackingNumber}</div>
                        </div>
                        <div >
                            <div className="font-semibold">Status</div>
                            <div className="text-sm text-gray-600 border px-4 py-0.5 bg-gray-100 w-fit rounded-full border-gray-300
                            ">{selectedProduct.status === "Cancelled" ? <span className="text-red-500">Cancelled</span> : selectedProduct.status}</div>
                        </div>
                        <div className="mt-6 space-y-2  ">
                            {
                                !["Cancelled", "Delivered"].includes(selectedProduct.status) &&
                                <button className="w-full px-3 py-2  font-semibold rounded-md  cursor-pointer border border-gray-300 hover:bg-gray-200" onClick={() => handleUpdateStatus(selectedProduct.id)}>
                                    {
                                        selectedProduct.status === "Ordered" ? "Processing" : selectedProduct.status === "Processing" ? "Shipped" : "Delivered"
                                    }
                                </button>
                            }
                            {
                                selectedProduct.status === "Ordered" && (
                                    <button className="w-full px-3 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 cursor-pointer " onClick={() => handleCancel(selectedProduct.id)}>Cancel</button>
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
                                <div>Rs. {selectedProduct.orderQty}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Delivery</div>
                                <div>Rs. {selectedProduct.deliveryCharge}</div>
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-4">
                                <div>Total</div>
                                <div>Rs. {selectedProduct.price * selectedProduct.orderQty}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}





export default Orders