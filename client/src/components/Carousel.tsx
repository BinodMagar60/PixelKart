import { useEffect, useState } from "react"


interface itemsToShow {
    id: number,
    name: string,
    description?: string,
    buttonDetail: string,
    image: string
}

const items: itemsToShow[] = [
    {
        id: 1,
        name: "Laptop",
        description: "Buy the best laptops from all around the country",
        buttonDetail: "Shop Laptop",
        image: "/carousel/Laptop.jpg"
    },
    {
        id: 2,
        name: "Desktop",
        description: "Buy the best PC's from all around the country",
        buttonDetail: "Shop Pc",
        image: "/carousel/Pc.png"

    },
    {
        id: 3,
        name: "GPU",
        description: "Buy the best Graphic Cards from all around the country",
        buttonDetail: "Shop GPU",
        image: "/carousel/gpu.png"

    },
    {
        id: 4,
        name: "MotherBoard",
        description: "Buy the best MotherBoards from all around the country",
        buttonDetail: "Shop MotherBoard",
        image: "/carousel/motherboard.png"

    },
    {
        id: 5,
        name: "Monitor",
        description: "Buy the best Monitors from all around the country",
        buttonDetail: "Shop Monitor",
        image: "/carousel/Monitor.png"

    },
]





const Carousel = () => {

    const [cardNo, setCardNo] = useState<1 | 2 | 3 | 4 | 5>(1)

    useEffect(()=> {
        const interval = setInterval(()=> {
            setCardNo(prev => (prev === 5 ? 1 : (prev + 1) as typeof cardNo))
        },7000)

        return () => clearInterval(interval)
    },[])

    return (
        <div className="flex overflow-hidden relative h-screen">
            {
                items.map(item => {
                    return (
                        <div key={item.id} className={`h-full w-full absolute transition-all duration-500 ease-in-out ${item.id === cardNo
                                ? "opacity-100 z-10"
                                : "opacity-50 "
                            }`} style={{
                                background: `url('${item.image}')`
                            }}>
                            <div className="flex justify-center items-center text-shadow-lg/30 w-full h-full bg-[#00000038]">
                                <div className=" flex flex-col items-center justify-center">
                                    <div className="text-white text-6xl font-bold">{item.name}</div>
                                    <div className="text-white text-xl mt-5">{item.description}</div>
                                    <div><button className="border-1 border-white text-black bg-[#e6e6e6] hover:text-white hover:bg-transparent transition-all px-3 py-2 text-xl font-bold rounded-sm hover: mt-5 cursor-pointer">{item.buttonDetail}</button></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className="absolute z-20 flex gap-5 left-[50%] translate-x-[-50%] bottom-16">
                {
                items.map(item=> {
                    return (
                        <div key={item.id}>
                            <button className={`w-3 h-3 bg-white rounded-full`} onClick={()=> {setCardNo((item.id) as typeof cardNo)}}><div className={`${item.id === cardNo ? "w-full h-full bg-blue-400 rounded-full" : ""}`}></div></button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Carousel