

const Profile = () => {
    return (
        <div className="w-full bg-white px-4 py-6 mb-6 shadow-sm rounded-md space-y-5">
            <div>
                <div className="text-black font-semibold text-xl">
                    User Details
                </div>
                <div className="text-gray-600 text-sm">
                    Update your personal information
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <div className="font-semibold">First Name</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="John"/></div>
                </div>
                <div className="space-y-1">
                    <div className="font-semibold">Second Name</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="Doe"/></div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Email</div>
                <div><input type="email" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="john@gmail.com"/></div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Phone Number</div>
                <div><input type="number" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="9800000000"/></div>
            </div>
            <div className="space-y-1">
                <div className="font-semibold">Address</div>
                <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md focus:bg-gray-50" placeholder="Bharatpur-10, Chitwan"/></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <div className="font-semibold">Role</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md bg-gray-50" placeholder="Worker" disabled/></div>
                </div>
                <div className="space-y-1">
                    <div className="font-semibold">Gender</div>
                    <div><input type="text" className="border border-gray-300 w-full px-4 py-1 rounded-md bg-gray-50" placeholder="Male" disabled/></div>
                </div>
            </div>
            <div>
                <button className="py-2 px-3 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer">Save changes</button>
            </div>
        </div>
    )
}

export default Profile