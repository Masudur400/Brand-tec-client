import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { FaCartPlus, FaRegEye } from "react-icons/fa";



const SingleProduct = ({ singleData, refetch }) => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient()
    const { user, loading } = useAuth()

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = singleData

    const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
    const roundedNumber = parseFloat(discountPercentage.toFixed(1));

    const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);

    const handleAddCart = async (singleData) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: singleData?.productName,
            productBrand: singleData?.productBrand,
            oldPrice: singleData?.oldPrice,
            newPrice: singleData?.newPrice,
            quantity: 1,
            productQuantity: singleData?.productQuantity,
            productImage: singleData?.productImage,
            productDetails: singleData?.productDetails,
            productType: singleData?.productType,
            productAddDate: singleData?.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            toast.success('Add cart successful', {
                duration: 1000,
                position: 'top-center',
            })
            refetch()
            queryClient.invalidateQueries('carts');
        }
    }

    // load product reviews 
    const { data: productReviews = [] } = useQuery({
        queryKey: ['products', productBrand, _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/productReviews/${_id}`)
            return res.data
        }
    })

    return (
         
            <div className='flex flex-col p-2 shadow-md rounded-md border border-base-300 group'>
                <div className='relative'>
                    <img src={productImage} alt="img" className='w-40 mx-auto group-hover:scale-105' />
                    <div className='absolute top-2 right-2 flex gap-3 flex-col'>

                    <Link to={`/details/${_id}`} onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })}>
                            <button title='details' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaRegEye /></button>
                        </Link>

                        {productQuantity > 0 ?
                            <div>
                                {
                                    user ?
                                        <button onClick={() => handleAddCart(singleData)} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button> :
                                        <button onClick={() => toast.error('Please Login', {
                                            duration: 1000,
                                            position: 'top-center',
                                        })} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button>
                                }
                            </div> : ""
                        }
                    </div>
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='text-xs font-medium'>{productName.split(' ').length > 5
                        ? productName.split(' ').slice(0, 5).join(' ') + '...'
                        : productName}</p>
                    <div className='flex justify-between   items-center'>
                        {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}

                        <p className='text-xs font-medium'>{roundedNumber} % OFF</p>
                    </div>
                    {
                        productReviews?.length > 0 &&
                        <div className="flex gap-2 items-center">
                            <StarRatings
                                rating={5}
                                starRatedColor="#ff8804"
                                starDimension="15px"
                                starSpacing="0px"
                                numberOfStars={5}
                                name='rating'
                            />
                            <p className="font-bold">({productReviews?.length})</p>
                        </div>
                    }
                    <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-xs line-through'>{modOldPrice} Tk</span></p>
                </div>
            </div>
         
    );
};


SingleProduct.propTypes = {
    singleData: PropTypes.object,
    refetch: PropTypes.func
}

export default SingleProduct;