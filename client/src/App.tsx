
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {GoogleOAuthProvider} from '@react-oauth/google'
import Home from "./pages/shop/Home"
import Error from "./components/Error"
import ProductPage from "./pages/shop/ProductPage"
import { ProductProvider } from "./context/productContext"
import ProductDetial from "./pages/shop/ProductDetial"
import Register from "./pages/shop/Register"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Register/>,
    errorElement: <Error/>,
  },
  {
    path: "/product",
    element: <ProductPage/>,
    errorElement: <Error/>
  },
  {
    path: "/product/:id",
    element: <ProductDetial />,
    errorElement: <Error/>
  },
])


const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f091] w-full relative">
      <ProductProvider>
        <GoogleOAuthProvider clientId="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">
          <RouterProvider router={router}/>
        </GoogleOAuthProvider>
      </ProductProvider>
    </div>
  )
}

export default App