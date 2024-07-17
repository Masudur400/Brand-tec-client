import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const AllProductTable = () => {

    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data
        }
    })


    // const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = watch

    const handleDelete = data => {
         
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete application...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/products/${data?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` application has been deleted.`,
                                icon: "success"
                            }); 
                        }
                    })
            }
        });
    }

    if(isPending){
        return <Loading></Loading>
    }

    return (
        <div>

           {
            allData?.length?
            <div className="overflow-x-auto">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className=""></th>
                            <th className=""></th>
                            {/* <th></th> */}
                            <th className="min-w-[300px] lg:w-[60%]"></th>
                            <th className=""></th>
                             
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allData?.map((data, idx) => <tr key={data?._id}>
                                <td>{idx+1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-16 w-16">
                                            <img
                                                src={data?.productImage}
                                                alt="image"/>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='text-xs font-bold'>{data?.productName}</p>
                                    {data?.productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}
                                    <p className='flex gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{data?.newPrice} Tk</span> <span className='text-xs line-through'>{data?.oldPrice} Tk</span></p>
                                    <p><span className="font-medium">Quantity :</span> {data?.productQuantity}</p>
                                    <p><span className="font-medium">Brand :</span> {data?.productBrand}</p>
                                    <p className="md:text-sm text-xs">{data?.productDetails}</p>
                                </td>
                                {/* <td className="md:text-sm text-xs">{data?.productDetails}</td> */}
                                <td className="flex justify-center items-center  "> 
                                    <div className="flex flex-col gap-2">
                                    <Link to={`/updateProduct/${data?._id}`}><button className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">Update</button></Link>
                                    <button onClick={()=>handleDelete(data)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">Delete</button>
                                    </div>
                                    </td>
                                 
                                 
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        :<p>Data is not available</p>
           }

        </div>
    );
};

export default AllProductTable;