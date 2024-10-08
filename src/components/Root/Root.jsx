import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

 
const Root = () => {
    return (
        <div>
            <div className=" ">
            <div className=" ">
            <NavBar></NavBar>
            </div>
            </div>
            <div className="container my-20 mx-auto px-4 md:px-9 min-h-[calc(100vh-250px)]">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;