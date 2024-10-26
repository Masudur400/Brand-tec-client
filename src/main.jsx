import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

 
  

import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import Watch from './components/Watch/Watch.jsx';
import Mobile from './components/Mobile/Mobile.jsx';
import Laptop from './components/Laptop/Laptop.jsx';
import Dashboard from './dashboard/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import LoginRegister from './LoginRegister/LoginRegister.jsx';
import Cart from './components/Cart/Cart.jsx';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import AuthProvider from './components/Providers/AuthProvider.jsx';
import Profile from './components/Profile/Profile.jsx';
import Details from './components/Details/Details.jsx';
import AllProduct from './components/AllProduct/AllProduct.jsx';
import UpdateProduct from './components/AllProduct/UpdateProduct.jsx';
import AllUsers from './components/AllUsers/AllUsers.jsx'; 
import OrderInfo from './components/OrderInfo/OrderInfo.jsx';
import AddShippingMethod from './components/AddShippingMethod/AddShippingMethod.jsx';
import AllShipping from './components/AllShipping/AllShipping.jsx';
import ErrorPage from './components/Errorpage/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        // user route 
        path: '/watch',
        element: <Watch></Watch>
      },
      {
        // user route 
        path: '/mobile',
        element: <Mobile></Mobile>
      },
      {
        // user route 
        path: '/laptop',
        element: <Laptop></Laptop>
      },
      {
        // user route 
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        // admin route 
        path: '/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        // admin route 
        path: '/addShippingMethod',
        element:  <AddShippingMethod></AddShippingMethod>
      },
      {
        // user route 
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        // user route 
        path: '/details/:id',
        element: <Details></Details>
      },
      {
        // admin route 
        path: '/allProduct',
        element:<AllProduct></AllProduct>
      },
      {
        // admin route 
        path: '/allShipping',
        element: <AllShipping></AllShipping>
      },
      {
        // user route 
        path: '/updateProduct/:id',
        element: <UpdateProduct></UpdateProduct>
      },
      {
        // admin route 
        path: '/allUsers',
        element: <AllUsers></AllUsers>
      }, 
      {
        // user route 
        path: '/orderInfo',
        element: <OrderInfo></OrderInfo>
      }, 

      // {
      //   path:'/login',
      //   element:<Login></Login>
      // },
      // {
      //   path:'/register',
      //   element:<Register></Register>
      // }
    ]
  },
  {
    path: 'loginRegister',
    element: <LoginRegister></LoginRegister>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {

      }
    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
     
  </React.StrictMode>,
)
