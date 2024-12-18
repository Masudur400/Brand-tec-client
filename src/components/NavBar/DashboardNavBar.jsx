import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 
import { LiaTimesSolid } from 'react-icons/lia';
import { SlMenu } from 'react-icons/sl';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PiUserCircleThin } from 'react-icons/pi';
import { MdLogout } from 'react-icons/md'; 
import Avatar from 'react-avatar';


const DashboardNavBar = () => {

    const [profile, setProfile] = useState(false)
    const { user, logOut, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMenu = () => {
        setClick(false)
        setProfile(false)
    };

    const { data: users = {}, isLoading } = useQuery({
        queryKey: ['users', user?.email, axiosSecure],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const { photo, name, role } = users;

    if (loading || isLoading) {
        return <p className="opacity-90 text-center mt-4">Loading...</p>
    } 

    const routes = <>

        <li><NavLink to='/' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Dashboard</NavLink> </li>
        <li><NavLink to='/addProduct' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AddProduct</NavLink> </li>
        <li><NavLink to='/allProduct' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllProduct</NavLink> </li>
        <li><NavLink to='/addShippingMethod' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  d' : 'hover:text-red-500'}>AddShipping</NavLink> </li>
        <li><NavLink to='/allShipping' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllShipping</NavLink> </li>
        {
            role === 'Admin' && <li><NavLink to='/allUsers' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>AllUsers</NavLink> </li>
        } 
        <li><NavLink to='/appRatings' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>App Reviews</NavLink> </li> 
        <li><NavLink to='/productRatings' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Product Reviews</NavLink> </li> 
        <li><NavLink to='/Orders' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>Orders</NavLink> </li> 
        <li><NavLink to='/completeOrders' onClick={closeMenu} className={({ isActive }) => isActive ? 'text-orange-500 underline  ' : 'hover:text-red-500'}>CompleteOrders</NavLink> </li> 

    </>

    return (
        <div className='shadow-md border-b fixed z-10 w-full top-0'>
            <nav className="flex justify-between shadow-md items-center bg-base-100 fixed w-full z-10">
                <div className='container mx-auto flex items-center justify-between p-2'>
                    <div className="">
                        <div className="flex gap-5 lg:gap-10 justify-center items-center">
                            {/* Burger Icon */}
                            <div onClick={handleClick}>
                                {click ? (
                                    <AiOutlineClose className="text-xl lg:text-2xl cursor-pointer" />
                                ) : (
                                    < SlMenu className="text-xl lg:text-2xl cursor-pointer" />
                                )}
                            </div>
                            <div>
                                <Link to='/'><p className="text-3xl font-bold"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p> </Link>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div
                            className={`fixed top-0 left-0 w-[250px] h-full bg-base-200 transition-transform duration-500 ease-in-out z-50 ${click ? 'translate-x-0' : '-translate-x-full'
                                }`}
                        >
                            {/* Fixed Header in Burger Menu */}
                            <div className="sticky top-0 bg-base-200 px-4 py-3 md:py-4 border-b border-gray-700">
                                <div className="text-2xl font-bold flex justify-between items-center">
                                    <div>
                                        <Link to='/'><p title='Home' className="text-3xl font-bold"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p> </Link>
                                    </div>
                                    <a onClick={closeMenu} className="hover:text-orange-500 cursor-pointer border-2 border-orange-400">
                                        <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer" />
                                    </a>
                                </div>
                            </div>

                            {/* Scrollable Content with Hidden Scrollbar */}
                            <ul
                                className="overflow-y-scroll p-4 space-y-6"
                                style={{
                                    maxHeight: 'calc(100vh - 64px)', 
                                    scrollbarWidth: 'none', 
                                    msOverflowStyle: 'none'  
                                }}
                            >
                                {/* Hide Scrollbar for WebKit Browsers */}
                                <style>{` ul::-webkit-scrollbar { display: none; } `}</style>

                                {routes}

                            </ul>
                        </div>

                        {/* Overlay */}
                        {click && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={closeMenu}
                            ></div>
                        )}
                    </div>

                    
                    {
                        user ?
                            <div className="mr-2 lg:mr-6">
                                <div className='relative'>
                                    <div className="avatar">
                                        <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center border-black rounded-full"> 
                                            <Avatar name={name?.charAt(0)} src={photo} alt='img' className="rounded-full" size="45" onClick={() => setProfile(!profile)}></Avatar>
                                        </div>
                                    </div>
                                    <ul className={`absolute space-y-5 ${profile ? 'bg-base-100  shadow-lg border md:min-w-32 px-3 py-2 z-[99]  rounded-md right-1 md:right-0' : 'hidden'}`}> 
                                        <div className="space-y-2 py-4">
                                            <p className="text-sm font-medium">{name}</p>
                                            <div className="divider"></div>
                                            <Link to='/profile'> <li onClick={() => setProfile(!profile)} className="flex gap-1 items-center text-sm hover:bg-base-300 px-2 py-1 rounded-md"><span><PiUserCircleThin></PiUserCircleThin></span>Profile</li></Link>
                                            <button onClick={() => logOut()} className="text-sm w-full flex gap-1 items-center text-red-400  hover:bg-base-300 px-2 py-1 rounded-md">LogOut <MdLogout></MdLogout></button>
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

export default DashboardNavBar;