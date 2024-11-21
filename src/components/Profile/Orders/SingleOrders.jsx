import PropTypes from 'prop-types'


const SingleOrders = ({order}) => {

    const { _id, data, paidStatus, status, transactionId } = order  
    const { name, email, phone, address, shippingMethod, shippingArea, total, products, productsIds } = data

    const modamount = new Intl.NumberFormat('en-IN').format(total);

    return (
        <div className='md:flex gpa-5 justify-center items-center shadow-md border border-base-300 p-2 mb-5 max-sm:space-y-3'>
             
            <div className=' mx-2 min-w-56'>
                <p className='text-sm'><span className='font-medium'>Name: </span>{name}</p>
                <p className='text-sm'><span className='font-medium'>Email: </span>{email}</p>
                <p className='text-sm'><span className='font-medium'>Address: </span>{address}</p>
                <p className='text-sm'><span className='font-medium'>Area: </span>{shippingArea}</p>
                <p className='text-sm'><span className='font-medium'>Phone: </span>{phone}</p>
                <p className='text-sm'><span className='font-medium'>Status: </span><span className="text-red-500">{status}</span></p>
                <p className='text-sm'><span className='font-medium'>Total With Charge: </span>{modamount} Tk</p>
                <p className='text-sm text-red-400'><span className='font-medium'></span>{transactionId}</p>
                
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
             
        </div>

       
    );
};

SingleOrders.propTypes = {
    order: PropTypes.object, 
}

export default SingleOrders;