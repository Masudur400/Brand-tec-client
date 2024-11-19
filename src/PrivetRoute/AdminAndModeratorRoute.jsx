import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../components/Hooks/useAdmin";
import useAuth from "../components/Hooks/useAuth";
import useModerator from "../components/Hooks/useModerator";

 
const AdminAndModeratorRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isModerator, isModeratorLoading] = useModerator()
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    if (user && isAdmin || isModerator) {
        return children;
    }

    return <Navigate state={location.pathname} to="/loginRegister/login"></Navigate>
};

export default AdminAndModeratorRoute;