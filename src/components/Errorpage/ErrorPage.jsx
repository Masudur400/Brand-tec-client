import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="h-fit w-fit space-y-3">
                <p className="text-3xl font-bold text-center">
                    <span className="text-orange-500">Brand</span><span className="text-xl">TEC</span>
                </p>
                <p className="text-5xl font-extrabold text-center">404</p>
                <p className="font-bold text-lg md:text-2xl opacity-70 text-center">Request Is Not Found</p>

                <Link to={-1} className="flex justify-center items-center">
                    <button
                        title="Go Back"
                        className="flex gap-1 items-center justify-end px-3 py-1 rounded-md border border-orange-500 text-orange-500"
                    >
                        <FaArrowLeft />
                        <span className="font-bold">Back</span>
                    </button>
                </Link>


            </div>
        </div>

    );
};

export default ErrorPage;