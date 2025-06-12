
import { useState } from "react"
import DashbaordNavbar from "../../components/DashbaordNavbar"
import Sidebar from "../../components/Sidebar"


const Main = () => {
    const [menuButton, setMenuButton] = useState<boolean>(true)
  return (
    <div className="w-full flex min-h-screen">
        <div className={`transition-all duration-300 ease-in-out ${menuButton? "w-17/100" : "min-w-fit"}`}><Sidebar menuButton={menuButton} setMenuButton={setMenuButton}/></div>
        <div className="w-full">
            <DashbaordNavbar/>
        </div>
    </div>
  )
}

export default Main