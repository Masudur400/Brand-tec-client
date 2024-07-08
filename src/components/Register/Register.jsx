import { Link } from "react-router-dom";

 
const Register = () => {
    return (
        <div className="lg:w-1/3 md:w-1/2 mx-auto my-14 p-5 rounded-lg bg-orange-100 shadow-md">
            <h3 className="text-3xl font-bold text-center text-orange-500 my-4">Please Register</h3>
            <form className="space-y-5">
                <div>
                    <input type="text" name="name" placeholder="Your Name" id="" className="w-full px-4 py-2 rounded-md" />
                </div>
                <div>
                    <input type="email" name="email" placeholder="Your Email" id="" className="w-full px-4 py-2 rounded-md" />

                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" id="" className="w-full px-4 py-2 rounded-md" />
                </div>
                <div>
                    <input type="file" name="photo" id="" className="w-full px-4 py-2 rounded-md" />
                </div>
                <div>
                    <input type="submit" value="Register" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" />
                </div>
            </form>
            <p className="my-3">Already an account <Link to='/login' className="text-red-500 font-bold">Please Login</Link></p>
        </div>
    );
};

export default Register;