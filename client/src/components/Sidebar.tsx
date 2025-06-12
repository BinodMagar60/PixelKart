import { FolderTreeIcon, Heart, Home, LineChart, Menu, Package, Settings, ShoppingBag, ShoppingCart, Store, User, Users } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react";



interface sideBarComponentsTypes {
    adminSidebar: ({
        name: string,
        icon: ReactNode,
        link: string
    })[],
    userSidebar: ({
        name: string,
        icon: ReactNode,
        link: string
    })[],
}

interface sidebarTYpes {
    name: string,
    icon: ReactNode,
    link: string,
}

interface SidebarProps {
    menuButton: boolean;
    setMenuButton: React.Dispatch<React.SetStateAction<boolean>>;
}



const Sidebar = ({ menuButton, setMenuButton }: SidebarProps) => {

    const [sidebar, setSidebar] = useState<sidebarTYpes[] | null>(null)
    

    const [ActiveSidebar, setActiveSidebar] = useState("Profile")

    const sideBarComponents: sideBarComponentsTypes = {
        adminSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "",
            },
            {
                name: "Overview",
                icon: <Home />,
                link: "",
            },
            {
                name: "User Management",
                icon: <Users />,
                link: "",
            },
            {
                name: "Worker Management",
                icon: <Users />,
                link: "",
            },
            {
                name: "Inventory",
                icon: <Package />,
                link: "",
            },
            {
                name: "Orders",
                icon: <ShoppingCart />,
                link: "",
            },
            {
                name: "Categories",
                icon: <FolderTreeIcon />,
                link: "",
            },
            {
                name: "Analytics",
                icon: <LineChart />,
                link: "",
            },
            {
                name: "Setting",
                icon: <Settings />,
                link: "",
            }
        ],
        userSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "",
            },
            {
                name: "Dashbaord",
                icon: <Home />,
                link: "",
            },
            {
                name: "My Purchases",
                icon: <ShoppingBag />,
                link: "",
            },
            {
                name: "My Listings",
                icon: <Store />,
                link: "",
            },
            {
                name: "Sold Items",
                icon: <Package />,
                link: "",
            },
            {
                name: "Wishlist",
                icon: <Heart />,
                link: "",
            },
            {
                name: "Setting",
                icon: <Settings />,
                link: "",
            },
        ],
    }
    const isAdmin = true;

    useEffect(() => {
        
        if (isAdmin) {
            setSidebar(sideBarComponents.adminSidebar)
        }
        else {
            setSidebar(sideBarComponents.userSidebar)
        }
    }, [])

    return (
        <div className="bg-white w-full min-h-screen flex flex-col">
            <div className="flex items-center h-15 border-b border-gray-300 justify-evenly ">
                <button className="cursor-pointer" onClick={() => setMenuButton(!menuButton)}><Menu /></button>
                <button className={`transition-all duration-500 overflow-hidden ${
    menuButton ? "opacity-100 max-w-full ease-in" : "opacity-0 max-w-0 h-0 ease-out scale-0"
  }`}>
                    <div className="flex h-full items-center gap-1"><img src="/logo.png" alt="PixelKart" className="h-10" /><span className="text-3xl font-bold">PixelKart</span></div>
                </button>
            </div>
            <div className="border-r border-gray-300 flex-1 overflow-y-auto text-gray-700 pt-10">
                {
                    sidebar?.map((item, index) => (
                        <div key={index} className={`flex gap-4 p-4 hover:bg-gray-100 ${ActiveSidebar === item.name ? "text-[#2563EB] border-r-2 border-[#2563EB] bg-[#EFF6FF]" : ""} ${menuButton ? " pr-0" : ""}`}
                            onClick={() => setActiveSidebar(item.name)}>
                            <div>{item.icon}</div>
                            <div className={`transition-all duration-500 overflow-hidden ${
    menuButton ? "opacity-100 max-w-full ease-in h-5" : "opacity-0 max-w-0 h-0 ease-out scale-0"
  }`}>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar