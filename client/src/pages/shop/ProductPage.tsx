import { useState } from "react"
import FilterPanel from "../../components/FilterPanel"
import Navbar from "../../components/Navbar"
import Products from "../../components/Products"

const ProductPage = () => {
  

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)


  return (
    <div>
      <Navbar />
      <div className="px-10 sm:px-15 xl:px-30  flex w-full pt-8 space-x-5">
        <div className={`${!isFilterActive? "":"absolute bg-[#00000022]  w-full h-full z-40 top-0 left-0"}`}>
          <FilterPanel isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} />
        </div>
        <div className="w-full">
          <Products setIsFilterActive={setIsFilterActive} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage