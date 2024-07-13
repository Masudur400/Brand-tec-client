// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

import p1 from '../../src/assets/images/watch-removebg-preview.png'
import p2 from '../../src/assets/images/phone-3-removebg-preview.png'
import p3 from '../../src/assets/images/laptop-5-removebg-preview.png'



const Carosel = () => {
    return (
        <div className='bg-gradient-to-r from-orange-100 to-red-100'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide> <Slider image={p1} title={'Smart Watch'} text={'A smartwatch is a versatile wearable device that combines the functionality of a traditional wristwatch with advanced computing capabilities. It offers a range of features including fitness tracking, health monitoring, and seamless connectivity with smartphones.'}></Slider></SwiperSlide>
            <SwiperSlide> <Slider image={p2} title={"Smart Phone"} text={'A smartphone is a powerful mobile device combining computing capabilities with phone functions. It features touchscreens, advanced cameras, and operating systems like iOS and Android. Smartphones support internet browsing, social media, and a wide range of apps. Essential for communication and productivity, they are integral to modern life.'}></Slider></SwiperSlide>
            <SwiperSlide> <Slider image={p3} title={'Laptop'} text={'A laptop is a portable computer combining a display, keyboard, and touchpad in a single unit, designed for mobility. It supports internet browsing, software applications, multimedia, and gaming. Available in various sizes and specifications, laptops cater to diverse needs, from basic tasks to high-performance computing. Essential for personal and professional use, laptops offer versatility and convenience.'}></Slider></SwiperSlide>


        </Swiper>
        </div >
    );
};

export default Carosel;