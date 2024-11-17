import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import useAuth from "../../components/Hooks/useAuth";
import { useEffect } from "react";
import SinglePaymentSuccess from "./SinglePaymentSuccess";

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


    console.log(allData)

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="md:w-2/3 lg:w-1/3 mx-auto p-2 border border-base-300 shadow-md">
            {/* <h3 className="text-lg font-medium text-center text-orange-500 my-5">Payment Successful</h3>
            <p>Transaction : {tranId}</p>  */}
            <div
                className="boxShadow p-2 flex items-center justify-center flex-col gap-[2px] rounded-xl mb-2">
                <h3 className="text-lg font-medium text-center text-orange-500 my-5">Payment Successful</h3>
                <img src="https://i.ibb.co/qW8ztPd/Successful-illustration.png" alt="empty/image"
                    className="w-[100px] md:w-[200px]" />

            </div>

            {
                allData.map(order => <SinglePaymentSuccess key={order._id} order={order}></SinglePaymentSuccess>)
            }
        </div>
    );
};

export default PaymentSuccess;
