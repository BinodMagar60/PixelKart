
const Footer = () => {

     const year:number = new Date().getFullYear()
    return (
        <div className="bg-[#111827] min-h-10 text-white pt-15 pb-5">
            <div className="flex flex-col gap-8 px-10 justify-evenly sm:flex-row sm:px-0">
                <div>
                    <div className="flex items-center gap-2"><img src="/logo.png" alt="PixelKart" className="h-7" /><span className="text-xl font-bold">PixelKart</span></div>
                    <div className="text-gray-300 mt-3">Your trusted marketplace for all things tech</div>
                </div>
                <div>
                    <div className="text-xl font-bold">For You</div>
                    <div className="text-gray-300 cursor-pointer hover:text-white mt-3">Browse Products</div>
                    <div className="text-gray-300 cursor-pointer hover:text-white mt-3">Dashboard</div>
                    <div className="text-gray-300 cursor-pointer hover:text-white mt-3">Profile</div>
                    <div className="text-gray-300 cursor-pointer hover:text-white mt-3">Logout</div>
                </div>
                <div>
                    <div className="text-xl font-bold">Support</div>
                    <div className="text-gray-300 mt-3">Contact: +(977) 9845454545</div>
                    <div className="text-gray-300 cursor-pointer hover:text-white mt-3">Terms of Services</div>
                </div>
            </div>
            <div className="text-center mt-15 text-gray-300">
                {`© ${year} PixelKart. All rights reserved.`}
            </div>
        </div>
    )
}

export default Footer