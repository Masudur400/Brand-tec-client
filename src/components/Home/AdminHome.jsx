import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import {
    FaUsers,
    FaBoxOpen,
    FaShoppingCart,
    FaCheck,
    FaStar,
    FaComment,
} from "react-icons/fa";
import Loading from "../../Loading/Loading";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminHome = () => { 

    const axiosPublic = useAxiosPublic();

    const { data: allCount = {}, isLoading } = useQuery({
        queryKey: ["allCount", axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allCount`);
            return res.data;
        },
    });

    const {
        userCount = 0,
        productCount = 0,
        orderCount = 0,
        completeOrderCount = 0,
        appReviewCount = 0,
        productReviewCount = 0,
    } = allCount;

    const stats = [
        {
            title: "Total Users",
            value: userCount,
            icon: <FaUsers className="text-blue-600" />,
            bg: "bg-blue-100",
        },
        {
            title: "Total Products",
            value: productCount,
            icon: <FaBoxOpen className="text-green-600" />,
            bg: "bg-green-100",
        },
        {
            title: "Total Orders",
            value: orderCount,
            icon: <FaShoppingCart className="text-yellow-600" />,
            bg: "bg-yellow-100",
        },
        {
            title: "Completed Orders",
            value: completeOrderCount,
            icon: <FaCheck className="text-purple-600" />,
            bg: "bg-purple-100",
        },
        {
            title: "App Reviews",
            value: appReviewCount,
            icon: <FaStar className="text-orange-600" />,
            bg: "bg-orange-100",
        },
        {
            title: "Product Reviews",
            value: productReviewCount,
            icon: <FaComment className="text-red-600" />,
            bg: "bg-red-100",
        },
    ];


    const chartData = [
        { name: "Users", count: userCount },
        { name: "Products", count: productCount },
        { name: "Orders", count: orderCount },
        { name: "Completed Orders", count: completeOrderCount },
        { name: "App Reviews", count: appReviewCount },
        { name: "Product Reviews", count: productReviewCount },
    ];


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 bg-opacity-40">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold ">Admin Dashboard</h1>
                <p className="opacity-80">Welcome back, Admin!</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.bg} p-4 rounded-lg shadow-md flex items-center hover:shadow-lg`}
                    >
                        <div className="p-2 rounded-full bg-opacity-20 text-4xl">
                            {stat.icon}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-medium  opacity-90">{stat.title}</h2>
                            <p className="text-2xl font-bold  opacity-90">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-base-100 md:p-6 p-2 rounded-lg shadow-md">
                <h2 className="text-xl font-bold opacity-90 mb-4">Overview Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminHome;
