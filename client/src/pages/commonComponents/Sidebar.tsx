import { FolderTreeIcon, Heart, Home, Menu, Package, Settings, ShoppingBag, ShoppingCart, Store, User, Users } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";


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
    const location = useLocation();

    const {userInfo} = useUserContext()
    const [sidebar, setSidebar] = useState<sidebarTYpes[] | null>(null)
    // console.log(userInfo)
    const [role, setRole] = useState<roleType>("User")
    useEffect(()=> {
        if(userInfo){
            setRole(userInfo.role!)
        }
    },[])
    // console.log(role)
    const [ActiveSidebar, setActiveSidebar] = useState("")

    const sideBarComponents: sideBarComponentsTypes = {
        adminSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "/account/profile",
            },
            {
                name: "Overview",
                icon: <Home />,
                link: "/account/overview",
            },
            {
                name: "User Management",
                icon: <Users />,
                link: "/account/users",
            },
            {
                name: "Worker Management",
                icon: <Users />,
                link: "/account/workers",
            },
            {
                name: "Inventory",
                icon: <Package />,
                link: "/account/inventory",
            },
            {
                name: "Orders",
                icon: <ShoppingCart />,
                link: "/account/order",
            },
            {
                name: "Categories",
                icon: <FolderTreeIcon />,
                link: "/account/category",
            }
        ],
        workerSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "/account/profile",
            },
            {
                name: "User Management",
                icon: <Users />,
                link: "/account/users",
            },
            {
                name: "Inventory",
                icon: <Package />,
                link: "/account/inventory",
            },
            {
                name: "Orders",
                icon: <ShoppingCart />,
                link: "/account/order",
            },
            {
                name: "Setting",
                icon: <Settings />,
                link: "/account/setting",
            }
        ],
        userSidebar: [
            {
                name: "Profile",
                icon: <User />,
                link: "/account/profile",
            },
            {
                name: "Dashboard",
                icon: <Home />,
                link: "/account/dashboard",
            },
            {
                name: "My Purchases",
                icon: <ShoppingBag />,
                link: "/account/mypurchase",
            },
            {
                name: "My Listings",
                icon: <Store />,
                link: "/account/mylisting",
            },
            {
                name: "Orders Request",
                icon: <Package />,
                link: "/account/order",
            },
            {
                name: "Wishlist",
                icon: <Heart />,
                link: "/account/wishlist",
            },
            {
                name: "Setting",
                icon: <Settings />,
                link: "/account/setting",
            },
        ],
    }

    useEffect(() => {
    let currentSidebar: sidebarTYpes[] = [];

    if (role === "Admin") {
        currentSidebar = sideBarComponents.adminSidebar;
    } else if (role === "Worker") {
        currentSidebar = sideBarComponents.workerSidebar;
    } else {
        currentSidebar = sideBarComponents.userSidebar;
    }

    setSidebar(currentSidebar);

    const matchedItem = currentSidebar.find(item =>
        location.pathname.startsWith(item.link)
    );

    if (matchedItem) {
        setActiveSidebar(matchedItem.name);
        setTitle(matchedItem.name);
    }
}, [role, location.pathname, setTitle]);



    return (
        <div className="bg-white w-full h-fit sm:min-h-screen flex flex-col sticky top-0">
            <div className={`flex items-center h-15 border-b border-gray-300 pl-4 gap-4`}>
                <button className="cursor-pointer" onClick={() => setMenuButton(!menuButton)}><Menu /></button>
                <button className={`transition-all hidden sm:block ease-in-out duration-500 overflow-hidden ${menuButton ? "" : "w-0"
                    }`}>
                    <Link to={"/"}>
                    <div className="flex h-full items-center gap-1"><img src="/logo.png" alt="PixelKart" className="h-10" /><span className="text-3xl font-bold">PixelKart</span></div>
                    </Link>
                </button>
            </div>
            <div className="border-r border-gray-300 flex-1 overflow-y-auto text-gray-700 pt-10 hidden sm:block">
                {
                    sidebar?.map((item, index) => (
                        <Link to={item.link} key={index}>
                        <div  className={`flex gap-4 p-4 select-none cursor-pointer hover:bg-gray-100 ${ActiveSidebar === item.name ? "text-[#2563EB] border-r-2 border-[#2563EB] bg-[#EFF6FF]" : ""} ${menuButton ? " pr-0" : ""}`}
                            onClick={() => {
                                setActiveSidebar(item.name)
                                setTitle(item.name)
                            }}>
                            <div>{item.icon}</div>
                            <div className={`transition-all ease-in-out whitespace-nowrap duration-500 overflow-hidden ${menuButton ? "" : "w-0"
                                }`}>{item.name}</div>
                        </div></Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar