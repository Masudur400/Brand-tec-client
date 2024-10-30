import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";  
import SingleUser from "./SingleUser";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
     

    const { data: allUser = [], isLoading, refetch } = useQuery({
        queryKey: ['users', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    }); 
     

    if (isLoading) {
        return <Loading></Loading>
    }

    const sortedUsers = allUser?.sort((a, b) => {
        if (a.role === 'Admin' && b.role !== 'Admin') return -1;
        if (a.role !== 'Admin' && b.role === 'Admin') return 1;
        if (a.role === 'Moderator' && b.role !== 'Moderator') return -1;
        if (a.role !== 'Moderator' && b.role === 'Moderator') return 1;
        if (a.role === 'Guest' && b.role !== 'Guest') return 1;
        if (a.role !== 'Guest' && b.role === 'Guest') return -1;
        return 0;
    });

    return (
        <div>
            <Helmet>
                <title>All Users</title>
            </Helmet>
            <h3 className="text-2xl font-bold text-center text-orange-500 mt-5">All Users</h3>
              
                <div className="mt-10">
                {
                    sortedUsers?.map((user, idx) => <SingleUser key={user?._id} user={user} idx={idx} refetch={refetch}></SingleUser>)
                }
                </div>  
        </div>
    );
};

export default AllUsers;
