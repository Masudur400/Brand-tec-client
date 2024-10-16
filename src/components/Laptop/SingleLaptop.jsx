import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Loading/Loading';



const SingleLaptop = ({ laptop }) => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = laptop

    const modOldPrice = new Intl.NumberFormat('en-IN').format(oldPrice);
    const modNewPrice = new Intl.NumberFormat('en-IN').format(newPrice);

    const handleAddCart = async (laptop) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: laptop.productName,
            productBrand: laptop.productBrand,
            oldPrice: laptop.oldPrice,
            newPrice: laptop.newPrice,
            quantity: 1,
            productQuantity: laptop.productQuantity,
            productImage: laptop.productImage,
            productDetails: laptop.productDetails,
            productType: laptop.productType,
            productAddDate: laptop.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            toast.success('Add cart successful')
        }
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (

        <div className='flex flex-col p-2 shadow-md rounded-md border border-base-300 group'>
            <ToastContainer></ToastContainer>
            <div>
                <img src={productImage} alt="" className='w-40 mx-auto group-hover:scale-105' />
            </div>
            <div className='space-y-1 my-3 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p>
                {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}
                <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-xs line-through'>{modOldPrice} Tk</span></p>
            </div>
            <div className="divider my-1"></div>
            <div className='flex justify-between items-center'>
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium mb-3 text-sm">Details</button></Link>
                <button onClick={() => handleAddCart(laptop)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm mb-3">AddCart</button>
            </div>
        </div>

    );
};

SingleLaptop.propTypes = {
    laptop: PropTypes.object
}

export default SingleLaptop;