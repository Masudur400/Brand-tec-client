import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SingleOrders from './SingleOrders';

const Orders = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orderss", user?.email, axiosSecure],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orderss/${user?.email}`);
      return res.data;
    },
  });

  if(isLoading){
    <p className='opacity-75'>Loading........</p>
}

  return (
    <div>
      {
        orders?.length ?
          <dev>
            <h2 className="text-lg font-medium m-2 opacity-85">Total Orders Complete : {orders.length}</h2>
            {
              orders.map(order => <SingleOrders key={order?._id} order={order}></SingleOrders>)
            }
          </dev> :
          <p className='font-bold opacity-85 h-56 flex justify-center items-center'> No Orders Available</p>
      }
    </div>
  );
};

export default Orders;