import PropTypes from 'prop-types'

const SingleMyCompleteOrders = ({order}) => {

    const { _id, data, paidStatus, status, transactionId } = order  
    const { name, email, phone, address, shippingMethod, shippingArea, total, products, productsIds } = data

    const modamount = new Intl.NumberFormat('en-IN').format(total);

    return (
         <div className='mb-10 border border-base-300 shadow-md p-2'>
            <div className="overflow-x-scroll w-full">
                <table className="table px-2 w-full">
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
            <div>
            <p className='m-2'>{transactionId}</p>
            <p className='text-sm m-2'><span className='font-medium'>Total Amount With Charge: </span><span className='text-red-500'>{modamount} Tk</span></p>
            </div>
        </div>
    );
};

SingleMyCompleteOrders.propTypes = {
    order: PropTypes.object, 
}

export default SingleMyCompleteOrders;