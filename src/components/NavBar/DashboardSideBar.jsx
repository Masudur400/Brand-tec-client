import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdLogin, MdLogout } from "react-icons/md";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const DashboardSideBar = () => {

    const { user, logOut, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [openRatings, setOpenRatings] = useState(false)
    const [openProducts, setOpenProducts] = useState(false)
    const [openShippings, setOpenShippings] = useState(false)
    const [openOrders, setOpenOrders] = useState(false)

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
        // return <Loading></Loading>
        return <p className="opacity-90 text-center mt-4">Loading...</p>
    }

    return (
        <div className="p-7 space-y-5 font-bold">
            <div>
                <p className="text-3xl font-bold text-center"> <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span></p>
                <p className="opacity-90 font-medium text-center">Admin Dashboard</p>
                <p className="opacity-90 text-sm font-medium text-center"> {user?.email}</p>
                <div className="border-b-2 my-3 border-orange-500"></div>
            </div>
            <div className="space-y-3">
                <p><NavLink to='/' className={({ isActive }) => isActive ? '  w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Dashboard</NavLink> </p>


                <div className={` ${openProducts ? 'bg-base-200' : ''} bg-opacity-50 space-y-3 rounded-md`}>
                    <p onClick={() => setOpenProducts(!openProducts)} className={`flex justify-between items-center px-3 py-1  hover:bg-base-300 rounded-md cursor-pointer w-full`}><span>Products</span> {openProducts ? <FaAngleDown /> : <FaChevronRight />}</p>
                    {
                        openProducts &&
                        <div className="space-y-3 ">
                            <p><NavLink to='/addProduct' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AddProduct</NavLink> </p>
                            <p><NavLink to='/allProduct' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllProduct</NavLink> </p>
                        </div>
                    }
                </div>



                <div className={` ${openShippings ? 'bg-base-200' : ''}  bg-opacity-50 space-y-3 rounded-md`}>
                    <p onClick={() => setOpenShippings(!openShippings)} className={`flex justify-between items-center px-3 py-1 hover:bg-base-300  rounded-md cursor-pointer w-full`}><span>Shippings</span> {openShippings ? <FaAngleDown /> : <FaChevronRight />}</p>
                    {
                        openShippings &&
                        <div className="space-y-3 ">
                            <p><NavLink to='/addShippingMethod' className={({ isActive }) => isActive ? '   w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AddShipping</NavLink> </p>
                            <p><NavLink to='/allShipping' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllShipping</NavLink> </p>
                        </div>
                    }
                </div>



                {
                    role === 'Admin' && <p><NavLink to='/allUsers' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllUsers</NavLink> </p>
                }


                <div className={` ${openRatings ? 'bg-base-200' : ''}  bg-opacity-50 space-y-3 rounded-md`}>
                    <p onClick={() => setOpenRatings(!openRatings)} className={`flex justify-between items-center px-3 py-1 hover:bg-base-300 rounded-md cursor-pointer w-full`}><span>Ratings & Reviews</span> {openRatings ? <FaAngleDown /> : <FaChevronRight />}</p>
                    {
                        openRatings &&
                        <div className="space-y-3 ">
                            <p><NavLink to='/appRatings' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>App Reviews</NavLink> </p>
                            <p><NavLink to='/productRatings' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Product Reviews</NavLink> </p>
                        </div>
                    }
                </div>

                <div className={` ${openOrders ? 'bg-base-200' : ''}  bg-opacity-50 space-y-3 rounded-md`}>
                    <p onClick={() => setOpenOrders(!openOrders)} className={`flex justify-between items-center px-3 py-1 hover:bg-base-300 rounded-md cursor-pointer w-full`}><span>Manage Orders</span> {openOrders ? <FaAngleDown /> : <FaChevronRight />}</p>
                    {
                        openOrders &&
                        <div className="space-y-3 ">
                            <p><NavLink to='/orders' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Orders</NavLink> </p>
                            <p><NavLink to='/completeOrders' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Complete Orders</NavLink> </p>
                        </div>
                    }
                </div>


                <p><NavLink to='/profile' className={({ isActive }) => isActive ? '    w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Profile</NavLink> </p>
            </div>

            <div className="border-b-2 mt-2 border-orange-500"></div>

            {
                user ?
                    <button onClick={() => logOut()} className=" w-full flex gap-1 items-center text-orange-500 hover:bg-base-300 px-3 py-1 rounded-md">LogOut <MdLogout></MdLogout></button>
                    : <div>
                        <Link to='/loginRegister/login' className=" w-full flex gap-1 items-center text-orange-500 hover:text-black hover:bg-base-300 px-3 py-1 rounded-md">Login <MdLogin></MdLogin></Link>
                    </div>
            }

        </div>
    );
};

export default DashboardSideBar;