  import PropTypes from 'prop-types'

 
const Slider = ({image,title, text}) => {
    return (
        <div className="md:flex justify-between items-center md:px-10 lg:px-16 px-7">
            <img src={image} alt="" className="w-96 order-2" />
            <div className='order-1 md:w-1/2 lg:1/3 max-sm:py-5'>
            <p className='text-3xl font-bold my-3 text-orange-500'>{title}</p>
            <p>{text}</p>
            </div>
        </div>
      )
};

Slider.propTypes = {
    image: PropTypes.photo,
    text: PropTypes.string,
    title: PropTypes.string,
}

export default Slider;