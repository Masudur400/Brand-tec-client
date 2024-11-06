import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Avatar from "react-avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const PublicRatings = () => {

    const axiosPublic = useAxiosPublic()

    const { data: allReviews = [], isLoading } = useQuery({
        queryKey: ['reviews', axiosPublic],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews`)
            return res.data
        }
    })
if(isLoading){
    <p className="text-center">Loading...</p>
}
    return (
        <div className="my-10 shadow-md border-base-300 border p-3 rounded-md">

            <div className="flex gap-2 items-center">
                <p className="w-3 h-10 bg-orange-500"></p>
                <h3 className="text-xl font-bold my-2"> ({allReviews?.length}+) Public Rate Us</h3>
            </div> 
             
            <div className="mt-5 bg-base-200 rounded-md px-2  py-5 ">
                <Swiper className=""
                    // modules={[Pagination, Navigation]}
                    spaceBetween={10}
                    loop={true}
                    // navigation
                    breakpoints={{ 
                        // 320: {  
                        //     slidesPerView: 2,
                        // },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >

                    {
                        allReviews.map(review => <SwiperSlide key={review._id}> 
                                    <div className="p-1">
                                    <div className="flex gap-5 items-center bg-base-100 rounded-md p-3">
                                        <Avatar name={name?.charAt(0)} src={review?.image} alt="img" className=" rounded-full" size="50" />
                                        <div className="">
                                            <p className="text-sm font-medium">{review.name}</p>
                                            <StarRatings
                                                rating={review?.rating}
                                                starRatedColor="#ff8804"
                                                starDimension="20px"
                                                starSpacing="2px"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                    </div> 
                                    </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default PublicRatings;