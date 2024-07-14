import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import SingleLaptop from "./SingleLaptop";
import Loading from "../../Loading/Loading";

 
const Laptop = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data
        }
    })

    const laptops = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Laptop') : [];

    if(isPending){
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>Laptop</title>
            </Helmet>
            <h3 className="text-3xl font-bold text-center text-orange-500 my-3">LapTop</h3> 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
                 {
                    laptops?.map(laptop => <SingleLaptop key={laptop?._id} laptop={laptop}></SingleLaptop>)
                 }
            </div>
        </div>
    );
};
 

export default Laptop;