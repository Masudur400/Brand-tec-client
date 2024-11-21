import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_serverUrl
})

const useAxiosSecure = () => {
    const { logOut ,  setLoading} = useAuth()
    const navigate = useNavigate()

   useEffect(()=>{
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            setLoading(false)
            navigate('/loginRegister/login')
        }
        return Promise.reject(error)
    })
   },[logOut , navigate, setLoading])

    return  axiosSecure ;
};

export default useAxiosSecure;