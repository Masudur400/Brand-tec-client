import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";   
import LatestMobile from "./LatestMobile"; 
import LatestWatch from "./LatestWatch";
import LatestLaptop from './LatestLaptop'
import PublicRatings from "./PublicRatings";


const Home = () => {

     

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            
                    <div className="mt-5">
                        <Carosel></Carosel>  
                        <LatestWatch></LatestWatch>
                        <LatestMobile></LatestMobile>
                        <LatestLaptop></LatestLaptop>
                        <PublicRatings></PublicRatings>
                    </div>
             
        </div>
    );
};

export default Home;