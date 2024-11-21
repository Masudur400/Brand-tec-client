import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar"; 
import DashboardNavBar from "../NavBar/DashboardNavBar";
import DashboardSideBar from "../NavBar/DashboardSideBar";
import Footer from "../Footer/Footer"; 
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic"; 
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";
import Loading from "../../Loading/Loading";


const Root = () => {

    
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isModerator , isModeratorLoading] = useModerator() 
     

    if(isAdminLoading || isModeratorLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div>
                {
                     isAdmin || isModerator ?
                        // admin outlate 
                        <div className="">
                            {/* small devide dashboard  */}
                            <div className="lg:hidden">
                                <DashboardNavBar></DashboardNavBar>
                                <div className="container my-20 mx-auto px-4 md:px-9 min-h-[calc(100vh-250px)]">
                                    <Outlet></Outlet>
                                </div>
                            </div>
                            {/* large device dashboard */}
                            <div className="hidden lg:flex gap-5 px-4 container mx-auto mt-3">
                                <div className="min-w-60 overflow-y-auto scrollbar-hidden h-screen bg-base-100 border border-base-300 fixed z-10 rounded-t-md">
                                    <DashboardSideBar></DashboardSideBar>
                                </div>
                                <div className="container overflow-y-auto scrollbar-hidden h-[calc(100vh-12px)] w-[calc(100vw-285px)] flex-1 ml-[255px]  bg-base-100 border border-base-300 py-5 px-3 rounded-t-md">
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>


                        : // user outlate 
                        <div>
                            <div className="">
                                <NavBar></NavBar>
                            </div>
                            <div className="container my-20 mx-auto px-4 md:px-9  min-h-[calc(100vh-380px)]">
                                <Outlet></Outlet>
                            </div>
                            <div className="bg-base-200 mt-10">
                                <Footer></Footer>
                            </div>
                        </div>
                }
            </div>

        </div>
    );
};

export default Root;