
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/shop/Home"
import Error from "./components/Error"
import ProductPage from "./pages/shop/ProductPage"
import { ProductProvider } from "./context/ProductContext"
import ProductDetial from "./pages/shop/ProductDetial"
import Register from "./pages/shop/Register"
import Login from "./pages/shop/Login"
import { UserProvider } from "./context/UserContext"
import Main from "./pages/Main"
import ProtectedRoute from "./utils/ProtectedRoutes"
import Profile from "./pages/commonComponents/Profile"
import Dashboard from "./pages/user/Dashboard"
import MyPurchases from "./pages/user/MyPurchases"
import MyListings from "./pages/user/MyListings"
import Wishlist from "./pages/user/Wishlist"
import Setting from "./pages/commonComponents/Setting"
import Orders from "./pages/admin/Orders"
import Inventory from "./pages/admin/Inventory"
import Users from "./pages/admin/Users"
import Analytics from "./pages/admin/Analytics"
import Categories from "./pages/admin/Categories"
import Workers from "./pages/admin/Workers"
import Overview from "./pages/admin/Overview"


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
  {
    path: "/account",
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Main />,
        children: [
          {
            path: "",
            element: <Navigate to="profile" replace /> 
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "mypurchase",
            element: <MyPurchases />
          },
          {
            path: "mylisting",
            element: <MyListings />
          },
          {
            path: "order",
            element: <Orders />
          },
          {
            path: "wishlist",
            element: <Wishlist />
          },
          {
            path: "setting",
            element: <Setting />
          },
          {
            path: "inventory",
            element: <Inventory />
          },
          {
            path: "users",
            element: <Users />
          },
          {
            path: "workers",
            element: <Workers />
          },
          {
            path: "analytic",
            element: <Analytics />
          },
          {
            path: "category",
            element: <Categories />
          },
          {
            path: "inventory",
            element: <Inventory />
          },
          {
            path: "overview",
            element: <Overview />
          }
        ]
      }
    ]
  },

])


const App = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f091] w-full relative">
      <UserProvider>
        <ProductProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ProductProvider>
      </UserProvider>
    </div>
  )
}

export default App