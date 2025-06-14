
import { useState } from "react"
import DashbaordNavbar from "../../components/DashbaordNavbar"
import Sidebar from "../../components/Sidebar"
import Overview from "./adminComponents/Overview"
import Profile from "./adminComponents/Profile"
import Users from "./adminComponents/Users"
import Workers from "./adminComponents/Workers"
import Inventory from "./adminComponents/Inventory"


const Main = () => {
    const [menuButton, setMenuButton] = useState<boolean>(true)
    const [title, setTitle] = useState<string>("Profile")
  return (
    <div className="w-full flex min-h-screen">
        <div className={`transition-all duration-300 ease-in-out ${menuButton? "w-17/100" : "min-w-fit"}`}><Sidebar menuButton={menuButton} setMenuButton={setMenuButton} setTitle={setTitle}/></div>
        <div className="w-full">
            <DashbaordNavbar menuButton={menuButton} title={title}/>
            <div className={`pr-4 sm:pr-30 pt-8 transition-all ease-in-out duration-500 ${menuButton? "sm:pl-5":"sm:pl-15"}`}>
            {/* <Overview/> */}
            {/* <Profile/> */}
            {/* <Users/> */}
            {/* <Workers/> */}
            <Inventory/>
            </div>
        </div>
    </div>
  )
}

export default Main