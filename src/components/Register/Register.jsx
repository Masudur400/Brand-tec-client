import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";




const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {

    const { createUser, googleLogin, loading } = useAuth()

    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [userSuccess, setUserSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const email = form.get('email')
        const password = form.get('password')
        const photoFile = form.get('photo');
        console.table(name, email, password, photoFile)

        setUserSuccess('');
        setPasswordError('');
        setEmailError('');


        if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters or longer')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('password should have minimum one character in upper case')
            return;
        }


        try {
            const imageData = new FormData();
            imageData.append('image', photoFile);

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;
            console.log(imageUrl)



  
        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }


    }

    return (
        // <div className="lg:w-1/3 md:w-1/2 mx-auto my-14 p-3 md:p-5 rounded-lg bg-orange-100 shadow-md max-sm:mx-4">
        //     <div className="flex justify-end">
        //     <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="text-3xl text-orange-600 my-0"></FaXmark></Link>
        //     </div>
        //     <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Please Register</h3>
        //     <form onSubmit={handleRegister} className="space-y-5">
        //         <div>
        //             <input type="text" name="name" placeholder="Your Name" id="" className="w-full px-4 py-2 rounded-md" />
        //         </div>
        //         <div>
        //             <input type="email" name="email" placeholder="Your Email" id="" className="w-full px-4 py-2 rounded-md" />

        //         </div>
        //         <div>
        //             <input type="password" name="password" placeholder="Password" id="" className="w-full px-4 py-2 rounded-md" />
        //         </div>
        //         <div>
        //             <input type="file" name="photo" id="" className="w-full px-4 py-2 rounded-md" />
        //         </div>
        //         <div>
        //             <input type="submit" value="Register" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" />
        //         </div>
        //     </form>
        //     <p className="my-3">Already an account <Link to='/loginRegister/login' className="text-red-500 font-bold">Please Login</Link></p>
        // </div>


        <div className="min-h-screen">
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto bg-orange-100 shadow-xl p-5 rounded-lg my-20">

                <div className="flex justify-end">
                    <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
                </div>

                <h2 className="text-2xl font-bold text-center my-3 animate__animated animate__rubberBand text-orange-600">Please Register </h2>

                {
                    userSuccess && <p className="  text-green-500">{userSuccess}</p>
                }

                <form onSubmit={handleRegister}>

                    <p className="font-semibold">Name</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="name" placeholder="Name" id="name" required />


                    <p className="font-semibold">Email</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="email" name="email" placeholder="Email" id="email" required />
                    {
                        emailError && <p className="  text-red-500">{emailError}</p>
                    }

                    <p className="font-semibold">Password</p>
                    <div className="relative">
                        <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute top-1/4 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div>
                    {
                        passwordError && <p className="text-red-500">  {passwordError}</p>
                    }

                    <p className="font-semibold">Your Photo</p>
                    <input type="file" placeholder="" name="photo" id="" className="w-full px-4 py-2 rounded-md bg-white" />

                    <input className="w-full px-4 py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3" type="submit" value="Register" />
                </form>

                <p>Already have an account ? <Link to='/loginRegister/login' className="text-red-500 font-bold underline">please Login</Link></p>
                <div className="divider my-5"></div>
                <div className="mb-t">
                    <div>
                        <button onClick={''} className=" p-3 bg-white rounded-xl font-bold"> <FcGoogle className="text-3xl"></FcGoogle></button>

                    </div>

                </div>
            </div>
        </div>
    );

};

export default Register;