import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useShippings from "../Hooks/useShippings";


const AllShipping = () => {

    const [shippings, shippingLoading, refetch] = useShippings()
    const axiosSecure = useAxiosSecure()

    const handleDelete = shipping => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete shipping...!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/shippings/${shipping?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                title: "delete successful !",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            }
        });
    }

    if (shippingLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shippings?.map((shipping, idx) => <tr key={shipping._id}>
                                <td>{idx + 1}.</td>
                                <td className="min-w-56">{shipping?.shippingLocation}</td>
                                <td className="min-w-36 text-center p-0">{shipping?.serviceCharge} Tk</td>
                                <td><button onClick={() => handleDelete(shipping)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-normal text-[10px]">Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllShipping;