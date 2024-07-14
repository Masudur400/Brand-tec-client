import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



const SingleBrand = ({ brand }) => {

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = brand

    return (
        <div className='flex flex-col p-2 shadow-md rounded-md bg-gradient-to-r from-orange-50 to-red-50 group w-40'>
            <div>
                <img src={productImage} alt="" className='w-36 mx-auto group-hover:scale-105' />
            </div>
            <div className='space-y-1 my-3 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p>
                {productQuantity > 0 ? <span className='text-xs text-green-500 font-medium'>In Stock</span> : <span className='text-xs text-red-500 font-medium' >Out Of Stock</span>}
                <p className='flex gap-2 items-center'><span className='text-xs text-orange-500 font-medium'>{newPrice} Tk</span> <span className='text-[10px]'>{oldPrice} Tk</span></p>
            </div>
            <div className='flex justify-between gap-2 items-center mb-1'>
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">Details</button></Link>
                <button className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">AddCart</button>
            </div>
        </div>
    );
};

SingleBrand.propTypes = {
    brand: PropTypes.object
}

export default SingleBrand;