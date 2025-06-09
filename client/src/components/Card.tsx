import { Heart, StarIcon } from "lucide-react"
import { useState } from "react"


const Card = () => {
const [active, setActive] = useState(false)

const favourite = () => {
  setActive(!active)
}

  return (
    <div className="p-4 rounded-md shadow-md hover:shadow-xl hover:-translate-0.5  bg-white transition ">
      <div className="w-full"><img src="/carousel/motherboard.png" alt="motherboard.png" className="h-44 w-full object-cover rounded-md" /></div>
      <div className="space-y-1.5 mt-3 mb-1 text-gray-950">
        <div className="font-semibold leading-tight">Mother board ssaf asdfasd asdf sfsf sdf skaflslf sdfllsf</div>
        <div className="flex gap-1 items-center"><span className="text-yellow-400 fill-yellow-400 "><StarIcon size={16} fill="yellow-400" /></span> 4.8 (123)</div>
        <div className="text-gray-900 text-sm">By PixelKart</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2"><span >$1299.99</span><span className="text-sm line-through text-gray-700">$1499.99</span></div>
          <button className={`border-1 border-gray-300 p-2 rounded-md cursor-pointer transition-all ease-in duration-400 ${active? "bg-white": "bg-black"}` } onClick={favourite} ><Heart size={16} stroke={active? "red":"white"} fill={active? "red":"white"}/></button>
        </div>
      </div>
    </div>
  )
}

export default Card 