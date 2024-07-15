import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Loading from "../../Loading/Loading";
import SingleBrand from "./SingleBrand";
import Marquee from "react-fast-marquee";


const Details = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    // data load for details
    const { data: singleData = {}, isPending } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
            return res.data
        }
    })

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = singleData


    // load data by productBrand 
    const { data: allData = [], isPending: isLoading } = useQuery({
        queryKey: ['products', productBrand],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/br/${productBrand}`)
            return res.data
        }
    }) 

    const allBrand = Array.isArray(allData) ? allData?.filter(data => data?.productType === productType) : []; 

    if (isPending || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="my-10">
            <Helmet>
                <title>Details</title>
            </Helmet>

            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto bg-gradient-to-r from-orange-100 to-red-100 rounded-md shadow-md p-2">
                <div>
                    <img src={productImage} alt="" className="w-60 md:w-80 mx-auto" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    {productQuantity > 0 ? <span className='  text-green-500 font-medium'>In Stock</span> : <span className='  text-red-500 font-medium' >Out Of Stock</span>}
                    <p className='flex gap-2 items-center'><span className='text-orange-500 font-medium'>{newPrice} Tk</span> <span className='text-sm'>{oldPrice} Tk</span></p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-center md:block">
                        <button className="w-fit px-4 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium text-sm my-3">Add Cart</button>
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-10 text-center text-orange-500">More</h2>
            <Marquee speed={30}>
                <div className="flex gap-4 my-10 ml-4">
                    {
                        allBrand?.map(brand => <SingleBrand key={brand?._id} brand={brand}></SingleBrand>)
                    }
                </div>
            </Marquee>

        </div>
    );
};

export default Details;