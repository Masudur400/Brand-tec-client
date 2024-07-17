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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/watch',
        element: <Watch></Watch>
      },
      {
        path: '/mobile',
        element: <Mobile></Mobile>
      },
      {
        path: '/laptop',
        element: <Laptop></Laptop>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        path: '/details/:id',
        element: <Details></Details>
      },
      {
        path: '/allProduct',
        element:<AllProduct></AllProduct>
      },
      {
        path: '/updateProduct/:id',
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: '/allUsers',
        element: <AllUsers></AllUsers>
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
