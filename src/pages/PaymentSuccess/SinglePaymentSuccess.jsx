import PropTypes from 'prop-types'

const SinglePaymentSuccess = ({order}) => {

    const { _id, data, paidStatus, status, transactionId } = order  
    const { name, email, phone, address, shippingMethod, shippingArea, total, products, productsIds } = data
console.log(data);
    return (
        <div>
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

SinglePaymentSuccess.propTypes = {
    order: PropTypes.object, 
}

export default SinglePaymentSuccess;