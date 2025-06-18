
import { useState } from "react"
import Sidebar from "./commonComponents/Sidebar"

import DashboardNavbar from "./commonComponents/DashboardNavbar"
import MyPurchases from "./user/MyPurchases"
import Inventory from "./admin/Inventory"
import MyListings from "./user/MyListings"
import Orders from "./admin/Orders"
import Wishlist from "./user/Wishlist"



const Main = () => {
    const [menuButton, setMenuButton] = useState<boolean>(true)
    const [title, setTitle] = useState<string>("Profile")
  return (
    <div className="w-full flex min-h-screen">
        <div className={`transition-all duration-300 ease-in-out ${menuButton? "w-17/100" : "min-w-fit"}`}><Sidebar menuButton={menuButton} setMenuButton={setMenuButton} setTitle={setTitle}/></div>
        <div className="w-full">
            <DashboardNavbar menuButton={menuButton} title={title}/>
            <div className={`pr-10 sm:pr-15 xl:pr-30 pt-8 transition-all ease-in-out duration-500 ${menuButton? "sm:pl-5":"sm:pl-15"}`}>
              {/* <MyPurchases/> */}
              {/* <Inventory/> */}
              {/* <Orders/> */}
              {/* <MyListings/> */}
              <Wishlist/>
            </div>
        </div>
    </div>
  )
}

export default Main