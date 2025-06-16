import { FolderTreeIcon, Heart, Home, LineChart, Menu, Package, Settings, ShoppingBag, ShoppingCart, Store, User, Users } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react";



interface sideBarComponentsTypes {
    adminSidebar: ({
        name: string,
        icon: ReactNode,
        link: string
    })[],
    workerSidebar: ({
        name: string,
        icon: ReactNode,
        link: string,
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
    menuButton: boolean,
    setMenuButton: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
}

type roleType = "User" | "Admin" | "Worker"


const Sidebar = ({ menuButton, setMenuButton, setTitle }: SidebarProps) => {

    const [sidebar, setSidebar] = useState<sidebarTYpes[] | null>(null)

    const [role, setRole] = useState<roleType>("User")
    const [ActiveSidebar, setActiveSidebar] = useState("")

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
        workerSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "",
            },
            {
                name: "User Management",
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
                name: "Dashboard",
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

    useEffect(() => {

        if (role === "Admin") {
            setSidebar(sideBarComponents.adminSidebar)
            setActiveSidebar(sideBarComponents.adminSidebar[0].name)
        }
        else if(role === "Worker"){
            setSidebar(sideBarComponents.workerSidebar)
            setActiveSidebar(sideBarComponents.workerSidebar[0].name)
        }
        else {
            setSidebar(sideBarComponents.userSidebar)
            setActiveSidebar(sideBarComponents.userSidebar[0].name)
        }
    }, [role])

    return (
        <div className="bg-white w-full h-fit sm:min-h-screen flex flex-col sticky top-0">
            <div className={`flex items-center h-15 border-b border-gray-300 pl-4 gap-4`}>
                <button className="cursor-pointer" onClick={() => setMenuButton(!menuButton)}><Menu /></button>
                <button className={`transition-all hidden sm:block ease-in-out duration-500 overflow-hidden ${menuButton ? "opacity-100 max-w-full" : "opacity-0 max-w-0 h-0 scale-0"
                    }`}>
                    <div className="flex h-full items-center gap-1"><img src="/logo.png" alt="PixelKart" className="h-10" /><span className="text-3xl font-bold">PixelKart</span></div>
                </button>
            </div>
            <div className="border-r border-gray-300 flex-1 overflow-y-auto text-gray-700 pt-10 hidden sm:block">
                {
                    sidebar?.map((item, index) => (
                        <div key={index} className={`flex gap-4 p-4 select-none cursor-pointer hover:bg-gray-100 ${ActiveSidebar === item.name ? "text-[#2563EB] border-r-2 border-[#2563EB] bg-[#EFF6FF]" : ""} ${menuButton ? " pr-0" : ""}`}
                            onClick={() => {
                                setActiveSidebar(item.name)
                                setTitle(item.name)
                            }}>
                            <div>{item.icon}</div>
                            <div className={`transition-all ease-in-out duration-500 overflow-hidden ${menuButton ? "opacity-100 max-w-full h-6" : "opacity-0 max-w-0 h-0 scale-0"
                                }`}>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar