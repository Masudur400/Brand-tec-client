import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

    const [open, setOpen] = useState(false)

    const routes = <>
        <li><NavLink to='/' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}> Home</NavLink> </li>
        <li><NavLink to='/watch' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Watch</NavLink> </li>
        <li><NavLink to='/mobile' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Mobile</NavLink> </li>
        <li><NavLink to='/laptop' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>LapTop</NavLink> </li>
        <li><NavLink to='/cart' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold flex items-center gap-1' : 'hover:text-red-500 flex items-center gap-1'}>Cart<BsCart4></BsCart4></NavLink> </li>
        <li><NavLink to='/addProduct' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>AddProduct</NavLink> </li>
        <li><NavLink to='/dashboard' onClick={()=>setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Dashboard</NavLink> </li>

     </>

    return (
        <div className="p-3 flex justify-between items-center shadow-md shadow-orange-100">
            {/* dropdown icons  */}
            <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                {
                    open === true ? <HiOutlineX></HiOutlineX> : <GrMenu></GrMenu>
                }
            </div>

            {/* logo  */}
            <div>
                <Link to='/' className="text-3xl font-bold  absolute lg:static max-sm:left-12 max-sm:top-[8px] md:left-20 md:top-[17px]"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></Link>
            </div>

            {/* menu / routes  */}
            <ul className={`lg:flex gap-5 left-0 min-w-28  absolute lg:static ${open ? 'top-14 md:top-16 z-[99]' : 'hidden'} bg-gray-50 lg:bg-white p-3 rounded-sm justify-center font-semibold`}>
                {routes}
            </ul>

            {/* user image & button  */}
            <div className="flex max-sm:gap-2 gap-4 justify-center">
                <div className="avatar">
                    <div className="max-sm:w-8 w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <Link to='/loginRegister/login' className="btn font-bold max-sm:btn-sm text-white bg-orange-400 hover:bg-orange-500">Login</Link>
            </div>
        </div>
    );
};

export default NavBar;