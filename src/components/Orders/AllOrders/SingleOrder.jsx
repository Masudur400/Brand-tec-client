import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { RiEdit2Line } from 'react-icons/ri';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast'; 
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';



const SingleOrder = (order) => {

    const axiosSecure = useAxiosSecure()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { _id, data, paidStatus, status, transactionId } = order.order 
    const { name, email, phone, address, shippingMethod, shippingArea, total, products, productsIds } = data
    const modamount = new Intl.NumberFormat('en-IN').format(total);
    const modshippingMethod = new Intl.NumberFormat('en-IN').format(shippingMethod);
    const intotal = new Intl.NumberFormat('en-IN').format(shippingMethod + total);

    const handleEditStatus = async (e) => {
        e.preventDefault()
        const currentStatus = e.target.status.value 
        const data = {
            status: currentStatus
        }

        const res = await axiosSecure.patch(`/orders/${_id}`, data)
        console.log(res)
        if (res.data.modifiedCount > 0) {
            setOpen(!open)
            toast.success('status has changed') 
            queryClient.invalidateQueries('orders') 
            navigate('/orders') 
        } 
    }

    // useEffect(()=>{
    //     if (status === 'Completed') {
    //         setTimeout(async () => {
    //             const res = await axiosSecure.post(`/completeOrders`, { orderId: _id, ...order });
    //             // toast.success('Order moved to Completed Orders');
    //             if (res.data.insertedId) { 
    //                 queryClient.invalidateQueries('completeOrders')  
    //             }
    //         }, 1000); // 1 hour
    //     }
    // },[queryClient,axiosSecure, order, _id,status])

     

    

    return (
        <div className='md:flex gpa-5 justify-center items-center shadow-md border border-base-300 p-2 mb-5 max-sm:space-y-3'>
            <Toaster></Toaster>
            <div className=' mx-2 min-w-56'>
                <p className='text-sm'><span className='font-medium'>Name: </span>{name}</p>
                <p className='text-sm'><span className='font-medium'>Email: </span>{email}</p>
                <p className='text-sm'><span className='font-medium'>Address: </span>{address}</p>
                <p className='text-sm'><span className='font-medium'>Area: </span>{shippingArea}</p>
                <p className='text-sm'><span className='font-medium'>Phone: </span>{phone}</p>
                <p className='text-sm'><span className='font-medium'>Status: </span><span className="text-red-500">{status}</span></p>
                <p className='text-sm'><span className='font-medium'>Total With Charge: </span>{modamount} Tk</p>
                <p className='text-sm text-red-400'><span className='font-medium'></span>{transactionId}</p>
                {/* <p className='text-sm'><span className='font-medium'>Charge: </span>{modshippingMethod} Tk</p> */}
                {/* <p className='text-sm'><span className='font-medium'>Total: </span>{intotal} Tk</p> */}
            </div>

            <div className="overflow-x-scroll w-full">
                <table className="table px-2 w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product) => <tr key={product._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={product?.productImage}
                                                alt="img" />
                                        </div>
                                    </div>
                                </td>
                                <td className="min-w-56">{product?.productName}</td>
                                <td className="min-w-36 text-center p-0">{new Intl.NumberFormat('en-IN').format(product?.productPrice)} Tk</td>
                                <td className="text-orange-500">({product?.quantity})</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='mx-2 flex justify-center items-center min-w-32'>
                
                 {
                    !open ?
                     <button onClick={()=>setOpen(!open)} className='border border-orange-400 text-orange-500 hover:shadow-lg font-medium px-2 py-1 rounded-md max-sm:mb-3 flex gap-1 justify-center items-center'><RiEdit2Line /> <span>Status</span></button>
                    :
                    <form onSubmit={handleEditStatus} className='flex flex-col items-center gap-3 my-2'>
                        <select name="status" id="" className="border-2 border-base-300 bg-base-100 px-4 py-1 rounded-md">
                            <option disabled selected>{status}</option>
                            <option value='Processing'>Processing</option>
                            <option value='OnTheWay'>OnTheWay</option>
                            <option value='Completed'>Completed</option>
                        </select>
                        <div>
                            <input type="submit" value="Done" className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-orange-500 text-white font-normal text-[10px]" />
                        </div>
                    </form>
                 }
            </div>
        </div>

    );
};

SingleOrder.propTypes = {
    order: PropTypes.object, 
}

export default SingleOrder;