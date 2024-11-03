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

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState({});
  const [value, setValue] = useState(0)
  const modalRef = useRef(null); // Use ref to handle modal 

  const { data: users = {}, isLoading, refetch } = useQuery({
    queryKey: ["users", user?.email, axiosSecure],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  const { name, photo, email, role, userCreateTime } = users;

  const date = new Date(userCreateTime);
  const formattedDate = date.toLocaleString();

  const handleDataUpdate = (users) => {
    setCurrentUser(users);
    modalRef.current.showModal(); // Open modal
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoFile = form.get("photo");

    try {
      const imageData = new FormData();
      imageData.append("image", photoFile);

      if (photoFile.name) {
        var imageRes = await axios.post(imageHostingApi, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const imageUrl = imageRes?.data?.data?.url;

      const data = {
        name: name || currentUser?.name,
        email: email,
        role: currentUser?.role,
        userCreateTime: currentUser?.userCreateTime,
        photo: imageUrl || currentUser?.photo,
      };

      updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      }).then(async () => {
        const res = await axiosSecure.patch(`/users/user/${currentUser?._id}`, data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Profile update successfully !",
            showConfirmButton: false,
            timer: 1000
          });
          refetch();
        }
      });
      modalRef.current.close(); // Close modal after updating
    } catch (error) {
      console.error("Error uploading the image or submitting the form:", error);
    }
  };

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>

      <div>
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
      </div>

      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="md:w-1/2 lg:w-1/2 mx-auto border border-base-300 my-4 p-3 rounded-md">
        <h3 className="text-2xl font-bold text-center text-orange-500 mb-6">Profile</h3>
        <div>
          <img src={photo} alt="image" className="w-56 h-56 rounded-full mx-auto" />
          <div className="w-fit mx-auto my-5 space-y-2">
            <p>
              <span className="font-bold">Name : </span>
              {name}
            </p>
            <p>
              <span className="font-bold">Email : </span>
              {email}
            </p>
            <p>
              <span className="font-bold">Role : </span>
              {role}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div
              onClick={() => handleDataUpdate(users)}
              className="w-fit mx-auto border border-orange-500 text-orange-500 hover:shadow-md px-4 py-1 rounded-md font-bold mb-5"
            >
              <button className="flex gap-1 justify-center items-center"><span>Edit</span><RiEdit2Line /></button>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="px-2 py-1 rounded-md border border-orange-400 text-orange-500 absolute right-2 top-2"
              onClick={() => modalRef.current.close()}
            >
              ✕
            </button>
          </form>
          <form onSubmit={handleProfileUpdate}>
            <p className="font-medium mb-1 max-sm:text-sm">Your Name</p>
            <input
              defaultValue={currentUser?.name}
              type="text"
              name="name"
              className="w-full px-4 py-1 rounded-md border bg-base-100 border-orange-500"
            />
            <p className="font-medium mb-1 max-sm:text-sm">Your Photo</p>
            <input
              type="file"
              name="photo"
              className="w-full px-4 py-1 rounded-md border bg-base-100 border-orange-500"
            />
            <div className="flex items-center justify-center mt-5">
              <input
                type="submit"
                value="Save"
                className="w-fit px-4 py-1 rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-bold mb-5"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
