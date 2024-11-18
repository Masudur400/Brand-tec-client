import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";   
import LatestMobile from "./LatestMobile"; 
import LatestWatch from "./LatestWatch";
import LatestLaptop from './LatestLaptop'
import PublicRatings from "./PublicRatings";
import { useState } from "react";
import AdminHome from "./AdminHome";


const Home = () => {

     const [admin] = useState(true)

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            
                    {
                        !admin ?
                        <div className="mt-5">
                        <Carosel></Carosel>  
                        <LatestWatch></LatestWatch>
                        <LatestMobile></LatestMobile>
                        <LatestLaptop></LatestLaptop>
                        <PublicRatings></PublicRatings>
                    </div> :
                    <div className="mt-5">
                        <AdminHome></AdminHome>
                    </div>
                    }
             
        </div>
    );
};

export default Home;