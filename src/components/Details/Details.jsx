import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Loading from "../../Loading/Loading"; 
import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import { FiPlus } from "react-icons/fi"; 
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";
import { Rating, styled } from "@mui/material";
import { CiImageOn } from "react-icons/ci";
import SingleProductReview from "./SingleProductReview";
import StarRatings from "react-star-ratings";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { FaCartPlus, FaRegEye } from "react-icons/fa";


const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Details = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient()
    const [count, setCount] = useState(1)
    const { user, loading } = useAuth()
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [value, setValue] = useState(0);


    // data load for details
    const { data: singleData = {}, isLoading } = useQuery({
        queryKey: ['products', axiosPublic, id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`)
            return res.data
        }
    })

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = singleData

    const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
    const roundedNumber = parseFloat(discountPercentage.toFixed(1));

    const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);


    // load data by productBrand 
    const { data: allData = [], isLoading: isloading, refetch } = useQuery({
        queryKey: ['products', productBrand],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/br/${productBrand}`)
            return res.data
        }
    })

    // load product reviews 
    const { data: productReviews = [] } = useQuery({
        queryKey: ['productReviews', axiosPublic, _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/productReviews/${_id}`)
            return res.data
        }
    })

    const allBrand = Array.isArray(allData) ? allData?.filter(data => data?.productType === productType) : [];

    // minus count 
    const handleMinus = () => {
        if (count === 1) {
            return
        }
        setCount(count - 1)
    }

    // plus count 
    const handlePlus = () => {
        setCount(count + 1)
    }

    const handleAddCart = async (singleData) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: singleData?.productName,
            productBrand: singleData?.productBrand,
            oldPrice: parseFloat(singleData?.oldPrice) * count,
            newPrice: parseInt(singleData?.newPrice) * count,
            productQuantity: singleData?.productQuantity,
            quantity: count,
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
            queryClient.invalidateQueries('carts');
            refetch()
        }
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Store the actual file for uploading
            setPreview(URL.createObjectURL(file)); // Set the preview URL for display
        }
    };

    const handleImageClick = () => {
        document.getElementById('file-upload').click();
    };

    const handleReview = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const comment = form.get('comment');

        try {

            const imageData = new FormData();
            imageData.append('image', image);


            if (image?.name) {
                var imageRes = await axios.post(imageHostingApi, imageData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            const imageUrl = imageRes?.data?.data?.url;


            const data = {
                prodId: _id,
                name: name || user?.displayName,
                comment,
                image: imageUrl || user?.photoURL || '',
                rating: value,
            };
            // console.log(data);

            axiosPublic.post('/productReviews', data)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success('Thank You For Your Rating', {
                            duration: 1000,
                            position: 'top-center',
                        });
                        e.target.reset();
                        setImage(null)
                        setPreview(null)
                        setValue(null)
                        queryClient.invalidateQueries('productReviews');

                    }
                });

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    };

    const StyledRating = styled(Rating)({
        '& .MuiRating-icon': {
            border: '1px solid #ddd',
            borderRadius: '4px',
            margin: '2px',
        },
        '& .MuiRating-iconFilled': {
            color: '#ff8804',
        },
        '& .MuiRating-iconHover': {
            color: '#ff8804',
        },
    });

    const handleBrandAddCart = async (brand) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: brand?.productName,
            productBrand: brand?.productBrand,
            oldPrice: brand?.oldPrice,
            newPrice: brand?.newPrice,
            quantity: 1,
            productQuantity: brand?.productQuantity,
            productImage: brand?.productImage,
            productDetails: brand?.productDetails,
            productType: brand?.productType,
            productAddDate: brand?.productAddDate
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


    if (isLoading || isloading || loading) {
        return <Loading></Loading>
    }



    return (
        <div className="my-10">
            <Toaster></Toaster>
            <Helmet>
                <title>Details</title>
            </Helmet>
            {/* product details  */}

            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto border border-base-300 rounded-md shadow-md p-1">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-72 mx-auto" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    <div className='flex gap-3 items-center'>
                        {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}

                        <p className='text-xs font-medium text-red-500'>{roundedNumber} % OFF</p>
                    </div>
                    {
                        productReviews?.length > 0 &&
                        <div className="flex gap-3 items-center">
                            <StarRatings
                                rating={5}
                                starRatedColor="#ff8804"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name='rating'
                            />
                            <p className="font-bold text-lg">({productReviews?.length})</p>
                        </div>
                    }
                    <p className='flex gap-2 items-center'><span className='text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-sm line-through'>{modOldPrice} Tk</span></p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex gap-1">
                            <button onClick={handleMinus} className="px-1 flex justify-center items-center"><HiMinus></HiMinus></button>
                            <p className="font-medium bg-slate-50 px-4">{count}</p>
                            <button onClick={handlePlus} className="px-1 flex justify-center items-center"><FiPlus></FiPlus></button>
                        </div>
                        {
                            productQuantity > 0 ? <div>
                                {
                                    user ?
                                        <button onClick={() => handleAddCart(singleData)} className="w-fit px-4 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm my-3 mr-7">Add Cart</button> :
                                        <button onClick={() => toast.error('Please Login', {
                                            duration: 1000,
                                            position: 'top-center',
                                        })} className="w-fit px-4 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm my-3 mr-7">Add Cart</button>
                                }
                            </div> : ''
                        }
                    </div>
                </div>
            </div> 


            <div>
                <div className="my-10">
                    <div className="shadow-md border-base-300 border p-5 rounded-md">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <p className="w-3 h-10 bg-orange-500"></p>
                                <h3 className="text-xl font-bold my-2">Related Products</h3>
                            </div> 
                        </div>
                        <style >{`.swiper-button-next,
                .swiper-button-prev {
                color: #ffffff;  
                background-color: #848484;  
                padding: 10px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                }
                .swiper-button-next::after,
                .swiper-button-prev::after {
              font-size: 18px;}`}</style>
                        <div className="mt-5 bg-base-200 rounded-md px-2  py-5 ">
                            <Swiper className=""
                                // modules={[Pagination, Navigation]}
                                spaceBetween={10}
                                loop={true}
                                // navigation
                                breakpoints={{
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 5,
                                    },
                                }}
                            >

                                {
                                    allBrand.map(brand => <SwiperSlide key={brand._id}>
                                        <div className="bg-base-100  border border-base-200 rounded-md p-2 min-h-72">
                                            <div className='relative'>
                                                <img src={brand?.productImage} alt="img" className='w-40 mx-auto group-hover:scale-105' />
                                                <div className='absolute top-2 right-2 flex gap-3 flex-col'>
                                                    <Link to={`/details/${brand?._id}`} onClick={() => window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth", // Smooth scroll animation
                                                    })}> <button title='view details' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaRegEye /></button></Link>
                                                    {brand?.productQuantity > 0 ?
                                                        <div>
                                                            {
                                                                user ?
                                                                    <button onClick={() => handleBrandAddCart(brand)} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button> :
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
                                                <p className='text-xs font-medium'>{brand?.productName.split(' ').length > 5
                                                    ? brand?.productName.split(' ').slice(0, 5).join(' ') + '...'
                                                    : brand?.productName}  </p>
                                                <div className='flex justify-between   items-center'>
                                                    {brand?.productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}

                                                    <p className='text-xs font-medium'>{parseFloat((((brand?.oldPrice - brand?.newPrice) / brand?.oldPrice) * 100).toFixed(1))} % OFF</p>
                                                </div> 
                                                <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{new Intl.NumberFormat('en-IN').format(brand?.newPrice)} Tk</span> <span className='text-xs line-through'>{new Intl.NumberFormat('en-IN').format(brand?.oldPrice)} Tk</span></p>
                                            </div>
                                        </div>
                                    </SwiperSlide>)
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            {/* product rating  */}
            <div>
                <div className="flex gap-2 items-center">
                    <p className="w-3 h-10 bg-orange-500"></p>
                    <h3 className="text-xl font-bold my-5">Rate This Product</h3>
                </div>
                <div>
                    <form onSubmit={handleReview} className="text-sm">

                        <div className="">
                            {/* <p className="font-medium mb-1">Review</p> */}
                            <StyledRating
                                required
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                sx={{
                                    fontSize: '2rem',
                                }}
                            />
                        </div>

                        <div className="flex gap-4 my-2">
                            {
                                !user &&
                                <div>
                                    {/* <p className="mb-1 font-medium">Name</p> */}
                                    <input type="text" name="name" placeholder="Your Name" required className="px-2 py-1 rounded-md border-2 border-base-200" />
                                </div>
                            }
                            <div>
                                {/* <p className="mb-1 font-medium">Comment</p> */}
                                <input type="text" name="comment" placeholder="Comment" required className="px-2 py-1 rounded-md border-2 border-base-200 " />
                            </div>
                        </div>

                        <div className="mb-8">
                            {
                                !user &&
                                <div className="image-file-input">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div className="flex gap-4">
                                        <div>
                                            <p className="font-medium mb-1">Your Photo</p>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 border border-base-100 bg-base-200 cursor-pointer">
                                                    <CiImageOn onClick={handleImageClick} className="text-4xl" />
                                                </div>
                                                <div className="w-12 h-12">
                                                    {preview && (
                                                        <div className="w-12 h-12 relative">
                                                            <img src={preview} alt="Preview" className="rounded-md" />
                                                            <p
                                                                onClick={() => {
                                                                    setImage(null);
                                                                    setPreview(null);
                                                                }}
                                                                className="text-white absolute right-0 top-0 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer "
                                                            >
                                                                <span className='mb-1'>x</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                        {
                            user ? <button className="px-2 py-1 w-[180px] h-fit border text-orange-500 hover:shadow-md border-orange-500 rounded-md font-medium">Add Review</button> :
                                <button className="px-2 py-1 w-96 h-fit border text-orange-500 hover:shadow-md border-orange-500 rounded-md font-medium">Add Review</button>
                        }
                    </form>
                </div>
            </div>

            {/* map rating data  */}
            <div className="flex gap-2 items-center mt-5 border-b-2 w-96">
                <p className="w-3 h-10 bg-orange-500"></p>
                <h3 className="text-xl font-bold my-5">Product Reviews</h3>
            </div>
            <div className="space-y-3">
                {
                    productReviews?.map(review => <SingleProductReview key={review?._id} review={review}></SingleProductReview>)
                }
            </div>

        </div>
    );
};

export default Details; 