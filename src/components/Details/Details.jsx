import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Loading from "../../Loading/Loading";
import SingleBrand from "./SingleBrand";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import { HiMinus } from "react-icons/hi"; 
import useAuth from "../Hooks/useAuth";
import { FiPlus } from "react-icons/fi";
import Barcode from "react-barcode";
import toast, { Toaster } from "react-hot-toast";


const Details = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [count, setCount] = useState(1)
    const { user, loading } = useAuth()



    // data load for details
    const { data: singleData = {}, isPending } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
            return res.data
        }
    })

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = singleData

    const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);


    // load data by productBrand 
    const { data: allData = [], isPending: isLoading } = useQuery({
        queryKey: ['products', productBrand],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/br/${productBrand}`)
            return res.data
        }
    })

    const allBrand = Array.isArray(allData) ? allData?.filter(data => data?.productType === productType) : [];

    // minus count 
    const handleMinus = () => {
        if (count === 1) {
            return
        }
        setCount(count - 1)
    }

    // plus count 
    const handlePlus = () => {
        setCount(count + 1)
    }

    const handleAddCart = async (singleData) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: singleData.productName,
            productBrand: singleData.productBrand,
            oldPrice: parseFloat(singleData.oldPrice) * count,
            newPrice: parseInt(singleData.newPrice) * count,
            productQuantity: singleData.productQuantity,
            quantity: count,
            productImage: singleData.productImage,
            productDetails: singleData.productDetails,
            productType: singleData.productType,
            productAddDate: singleData.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            toast.success('Add cart successful')
        }
    }



    if (isPending || isLoading || loading) {
        return <Loading></Loading>
    }



    return (
        <div className="my-10">
            <Toaster></Toaster>
            <Helmet>
                <title>Details</title>
            </Helmet>
             

            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto border border-base-300 rounded-md shadow-md p-1">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-72 mx-auto" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    {productQuantity > 0 ? <span className='  text-green-500 font-medium'>In Stock</span> : <span className='  text-red-500 font-medium' >Stock Out</span>}
                    <p className='flex gap-2 items-center'><span className='text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-sm line-through'>{modOldPrice} Tk</span></p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex gap-1">
                            <button onClick={handleMinus} className="px-1 flex justify-center items-center"><HiMinus></HiMinus></button>
                            <p className="font-medium bg-slate-50 px-4">{count}</p>
                            <button onClick={handlePlus} className="px-1 flex justify-center items-center"><FiPlus></FiPlus></button>
                        </div>
                        <button onClick={() => handleAddCart(singleData)} className="w-fit px-4 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm my-3 mr-7">Add Cart</button>
                    </div>
                </div>
            </div>
            <div>
                <Barcode value={id} className='w-52'></Barcode>
            </div>
            <h2 className="text-2xl font-bold mt-5 text-center text-orange-500">More</h2>
            <Marquee speed={30}>
                <div className="flex gap-4 my-5 ml-4">
                    {
                        allBrand?.map(brand => <SingleBrand key={brand?._id} brand={brand}></SingleBrand>)
                    }
                </div>
            </Marquee>

        </div>
    );
};

export default Details; 