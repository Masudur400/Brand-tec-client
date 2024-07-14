import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SingleWatch from "./SingleWatch";
import Loading from "../../Loading/Loading";


const Watch = () => {

    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data
        }
    })

    // const watches = allData?.filter(data => data?.productType === 'Watch')
    const watches = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Watch') : [];

    if(isPending){
        return <Loading></Loading>
    }


    return (
        <div>
            <Helmet>
                <title>Watch</title>
            </Helmet>
            <h3 className="text-3xl font-bold text-center text-orange-500 my-3">Watch</h3> 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
                 {
                    watches?.map(watch => <SingleWatch key={watch?._id} watch={watch}></SingleWatch>)
                 }
            </div>
        </div>
    );
};

export default Watch;