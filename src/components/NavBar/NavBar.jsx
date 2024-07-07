import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi";

const NavBar = () => {

    const [open, setOpen] = useState(false)

    const routes = <>
        <li> Home </li>
        <li> About </li>
        <li> Contact </li>
        <li> Blogs </li>
        <li> Features </li>
    </>

    return (
        <div className="  p-3 flex justify-between items-center shadow-md">
            {/* dropdown icons  */}
            <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                {
                    open === true ? <HiOutlineX></HiOutlineX> : <GrMenu></GrMenu>
                }
            </div>

            {/* logo  */}
            <div>
                <h3 className="text-3xl font-bold  absolute lg:static max-sm:left-12 max-sm:top-[8px] md:left-20 md:top-[17px]"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></h3>
            </div>

            {/* menu / routes  */}
            <ul className={`lg:flex gap-5 left-0 min-w-28  absolute lg:static ${open ? 'top-14 md:top-16' : 'hidden'} bg-gray-50 lg:bg-white p-3 rounded-sm justify-center `}>
                {routes}
            </ul>

            {/* user image & button  */}
            <div className="flex max-sm:gap-2 gap-4 justify-center">
                <div className="avatar">
                    <div className="max-sm:w-8 w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <button className="btn font-bold max-sm:btn-sm">Login</button>
            </div>
        </div>
    );
};

export default NavBar;