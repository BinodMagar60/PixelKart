import { Heart, StarIcon } from "lucide-react"
import { useState } from "react"
import type { ProductType } from "../types/ProductType"
import { useNavigate } from "react-router-dom"


const Card = ({product}: {product: ProductType}) => {
const [active, setActive] = useState(false)
const navigate = useNavigate()

const onClickHandle = (id:number) => {
  navigate(`/product/${id}`)
} 

const favourite = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  e.stopPropagation()
  setActive(!active)
}

  return (
    <div className="p-4 rounded-md shadow-md hover:shadow-xl hover:-translate-0.5  bg-white transition max-w-80" onClick={()=>{onClickHandle(product.id)}}>
      <div><img src="/carousel/motherboard.png" alt="motherboard.png" className="h-44 min-w-68 object-cover rounded-md"/></div>
      <div className="space-y-1.5 mt-3 mb-1 text-gray-950">
        <div className="font-semibold leading-tight">{product.productName}</div>
        <div className="flex gap-1 items-center"><span className="text-yellow-400 fill-yellow-400 "><StarIcon size={16} fill="yellow-400" /></span> 4.8 (123)</div>
        <div className="text-gray-900 text-sm">By {product.seller}</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2"><span >Rs.{product.price}</span><span className="text-sm line-through text-gray-700">Rs.{product.originalPrice}</span></div>
          <button className={`border-1 border-gray-300 p-2 rounded-md cursor-pointer transition-all ease-in duration-400 bg-white` } onClick={favourite} ><Heart size={16} stroke={active? "red":"black"} fill={active? "red":"white"}/></button>
        </div>
      </div>
    </div>
  )
}

export default Card 