import { Eye, Star } from "lucide-react"
import React, { useEffect, useState } from "react"
import { formatDateToReadable } from "../../utils/DateConverter"
import { addReview, cancelOrder, deleteReview, getMypurchase, getReview, updateReview } from "../../api/AccountAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";

export interface purchaseType {
    id: string,
    orderNumber: string;
    productId: string;
    productName: string;
    productQTY: number,
    photo: string,
    price: number,
    orderQty: number;
    shippingAddress: string;
    shippingZipcode: string;
    shippingMethod: string;
    trackingNumber: string;
    status:
    "Cart"
    | "Ordered"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
    deliveryCharge: number;
    sellerName: string;
    sellerId: string;
    buyerName: string;
    buyerId: string;
    buyerContact: number;
    isReviewed: boolean;
    orderData: string;
}





const MyPurchases = () => {
    const { setApiChange } = useProductContext()
    const [openDetail, setOpenDetail] = useState(false)
    const [change, setchange] = useState(false)

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

    const [orderData, setOrderData] = useState<purchaseType[]>([])

    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getMypurchase('account/mypurchase')
                // console.log(response.data)
                setOrderData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [change])




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
            const newData: purchaseType[] = orderData.map(item => {
                if (id === item.id) {
                    return { ...item, status: "Cancelled" }
                }
                return item
            })
            setOrderData(newData)
            if (selectedProduct.id === id) {
                setSelectedProduct(prev => ({ ...prev, status: "Cancelled" }));
            }
            setApiChange(prev => !prev)

        } catch (error) {
            console.log(error)
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
                                                <div className="text-sm text-gray-600">by {item.sellerName}</div>
                                                <div className="text-sm text-gray-600">Ordered on {formatDateToReadable(item.orderData)}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div>
                                                <div className="font-semibold text-right">Rs {item.price}</div>
                                                <div className={`text-sm px-3 py-0.5 rounded-full ${item.status === "Delivered" ? "bg-black text-white" : item.status === "Cancelled" ? "bg-red-500 text-white" : " bg-gray-200"}`}>{item.status}</div>
                                            </div>
                                            <div>
                                                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer shadow-sm" onClick={() => {
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
                openDetail && <MyOrderList setOpenDetail={setOpenDetail} selectedProduct={selectedProduct} handleCancel={handleCancel} setchange={setchange} setSelectedProduct={setSelectedProduct} change={change} />
            }
        </>
    )
}

interface MyOrderListTypes {
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>,
    selectedProduct: purchaseType,
    setSelectedProduct: React.Dispatch<React.SetStateAction<purchaseType>>
    handleCancel: (id: string) => void,
    setchange: React.Dispatch<React.SetStateAction<boolean>>,
    change: boolean
}

interface IReview {
    _id: string,
    orderId: string,
    productId: string,
    reviewerId: string,
    reviewStar: number,
    reviewComment: string,
    createdAt: string
}

const MyOrderList = ({ setOpenDetail, selectedProduct, handleCancel, change, setchange, setSelectedProduct }: MyOrderListTypes) => {
    const navigate = useNavigate()
    const {setApiChange} = useProductContext()
    const [reviewComment, setReviewComment] = useState("")
    const [reviewStar, setReviewStar] = useState<number>(0)
    const [reviewData, setReviewData] = useState<IReview | null>(null)

    useEffect(() => {
        const apiCall = async () => {
            try {
                const response = await getReview(`account/review/${selectedProduct.id}`)
                setReviewData(response.data)
                setReviewComment(response.data.reviewComment)
                setReviewStar(response.data.reviewStar)
                
            } catch (error) {
                console.log(error)
            }
        }
        if (selectedProduct.isReviewed) {
            apiCall()
        }
    }, [change])


    const handleReviewAdd = async () => {
        try {
            const newData = {
                orderId: selectedProduct.id,
                productId: selectedProduct.productId,
                reviewStar: reviewStar,
                reviewComment: reviewComment,
            }

            const response = await addReview('account/review', newData)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }

            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light   '
            })
            setchange(prev => !prev)
            setApiChange(prev => !prev)
            setSelectedProduct(item => ({ ...item, isReviewed: true }))
        } catch (error) {
            console.log(error)
        }
    }


    const handleReviewUpdate = async () => {
        try {
            const newData = {
                reviewId: reviewData!._id,
                reviewStar: reviewStar,
                reviewComment: reviewComment,
            }

            const response = await updateReview('account/review', newData)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }

            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light   '
            })
            setchange(prev => !prev)
            setApiChange(prev => !prev)

        } catch (error) {
            console.log(error)
        }
    }

    const handleReviewDelete = async () => {
        try {
           

            const response = await deleteReview(`account/review/${reviewData?._id}`)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }

            toast.success(response.message, {
                autoClose: 1000,
                theme: 'light   '
            })
            setchange(prev => !prev)
            setReviewStar(0)
            setReviewComment("")
            setSelectedProduct(item => ({ ...item, isReviewed: false }))
            setApiChange(prev => !prev)

        } catch (error) {
            console.log(error)
        }
    }




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
                <div>
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
                                <div className=" text-gray-600">{selectedProduct.trackingNumber}</div>
                            </div>
                            <div >
                                <div className="font-semibold">Status</div>
                                <div className="text-sm text-gray-600">{selectedProduct.status === "Cancelled" ? <span className="text-red-500">Cancelled</span> : selectedProduct.status}</div>
                            </div>
                            <div>
                                {
                                    selectedProduct.status === "Ordered" && (
                                        <button className="w-full px-3 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 cursor-pointer mt-6" onClick={() => handleCancel(selectedProduct.id)}>Cancel</button>
                                    )
                                }
                            </div>
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
                    {
                        selectedProduct.status === "Delivered" && <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl">Review</div>
                            <div className="mt-6 space-y-4">
                                <div className="flex gap-1">
                                    {
                                        [1, 2, 3, 4, 5].map(item => (
                                            <Star key={item}
                                                onClick={() => {
                                                    reviewStar === item ? setReviewStar(0) : setReviewStar(item)
                                                }}
                                                fill={reviewStar >= item ? "#F0B100" : "white"}
                                                className={`w-6 h-6 cursor-pointer transition-colors ${reviewStar >= item ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                            />
                                        ))
                                    }
                                </div>
                                <div>
                                    {/* <div className="whitespace-pre-wrap">{reviewComment}</div> */}
                                    <textarea rows={6} placeholder="Reivew..." className="w-full border resize-none border-gray-300 rounded-md p-2" onChange={(e) => { setReviewComment(e.target.value) }} value={reviewComment} />
                                </div>
                                <div>

                                    {
                                        selectedProduct.isReviewed ? <div className="space-y-1">
                                            <button className="cursor-pointer w-full border rounded-md border-gray-300 bg-gray-100 px-4 py-2  hover:bg-gray-200" onClick={handleReviewUpdate}>Update</button>
                                            <button className="cursor-pointer w-full border rounded-md text-white px-4 py-2 bg-red-600 hover:bg-red-400" onClick={handleReviewDelete}>Delete Reivew</button>
                                        </div> : <div>
                                            <button className="w-full bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800" onClick={handleReviewAdd}>Add Review</button>
                                        </div>
                                    }



                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}




export default MyPurchases