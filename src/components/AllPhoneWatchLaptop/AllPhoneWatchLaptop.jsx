import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";
import SingleProduct from "./SingleProduct";
import Loading from "../../Loading/Loading";


const AllPhoneWatchLaptop = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('Default');
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(0)


    // all product 
    const { data: allData = [], isLoading, refetch } = useQuery({
        queryKey: ['products', axiosPublic, search,currentPage, itemParPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/all?search=${search}&page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })


    // prosucts count 
    const { data: count = {}, isLoading: isloading } = useQuery({
        queryKey: ['productsCount', axiosPublic, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/productsCount`)
            return res.data
        }
    })

    // const allPhone = allData?.filter(data => data?.productType === 'Phone')
    // const allPhone = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Phone') : [];

    // const handleYesNo = element => {
    //     if (element === 'default') {
    //         setProducts(allData);
    //         setSortPrice('Default');
    //         setOpen(!open)
    //     }
    //     else if (element === 'low') {
    //         const sorted = allData.slice().sort((a, b) => a.newPrice - b.newPrice);
    //         setProducts(sorted);
    //         // setSortPrice('ascending')
    //         setSortPrice('Low - High')
    //         setOpen(!open)
    //     }
    //     else if (element === 'high') {

    //         const sorted = allData.slice().sort((a, b) => b.newPrice - a.newPrice);
    //         setProducts(sorted);
    //         // setSortPrice('descending');
    //         setSortPrice('High - low');
    //         setOpen(!open)
    //     }
    // }

    const handleSearch = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        // const form = new FormData(e.currentTarget)
        const searchText = form.get('search')
        setSearch(searchText)
        e.target.reset()
    }

    useEffect(() => {
        if (count.count) {
            const numberOfPages = Math.ceil(count.count / itemParPage)
            const page = [...Array(numberOfPages).keys()];
            setPages(page)
        }
    }, [itemParPage, count])

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth", // Smooth scroll animation
            });
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth", // Smooth scroll animation
            });
        }
    }

    if(isLoading || isloading){
        return <Loading></Loading>
    }

    return (
        <div>
            {/* <div className="my-4 flex justify-center items-center gap-10">
                <h3 className="text-lg md:text-2xl font-bold text-center text-orange-500 ">All Product</h3>
                <div>
                    <div className="flex gap-[2px] justify-center items-center text-xs font-medium">
                        <span>Sort By :</span>
                        <button onClick={() => setOpen(!open)} className="flex justify-center items-center gap-1 bg-base-100 rounded-sm px-2 py-1">  {sortPrice}<IoIosArrowDown></IoIosArrowDown></button>
                    </div>
                    {
                        open ?
                            <ul className="flex flex-col z-[999] absolute bg-base-100 p-2">
                                <li><button onClick={() => handleYesNo('default')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Default</button></li>
                                <li><button onClick={() => handleYesNo('low')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(Low - High)</button></li>
                                <li><button onClick={() => handleYesNo('high')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(High - low)</button></li>
                            </ul> : ''
                    }
                </div>
            </div> */}

            <div>
                <form onSubmit={handleSearch} className="flex justify-center items-center mb-4">
                    <input type="text" name="search" id="" placeholder="Search...." className="px-2 py-1 border border-orange-500" />
                    <input type="submit" value="Search" className="px-2 py-1 border border-orange-500 bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white" />
                </form>
            </div>

            {/* load all data  */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-10">

                {
                    allData?.length > 0 ?
                    allData?.map(singleData => <SingleProduct key={singleData?._id} singleData={singleData} refetch={refetch}></SingleProduct>) :
                         ''
                }
            </div>


            <div>
                <div className="md:w-1/2 mx-auto mt-10 mb-5">
                    <button onClick={handlePrevPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Prev</button>
                    {
                        pages?.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={currentPage === page ? "px-3 py-1 text-white bg-orange-400 hover:bg-orange-500 mr-3 rounded-sm mb-2" : "px-3 py-1 bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm mb-2"}>{page + 1}</button>)
                    }
                    <button onClick={handleNextPage} className="px-3 py-1 font-medium bg-orange-100 hover:bg-orange-200 mr-3 rounded-sm ">Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllPhoneWatchLaptop;