import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { useState } from "react";


const Profile = () => {

    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()  
   


    // const { data: users = {}, isPending} = useQuery({ 
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/${user?.email}`) 
    //         return res.data
    //     }
    // })

    const { data: users = [], isPending} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const loginUser = users?.find(loguser => loguser?.email === user?.email) 

    const date = new Date(loginUser?.userCreateTime)
    const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    // const {name, photo} = loginUser
    console.log(loginUser)


     if(loading || isPending){
        return <Loading></Loading>
     }

    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="md:w-1/2 lg:w-2/5 mx-auto bg-orange-50 my-10 p-3 rounded-md">
                <h3 className="text-2xl font-bold text-center text-orange-500 my-6">Profile</h3>
                <div> 
                    <img src={loginUser?.photo} alt="image" className="w-56  h-56 rounded-full mx-auto"/>
                   <div className="w-fit mx-auto my-5 space-y-2">
                   <p><span className="font-bold">Name : </span>{loginUser?.name}</p>
                    <p><span className="font-bold">Role : </span>{loginUser?.role}</p>
                    <p><span className="font-bold">Time : </span>{formattedDate}</p>
                   </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;