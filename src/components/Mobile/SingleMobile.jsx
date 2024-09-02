import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Loading/Loading';



const SingleMobile = ({phone}) => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const { _id,productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate} = phone

    const handleAddCart = async (phone) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName : phone.productName,
            productBrand : phone.productBrand,
            oldPrice : phone.oldPrice,
            newPrice : phone.newPrice,
            quantity:1,
            productQuantity : phone.productQuantity,
            productImage : phone.productImage,
            productDetails : phone.productDetails,
            productType : phone.productType,
            productAddDate : phone.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            toast.success('Add cart successful')
        }
    }

    if(loading){
        return <Loading></Loading>
    }

    return (
         
        <div className='flex flex-col p-2 shadow-md rounded-md border group'>
            <ToastContainer></ToastContainer>
            <div>
                <img src={productImage} alt="" className=' w-40 mx-auto group-hover:scale-105'/>
            </div>
            <div className='space-y-1 my-3 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p>
                {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span>:<span className='text-xs text-red-500 font-medium' >Stock Out</span>}
                <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{newPrice} Tk</span> <span className='text-xs line-through'>{oldPrice} Tk</span></p> 
            </div>
            <div className="divider my-1"></div>
            <div className='flex justify-between items-center'>
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium mb-3 text-sm">Details</button></Link>
                    <button onClick={()=>handleAddCart(phone)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium text-sm mb-3">AddCart</button>
                </div>
        </div>
        
    );
};

SingleMobile.propTypes ={
    phone:PropTypes.object
}

export default SingleMobile;