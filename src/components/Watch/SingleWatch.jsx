import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const SingleWatch = ({ watch }) => {

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = watch

    return (
        
            <div className='flex flex-col p-2 shadow-md rounded-md bg-gradient-to-r from-orange-50 to-red-50 group'>
                <div>
                    <img src={productImage} alt="" className=' w-40 mx-auto group-hover:scale-105' />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='text-xs font-bold'>{productName}</p>
                    {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Stock Out</span>}
                    <p className='flex gap-1 md:gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{newPrice} Tk</span> <span className='text-xs line-through'>{oldPrice} Tk</span></p>
                </div>
                <div className='flex justify-between items-center'>
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium mb-3 text-sm">Details</button></Link>
                    <button className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium text-sm mb-3">AddCart</button>
                </div>
            </div>
        
    );
};

SingleWatch.propTypes = {
    watch: PropTypes.object
}

export default SingleWatch;