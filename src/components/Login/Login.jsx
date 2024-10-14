import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import { useState } from "react";

const Login = () => {

    const { login, googleLogin, loading, setLoading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')

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
                        position: "center",
                        icon: "success",
                        title: "Login successful",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setError('')
                    e.target.reset()
                    navigate(location?.state ? location.state : '/')
                }
            })
            .catch(err => {
                setLoading(false)
                setError(err.message)
                console.log(err.message)
            }) 
    }


    const handleGoogleLogin = () => {
        const date = new Date()
        googleLogin()
            .then(result => {
                const userinfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result?.user?.photoURL,
                    role: 'Guest',
                    userCreateTime: date
                }
                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({ 
                                tposition: "center",
                                icon: "success",
                                title: "Login successful",
                                showConfirmButton: false,
                                timer: 1000
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

    if(loading){
        return <Loading></Loading>
    }

    return (
        <div className="lg:w-1/3 md:w-1/2 mx-auto my-20 md:p-5 p-3 rounded-lg border shadow-md max-sm:mx-4 ">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="flex justify-end">
                <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
            </div>
            <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Please LogIn</h3>
            <form onSubmit={handleLogin} className=""> 
                <div>
                    <p className="font-semibold mb-2">Email</p>
                    <input type="email" name="email" placeholder="Your Email" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />

                </div>
                <p className="font-semibold text-sm md:text-base mb-2">Password</p>
                    <div className="relative">
                        <input className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute md:top-1/4 top-[5px] right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div> 
                <div>
                {
                    error?
                    <p className='text-sm text-red-500'>please give your right email and password</p>:''
                }
                    {
                        loading ? 
                        <button disabled className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3"><span className="loading loading-spinner loading-md"></span></button>
                         :
                            <input disabled={loading} className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-bold my-3" type="submit" value="Login" />
                    }
                    {/* <input type="submit" value="LogIn" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" /> */}
                </div>
            </form>
            <p className="my-3">Do not have an account <Link to='/loginRegister/register' className="text-red-500 font-bold">Please Register</Link></p>
            <div className="divider my-5"></div>
            <div className="mb-t">
                <div>
                    <button onClick={handleGoogleLogin} className=" p-3 border border-orange-400 rounded-xl font-bold"> <FcGoogle className="text-3xl"></FcGoogle></button>

                </div>
            </div>
        </div>
    );
};

export default Login;