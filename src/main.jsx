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
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess.jsx';
import PaymentFail from './pages/PaymentFail/PaymentFail.jsx';
import AppRatings from './components/Ratings/AppRatings.jsx';
import ProductRatings from './components/Ratings/ProductRatings.jsx';
import AllPhoneWatchLaptop from './components/AllPhoneWatchLaptop/AllPhoneWatchLaptop.jsx';
import ContactUs from './components/ContactUs/ContactUs.jsx';
import AllOrders from './components/Orders/AllOrders/AllOrders.jsx';
import CompleteOrders from './components/Orders/CompleteOrders/CompleteOrders.jsx';
import PrivetRoute from './PrivetRoute/PrivetRoute.jsx';
import AdminRoute from './PrivetRoute/AdminRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
          
        path: '/allPhoneWatchLaptop',
        element: <AllPhoneWatchLaptop></AllPhoneWatchLaptop>
      },
      {
        // user route 
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        // user route 
        path: '/cart',
        element: <PrivetRoute>
          <Cart></Cart>
          </PrivetRoute>
      },
      {
        // admin route 
        path: '/addProduct',
        element: <PrivetRoute>
          <AddProduct></AddProduct>
        </PrivetRoute>
      },
      {
        // admin route 
        path: '/addShippingMethod',
        element: <PrivetRoute>
          <AddShippingMethod></AddShippingMethod>
        </PrivetRoute>
      }, 
      {
        // user route 
        path: '/details/:id',
        element: <Details></Details>
      },
      {
        // admin route 
        path: '/allProduct',
        element: <PrivetRoute>
          <AllProduct></AllProduct>
        </PrivetRoute>
      }, 
      {
        // admin route 
        path: '/allShipping',
        element: <PrivetRoute>
          <AllShipping></AllShipping>
        </PrivetRoute>
      },
      {
        // admin route 
        path: '/updateProduct/:id',
        element: <PrivetRoute>
          <UpdateProduct></UpdateProduct>
        </PrivetRoute>
      },
      {
        // admin route 
        path: '/allUsers',
        element: <PrivetRoute>
          <AdminRoute>
          <AllUsers></AllUsers>
          </AdminRoute> 
        </PrivetRoute>
      },
      {
        // user route 
        path: '/orderInfo',
        element: <PrivetRoute>
          <OrderInfo></OrderInfo>
        </PrivetRoute>
      },
      {
        // user route 
        path: '/payment/success/:tranId',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        // user route 
        path: 'payment/fail/:tranId',
        element: <PaymentFail></PaymentFail>
      },
      {
        // user route 
        path: 'appRatings',
        element: <PrivetRoute>
          <AppRatings></AppRatings>
        </PrivetRoute>
      },
      {
        // user route 
        path: 'productRatings',
        element: <PrivetRoute>
          <ProductRatings></ProductRatings>
        </PrivetRoute>
      },
      {
        // user route 
        path: 'contact',
        element: <ContactUs></ContactUs>
      },
      {
        // user route 
        path: 'orders',
        element: <PrivetRoute>
          <AllOrders></AllOrders>
        </PrivetRoute>
      },
      {
        // user route 
        path: 'completeOrders',
        element: <PrivetRoute>
          <CompleteOrders></CompleteOrders>
        </PrivetRoute>
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
