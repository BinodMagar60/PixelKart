import { useState } from "react"

const Orders = () => {
    const [noOfItems, setNoOfItems] = useState(10)
    const [orderDatas, setOrderDatas] = useState([
        {
            id: 1,
            orderId: "#ORD02510121212345",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 2,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 3,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 4,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 5,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 6,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 7,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 8,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 9,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 10,
            orderId: "#ORD-001",
            customer: "Binod kaucha",
            Product: "Nvida Laptop",
            amount: 100000,
            status: "Processing",
            date: "12 Jan, 20025"
        },
        {
            id: 11,
            orderId: "#ORD-001",
            customer: "Binod kauchaddddddddddddddddddddddddd sdfsdf sdf sd fsd f sdfs f sd sdf",
            Product: "Nvida Laptop sdf sf sf sdf sdf sfd asdf sadf sdf asdf df sdf df as fasd fs dfsdf sdf dsf sdf d fsfd sdf sd daf sd fsd fsdf",
            amount: 100000,
            status: "Cancelled",
            date: "12 Jan, 20025"
        },
    ])



    const handleStatusChange = (id: number, newStatus: string) => {
    setOrderDatas(prev =>
        prev.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        )
    );
};

    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm">
            <div>
                <div className="text-black font-semibold text-xl">Orders</div>
                <div className="text-gray-600 text-sm">Track and manage all customer orders</div>
            </div>
            <div>
                <div className="mt-10">
                    <table className="w-full" >
                        <thead>
                            <tr className="hover:bg-gray-100 rounded-md">
                                <td className="py-3 pl-3">Order ID</td>
                                <td className="py-3">Customer</td>
                                <td className="py-3">Product</td>
                                <td className="text-center py-3">Amount</td>
                                <td className="text-center py-3">Status</td>
                                <td className="text-center py-3">Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDatas.slice(0,noOfItems).map(item => (
                                    <tr className="hover:bg-gray-100 rounded-md border-t border-gray-300" key={item.id}>
                                        <td className="py-3 pl-3 max-w-18">{item.orderId}</td>
                                        <td className="py-3 capitalize max-w-22 overflow-hidden whitespace-nowrap truncate text-ellipsis">{item.customer}</td>
                                        <td className="py-3 overflow-hidden max-w-40 whitespace-nowrap truncate text-ellipsis">{item.Product}</td>
                                        <td className="text-center py-3">{item.amount}</td>
                                        <td className="max-w-16">
                                            <div className="w-full flex justify-center text-center">
                                                {
                                                    item.status === "Cancelled" ? <div className="text-red-600">Cancelled</div> : (
                                                        <select className="border px-3 py-1  border-gray-300 rounded-md"
                                                            value={item.status}
                                                            onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    )
                                                }
                                            </div>
                                        </td>
                                        <td className=" py-3 pr-2 text-center">{item.date}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center">
                        <button className={`border border-gray-300 px-3 py-2 rounded-md cursor-pointer text-white bg-black hover:border-black hover:text-black hover:bg-white transition-all duration-100 ease-in-out ${noOfItems > orderDatas.length? "hidden": "block"}`} onClick={()=> (noOfItems < orderDatas.length? setNoOfItems(prev => prev+10): "")}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders