import { Eye, Heart, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getWishlist } from '../../api/AccountAPI'
import { toast } from 'react-toastify'
import { favouriteUpdate } from '../../api/ProductAPI'
import { useProductContext } from '../../context/ProductContext'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
interface myWishlistType {
    id: string,
    productName: string,
    photo: string[],
    seller: string,
    price: number,

}


const Wishlist = () => {
    const navigate = useNavigate()
    const {updateproductwishlist} = useProductContext()
    const {userInfo} = useUserContext()
    const [myWishlist, setMyWishlist] = useState<myWishlistType[]>([])
    const [change, setchange] = useState(false)
    useEffect(() => {
        const callapi = async () => {
            try {
                const response = await getWishlist('account/wishlist')
                
                if (response.status === 400 || response.status === 500 || response.status === 404) {
                    toast.error(response.data.message, {
                        autoClose: 1000,
                        theme: 'light'
                    })
                    return
                }
              
                setMyWishlist(response.safeData)
                
            } catch (error) {
                console.log(error)
            }
        }
        callapi()
    }, [change])


    const favourite = async(product: myWishlistType) => {
     
      try{
        const response = await favouriteUpdate('updatefavourite',{id: product.id})
        
        if(response.status === 400 || response.status === 500){
          toast.error(response.data.message, {
            autoClose: 1000,
            theme: 'light'
          })
          return
        }
        setchange(prev => !prev)
        updateproductwishlist(product.id, userInfo!._id)
        
      }
      catch(error){
        console.log(error)
      }
      
    }

    const handleView = (id: string) => {
        navigate(`/product/${id}`)
    }


    const gobrows = () => {
        navigate('/product')
    }

    return (
        <div className='w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md'>
            <div>
                <div className="text-black font-semibold text-xl">My Wishlist</div>
                <div className="text-gray-600 text-sm">Items you want to buy later</div>
            </div>
            <div className='mt-8'>
                {
                    myWishlist.length === 0 ? (
                        <div className='w-full flex flex-col items-center gap-2 min-h-70 rounded-md justify-center'>
                            <div className='text-gray-500'><Heart size={46} /></div>
                            <div className='text-gray-600 text-xl'>Your wishlist is empty</div>
                            <div><button className='px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer' onClick={gobrows} >Browse Products</button></div>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            {
                                myWishlist.map(item => (
                                    <div key={item.id} className="flex justify-between border border-gray-300 rounded-md p-3">

                                        <div className="flex gap-2">
                                            <div className="h-18 w-18"><img src={item.photo[0]} alt={item.productName} className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm" /></div>
                                            <div>
                                                <div className="text-lg font-semibold">{item.productName}</div>
                                                <div className="text-sm text-gray-600">by {item.seller}</div>
                                                <div className="text-sm text-gray-600">Rs {item.price}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer shadow-sm"><Eye strokeWidth={1.2} onClick={()=> handleView(item.id)} /></button>
                                            <button className="p-2 border border-red-300 text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer shadow-sm" onClick={()=>favourite(item)}><Trash2 strokeWidth={1.2} /></button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default Wishlist