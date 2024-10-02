import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { GoX } from "react-icons/go";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const NavBar = () => {

    const [open, setOpen] = useState(false) 
    const [profile, setProfile] = useState(false)
    const { user, logOut, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: users = {}, isPending } = useQuery({
        queryKey: ['users', user?.email, axiosSecure],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const { photo } = users;

    const routes = <>
        <li><NavLink></NavLink></li>

        <div className="flex justify-between items-center w-screen lg:hidden">
        <li className="flex justify-between items-center min-w-56 md:min-w-96 lg:hidden"><p className="text-3xl font-bold mb-0"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p> <p onClick={() => setOpen(!open)} className="text-xl md:text-2xl p-1 border-2 border-black rounded-md opacity-75 border-opacity-75"><HiOutlineX></HiOutlineX></p></li>
        </div>

        <p className="divider lg:hidden my-0"></p>

        <li><NavLink to='/' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}> Home</NavLink> </li>   
        <li><NavLink to='/watch' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Watch</NavLink> </li>
        <li><NavLink to='/mobile' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Mobile</NavLink> </li>
        <li><NavLink to='/laptop' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>LapTop</NavLink> </li>
        <li><NavLink to='/cart' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  flex items-center gap-1' : 'hover:text-red-500 flex items-center gap-1'}>Carts<BsCart4></BsCart4></NavLink> </li>
        <li><NavLink to='/addProduct' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AddProduct</NavLink> </li>
        <li><NavLink to='/allProduct' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllProduct</NavLink> </li>
        <li><NavLink to='/addShippingMethod' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  d' : 'hover:text-red-500'}>AddShipping</NavLink> </li>
        <li><NavLink to='/allShipping' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllShipping</NavLink> </li>
        <li><NavLink to='/allUsers' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllUsers</NavLink> </li>
        <li><NavLink to='/dashboard' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Dashboard</NavLink> </li>

        

    </>

    if (loading || isPending) {
        return <Loading></Loading>
    }


    return (
        <div className="  border-b border-orange-100">
            <div className="container mx-auto p-2 flex justify-between items-center">
                {/* dropdown icons  */}
                <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                    {
                        open === true ? ''
                            // <HiOutlineX></HiOutlineX> 
                            : <GrMenu></GrMenu>
                    }
                </div>

                {/* logo  */}
                <div>
                    <Link to='/' className="text-3xl font-bold  absolute lg:static max-sm:left-12 max-sm:top-[6px] md:left-20 md:top-[14px]"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></Link>
                </div>

                {/* menu / routes  */} 
                
                <ul className={`lg:flex justify-center items-center duration-1000  gap-5 left-0 absolute lg:static overflow-x-auto overflow-y-auto lg:bg-inherit px-3 rounded-sm font-semibold  pb-10 lg:pb-0 h-screen lg:h-fit ${open ? 'top-0 z-[99] min-w-56 md:min-w-96 space-y-3  backdrop-blur-md bg-opacity-30 ' : '-left-[1500px] top-0  z-[99] space-y-3'}`}>
                    {routes}
                </ul>
                 


                {/* user image & button  */}
                {
                    user ?
                        <div className="flex max-sm:gap-2 gap-4 justify-center mr-2 lg:mr-6">
                            <div>
                                <div className="avatar">
                                    <div className="max-sm:w-8 w-12 rounded-full border">
                                        <img src={photo} alt="user image" onClick={() => setProfile(!profile)} />
                                    </div>
                                </div>
                                <ul className={`absolute space-y-5 ${profile ? 'bg-gray-50 md:min-w-32 px-3 py-2 z-[99] font-bold rounded-md right-1 md:right-4' : 'hidden'}`}>
                                    <li onClick={() => setProfile(!profile)} className="absolute text-2xl  top-0 right-0"> <GoX className="border border-black rounded-full"></GoX></li>
                                    <div>
                                        <li onClick={() => setProfile(!profile)}><Link to='/profile' className="hover:text-orange-500">Profile</Link></li>
                                        <li onClick={() => logOut()} className="flex gap-1 items-center hover:text-orange-500">LogOut <MdLogout></MdLogout></li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        : <div>
                            <Link to='/loginRegister/login' className="btn font-bold max-sm:btn-sm text-white bg-orange-400 hover:bg-orange-500">Login</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default NavBar;