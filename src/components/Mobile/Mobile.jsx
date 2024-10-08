import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import SingleMobile from "./SingleMobile";
import Loading from "../../Loading/Loading";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";


const Mobile = () => {
    const axiosSecure = useAxiosSecure()
    const [products, setProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('Default');
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

    const { data: allData = [], isPending } = useQuery({
        queryKey: ['products', axiosSecure, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/pp?search=${search}`)
            return res.data
        }
    })

    // const allPhone = allData?.filter(data => data?.productType === 'Phone')
    const allPhone = Array.isArray(allData) ? allData.filter(data => data?.productType === 'Phone') : [];

    const handleYesNo = element => {
        if (element === 'default') {
            setProducts(allPhone);
            setSortPrice('Default');
            setOpen(!open)
        }
        else if (element === 'low') {
            const sorted = allPhone.slice().sort((a, b) => a.newPrice - b.newPrice);
            setProducts(sorted);
            // setSortPrice('ascending')
            setSortPrice('Low - High')
            setOpen(!open)
        }
        else if (element === 'high') {

            const sorted = allPhone.slice().sort((a, b) => b.newPrice - a.newPrice);
            setProducts(sorted);
            // setSortPrice('descending');
            setSortPrice('High - low');
            setOpen(!open)
        }
    }

    const handleSearch = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        // const form = new FormData(e.currentTarget)
        const searchText = form.get('search')
        setSearch(searchText)
        e.target.reset()
    }

    if (isPending) {
        return <Loading></Loading>
    }


    return (
        <div>
            <Helmet>
                <title>Mobile</title>
            </Helmet>
            <div className="my-4 flex justify-center items-center gap-10">
                <h3 className="text-lg md:text-2xl font-bold text-center text-orange-500">Mobile</h3>
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
            </div>

            <div>
                <form onSubmit={handleSearch} className="flex justify-center items-center mb-4">
                    <input type="text" name="search" id="" placeholder="Search...." className="px-2 py-1 border border-orange-500" />
                    <input type="submit" value="Search" className="px-2 py-1 border border-orange-500 bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white" />
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
                {
                    products.length ?
                        products?.map(phone => <SingleMobile key={phone?._id} phone={phone}></SingleMobile>) :
                        allPhone?.map(phone => <SingleMobile key={phone?._id} phone={phone}></SingleMobile>)
                }
            </div>
        </div>
    );
};

export default Mobile;