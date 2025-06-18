import Main from "./pages/Main"
import Cart from "./pages/shop/Cart"
import Checkout from "./pages/shop/Checkout"
import Home from "./pages/shop/Home"
import ProductDetial from "./pages/shop/ProductDetial"
import ProductPage from "./pages/shop/ProductPage"
import Register from "./pages/shop/Register"


const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f091] w-full relative">
      {/* <ProductPage/> */}
      {/* <Home/> */}
      {/* <ProductDetial/> */}
      {/* <Register/> */}
      {/* <Main/> */}
      {/* <Cart/> */}
      <Checkout/>
    </div>
  )
}

export default App