import { User } from "lucide-react"

interface SidebarProps {
    menuButton: boolean;
   
}

const DashbaordNavbar = ({ menuButton}: SidebarProps) => {
    return (
        <div className="w-full h-15 sticky top-0 pr-30 bg-white flex items-center justify-between z-50 border-b border-gray-300">
            <div className={`font-semibold text-2xl transition-all ease-in-out duration-500 ${menuButton? "pl-5":"pl-15"}`}>Overview</div>
            <div className="flex items-center gap-3"><User size={20}/> Admin User</div>
        </div>
    )
}

export default DashbaordNavbar