import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import useAuth from "../../components/Hooks/useAuth";
import { useEffect } from "react"; 

const PaymentSuccess = () => {
    const { tranId } = useParams();
    const axiosSecure = useAxiosSecure(); 
    const { user } = useAuth();

    const { data: allData = [], isLoading } = useQuery({
        queryKey: ['orders', axiosSecure, tranId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/or/${tranId}`);
            return res.data;
        }
    });

    
    

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <p>{tranId}</p>
            payment success <p>{allData.length}</p>
        </div>
    );
};

export default PaymentSuccess;
