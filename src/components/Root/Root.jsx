import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import DashboardSideBar from "../NavBar/DashboardSideBar";


const Root = () => {

    const [admin] = useState(false)

    return (
        <div>
            {
                admin ?
                    // admin outlate 
                    <div>
                        {/* small devide dashboard  */}
                        <div className="lg:hidden">
                            <DashboardNavBar></DashboardNavBar>
                            <div className="container my-20 mx-auto px-4 md:px-9 min-h-[calc(100vh-250px)]">
                                <Outlet></Outlet>
                            </div>
                        </div>
                        {/* large device dashboard */}
                        <div className="hidden lg:flex gap-5 px-4 container mx-auto">
                            <div className="  min-w-60 border-base-300 overflow-y-auto scrollbar-hidden h-screen bg-base-100 fixed z-10 shadow-2xl">
                                <DashboardSideBar></DashboardSideBar>
                            </div>
                            <div className="container border-base-300 overflow-y-auto scrollbar-hidden w-[calc(100vw-240px)] flex-1 ml-[255px] min-h-screen shadow-2xl py-5 px-3">
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>


                    : // user outlate 
                    <div>
                        <div className="">
                            <NavBar></NavBar>
                        </div>
                        <div className="container my-20 mx-auto px-4 md:px-9 min-h-[calc(100vh-250px)]">
                            <Outlet></Outlet>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Root;