import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";
import { useState } from "react";


const Home = () => {

    const [admin] = useState(false)

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {
                admin ?
                    <div>
                        admin home
                    </div> :
                    <div className="mt-5">
                        <Carosel></Carosel>
                    </div>
            }
        </div>
    );
};

export default Home;