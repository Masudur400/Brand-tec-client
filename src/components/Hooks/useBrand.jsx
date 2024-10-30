import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

 
const useBrand = (brand) => {

    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isLoading: isLoading} = useQuery({
            queryKey: ['products'],  
            queryFn: async () => {
                const res = await axiosSecure.get(`/products/br/${brand}`) 
                return res.data
            }
        }) 

    return  [allData]
};

export default useBrand;