import { Helmet } from "react-helmet";
import Carosel from "../../Slider/Carosel";
import LatestMobile from "./LatestMobile";
import LatestWatch from "./LatestWatch";
import LatestLaptop from './LatestLaptop'
import PublicRatings from "./PublicRatings";
import AdminHome from "./AdminHome";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";
import Loading from "../../Loading/Loading";


const Home = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isModerator , isModeratorLoading] = useModerator()

    // const { data: users = {}, isLoading, refetch } = useQuery({
    //     queryKey: ["users", user?.email, axiosPublic],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/users/${user?.email}`);
    //         return res.data;
    //     },
    // });
    // const { role } = users;

    // if (isLoading) {
    //     return <p>Loading........</p>
    // }

    if(isAdminLoading || isModeratorLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            {/* {
                role === 'Guest' ?
                    <div className="mt-5">
                        <Carosel></Carosel>
                        <LatestWatch></LatestWatch>
                        <LatestMobile></LatestMobile>
                        <LatestLaptop></LatestLaptop>
                        <PublicRatings></PublicRatings>
                    </div> :
                    <div className=" ">
                        {
                            role === 'Admin' || role === 'Moderator' ?
                                <AdminHome></AdminHome> :
                                <div className="mt-5">
                                    <Carosel></Carosel>
                                    <LatestWatch></LatestWatch>
                                    <LatestMobile></LatestMobile>
                                    <LatestLaptop></LatestLaptop>
                                    <PublicRatings></PublicRatings>
                                </div>
                        }
                    </div>
            } */}

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