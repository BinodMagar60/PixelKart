import { useEffect, useState } from "react"
import Card from "./Card"
import { useProductContext } from "../context/ProductContext"
import { useNavigate } from "react-router-dom"

type propsType = {
  sectionName: string,
  sectionBackgroundColor: string
}


const Section = ({ sectionName, sectionBackgroundColor }: propsType) => {
  const { products } = useProductContext()
  const [itemsToShow, setItemsToShow] = useState(12)
  const navigate = useNavigate()


  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsToShow(4)
      } else if (width >= 640 && width < 1024) {
        setItemsToShow(4)
      } else if (width >= 1024 && width < 1280) {
        setItemsToShow(6)
      } else if (width >= 1280 && width < 1536) {
        setItemsToShow(8)
      } else {
        setItemsToShow(10)
      }
    }

    updateItemsToShow()
    window.addEventListener("resize", updateItemsToShow)
    return () => window.removeEventListener("resize", updateItemsToShow)
  }, [])

  const filteredData = () => {
    if (sectionName === 'Featured Products') {
      return products.filter(item => item.featured === true)
    }
    else if (sectionName === 'New Arrivals') {
      return [...products].sort((a, b) => {
        return new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime();
      });
    }
    else {
      return products
    }
  }

  const handleViewMore = () => {
    navigate('/product')
  }

  const filteredProduct = filteredData()

  return (
    <div className={`w-full px-10 sm:px-15 xl:px-30 lg:grid flex flex-col items-center py-12 ${sectionBackgroundColor}`}>
      <div className="mb-8 font-bold text-2xl">{sectionName}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {filteredProduct.slice(0, itemsToShow).map(item => (
          <span key={item.id}><Card product={item}/></span>
        ))}
      </div>
      <div className="w-full flex justify-center"><button className="px-4 py-1 border border-gray-300 rounded-md bg-white cursor-pointer mt-8" onClick={handleViewMore}>View All</button></div>
    </div>
  )
}

export default Section
