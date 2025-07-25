import { createContext, useContext, useEffect, useState } from "react";
import type { ProductContextType, ProductType } from "../types/ProductType";
const URI = import.meta.env.VITE_API_URL
import axios from "axios";







const ProductContext = createContext<ProductContextType | null>(null)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [apiChange, setApiChange] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    id: "",
    poster: "",
    role: "",
    productName: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    condition: "",
    qty: 0,
    photo: [{
      id: 0,
      url: ""
    }],
    featured: false,
    views: 0,
    soldNumber: 0,
    createdAt: null,
    userWishlist: [],
    totalRated: 0,
    avgRating: 0,
  })
  const [products, setProducts] = useState<ProductType[]>([])
  const [productLoading, setProductLoading] = useState(true)
  useEffect(() => {
    const apiCall = async () => {
      try {
        setProductLoading(true)
        const response = await axios.get(`${URI}product/allproducts`)
        setProducts(response.data.data)
      }
      catch (error) {
        console.log(error)
      }
      finally{
        setTimeout(() => {
          setProductLoading(false)
        }, 1500);
      }
    }
    apiCall()
  },[apiChange])



  const updateproductwishlist = (pid: string, uid: string) => {
  const newdata = products.map(prev => {
    if (prev.id === pid) {
      const alreadyInWishlist = prev.userWishlist.includes(uid);
      const updatedWishlist = alreadyInWishlist
        ? prev.userWishlist.filter(userId => userId !== uid)  
        : [...prev.userWishlist, uid];                        

      return { ...prev, userWishlist: updatedWishlist };
    }
    return prev;
  });
  setProducts(newdata);
};

 

  return (
    <ProductContext.Provider value={{ products, setProducts, productLoading, setProductLoading, selectedProduct, setSelectedProduct, updateproductwishlist, setApiChange }}>
      {children}
    </ProductContext.Provider>
  )
}



export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within Product Provider")
  }
  return context
}


