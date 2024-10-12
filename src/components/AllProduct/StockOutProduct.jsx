import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useEffect, useState } from "react";


const StockOutProduct = () => {

    const axiosSecure = useAxiosSecure()
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(0)


    const { data: outOfStock = [], isPending, refetch } = useQuery({
        queryKey: ['/products/st/stockOut', axiosSecure, currentPage, itemParPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/st/stockOut?page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })

    const { data: count = [] } = useQuery({
        queryKey: ['/products/st/stockOut', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/products/st/stockOut')
            return res.data
        }
    })


    useEffect(() => {
        if (count.length) {
            const numberOfPages = Math.ceil(count.length / itemParPage)
            const page = [...Array(numberOfPages).keys()];
            setPages(page)
        }
    }, [itemParPage, count.length])

    const handleItemParPage = e => {
        const val = parseInt(e.target.value)
        setItemParPage(val)
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // const outOfStock = Array.isArray(allData) ? allData.filter(data => parseInt(data?.productQuantity) === 0) : [];

    const handleDelete = data => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete product...!",
            // icon: "warning",
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
                                position: "top-end",
                                title: "delete successful !",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            }
        });
    }

    if (isPending) {
        return <Loading></Loading>
    }

    return (
        <div>

            <div className="flex gap-1 justify-end items-center mr-4 text-xs font-medium">
                <p className="px-2 py-1 bg-base-100">Show : </p>
                <select onChange={handleItemParPage} defaultValue={itemParPage} name="" id="" className="border px-2 py-1">
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                </select>
            </div>

            {
                outOfStock?.length ?
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
                                        outOfStock?.map((data, idx) => <tr key={data?._id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-16 w-16">
                                                        <img
                                                            src={data?.productImage}
                                                            alt="image" />
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
                                                    <button onClick={() => handleDelete(data)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">Delete</button>
                                                </div>
                                            </td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <p>Data is not available</p>
            }

            <div className="md:w-1/2 mx-auto mt-10 mb-5">
                <button onClick={handlePrevPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Prev</button>
                {
                    pages?.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={currentPage === page ? "px-3 py-1 text-white bg-orange-400 hover:bg-orange-500 mr-3 rounded-sm mb-2" : "px-3 py-1 bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm mb-2"}>{page + 1}</button>)
                }
                <button onClick={handleNextPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Next</button>
            </div>

        </div>
    );
};

export default StockOutProduct;