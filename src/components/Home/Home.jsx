import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";   
import LatestMobile from "./LatestMobile"; 
import LatestWatch from "./LatestWatch";
import LatestLaptop from './LatestLaptop'


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
                    </div>
             
        </div>
    );
};

export default Home;