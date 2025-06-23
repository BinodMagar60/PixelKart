import { createContext, useContext, useEffect, useState } from "react";
import type { ProductContextType, ProductType } from "../types/ProductType";
import axios from "axios";







const ProductContext = createContext<ProductContextType | null>(null)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {

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
    photo: [],
    featured: false,
    views: 0,
    soldNumber: 0
  })
  const [products, setProducts] = useState<ProductType[]>([])
  const [productLoading, setProductLoading] = useState(true)
  useEffect(() => {
    const apiCall = async () => {
      try {
        setProductLoading(true)
        const response = await axios.get('http://localhost:5000/product/allproducts')
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
  },[])


 

  return (
    <ProductContext.Provider value={{ products, setProducts, productLoading, setProductLoading, selectedProduct, setSelectedProduct }}>
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


