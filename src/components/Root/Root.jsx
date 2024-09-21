import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

 
const Root = () => {
    return (
        <div>
            <div className="h-16 container mx-auto">
            <NavBar></NavBar>
            </div>
            <div className="container mx-auto px-4">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;