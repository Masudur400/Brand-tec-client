import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { RiEdit2Line } from "react-icons/ri";
import Avatar from "react-avatar";
import { Rating, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import Orders from "./Orders/Orders";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyCompletedOrders from "./MyCompletedOrders/MyCompletedOrders";



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();  
  const [editInfo, setEditInfo] = useState(false)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); 

  const { data: users = {}, isLoading, refetch } = useQuery({
    queryKey: ["users", user?.email, axiosSecure],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  const { _id, name, photo, email, role, userCreateTime, phone, userLocation } = users;

  const date = new Date(userCreateTime);
  const formattedDate = date.toLocaleString();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the actual file for uploading
      setPreview(URL.createObjectURL(file)); // Set the preview URL for display
    }
  };

  const handleImageClick = () => {
    document.getElementById('file-upload').click();
  };

  const profileChange = async (e) => {
    e.preventDefault();

    try {
      const imageData = new FormData();
      imageData.append('image', image);

      if (image?.name) {
        var imageRes = await axios.post(imageHostingApi, imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      const imageUrl = imageRes?.data?.data?.url;

      // const data = {
      //   name: name || user?.displayName,
      //   image: imageUrl || user?.photoURL || '',
      //   rating: value,
      // };

      const data = {
        name: name,
        email: email,
        role: role,
        userCreateTime: userCreateTime,
        photo: imageUrl || photo,
        phone: phone || '',
        userLocation: userLocation || ''
      };

      updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      }).then(async () => {
        const res = await axiosSecure.patch(`/users/user/${_id}`, data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Profile update successfully !",
            showConfirmButton: false,
            timer: 1000
          });
          setImage(null);
          setPreview(null);
          refetch();
        }
      });
    } catch (error) {
      console.error('Error uploading the image or submitting the form:', error);
    }
  };

  const editUserInfo = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const phone = form.get('phone')
    const location = form.get('location')

    const data = {
      name: name,
      email: email,
      role: role,
      userCreateTime: userCreateTime,
      photo: photo,
      phone: phone || '',
      userLocation: location || ''
    };

    const res = await axiosSecure.patch(`/users/user/${_id}`, data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile update successfully !",
        showConfirmButton: false,
        timer: 1000
      });
      refetch();
      setEditInfo(false)
    }

  }

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>

      {/* <div>
        <Avatar name={name?.charAt(0)} src={'photo'} alt='img' className="rounded-full" size="60"></Avatar>
      </div>
      <div>
        <Typography component="">Controlled</Typography>
        <Rating
          name=""
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div> */}

      <Helmet>
        <title>Profile</title>
      </Helmet>


      <div className="flex justify-center items-center border py-1 shadow-md">
        <div className=" md:flex  items-center gap-10">
          <div className="flex justify-center items-center relative">
            {preview ? (
              <div className="relative">
                {/* <img src={preview} alt="Preview" className="rounded-md" /> */}
                <Avatar name={name?.charAt(0)} src={preview} alt='img' className="rounded-full mx-auto border border-base-300" size="224"></Avatar>
                <p
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                  className="text-white absolute right-10 top-0 bg-red-500 p-1 rounded-full cursor-pointer"
                >
                  <span className='mb-1 text-2xl'><RxCross2 /></span>
                </p>
              </div>
            ) :

              <div className="relative">
                <Avatar name={name?.charAt(0)} src={photo} alt='img' className="rounded-full mx-auto border border-base-300" size="224"></Avatar>
                <p onClick={handleImageClick} className=" text-xl absolute top-0 right-10 p-2 border border-base-300 bg-base-200 rounded-full cursor-pointer"><RiEdit2Line /></p>
              </div>
            }
            <form onSubmit={profileChange}>
              <div className="image-file-input">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex gap-4">
                  {
                    preview && <button className="px-2 py-1 w-fit h-fit border-2 hover:shadow-md border-orange-500 bg-base-300 text-orange-500  rounded-md  mt-12 font-medium absolute bottom-2 right-6">
                      <IoCheckmarkSharp />
                    </button>
                  }
                </div>
              </div>
            </form>
          </div>

          {
            !editInfo ?
              <div className="gap-6 max-sm:p-2 relative">
                <div className="w-fit mx-auto my-5 space-y-2">
                  <p>
                    <span className="font-bold">Role : </span>
                    {role}
                  </p>
                  <p>
                    <span className="font-bold">Name : </span>
                    {name}
                  </p>
                  <p>
                    <span className="font-bold">Email : </span>
                    {email}
                  </p>
                  {
                    phone && <p>
                      <span className="font-bold">Phone : </span>
                      {phone}
                    </p>
                  }
                  {
                    userLocation && <p>
                      <span className="font-bold">Location : </span>
                      {userLocation}
                    </p>
                  }
                </div>

                <div>
                  <button onClick={() => setEditInfo(true)} className="flex gap-1 justify-center items-center absolute top-5 right-0 text-red-400"><span>Edit</span><RiEdit2Line /></button>
                </div>
              </div> :
              <form onSubmit={editUserInfo} className="space-y-2 p-3 relative">
                <div className="flex items-center">
                  {/* <span className="font-bold mr-2">Name : </span> */}
                  <input type="text" name="name" defaultValue={name} placeholder="Name" className="border  border-base-300 px-3 py-1 rounded-md " />
                </div>
                {
                  phone ?
                    <div className="flex items-center">
                      {/* <span className="font-bold mr-2">phone : </span> */}
                      <input type="text" name="phone" defaultValue={phone} placeholder="Phone" className="border  border-base-300 px-3 py-1 rounded-md" />
                    </div> :
                    <div className="flex items-center">
                      {/* <span className="font-bold mr-2">phone : </span> */}
                      <input type="text" name="phone" placeholder="Phone" className="border  border-base-300 px-3 py-1 rounded-md" />
                    </div>
                }
                {
                  userLocation ?
                    <div className="flex items-center">
                      {/* <span className="font-bold mr-2">Location : </span> */}
                      <input type="text" name="location" defaultValue={userLocation} placeholder="Location" className="border  border-base-300 px-3 py-1 rounded-md" />
                    </div> :
                    <div className="flex items-center">
                      {/* <span className="font-bold mr-2">Location : </span> */}
                      <input type="text" name="location" placeholder="Location" className="border  border-base-300 px-3 py-1 rounded-md" />
                    </div>
                }

                <button type="submit" className="w-full px-3 py-1 rounded-md border border-orange-500 text-orange-500 font-medium">Save</button>

                <p onClick={() => setEditInfo(false)} className="text-2xl text-red-500 p-1 border bg-base-200 -top-5 -left-4 w-fit absolute rounded-full cursor-pointer"><RxCross2 /></p>
              </form>
          }

        </div>
      </div>

      {
        role === 'Guest' && <div className="my-5">
        <Tabs>
          <TabList> 
            <Tab>My Orders</Tab>
            <Tab>Complete Transactions</Tab>
          </TabList> 
          
          <TabPanel>
             <Orders></Orders> 
          </TabPanel>
          <TabPanel>
              <MyCompletedOrders></MyCompletedOrders>
          </TabPanel>
        </Tabs> 
      </div>
      }

    </div>
  );
};

export default Profile;
