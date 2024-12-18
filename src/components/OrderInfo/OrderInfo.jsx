import { useState } from "react";
import useCart from "../Hooks/useCart";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "../../Loading/Loading";
import useShippings from "../Hooks/useShippings";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";


const OrderInfo = () => {

    const [carts, isLoading, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [shippings, shippingLoading] = useShippings()
    const [open, setOpen] = useState(false)
    const [location, setLocation] = useState('Service Charge')
    const [serviceCharge, setServiceCharge] = useState(0)
    const [serviceError, setServiceError] = useState('')
    const totalPrice = carts.reduce((total, product) => total + product.newPrice, 0);
    const inTotal = parseInt(totalPrice) + parseInt(serviceCharge)


    // const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    // const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);



    const cartsData = carts?.map(cart => {
        return {
            productName: cart?.productName,
            productImage: cart?.productImage,
            productPrice: cart?.newPrice,
            quantity: cart?.quantity,
        };
    });


    const handleServiceCharge = shipping => {
        setServiceCharge(shipping?.serviceCharge);
        setLocation(shipping?.shippingLocation)
        setOpen(!open)
        setServiceError('')
    }

    const handleOrder = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const phone = form.get('phone')
        const address = form.get('address')
        const email = user?.email
        const shippingMethod = serviceCharge
        const shippingArea = location
        const total = parseInt(inTotal)
        const products = cartsData
        // const products = carts.map(cart => cart.productName)
        const productsIds = carts?.map(cart => cart._id)
        // const images = carts.map(cart => cart.productImage)
        const date = new Date()
        const currency = 'BDT'
        const data = {
            name,
            email,
            phone,
            address,
            shippingMethod,
            shippingArea,
            total,
            products,
            productsIds,
            currency,
            date,
        }

        if (serviceCharge === 0) {
            setServiceError('select one service method')
            return
        }
        setServiceError('')

        const res = await axiosSecure.post('/orders', data)
        if (res.data) {
            window.location.replace(res.data.url)
        }
    }

    if (isLoading || shippingLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg border border-base-300 shadow-[0_0_25px_rgba(0,0,0,0.1)] max-sm:mx-4">
                <h3 className="text-3xl font-bold text-center text-orange-500 my-2">Order Information</h3>

                <form onSubmit={handleOrder}>

                    <div className="">
                        <div>
                            <p className="font-semibold mb-2">Your Name</p>
                            <input type="text" required name="name" placeholder="Your Name" id="" className="border rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Phone Number</p>
                            <input type="text" required name="phone" placeholder="Phone Number" id="" className="border rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>

                        <div>
                            <p className="font-semibold text-sm md:text-base mb-2">Address</p>
                            <input type="text" required name="address" placeholder="Address" id="" className="border rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>

                        <div>
                            <p className="font-semibold text-sm md:text-base mb-2"> Service Charge  (select your location) </p>
                            <div className="flex gap-[2px] justify-center items-center text-xs font-medium">

                                <p onClick={() => setOpen(!open)} required className=" flex items-center gap-1 bg-base-100 border rounded-md px-2 py-[9px] w-full "> {location}  <IoIosArrowDown></IoIosArrowDown></p>
                            </div>
                            {
                                serviceError ?
                                    <p className="text-sm text-red-500 my-1">{serviceError}</p> : ''
                            }
                            {
                                open ?
                                    <ul className="flex flex-col z-[999] absolute bg-base-200 rounded-md p-2">
                                        {
                                            shippings?.length ?
                                                shippings?.map(shipping => <li key={shipping._id}><button onClick={() => handleServiceCharge(shipping)} className="font-medium mb-1 text-center text-xs border px-2 w-full"> {shipping?.shippingLocation} (tk :  {shipping?.serviceCharge})</button></li>)
                                                : ''
                                        }
                                    </ul> : ''
                            }
                        </div>

                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts?.map((cart, idx) => <tr key={cart._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={cart?.productImage}
                                                        alt="img" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="min-w-56">{cart?.productName}</td>
                                        <td className="min-w-36 text-center p-0">{new Intl.NumberFormat('en-IN').format(cart?.newPrice)} Tk</td>
                                        <td className="text-orange-500">({cart?.quantity})</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="divider my-0"></div>

                    <div className=''>
                        <p className='flex justify-between items-center font-medium'><span>Sub Total :</span><span>{new Intl.NumberFormat('en-IN').format(totalPrice)} TK</span></p>
                        <p className='flex justify-between items-center font-medium'><span>Service Charge :</span><span>{serviceCharge} Tk</span></p>
                    </div>
                    <div className="divider my-0"></div>
                    <p className='flex justify-between items-center font-medium'><span>Total :</span><span>{new Intl.NumberFormat('en-IN').format(inTotal)} Tk</span></p>

                    <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 text-center text-lg rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium my-3" type="submit" value="Order Now" />

                    </div>
                </form>

            </div>
        </div>
    );
};

export default OrderInfo;