import { LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { logoutUser } from "../../api/LoginRegisterAPI";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  menuButton: boolean;
  title: string,
}

const DashboardNavbar = ({ menuButton, title }: SidebarProps) => {
  const {userInfo, setUserInfo} = useUserContext()
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async() => {
          const response = await logoutUser('auth/users/logout')
          if(response.status === 400 || response.status === 500){
              return
          }
          setUserInfo(null)
          setTimeout(() => {
            navigate("/")
          }, 1000);
      }

  return (
    <div className="w-full h-15 pr-10 sm:pr-15 xl:pr-30 sticky top-0 bg-white flex items-center justify-between z-50 border-b border-gray-300">
      <div className={`font-semibold text-2xl transition-all ease-in-out duration-500 ${menuButton ? "sm:pl-5" : "sm:pl-15"}`}>{title}</div>
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-3">
          <button
            className="h-11 w-11 flex items-center justify-center rounded-full shadow border-1 border-gray-300 cursor-pointer"
            onClick={() => setOpen(!isOpen)}
          >
            <User size={27} />
          </button>

          <button
            className="text-left px-2 rounded-sm hover:bg-gray-100 hidden sm:block cursor-pointer"
            onClick={() => setOpen(!isOpen)}
          >
            <div className="capitalize">{userInfo?.firstName}</div>
            <div className="text-gray-600 text-sm">{userInfo?.role}</div>
          </button>
        </div>

        {isOpen && (
          <div className="absolute w-fit right-0 min-w-35 bg-white shadow-sm text-left text-sm p-1 mt-2">
            <div className="hover:bg-gray-100 border-b border-gray-300">
              <div className="w-full px-2 py-1">{userInfo?.firstName + " " +userInfo?.secondName}</div>
              <div className="text-xs text-gray-600 w-full px-2 pb-1">{userInfo?.email}</div>
            </div>
            <div className="w-full px-2 py-2 cursor-pointer hover:bg-gray-100 flex gap-2 text-red-600 items-center" onClick={handleLogout}>
              <div><LogOut size={16} /></div>
              <div>Logout</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
