import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import SingleCart from "./SingleCart";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {

    // const axiosSecure = useAxiosSecure()
    // const { user, loading } = useAuth()

    // const { data: carts = [], isPending, refetch } = useQuery({
    //     queryKey: ['carts', user?.email, axiosSecure],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/carts/${user?.email}`)
    //         return res.data
    //     }
    // })

    const [carts, isPending, refetch,loading]= useCart();

    const totalPrice = carts.reduce((total, product) => total + product.newPrice, 0);

    if (isPending || loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>MyCart</title>
            </Helmet>
            <div className="bg-gradient-to-r from-orange-300 to-red-300 p-4 flex">
                <h2 className="text text-xl md:text-2xl font-bold text-white text-center flex-1">Your Cart</h2>
                <div className="flex justify-end">
                    {
                        carts.length ?
                        <Link to='/orderInfo'><button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium">Pay: {totalPrice} tk</button> </Link>
                            
                            : <button onClick={() => {
                                Swal.fire({
                                    position: "top-end",
                                    title: "No product available in cart",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }} className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium">Pay: {totalPrice} tk</button>
                    }
                </div>
            </div>
            <div>
                {
                    carts.map(cart => <SingleCart key={cart._id} cart={cart} refetch={refetch}></SingleCart>)
                }
            </div>

        </div>
    );
};

export default Cart;