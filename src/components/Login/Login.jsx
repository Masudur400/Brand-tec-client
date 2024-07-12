import { Helmet } from "react-helmet";
import { FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {

    const { login, googleLogin, loading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        // console.table( email,password )

        login(email, password)
            .then(result => {
                if (result?.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "login successful!",
                        icon: "success"
                    });
                    navigate(location?.state ? location.state : '/')
                }
            })
            .catch(err => {
                console.log(err.message)
            })

    }


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const userinfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'anonymous'
                }
                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Success!",
                                text: "login successful!",
                                icon: "success"
                            });
                        }

                        navigate(location?.state ? location.state : '/')
                    })
                    .catch(err => {
                        console.log(err.message)
                    })

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div className="lg:w-1/3 md:w-1/2 mx-auto my-20 md:p-5 p-3 rounded-lg bg-orange-100 shadow-md max-sm:mx-4 ">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="flex justify-end">
                <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="text-3xl text-orange-600 my-0"></FaXmark></Link>
            </div>
            <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Please LogIn</h3>
            <form onSubmit={handleLogin} className="space-y-5">

                <div>
                    <p className="font-semibold">Email</p>
                    <input type="email" name="email" placeholder="Your Email" id="" className="w-full px-4 py-2 rounded-md" />

                </div>
                <div>
                    <p className="font-semibold">Password</p>
                    <input type="password" name="password" placeholder="Password" id="" className="w-full px-4 py-2 rounded-md" />
                </div>

                <div>
                    {
                        loading ? <button disabled className="w-full px-4 py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3"><span className="loading loading-spinner loading-md"></span></button> :
                            <input disabled={loading} className="w-full px-4 py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3" type="submit" value="Login" />
                    }
                    {/* <input type="submit" value="LogIn" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" /> */}
                </div>
            </form>
            <p className="my-3">Do not have an account <Link to='/loginRegister/register' className="text-red-500 font-bold">Please Register</Link></p>
            <div className="divider my-5"></div>
            <div className="mb-t">
                <div>
                    <button onClick={handleGoogleLogin} className=" p-3 bg-white rounded-xl font-bold"> <FcGoogle className="text-3xl"></FcGoogle></button>

                </div>
            </div>
        </div>
    );
};

export default Login;