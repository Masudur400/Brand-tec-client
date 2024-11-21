import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";
import LatestMobile from "./LatestMobile";
import LatestWatch from "./LatestWatch";
import LatestLaptop from './LatestLaptop'
import PublicRatings from "./PublicRatings";
import AdminHome from "./AdminHome"; 
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";
import Loading from "../../Loading/Loading";


const Home = () => {

     
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isModerator , isModeratorLoading] = useModerator() 
    

    if(isAdminLoading || isModeratorLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet> 

            {
                isAdmin || isModerator ?
                    <div>
                        <AdminHome></AdminHome>
                    </div> :
                    <div className="mt-5">
                        <Carosel></Carosel>
                        <LatestWatch></LatestWatch>
                        <LatestMobile></LatestMobile>
                        <LatestLaptop></LatestLaptop>
                        <PublicRatings></PublicRatings>
                    </div>
            }

        </div>
    );
};

export default Home;