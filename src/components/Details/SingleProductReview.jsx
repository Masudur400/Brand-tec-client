import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";
import PropTypes from 'prop-types'
// import { CRating } from '@coreui/react';


const SingleProductReview = ({ review }) => {

    const { _id, prodId, name, comment, image, rating } = review

    return (
        <div className="border-b-2 w-96 py-2">
            <div className="flex gap-3 items-center  ">
                <Avatar name={name?.charAt(0)} src={image} alt='img' className="rounded-full" size="40"></Avatar>
                <p className="font-bold">{name}</p>
            </div>
            <p className="my-2">{comment}</p> 
            <StarRatings
                rating={rating}
                starRatedColor="#ff8804"
                starDimension="20px"
                starSpacing="5px" 
                numberOfStars={5}
                name='rating'
            />
        </div>
    );
};

SingleProductReview.propTypes = {
    review: PropTypes.object
}

export default SingleProductReview;