import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



const SingleBrand = ({ brand }) => {

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = brand

    return (
        <Link to={`/details/${_id}`} onClick={() => window.scrollTo({
            top: 0,
            behavior: "smooth", 
        })} className='flex flex-col p-2 shadow-md rounded-md border border-base-300 group w-40'>
            <div>
                <img src={productImage} alt="image" className='w-36 mx-auto group-hover:scale-105' />
            </div>
            <div className='space-y-1 my-1 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p>
            </div>
        </Link>
    );
};

SingleBrand.propTypes = {
    brand: PropTypes.object
}

export default SingleBrand;