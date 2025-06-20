
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/shop/Home"
import Error from "./components/Error"
import ProductPage from "./pages/shop/ProductPage"
import { ProductProvider } from "./context/productContext"
import ProductDetial from "./pages/shop/ProductDetial"
import Register from "./pages/shop/Register"
import Login from "./pages/shop/Login"
import { UserProvider } from "./context/UserContext"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/product",
    element: <ProductPage />,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: "/product/:id",
    element: <ProductDetial />,
    errorElement: <Error />
  },
])


const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f091] w-full relative">
      <UserProvider>
        <ProductProvider>
        <ToastContainer/>
          <RouterProvider router={router} />
      </ProductProvider>
      </UserProvider>
    </div>
  )
}

export default App