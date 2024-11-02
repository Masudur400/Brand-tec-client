import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth'; 
import Loading from '../../Loading/Loading';
import { FaCartPlus, FaRegEye } from 'react-icons/fa';
import toast  from 'react-hot-toast';



const SingleLaptop = ({ laptop }) => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = laptop

    const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
    const roundedNumber = parseFloat(discountPercentage.toFixed(1)); 

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
            toast.success('Add cart successful', {
                duration: 1000,
                position: 'top-center',
            }) 
        }
    }

    // if (loading) {
    //     return <Loading></Loading>
    // }

    return (

        <div className='flex flex-col p-2 shadow-md rounded-md border border-base-300 group'> 
            <div className='relative'>
                <img src={productImage} alt="img" className='w-40 mx-auto group-hover:scale-105' />
                <div className='absolute top-2 right-2 flex gap-3 flex-col'>
                <Link to={`/details/${_id}`}> <button title='view details' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaRegEye /></button></Link>
                {productQuantity > 0 ?  
                    <div>
                    {
                        user ?
                        <button onClick={() => handleAddCart(laptop)} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button> :
                        <button onClick={() => toast.error('Please Login', {
                            duration: 1000,
                            position: 'top-center',
                        })} title='add cart' className="w-fit p-2 bg-base-200 text-center rounded-full border border-base-300 font-medium hover:text-orange-500"><FaCartPlus /></button>
                    }
                    </div>  : ""
                }
                </div>
            </div>
            <div className='space-y-1 my-3 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p>
                <div className='flex justify-between   items-center'>
               {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}

               <p className='text-xs font-medium'>{roundedNumber} % OFF</p>
               </div>
                <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{modNewPrice} Tk</span> <span className='text-xs line-through'>{modOldPrice} Tk</span></p>
            </div>
            {/* <div className="divider my-1"></div>
            <div className='flex justify-between items-center'>
                <Link to={`/details/${_id}`}> <button className="w-fit p-2 bg-base-200   text-center rounded-full border border-base-300  font-medium mb-3  "><FaRegEye /></button></Link>
                <button onClick={() => handleAddCart(laptop)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-medium text-sm mb-3">AddCart</button>
            </div> */}
        </div>

    );
};

SingleLaptop.propTypes = {
    laptop: PropTypes.object
}

export default SingleLaptop;