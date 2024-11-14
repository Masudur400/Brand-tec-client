import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";
import SingleCompleteOrder from "./SingleCompleteOrder";

 
const CompleteOrders = () => {
    const axiosSecure = useAxiosSecure()
    const { data: orders = [], isLoading,} = useQuery({
        queryKey: ["completeOrders", axiosSecure] ,
        queryFn: async () => {
          const res = await axiosSecure.get(`/completeOrders`);
          return res.data;
        },
      });

       if(isLoading){
        return <Loading></Loading>
       }

    return (
        <div>
            {
                orders.map(order =>  <SingleCompleteOrder key={order?._id} order={order}></SingleCompleteOrder>)
            }
        </div>
    );
};

export default CompleteOrders;