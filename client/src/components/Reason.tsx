import { Headphones, Shield, Truck } from "lucide-react"
import type { ReactNode } from "react"

interface cardType {
    icon: ReactNode,
    title: string,
    detail: string,
    iconStyle?: string,
}


const Reason = () => {


    const iconSize = 32
    const iconStrokeWidth = 1.5

    const cardInfo: cardType[] = [
        {
            icon: <Shield size={iconSize} strokeWidth={iconStrokeWidth} color="blue"/>,
            title: "Secure Payments",
            detail: "All transactions are protected with industry-standard encryption and fraud protection.",
            iconStyle: "bg-blue-200",
        },
        {
            icon: <Truck size={iconSize} strokeWidth={iconStrokeWidth} color="green"/>,
            title: "Fast Shipping",
            detail: "Quick and reliable delivery from verified vendors across the Nepal.",
            iconStyle: "bg-green-200",
        },
        {
            icon: <Headphones size={iconSize} strokeWidth={iconStrokeWidth} color="purple"/>,
            title: "24/7 Support",
            detail: "Our dedicated support team is here to help you with any questions or issues.",
            iconStyle: "bg-purple-200",
        },
    ]
    
    return (

        <div className={`w-full px-30 py-16 flex flex-col items-center bg-white`}>
            <div className="mb-8 font-semibold text-2xl">Why Choose PixelKart?</div>
            <div className="flex space-x-8 text-center">
                {
                    cardInfo.map((item, index) => (
                        <div key={index} className="flex flex-col space-y-4 items-center">
                            <div className={`${item.iconStyle} p-4 rounded-full`}>{item.icon}</div>
                            <div className="font-semibold text-xl">{item.title}</div>
                            <div className="text-gray-700">{item.detail}</div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Reason