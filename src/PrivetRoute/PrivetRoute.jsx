import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/Hooks/useAuth";

 
const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p className="text-center">Loading.........</p>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/loginRegister/login"></Navigate>
};

export default PrivetRoute;