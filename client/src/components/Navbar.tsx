import { Heart, Home, LogOut, Package, Search, Settings, ShoppingBag, ShoppingCart, User } from "lucide-react"

import { useEffect, useRef, useState } from "react"
import { useUserContext } from "../context/UserContext"
import { logoutUser } from "../api/LoginRegisterAPI"
import { Link, useNavigate } from "react-router-dom"
import { useProductContext } from "../context/ProductContext"
import type { ProductType } from "../types/ProductType"

type dropdown = {
    name: string,
    icon: React.ReactNode,
    action?: () => void,
    style?: string
    link?: string
}

const Navbar = () => {
    const { products } = useProductContext()
    const { userInfo, setUserInfo, setUserInfoChange } = useUserContext()
    const [isOpen, setOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const navigate = useNavigate();
    const [dropdownData, setDropdownData] = useState<dropdown[]>([])
    const [searched, setSearched] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [suggestedProduct, setSuggestedProduct] = useState<ProductType[]>([])
    const [isSuggestionOpen, setSuggestionOpen] = useState(false)

    const Profile = () => {
        setOpen(prev => !prev)
    }
    const handleLogout = async () => {
        const response = await logoutUser('auth/users/logout')
        if (response.status === 400 || response.status === 500) {
            return
        }

        setUserInfo(null)
        setUserInfoChange(prev => !prev)
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


    const dropdownoptions = {
        user: [
            {
                name: "Profile",
                icon: <User size={15} strokeWidth={1.5} />,
                link: "/account/profile"
            },
            {
                name: "Purchase",
                icon: <ShoppingBag size={15} strokeWidth={1.5} />,
                link: "/account/mypurchase"
            },
            {
                name: "Wishlist",
                icon: <Heart size={15} strokeWidth={1.5} />,
                link: "/account/wishlist"
            },
            {
                name: "Setting",
                icon: <Settings size={15} strokeWidth={1.5} />,
                link: "/account/setting"
            },
            {
                name: "Logout",
                icon: <LogOut size={15} strokeWidth={1.5} />,
                style: "text-red-500 border-t-1 border-gray-300",
                action: handleLogout
            }
        ],
        admin: [
            {
                name: "Profile",
                icon: <User size={15} strokeWidth={1.5} />,
                link: "/account/profile"
            },
            {
                name: "Overview",
                icon: <Home size={15} strokeWidth={1.5} />,
                link: "/account/overview"
            },
            {
                name: "Orders",
                icon: <ShoppingCart size={15} strokeWidth={1.5} />,
                link: "/account/order"
            },
            {
                name: "Inventory",
                icon: <Package size={15} strokeWidth={1.5} />,
                link: "/account/inventory"
            },
            {
                name: "Setting",
                icon: <Settings size={15} strokeWidth={1.5} />,
                link: "/account/setting"
            },
            {
                name: "Logout",
                icon: <LogOut size={15} strokeWidth={1.5} />,
                style: "text-red-500 border-t-1 border-gray-300",
                action: handleLogout
            }
        ],
        Worker: [
            {
                name: "Profile",
                icon: <User size={15} strokeWidth={1.5} />,
                link: "/account/profile"
            },
            {
                name: "Orders",
                icon: <ShoppingCart size={15} strokeWidth={1.5} />,
                link: "/account/order"
            },
            {
                name: "Inventory",
                icon: <Package size={15} strokeWidth={1.5} />,
                link: "/account/inventory"
            },
            {
                name: "Setting",
                icon: <Settings size={15} strokeWidth={1.5} />,
                link: "/account/setting"
            },
            {
                name: "Logout",
                icon: <LogOut size={15} strokeWidth={1.5} />,
                style: "text-red-500 border-t-1 border-gray-300",
                action: handleLogout
            }
        ],
    }

    useEffect(() => {
        if (userInfo?.role === "User") {
            setDropdownData(dropdownoptions.user);
        } else if (userInfo?.role === "Worker") {
            setDropdownData(dropdownoptions.Worker);
        } else if (userInfo?.role === "Admin") {
            setDropdownData(dropdownoptions.admin);
        }
    }, [userInfo]);

    useEffect(() => {
        if (searched !== "") {
            setSuggestionOpen(true);
            const newData = products.filter(item =>
                item.productName.toLowerCase().includes(searched.toLowerCase()) ||
                item.category.toLowerCase().includes(searched.toLowerCase())
            );
            setSuggestedProduct(newData);
        } else {
            setSuggestionOpen(false);
            setSuggestedProduct([]);
        }
    }, [searched, products]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearched("")
        navigate(`/product/?q=${searched}`)
    }

    return (
        <div className="w-full sticky top-0 px-10 sm:px-15 xl:px-30 bg-white z-30">
            <div className="w-full h-15 flex items-center justify-between gap-2">
                <Link to={'/'}>
                    <div className="flex h-full items-center gap-1 min-w-12"><img src="/logo.png" alt="PixelKart" className="h-10 w-10" /><span className="text-3xl font-bold hidden xl:block">PixelKart</span></div>
                </Link>
                <form onSubmit={handleSubmit} className="f-full max-w-150 w-full relative hidden lg:block">
                    <div>
                        <span className="text-gray-400 absolute left-2 top-[50%] translate-y-[-50%]"><Search size={16} /></span>
                        <input type="text" placeholder="Search for the computers, laptops, parts..." className="border-1 py-2 w-full h-full border-gray-300 rounded-sm pl-8 pr-2 placeholder:text-gray-400 text-gray-700 focus:shadow-sm" value={searched} onChange={(e) => {
                            setSearched(e.target.value)

                        }} />
                    </div>
                    {
                        isSuggestionOpen && suggestedProduct && (
                            <div className="w-full absolute rounded-md shadow p-1 bg-white mt-1 hidden lg:block">
                                {
                                    suggestedProduct.slice(0, 5).map(item => (
                                        <div key={item.id} className="p-4 hover:bg-gray-100 rounded-md" onClick={() => {
                                            navigate(`/product/${item.id}`)
                                        }}>
                                            {item.productName}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                </form>
                <div className="flex gap-1 justify-end min-w-55 ">
                    {
                        !isSearchOpen && (
                            <div className="flex items-center lg:hidden ">
                                <button className="rounded-sm px-2 py-1.5 cursor-pointer flex gap-2 h-full items-center hover:bg-gray-100 border border-gray-300 z-50" onClick={() => setIsSearchOpen(true)}><Search strokeWidth={1.5} /></button>
                            </div>
                        )
                    }

                    {
                        !userInfo && (
                            <>
                                <div>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex gap-2 items-center hover:bg-gray-100" onClick={() => (
                                        navigate("/login")
                                    )}><User size={16} strokeWidth={2} /> Sign In</button>
                                </div>
                                <div>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex items-center bg-black hover:bg-gray-800 text-white"
                                        onClick={() => (
                                            navigate("/register")
                                        )}>Join Now</button>
                                </div>
                            </>
                        )
                    }
                    {
                        userInfo && (
                            <>
                                {
                                    userInfo.role === "User" && <div>
                                        <button className="rounded-sm px-2 py-1.5 cursor-pointer flex gap-2 h-full items-center hover:bg-gray-100 border border-gray-300 z-50" onClick={() => { navigate('/cart') }}><ShoppingCart strokeWidth={1.5} /></button>
                                    </div>
                                }
                                <div className="relative" ref={dropdownRef}>
                                    <button className="rounded-sm px-3 py-1.5 cursor-pointer flex gap-2 items-center hover:bg-gray-100" onClick={Profile}><User size={20} strokeWidth={2} />{userInfo.firstName}</button>
                                    {
                                        isOpen && (
                                            <div className="absolute right-0  min-w-32 w-full rounded-sm shadow ">
                                                <ul>
                                                    {
                                                        dropdownData.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    {
                                                                        item.link ? (
                                                                            <Link to={`${item?.link}`}>
                                                                                <button className={`flex gap-2 items-center cursor-pointer px-3 w-full bg-white h-full py-2
                                                                                     hover:bg-gray-100 transition text-sm     ${item.style}`} onClick={item.action}>
                                                                                    <span>{item.icon}</span> <span>{item.name}</span>
                                                                                </button>
                                                                            </Link>
                                                                        ) : (
                                                                            <button className={`flex gap-2 items-center cursor-pointer px-3 w-full bg-white h-full py-2 hover:bg-gray-100 transition text-sm ${item.style}`} onClick={item.action}>
                                                                                <span>{item.icon}</span> <span>{item.name}</span>
                                                                            </button>
                                                                        )
                                                                    }
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
        <form onSubmit={handleSubmit} className="w-full pb-2 flex gap-2">
            <div className="w-full relative lg:hidden">
                <span className="text-gray-400 absolute left-2 top-[50%] translate-y-[-50%]">
                    <Search size={16} />
                </span>
                <input
                    type="text"
                    placeholder="Search for the computers, laptops, parts..."
                    className="border-1 py-2 w-full h-full border-gray-300 rounded-sm pl-8 pr-2 placeholder:text-gray-400 text-gray-700 focus:shadow-sm"
                    value={searched}
                    onChange={(e) => {
                        setSearched(e.target.value)
                    }}
                />
                 {
                        isSuggestionOpen && suggestedProduct && (
                            <div className="w-full absolute rounded-md shadow p-1 bg-white mt-1 lg:hidden">
                                {
                                    suggestedProduct.slice(0, 5).map(item => (
                                        <div key={item.id} className="p-4 hover:bg-gray-100 rounded-md" onClick={() => {
                                            navigate(`/product/${item.id}`)
                                        }}>
                                            {item.productName}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
            </div>
            <button
                type="button"
                className="border px-3 py-1 border-gray-300 cursor-pointer rounded-md hover:bg-gray-100"
                onClick={() => {setIsSearchOpen(false)
                    setSearched("")
                }}
            >
                Close
            </button>
        </form>
    )
}


        </div>
    )
}

export default Navbar