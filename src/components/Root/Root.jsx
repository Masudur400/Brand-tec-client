import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import DashboardSideBar from "../NavBar/DashboardSideBar";


const Root = () => {

    const [admin] = useState(true)

    return (
        <div>
            {
                admin ?
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
                        <div className="container my-20 mx-auto px-4 md:px-9  ">
                            <Outlet></Outlet>
                        </div> 
                    </div>
            }
        </div>
    );
};

export default Root;