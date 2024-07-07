import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import Watch from './components/Watch/Watch.jsx';
import Mobile from './components/Mobile/Mobile.jsx';
import Laptop from './components/Laptop/Laptop.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path:'/watch',
        element:<Watch></Watch>
      },
      {
        path:'/mobile',
        element:<Mobile></Mobile>
      },
      {
        path:'/laptop',
        element:<Laptop></Laptop>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
