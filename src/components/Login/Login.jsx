import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {

    const handleLogin = e =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget) 
        const email = form.get('email')
        const password = form.get('password') 
        console.table( email,password )
        }

    return (
        <div className="lg:w-1/3 md:w-1/2 mx-auto my-20 md:p-5 p-3 rounded-lg bg-orange-100 shadow-md max-sm:mx-4 ">
            <div className="flex justify-end">
            <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="text-3xl text-orange-600 my-0"></FaXmark></Link>
            </div>
            <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Please LogIn</h3>
            <form onSubmit={handleLogin} className="space-y-5">
                 
                <div>
                    <p>Email</p>
                    <input type="email" name="email" placeholder="Your Email" id="" className="w-full px-4 py-2 rounded-md" />

                </div>
                <div>
                    <p>Password</p>
                    <input type="password" name="password" placeholder="Password" id="" className="w-full px-4 py-2 rounded-md" />
                </div>
                
                <div>
                    <input type="submit" value="LogIn" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" />
                </div>
            </form>
            <p className="my-3">Do not have an account <Link to='/loginRegister/register' className="text-red-500 font-bold">Please Register</Link></p>
        </div>
    );
};

export default Login;