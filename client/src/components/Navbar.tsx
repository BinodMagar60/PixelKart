import { LayoutDashboard, LogOut, Search, Settings, ShoppingCart, User } from "lucide-react"

import { useEffect, useRef, useState } from "react"



const Navbar = () => {
    const [loggedIn, setLogginedIn] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    type dropdown = {
        name: string,
        icon: React.ReactNode,
        action?: () => void,
        style?: string
    }

    const Profile = () => {
        setOpen(prev => !prev)
    }


    const handleLogout = () => {
        setLogginedIn(prev => !prev)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    const dropdownData: dropdown[] = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={15} strokeWidth={1.5} />,

        },
        {
            name: "Setting",
            icon: <Settings size={15} strokeWidth={1.5} />,

        },
        {
            name: "Logout",
            icon: <LogOut size={15} strokeWidth={1.5} />,
            style: "text-red-500 border-t-1 border-gray-300",
            action: handleLogout
        }
    ]



    return (
        <div className="w-full sticky top-0 px-10 sm:px-15 xl:px-30 bg-white z-30">
            <div className="w-full h-15 flex items-center justify-between gap-2">
                <div className="flex h-full items-center gap-1 min-w-12"><img src="/logo.png" alt="PixelKart" className="h-10 w-10" /><span className="text-3xl font-bold hidden xl:block">PixelKart</span></div>
                <div className="f-full max-w-150 w-full relative hidden lg:block"><span className="text-gray-400 absolute left-2 top-[50%] translate-y-[-50%]"><Search size={16} /></span><input type="text" placeholder="Search for the computers, laptops, parts..." className="border-1 py-2 w-full h-full border-gray-300 drop-shadow-sm rounded-sm pl-8 pr-2 placeholder:text-gray-400 text-gray-700 focus:shadow-sm" /></div>
                <div className="flex gap-1 items-center min-w-55 ">
                    {
                        !isSearchOpen && (
                            <div className="flex items-center lg:hidden ">
                                <button className="rounded-sm px-2 py-1.5 cursor-pointer flex gap-2 h-full items-center hover:bg-gray-100 shadow-sm z-50" onClick={()=> setIsSearchOpen(true)}><Search strokeWidth={1} /></button>
                            </div>
                        )
                    }
                    {
                        !loggedIn && (
                            <>
                                <div>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex gap-2 items-center hover:bg-gray-100" onClick={handleLogout}><User size={16} strokeWidth={2} /> Sign In</button>
                                </div>
                                <div>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex items-center bg-black hover:bg-gray-800 text-white" onClick={handleLogout}>Join Now</button>
                                </div>
                            </>
                        )
                    }
                    {
                        loggedIn && (
                            <>
                                <div>
                                    <button className="rounded-sm px-2 py-1.5 cursor-pointer flex gap-2 h-full items-center hover:bg-gray-100 shadow-sm z-50"><ShoppingCart strokeWidth={1} /></button>
                                </div>
                                <div className="relative" ref={dropdownRef}>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex gap-2 items-center hover:bg-gray-100" onClick={Profile}><User size={16} strokeWidth={2} /> John Doe</button>
                                    {
                                        isOpen && (
                                            <div className="absolute right-0  min-w-full rounded-sm shadow ">
                                                <ul>
                                                    {
                                                        dropdownData.map((item: dropdown, index: number) => {
                                                            return (
                                                                <li key={index}>
                                                                    <button className={`flex gap-2 items-center cursor-pointer px-3 w-full bg-white h-full py-2 hover:bg-gray-100 transition text-sm ${item.style}`} onClick={item.action}>
                                                                        <span>{item.icon}</span> <span>{item.name}</span>
                                                                    </button>
                                                                </li>)
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                </div>
                            </>
                        )
                    }

                </div>
            </div>
            {
                isSearchOpen && (
                    <div className="w-full pb-2 flex gap-2">
                        <div className=" w-full relative lg:hidden"><span className="text-gray-400 absolute left-2 top-[50%] translate-y-[-50%]"><Search size={16} /></span><input type="text" placeholder="Search for the computers, laptops, parts..." className="border-1 py-2 w-full h-full border-gray-300 drop-shadow-sm rounded-sm pl-8 pr-2 placeholder:text-gray-400 text-gray-700 focus:shadow-sm" /></div>
                        <button className="border px-3 py-1 border-gray-300 cursor-pointer rounded-md hover:bg-gray-100" onClick={()=>setIsSearchOpen(false)}>Close</button>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar