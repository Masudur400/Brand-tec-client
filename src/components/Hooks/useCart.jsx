import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

 
const useCart = () => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: carts = [], isLoading, refetch } = useQuery({
        queryKey: ['carts', user?.email, axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }
    })

    return [carts, isLoading, refetch,loading]
};

export default useCart;