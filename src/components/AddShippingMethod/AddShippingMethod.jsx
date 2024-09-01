import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddShippingMethod = () => {
    const axiosSecure = useAxiosSecure()

    const addHandleShippingMethod = async (e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const shippingLocation = form.get('shippingLocation')
        const serviceCharge = form.get('serviceCharge')

        const data ={
            shippingLocation,
            serviceCharge : parseInt(serviceCharge)
        }

        const res = await axiosSecure.post('/shippings', data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                title: "Shipping add successful",
                showConfirmButton: false,
                timer: 1000
            });
            e.target.reset()
        }


    }

    return (
        <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg  shadow-md max-sm:mx-4" >
            <Helmet>
                <title>Add Shipping</title>
            </Helmet>
            <h3 className="text-2xl font-medium text-center text-orange-500 my-2">Add Shipping Method</h3>
            <form onSubmit={addHandleShippingMethod}>
                <div>
                    <p className="font-semibold">Shipping Location</p>
                    <input type="text" required name="shippingLocation" placeholder="Shipping Location" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                </div>
                <div>
                    <p className="font-semibold">Shipping Service Charge</p>
                    <input type="text" required name="serviceCharge" placeholder="Shipping Service Charge" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                </div>
                <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 text-center text-lg rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium my-3" type="submit" value="Add Shipping" />

                    </div>
            </form>
        </div>
    );
};

export default AddShippingMethod;