import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import PropTypes from 'prop-types'


const SingleCart = ({ cart, refetch }) => {

    const axiosSecure = useAxiosSecure()

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate, quantity } = cart

    const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);

    const handleDelete = data => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete item...!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${data?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                title: "cart successful !",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto border border-base-300 rounded-md shadow-md p-1 my-5 group">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-60 mx-auto group-hover:scale-105" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    {productQuantity > 0 ? <span className='  text-green-500 font-medium'>In Stock</span> : <span className='  text-red-500 font-medium' >Stock Out</span>}
                    <p className='flex gap-2 items-center'><span className='text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-sm line-through'>{modOldPrice} Tk</span></p>
                    <p>Quantity : {quantity}</p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-end items-center px-2">
                        <button onClick={() => handleDelete(cart)} className="w-fit px-4 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm my-3 mr-7">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

SingleCart.propTypes = {
    cart: PropTypes.object,
    refetch: PropTypes.func

}


export default SingleCart;