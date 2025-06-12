import { User } from "lucide-react"

const DashbaordNavbar = () => {
    return (
        <div className="w-full h-15 sticky top-0 pl-10 pr-30 bg-white flex items-center justify-between z-50 border-b border-gray-300">
            <div className="font-semibold text-2xl">Overview</div>
            <div className="flex items-center gap-3"><User size={20}/> Admin User</div>
        </div>
    )
}

export default DashbaordNavbar