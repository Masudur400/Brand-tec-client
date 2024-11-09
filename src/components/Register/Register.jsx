import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";




const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {

    const { createUser, googleLogin, loading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

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
        const date = new Date()

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
            // console.log(imageUrl)

            createUser(email, password)
                .then(result => {
                    updateProfile(result.user, {
                        displayName: name,
                        photoURL: imageUrl
                    })
                })
                .then(() => {
                    const userInfo = {
                        name: name,
                        email: email,
                        photo: imageUrl,
                        role: 'Guest',
                        userCreateTime: date
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Login successful",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                                e.target.reset()
                            }
                            setUserSuccess('user created successfully')
                            navigate(location?.state ? location.state : '/')
                        })
                })
                .catch(error => {
                    console.log(error.message)
                })

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    }


    const handleGoogleLogin = () => {
        const date = new Date()
        googleLogin()
            .then(result => {
                const userinfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photo: result?.user?.photoURL,
                    role: 'Guest',
                    userCreateTime: date
                }
                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Login successful",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }

                        // navigate(location?.state ? location.state : '/')
                        // window.location.reload()
                    },
                        navigate(location?.state ? location.state : '/')
                    )
                    .catch(err => {
                        console.log(err.message)
                    })

            })
            .catch(err => {
                console.log(err.message)
            })
    }



    return (

        <div className="min-h-screen">
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto border border-base-300 shadow-xl p-5 rounded-lg my-20">

                <div className="flex justify-end">
                    <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
                </div>

                <h2 className="text-lg md:text-3xl font-bold text-center my-3 animate__animated animate__rubberBand text-orange-600">Please Register </h2>

                {
                    userSuccess && <p className="  text-green-500">{userSuccess}</p>
                }

                <form onSubmit={handleRegister}>

                    <p className="font-semibold text-sm md:text-base mb-2">Name</p>
                    <input className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2" type="text" name="name" placeholder="Name" id="name" required />


                    <p className="font-semibold text-sm md:text-base mb-2">Email</p>
                    <input className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4 py-1 mb-2" type="email" name="email" placeholder="Email" id="email" required />
                    {
                        emailError && <p className="  text-red-500">{emailError}</p>
                    }

                    <p className="font-semibold text-sm md:text-base mb-2">Password</p>
                    <div className="relative">
                        <input className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute md:top-1/4 top-[5px] right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div>
                    {
                        passwordError && <p className="text-red-500">  {passwordError}</p>
                    }

                    <p className="font-semibold text-sm md:text-base mb-2">Your Photo</p>
                    <input type="file" placeholder="" name="photo" id="" className="border-2 border-base-300 bg-base-100 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2" />

                    {
                        loading ?
                            <button disabled className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3"><span className="loading loading-spinner loading-md"></span></button>
                            :
                            <input disabled={loading} className="w-full px-4 py-1 md:py-2 text-center max-sm:text-sm text-lg rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-bold my-3" type="submit" value="Register" />
                    }

                </form>

                <p>Already have an account ? <Link to='/loginRegister/login' className="text-red-500 font-bold underline">please Login</Link></p>
                <div className="divider my-5"></div>
                <div className="mb-t">
                    <div>
                        <button onClick={handleGoogleLogin} className="p-3 border border-orange-400 rounded-xl font-bold"> <FcGoogle className="text-3xl"></FcGoogle></button>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default Register;