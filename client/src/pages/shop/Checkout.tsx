import { useState } from "react"
import Navbar from "../../components/Navbar"
import type { OrderItemType } from "./Cart"
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrderAPI } from "../../api/ProductAPI";
import z from 'zod'
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";
import { OrderLoadingScreen } from "../../loading/OrderLoading";
const validateData = z.object({
  id: z.string(),
  orderNumber: z.string().optional(),
  productId: z.string(),
  productName: z.string(),
  productQTY: z.number(),
  photo: z.string().url(),
  price: z.number(),
  orderQty: z.number().min(1, { message: "Must be at least 1 for each product" }).max(5, { message: "Product cannot exceed 5" }),
  shippingAddress: z.string({ required_error: "Shipping Address is required" }).min(1, { message: "Shipping Address is required" }),
  shippingZipcode: z.string({ required_error: "ZIP/Postal code is required" }).min(1, { message: "ZIP/Postal code is required" }),
  shippingMethod: z.string().min(1, { message: "Shipping method is required" }),
  trackingNumber: z.string().optional(),
  status: z.string(),
  deliveryCharge: z.number().optional(),
  sellerName: z.string(),
  sellerId: z.string(),
  buyerName: z.string(),
  buyerId: z.string(),
  buyerContact: z
    .number()
    .min(1000000, { message: "Buyer contact must be at least 7 digits" })
    .max(999999999999, { message: "Buyer contact cannot exceed 12 digits" }),
  isReviewed: z.boolean(),
  orderData: z.union([z.date(), z.null()]).optional()
});



const Checkout = () => {
    const navigate = useNavigate()
    const { setApiChange } = useProductContext()
    const { state } = useLocation();
    const { cartItems, subtotal, delivery }: { cartItems: OrderItemType[], subtotal: number, delivery: number } = state || {};
    
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [orderData, setOrderData] = useState<OrderItemType[]>(cartItems)

    const handleChange = (e: { target: { name: string, type: string, value: string } }) => {
        const { name, type, value } = e.target
        const newData = orderData.map(item => (
            {
                ...item,
                [name]: type === 'number' ? Number(value) : value
            }
        ))

        setOrderData(newData)
    }

    const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const parsed = validateData.safeParse(orderData[0])
            if (!parsed.success) {
                toast.error("Validation Failed, Please check all the details", {
                    autoClose: 1000,
                    theme: "light"
                });
                
                return
            }
            setLoadingScreen(true)
            const response = await placeOrderAPI('placeorder', orderData)
            if (response.status === 400 || response.status === 500) {
                toast.error(response.data.message, {
                    autoClose: 1000,
                    theme: 'light'
                })
            }
            setApiChange(prev => !prev)
            setOrderData([])
            setApiChange(prev=> !prev)
            setTimeout(() => {
                navigate('/cart/success')
            }, 4000);
            
        } catch (error) {
            console.log(error)
        }finally{
            setTimeout(() => {
                setLoadingScreen(false)
            }, 4000);
        }
    }

    if(!cartItems){
        navigate("/")
    }
    return (
        
            loadingScreen ? <OrderLoadingScreen /> : 
            <>
            <div>
            <Navbar />
            <div className="w-full px-10 sm:px-15 xl:px-30 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="relative">
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Order Summary</div>
                            <div className='space-y-2'>
                                {
                                    orderData.map(item => (
                                        <div key={item.id} className="flex justify-between border border-gray-300 rounded-md p-3">

                                            <div className="flex gap-2">
                                                <div className="h-18 w-18"><img src={item.photo} alt={item.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                                                <div>
                                                    <div className="text-lg font-semibold">{item.productName.length > 30 ? item.productName.slice(0, 30) + "..." : item.productName}</div>
                                                    <div className="text-sm text-gray-600">by {item.sellerName}</div>
                                                    <div className="text-sm text-gray-600">Rs {item.price}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end w-50">
                                                <div className="w-20">
                                                    Qty: {item.orderQty}
                                                </div>
                                                Rs. {item.orderQty * item.price}
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="text-black font-semibold text-xl my-4">Order Summary</div>
                                <div className="space-y-3">
                                    <div className="w-full flex justify-between"><span>Subtotal:</span><span>Rs. {subtotal}</span></div>
                                    <div className="w-full flex justify-between"><span>Delivery fee:</span><span>Rs. {delivery}</span></div>
                                    <div className="w-full flex justify-between border-t border-gray-300 pt-4"><span>Total:</span><span>Rs. {subtotal + delivery}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={placeOrder}>
                    <div className="space-y-3">
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Contact Information</div>
                            <div className="space-y-2">
                                <div>Phone number <span className="text-xs font-semibold text-gray-700">(7 to 12 digits)*</span></div>
                                <div><input type="number" name='buyerContact' className="w-full border border-gray-300 px-3 py-1.5 rounded-md" placeholder="98XXXXXXXX" value={orderData[0].buyerContact ?? 12345678} onChange={handleChange} maxLength={12} minLength={6} /></div>
                            </div>
                        </div>
                        <div className="w-full bg-white px-4 py-6 shadow-sm rounded-md">
                            <div className="text-black font-semibold text-xl mb-4">Shipping Information</div>
                            <div className="space-y-2">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div>Address</div>
                                        <div><input type="text" name="shippingAddress" className="w-full border border-gray-300 rounded-md px-3 py-1.5" value={orderData[0].shippingAddress} onChange={handleChange} placeholder="Hakim Chowk, Bharatpur" /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>ZIP code</div>
                                        <div><input type="text" name="shippingZipcode" className="w-full border border-gray-300 rounded-md px-3 py-1.5" value={orderData[0].shippingZipcode} onChange={handleChange} placeholder="C42800" /></div>
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
                                    <div>Epay</div>
                                </div>
                            </div>
                            <div>
                                <button className="w-full px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer" >Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            </>
        
    )
}

export default Checkout