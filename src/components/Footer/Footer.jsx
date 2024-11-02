import { Rating, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Footer = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [value, setValue] = useState(0);
    const axiosPublic = useAxiosPublic();

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

    const handleReview = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');

        try {
            const imageData = new FormData();
            imageData.append('image', image); // Append the actual file, not the preview URL

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;

            const data = {
                name,
                image: imageUrl,
                rating: value,
            };

            // Uncomment to post the review data to your server
            axiosPublic.post('/reviews', data)
                .then(res => { 
                    if (res.data.insertedId) {
                        toast.success('Review added successfully!', {
                            duration: 1000,
                            position: 'top-center',
                        });
                        e.target.reset();
                        setImage(null)
                        setPreview(null)
                        setValue(null)
                    } 
                });

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    };

    return (
        <div>
            <Toaster />
            <footer className="footer container mx-auto p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h3 className="text-lg font-bold mb-1 opacity-50">Rate This App</h3>
                    <form onSubmit={handleReview} className="text-sm space-y-2">
                        <div>
                            <p className="mb-1 font-medium">Name</p>
                            <input type="text" name="name" placeholder="Your Name" className="px-2 py-1 rounded-md" />
                        </div>
                        <div>
                            <p className="font-medium mb-1">Review</p>
                            <Rating
                             
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }} 
                                sx={{ 
                                    fontSize: '2rem',  
                                }}
                            />
                        </div>
                        <div>
                            <div className="image-file-input">
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="flex gap-4">
                                    <div>
                                        <p className="font-medium mb-1">Your Photo</p>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 border border-base-100 bg-base-100">
                                                <CiImageOn onClick={handleImageClick} className="text-4xl" />
                                            </div>
                                            <div className="w-12 h-12">
                                                {preview && (
                                                    <div className="w-12 h-12 relative">
                                                        <img src={preview} alt="Preview" className="rounded-md" />
                                                        <span
                                                            onClick={() => {
                                                                setImage(null);
                                                                setPreview(null);
                                                            }}
                                                            className="text-white absolute right-0 top-0 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                                                        >
                                                            x
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-black border-base-300 text-white rounded-full w-10 h-10 mt-6">
                                        <VscSend className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
