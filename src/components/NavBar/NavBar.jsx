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
import { AiOutlineClose } from 'react-icons/ai';
import { SlMenu } from 'react-icons/sl';
import { LiaTimesSolid } from 'react-icons/lia';
import { PiUserCircleThin } from "react-icons/pi";

const NavBar = () => { 
     
    const [profile, setProfile] = useState(false)
    const { user, logOut, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => {
    setClick(false)
    setProfile(false)
  }; 

    const { data: users = {}, isPending } = useQuery({
        queryKey: ['users', user?.email, axiosSecure],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const { photo , name} = users;

    const routes = <>  
        <li><NavLink to='/' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}> Home</NavLink> </li>   
        <li><NavLink to='/watch' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Watch</NavLink> </li>
        <li><NavLink to='/mobile' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Mobile</NavLink> </li>
        <li><NavLink to='/laptop' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>LapTop</NavLink> </li>
        <li><NavLink to='/cart' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  flex items-center gap-1' : 'hover:text-red-500 flex items-center gap-1'}>Carts<BsCart4></BsCart4></NavLink> </li>
        <li><NavLink to='/addProduct' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AddProduct</NavLink> </li>
        <li><NavLink to='/allProduct' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllProduct</NavLink> </li>
        <li><NavLink to='/addShippingMethod' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  d' : 'hover:text-red-500'}>AddShipping</NavLink> </li>
        <li><NavLink to='/allShipping' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllShipping</NavLink> </li>
        <li><NavLink to='/allUsers' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllUsers</NavLink> </li>
        <li><NavLink to='/dashboard' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Dashboard</NavLink> </li>  

    </>

    if (loading || isPending) {
        return <Loading></Loading>
    } 

    return ( 
       <div className="shadow-md border-b fixed z-10 w-full top-0">
         <nav className=" container mx-auto bg-base-100">
        <div className='container mx-auto flex justify-between items-center'>
        <div className=' flex items-center justify-between p-2'>
          <div className="flex gap-5 lg:gap-10 justify-start items-center ">
            {/* Burger Icon: visible only on mobile and medium screens */}
            <div className="lg:hidden mt-1" onClick={handleClick}>
              {click ? (
                <AiOutlineClose className="text-2xl lg:text-3xl cursor-pointer" />
              ) : (
                <SlMenu className="text-2xl lg:text-3xl cursor-pointer" />
              )}
            </div>
             <div>
                 <Link to='/'><p className="text-3xl font-bold"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p> </Link>
             </div>
          </div>

          {/* Center Menu Items for larger screens */}
          <ul className="hidden lg:flex space-x-8 ml-3 items-center justify-center w-full mx-auto lg:justify-center font-medium">
           {routes}
          </ul>

          {/* Burger Menu Items for smaller screens */}
          <div
            className={`fixed top-0 left-0 w-[250px] h-full bg-base-100 transition-transform duration-500 ease-in-out z-50 ${
              click ? 'translate-x-0' : '-translate-x-full'
            } lg:hidden`} // hidden on large screens
          >
            {/* Fixed Header in Burger Menu */}
            <div className="sticky top-0 bg-base-100 px-4 py-2 md:py-[11px] border-b border-gray-700">
              <div className="  flex justify-between items-center">
                <p className="text-3xl font-bold mb-0"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p> 
                <a onClick={closeMenu} className="hover:text-pink-500 cursor-pointer border-2">
                  <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer " />
                </a>
              </div>
            </div>

            {/* Scrollable Content with Hidden Scrollbar */}
            <ul
              className="overflow-y-scroll px-4 space-y-4 font-medium"
              style={{
                maxHeight: 'calc(100vh - 64px)',
                scrollbarWidth: 'thin', /* For Firefox */
                msOverflowStyle: 'none',  /* For Internet Explorer and Edge */
              }}
            >
              <style jsx>{`
                ul::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

             {routes}
            </ul>
          </div>

          {/* Overlay when burger menu is open */}
          {click && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeMenu}
            ></div>
          )}
        </div>

        {/* Right Section */}
         {/* user image & button  */}
         {
                    user ?
                        <div className="flex max-sm:gap-2 gap-4 justify-center mr-2 lg:mr-6">
                            <div>
                                <div className="avatar">
                                    <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center  mt-[6px] border-black rounded-full">
                                        <img src={photo} alt="user image" onClick={() => setProfile(!profile)} />
                                    </div>
                                </div>
                                <ul className={`absolute space-y-5 ${profile ? 'bg-base-100  shadow-lg border md:min-w-32 px-3 py-2 z-[99]  rounded-md right-1 md:right-4' : 'hidden'}`}>
                                    {/* <li onClick={() => setProfile(!profile)} className="absolute text-2xl  top-0 right-0"> <GoX className="border border-black rounded-full"></GoX></li> */}
                                    <div className="space-y-2 py-4">
                                        <p className="text-sm font-medium">{name}</p>
                                        <div className="divider"></div>
                                        <Link to='/profile'> <li onClick={() => setProfile(!profile)}className="flex gap-1 items-center text-sm hover:bg-gray-100 px-2 py-1 rounded-md"><span><PiUserCircleThin></PiUserCircleThin></span>Profile</li></Link>
                                        <button onClick={() => logOut()} className="text-sm w-full flex gap-1 items-center text-red-400 hover:text-black hover:bg-gray-100 px-2 py-1 rounded-md">LogOut <MdLogout></MdLogout></button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        : <div>
                            <Link to='/loginRegister/login' className="btn font-bold max-sm:btn-sm text-white bg-orange-400 hover:bg-orange-500">Login</Link>
                        </div>
                }
        </div>
      </nav>
       </div>
    );
};

export default NavBar;