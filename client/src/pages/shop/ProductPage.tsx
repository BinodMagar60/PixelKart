import FilterPanel from "../../components/FilterPanel"
import Navbar from "../../components/Navbar"
import Products from "../../components/Products"

const ProductPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="px-30 relative flex w-full pt-8 space-x-5">
            <div>
                <FilterPanel/>
            </div>
            <div className="w-full">
                <Products/>
            </div>
        </div>
    </div>
  )
}

export default ProductPage