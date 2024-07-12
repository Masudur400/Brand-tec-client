import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";

 
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
             <div className="mt-5">
             <Carosel></Carosel>
             </div>
        </div>
    );
};

export default Home;