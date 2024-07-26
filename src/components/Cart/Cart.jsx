import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import SingleCart from "./SingleCart";

const Cart = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const {data : carts = [], isPending, refetch} = useQuery({
        queryKey:['carts', user?.email, axiosSecure],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }
    })

if(isPending || loading){
    return <Loading></Loading>
}

    return (
        <div>
            <Helmet>
                <title>MyCart</title>
            </Helmet> 
            <div>
                {
                    carts.map(cart => <SingleCart key={cart._id} cart={cart} refetch={refetch}></SingleCart>)
                }
            </div>

        </div>
    );
};

export default Cart;