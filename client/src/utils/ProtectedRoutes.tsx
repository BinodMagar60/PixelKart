// src/utils/ProtectedRoute.tsx or .jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = () => {
  const { userInfo, userLoading } = useUserContext();


  if (userLoading) {
    return <div></div>; 
  }
 
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
