import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import SingleMobile from "./SingleMobile";
import Loading from "../../Loading/Loading";

 
const Mobile = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data
        }
    })

    // const allPhone = allData?.filter(data => data?.productType === 'Phone')
    const allPhone = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Phone') : [];

    if(isPending){
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>Mobile</title>
            </Helmet>
            <h3 className="text-3xl font-bold text-center text-orange-500 my-3">Mobile</h3> 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
                 {
                    allPhone?.map(phone => <SingleMobile key={phone?._id} phone={phone}></SingleMobile>)
                 }
            </div>
        </div>
    );
};

export default Mobile;