import { useState } from "react"
import FilterPanel from "../../components/FilterPanel"
import Navbar from "../../components/Navbar"
import Products from "../../components/Products"
import { useSearchParams } from "react-router-dom"
import { useProductContext } from "../../context/ProductContext"
import type { ProductType } from "../../types/ProductType"

export interface IFilter {
  category: string,
  condition: string,
  sorting: string,
  price: number,
}

const ProductPage = () => {
  const { products } = useProductContext()
  const [searchParams] = useSearchParams()
  const searchedcategory = searchParams.get('category')
  const q = searchParams.get('q')

  const searchQuery = q ? q : ""
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [filteringdata, setfilteringdata] = useState({
    category: searchedcategory ?? "All",
    condition: "All",
    sorting: "Highest Rated",
    price: 1500000,
  })

  const searchedData = products.filter(item => {
    return item.productName.toLowerCase().includes(searchQuery?.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const categoryFilteredData = searchedData.filter(item => {
    return item.category.toLowerCase().includes(filteringdata.category === "All" ? "" : filteringdata.category.toLowerCase())
  })

  const conditionFilteredData = categoryFilteredData.filter(item => {
    return item.condition.includes(filteringdata.condition === "All" ? "" : filteringdata.condition)
  })

  const pricefilteredData = conditionFilteredData.filter(item => {
    return item.price <= filteringdata.price
  })

  let finalFilteredData: ProductType[] = []
  switch (filteringdata.sorting) {
    case "Highest Rated":
      finalFilteredData = [...pricefilteredData].sort((a, b) => b.avgRating - a.avgRating);
      break;
    case "Price: Low to High":
      finalFilteredData = [...pricefilteredData].sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      finalFilteredData = [...pricefilteredData].sort((a, b) => b.price - a.price);
      break;
    case "Newest":
      finalFilteredData = [...pricefilteredData].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      break;
    default:
      finalFilteredData = [...pricefilteredData];
  }


  


  return (
    <div>
      <Navbar />
      <div className="px-10 sm:px-15 xl:px-30  flex w-full pt-8 space-x-5">
        <div className={`${!isFilterActive ? "" : "absolute bg-[#00000022]  w-full h-full z-40 top-0 left-0"}`}>
          <FilterPanel isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} filteringdata={filteringdata} setfilteringdata={setfilteringdata} />
        </div>
        <div className="w-full">
          <Products setIsFilterActive={setIsFilterActive} finalFilteredData={finalFilteredData} setfilteringdata={setfilteringdata} searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  )
}

export default ProductPage