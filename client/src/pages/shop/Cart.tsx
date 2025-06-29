import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { Eye, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { getCart, removeCart } from "../../api/ProductAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface OrderItemType {
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
    orderData: Date | null;
}




const Cart = () => {
    const [cartItems, setCartItems] = useState<OrderItemType[]>([])
    const [subtotal, setSubtotal] = useState<number>(0)
    const [delivery, setDelivery] = useState<number>(0)
    const navigate = useNavigate()
    useEffect(() => {
        const apicall = async () => {
            try {
                const response = await getCart('cart')
                if (response.status === 400 || response.status === 500) {
                    toast.error(response.data.message, {
                        autoClose: 1000,
                        theme: 'light'
                    })
                    return
                }
                setCartItems(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        apicall()
    }, [])

    useEffect(() => {
    let newSubtotal: number = 0;
    let newDelivery: number = 0;

    cartItems.forEach(item => {
        newSubtotal += item.price * item.orderQty;
        newDelivery += item.deliveryCharge;
    });


    setSubtotal(newSubtotal);
    setDelivery(newDelivery);
}, [cartItems]);



    const handleAdd = (id: string) => {
        const newData = cartItems.map(item => {
            if (item.id === id) {
                const maxQty = item.productQTY > 5 ? 5 : item.productQTY;
                return {
                    ...item,
                    orderQty: item.orderQty < maxQty ? item.orderQty + 1 : item.orderQty
                };
            }
            return item;
        });
        setCartItems(newData);
    };


    const handleRemove = (id: string) => {
        const newData = cartItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    orderQty: item.orderQty > 1 ? item.orderQty - 1 : item.orderQty
                };
            }
            return item;
        });
        setCartItems(newData);
    };

    const handleDelete = async(id: string) => {
        try {
            const response = await removeCart('cart',{id})
            if(response.status === 400 || response.status === 500){
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
            const newdata = cartItems.filter(item=> id !== item.id)
            setCartItems(newdata)
        } catch (error) {
            console.log(error)
        }
    }

    const handleProceed = () => {
        cartItems.map(item => {
            if(item.productQTY === 0){
                toast.error(`One of the product on cart is out of stock`,{
                    autoClose: 1000,
                    theme: 'light'
                })
                return
            }
        })
        navigate('/cart/checkout', { state: { cartItems, subtotal, delivery } });
    }

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
                                                            <div className="text-lg font-semibold">{item.productName.length > 60 ? item.productName.slice(0, 60) + "..." : item.productName}</div>
                                                            <div className="text-sm text-gray-600">by {item.sellerName}</div>
                                                            <div className="text-sm text-gray-600">Rs {item.price}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 items-center">
                                                        <div className="flex items-center gap-3">
                                                            {
                                                                item.productQTY > 0 ? <>
                                                                    <div className="flex ">
                                                                        <button className="border border-gray-300 rounded-md p-1 cursor-pointer" onClick={() => handleAdd(item.id)}><Plus size={16} /></button>
                                                                        <div className="w-10 text-center">{item.orderQty}</div>
                                                                        <button className="border border-gray-300 rounded-md p-1 cursor-pointer" onClick={()=>handleRemove(item.id)}><Minus size={16} /></button>
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 text-center">{item.productQTY} Available</div>
                                                                </> :
                                                                    <div className="text-red-500 text-xs">
                                                                        Out of Stock
                                                                    </div>
                                                            }
                                                        </div>
                                                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer shadow-sm" onClick={() => { navigate(`/product/${item.productId}`) }}><Eye strokeWidth={1.2} /></button>
                                                        <button className="p-2 border border-red-300 text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer shadow-sm" onClick={()=>handleDelete(item.id)}><Trash2 strokeWidth={1.5} /></button>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>) : (<div className="w-full min-h-64 bg-gray-100 rounded-md flex flex-col gap-2 items-center justify-center text-gray-600">
                                        <div><ShoppingCart size={42} strokeWidth={1.5} /></div>
                                        <div className="text-xl font-semibold">No Cart Items</div>
                                        <div><button className="px-3 py-1 text-white bg-black cursor-pointer hover:bg-gray-800 rounded-md" onClick={()=> {navigate('/product')}}>Browse Products</button></div>
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
                                        <div className="w-full flex justify-between"><span>Subtotal: </span><span>Rs. {subtotal}</span></div>
                                        <div className="w-full flex justify-between"><span>Delivery fee:</span><span>Rs. {delivery}</span></div>
                                        <div className="w-full flex justify-between border-t border-gray-300 pt-4"><span>Total:</span><span>Rs. {subtotal+delivery}</span></div>
                                    </div>
                                    <div className="mt-5">
                                        <button className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer" onClick={()=>handleProceed()}>Proceed to Checkout</button>
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