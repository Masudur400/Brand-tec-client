import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState({});
  const modalRef = useRef(null); // Use ref to handle modal

  const { data: users = {}, isPending, refetch } = useQuery({
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

  if (loading || isPending) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="md:w-1/2 lg:w-1/2 mx-auto border my-4 p-3 rounded-md">
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
              className="w-fit mx-auto border border-orange-500 text-orange-500 hover:shadow-md px-4 py-2 rounded-md font-bold mb-5"
            >
              <button>Update Profile</button>
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
            <p className="font-bold mb-1">Your Name</p>
            <input
              defaultValue={currentUser?.name}
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded-md border border-orange-500"
            />
            <p className="font-bold mb-1">Your Photo</p>
            <input
              type="file"
              name="photo"
              className="w-full px-4 py-2 rounded-md border border-orange-500"
            />
            <div className="flex items-center justify-center mt-5">
              <input
                type="submit"
                value="Update"
                className="w-fit bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-white font-bold mb-5"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
