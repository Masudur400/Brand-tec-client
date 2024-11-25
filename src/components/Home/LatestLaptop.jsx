import { Swiper, SwiperSlide } from "swiper/react"; 
import { Pagination, Navigation } from "swiper/modules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Loading/Loading"; 
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";


const LatestMobile = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const { data: allData = [], isLoading, refetch } = useQuery({
        queryKey: ['products', axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products`)
            return res.data
        }
    })
    const laptops = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Laptop') : [];

    const handleAddCart = async (laptop) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: laptop?.productName,
            productBrand: laptop?.productBrand,
            oldPrice: laptop?.oldPrice,
            newPrice: laptop?.newPrice,
            quantity: 1,
            productQuantity: laptop?.productQuantity,
            productImage: laptop?.productImage,
            productDetails: laptop?.productDetails,
            productType: laptop?.productType,
            productAddDate: laptop?.productAddDate
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

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="my-10">
            <Toaster></Toaster>
            <div className="shadow-md border-base-300 border p-5 rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <p className="w-3 h-10 bg-orange-500"></p>
                        <h3 className="text-xl font-bold my-2">Latest Laptop</h3>
                    </div>
                    <Link to='/laptop' onClick={() => window.scrollTo({
                        top: 0,
                        behavior: "smooth", 
                    })}><p className="text-sm font-medium underline hover:text-orange-500">See more</p></Link>
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
                        modules={[Pagination, Navigation]}
                        spaceBetween={10}
                        loop={true}
                        navigation
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
                            laptops.map(laptop => <SwiperSlide key={laptop._id}>
                                <Link to={`/details/${laptop?._id}`} onClick={() => window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",  
                                            })}>
                                <div className="bg-base-100  border border-base-200 rounded-md p-2 min-h-72">
                                    <div className='relative'>
                                        <img src={laptop?.productImage} alt="img" className='w-40 mx-auto' />
                                        <div className='absolute top-2 right-2 flex gap-3 flex-col'> 
                                            {laptop?.productQuantity > 0 ?
                                                <div>
                                                    {
                                                        user ?
                                                            <button onClick={() => handleAddCart(laptop)} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button> :
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
                                        <p className='text-xs font-medium'>{laptop?.productName.split(' ').length > 5
                                            ? laptop?.productName.split(' ').slice(0, 5).join(' ') + '...'
                                            : laptop?.productName}  </p>
                                        <div className='flex justify-between   items-center'>
                                            {laptop?.productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}

                                            <p className='text-xs font-medium'>{parseFloat((((laptop?.oldPrice - laptop?.newPrice) / laptop?.oldPrice) * 100).toFixed(1))} % OFF</p>
                                        </div>
                                        
                                        <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{new Intl.NumberFormat('en-IN').format(laptop?.newPrice)} Tk</span> <span className='text-xs line-through'>{new Intl.NumberFormat('en-IN').format(laptop?.oldPrice)} Tk</span></p>
                                    </div>
                                </div>
                                </Link>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default LatestMobile;