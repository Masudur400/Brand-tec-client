import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const ProductRatings = () => {

    const axiosSecure = useAxiosSecure()

    // load product reviews 
    const { data: productReviews = [], refetch, isLoading } = useQuery({
        queryKey: ['productReviews', axiosSecure,],
        queryFn: async () => {
            const res = await axiosSecure.get(`/productReviews`)
            return res.data
        }
    })

    const handleDelete = review => { 
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete rating...!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/productReviews/${review?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            toast.success('delete successful !', {
                                duration: 1000,
                                position: 'top-center',
                            })
                        }
                    }).then(error => console.log(error))
            }
        });
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>Product Rating</title>
            </Helmet>
            <Toaster></Toaster>
            <h3 className="text-2xl font-bold text-center text-orange-500 mt-2 mb-5">Product Reviews</h3>
            {
                productReviews?.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Info</th>
                                    <th >Review & Comments</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    productReviews?.map(review => <tr key={review?._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <Avatar name={review?.name?.charAt(0)} src={review?.image} alt='img' className="rounded-full" size="60"></Avatar>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{review?.name}</div>
                                                    <div className="text-sm opacity-50">{review?.prodId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="">
                                            <p className="mb-2">{review?.comment}</p>
                                            <StarRatings
                                                rating={review?.rating}
                                                starRatedColor="#ff8804"
                                                starDimension="20px"
                                                starSpacing="2px"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </td>

                                        <th>
                                            <button onClick={() => handleDelete(review)} className="w-fit px-4 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm my-3 mr-7">Delete</button>
                                        </th>
                                    </tr>)
                                } 
                            </tbody>
                        </table>
                    </div> :
                    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center opacity-70"><p>No Data Available</p></div>
            }
        </div>
    );
};

export default ProductRatings;