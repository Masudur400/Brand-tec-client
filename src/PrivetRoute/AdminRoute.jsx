import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../components/Hooks/useAdmin";
import useAuth from "../components/Hooks/useAuth";

 
const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/loginRegister/login"></Navigate>
};

export default AdminRoute;