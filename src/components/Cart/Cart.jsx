import { Helmet } from "react-helmet"; 
import Loading from "../../Loading/Loading";
import SingleCart from "./SingleCart";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => { 

    const [carts, isPending, refetch, loading] = useCart();

    const totalPrice = carts.reduce((total, product) => total + product.newPrice, 0);
    const modTotalPrice = new Intl.NumberFormat('en-IN').format(totalPrice);
    

    if (isPending || loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>MyCart</title>
            </Helmet>
            {/* <div className="px-4   mt-2 "> */}
                {/* <h2 className="text text-xl md:text-2xl font-bold text-white text-center flex-1">My Cart</h2> */}
                <div className=" flex justify-end  text-sm">
                    {
                        carts.length ?
                            <Link to='/orderInfo'><button className="w-fit px-2 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium">Pay: {modTotalPrice} tk</button> </Link>

                            : <button onClick={() => {
                                Swal.fire({
                                    position: "top-end",
                                    title: "No product available in cart",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }} className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium">Pay: {modTotalPrice} tk</button>
                    }
                </div>
            {/* </div> */}
            <div>
                {
                    carts.map(cart => <SingleCart key={cart._id} cart={cart} refetch={refetch}></SingleCart>)
                }
            </div>

        </div>
    );
};

export default Cart;