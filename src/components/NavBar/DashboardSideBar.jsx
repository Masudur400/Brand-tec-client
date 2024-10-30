import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth"; 
import { MdLogin, MdLogout } from "react-icons/md";


const DashboardSideBar = () => {

    const { user, logOut, loading } = useAuth()

    if (loading) {
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
           <p><NavLink to='/' className={({ isActive }) => isActive ? 'underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Dashboard</NavLink> </p> 
            <p><NavLink to='/addProduct' className={({ isActive }) => isActive ? '  underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AddProduct</NavLink> </p>
            <p><NavLink to='/allProduct' className={({ isActive }) => isActive ? '  underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllProduct</NavLink> </p>
            <p><NavLink to='/addShippingMethod' className={({ isActive }) => isActive ? ' underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AddShipping</NavLink> </p>
            <p><NavLink to='/allShipping' className={({ isActive }) => isActive ? '  underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllShipping</NavLink> </p>
            <p><NavLink to='/allUsers' className={({ isActive }) => isActive ? '  underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>AllUsers</NavLink> </p>
            <p><NavLink to='/profile' className={({ isActive }) => isActive ? '  underline w-full bg-orange-500 text-white px-3 py-1 block rounded-md' : 'hover:text-red-500 hover:bg-base-300 px-3 py-1 rounded-md w-full block'}>Profile</NavLink> </p>
           </div>

            <div className="border-b-2 mt-2 border-orange-500"></div>
             
            {
                user? 
                <button onClick={() => logOut()} className=" w-full flex gap-1 items-center text-orange-500 hover:bg-base-300 px-3 py-1 rounded-md">LogOut <MdLogout></MdLogout></button>
                :<div>
                <Link to='/loginRegister/login' className=" w-full flex gap-1 items-center text-orange-500 hover:text-black hover:bg-base-300 px-3 py-1 rounded-md">Login <MdLogin></MdLogin></Link>
            </div>
            } 

        </div>
    );
};

export default DashboardSideBar;