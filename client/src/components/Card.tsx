import { Heart, StarIcon } from "lucide-react"
import type { ProductType } from "../types/ProductType"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useProductContext } from "../context/ProductContext"
import { favouriteUpdate } from "../api/ProductAPI"
import { toast } from "react-toastify"


const Card = ({product}: {product: ProductType}) => {
const { userInfo } = useUserContext()
const { updateproductwishlist } = useProductContext()
const navigate = useNavigate()

const onClickHandle = (id:string) => {
  navigate(`/product/${id}`)
} 

const favourite = async(e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  e.stopPropagation()
  try{
    const response = await favouriteUpdate('updatefavourite',{id: product.id})
    
    if(response.status === 400 || response.status === 500){
      toast.error(response.data.message, {
        autoClose: 1000,
        theme: 'light'
      })
      return
    }

    updateproductwishlist(product.id, userInfo!._id)
    
  }
  catch(error){
    console.log(error)
  }
  
}

  return (
    <div className="p-4 rounded-md shadow-md hover:shadow-xl hover:-translate-0.5  bg-white transition max-w-80" onClick={()=>{onClickHandle(product.id)}}>
      <div><img src={product.photo[0].url} alt="motherboard.png" className="h-44 min-w-68 object-cover rounded-md"/></div>
      <div className="space-y-1.5 mt-3 mb-1 text-gray-950">
        <div className="font-semibold leading-tight text-xl">{product.productName}</div>
        <div className="flex gap-1 items-center text-sm"><span className="text-yellow-400 fill-yellow-400 "><StarIcon size={16} fill="yellow-400"/></span> 4.8 (123)</div>
        <div className="text-gray-600 text-xs">By {product.poster}</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 font-semibold"><span >Rs.{product.price}</span>
          {
            product.originalPrice > product.price && <span className="text-xs text-gray-600 line-through">Rs.{product.originalPrice}</span>
          }
          </div>
          {
            userInfo && userInfo.role === "User" && (
              <button className={`border-1 border-gray-300 p-2 rounded-md cursor-pointer transition-all ease-in duration-400 bg-white` } onClick={favourite} ><Heart size={16} stroke={product.userWishlist.includes(userInfo?._id)? "red":"black"} fill={product.userWishlist.includes(userInfo?._id)? "red":"white"}/></button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Card 