import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SingleOrder from "./SingleOrder";
import Loading from "../../../Loading/Loading";
import { Helmet } from "react-helmet";

 
const AllOrders = () => {

    const axiosSecure = useAxiosSecure()
    const { data: orders = [], isLoading,} = useQuery({
        queryKey: ["orders", axiosSecure] ,
        queryFn: async () => {
          const res = await axiosSecure.get(`/orders`);
          return res.data;
        },
      });

       if(isLoading){
        return <Loading></Loading>
       }

    return (
        <div>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            {
                orders.map(order => <SingleOrder key={order?._id} order={order}></SingleOrder>)
            }
        </div>
    );
};

export default AllOrders;