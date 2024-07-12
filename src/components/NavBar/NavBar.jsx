import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { GoX } from "react-icons/go";

const NavBar = () => {

    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false)
    const { user, logOut, loading } = useAuth()

    const routes = <>
        <li><NavLink to='/' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}> Home</NavLink> </li>
        <li><NavLink to='/watch' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Watch</NavLink> </li>
        <li><NavLink to='/mobile' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Mobile</NavLink> </li>
        <li><NavLink to='/laptop' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>LapTop</NavLink> </li>
        <li><NavLink to='/cart' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold flex items-center gap-1' : 'hover:text-red-500 flex items-center gap-1'}>Cart<BsCart4></BsCart4></NavLink> </li>
        <li><NavLink to='/addProduct' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>AddProduct</NavLink> </li>
        <li><NavLink to='/dashboard' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline font-bold' : 'hover:text-red-500'}>Dashboard</NavLink> </li>

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
            {
                user ?
                    <div className="flex max-sm:gap-2 gap-4 justify-center mr-2 lg:mr-6">
                        <div>
                        <div className="avatar">
                            <div className="max-sm:w-8 w-12 rounded-full border">
                                <img src={user?.photoURL} alt="user image" referrerPolicy="no-referrer" 
                                onClick={()=>setProfile(!profile)}/>
                            </div>
                        </div>
                            <ul className={`absolute space-y-5 ${profile ? 'bg-gray-50 md:min-w-32 px-3 py-2 z-[99] font-bold rounded-md right-1 md:right-4': 'hidden'}`}>
                                <li onClick={()=>setProfile(!profile)} className="absolute text-2xl md:text-3xl top-0 right-0"> <GoX className="border border-black rounded-full"></GoX></li>
                                <div>
                                <li onClick={()=>setProfile(!profile)}><Link to='/profile' className="hover:text-orange-500">Profile</Link></li>
                                <li onClick={()=>logOut()} className="flex gap-1 items-center hover:text-orange-500">LogOut <MdLogout></MdLogout></li>
                                </div>
                            </ul>
                        </div>
                        {/* <button  className="btn md:font-bold max-sm:btn-sm text-white bg-orange-400 hover:bg-orange-500">LogOut</button> */}
                    </div> 

                    // <div className="dropdown dropdown-end">
                    //     <div 
                    //     tabIndex={0}
                        
                    //      role="button" className="btn btn-ghost btn-circle avatar">
                    //         <div className="w-10 rounded-full">
                    //             <img
                    //                 alt="Tailwind CSS Navbar component"
                    //                 src={user?.photoURL} onClick={()=>setOpen(!open)} />
                    //         </div>
                    //     </div>
                    //     {open === true ? <ul
                    //         tabIndex={0}
                    //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[99] mt-3 w-36 p-2 shadow">
                    //         <li>
                    //             <a>  Profile  </a>
                    //         </li>
                    //         <li><a>Settings</a></li>
                    //         <li><a>Logout</a></li>
                    //     </ul>:''}
                    // </div>

                    : <div>
                        <Link to='/loginRegister/login' className="btn font-bold max-sm:btn-sm text-white bg-orange-400 hover:bg-orange-500">Login</Link>
                    </div>
            }
        </div>
    );
};

export default NavBar;