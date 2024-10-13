import axios from "axios";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { FaXmark } from "react-icons/fa6";


const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateProduct = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: singleData = {}, isPending, refetch } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
            return res.data
        }
    })

    const { _id, productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails, productType, productAddDate } = singleData

    const handleAddProduct = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const productName = form.get('productName')
        const productBrand = form.get('productBrand')
        const oldPrice = form.get('oldPrice')
        const newPrice = form.get('newPrice')
        const productQuantity = form.get('productQuantity')
        const photoFile = form.get('productImage')
        const productDetails = form.get('productDetails')
        const productType = form.get('productType')
        const date = new Date()

        // console.log(productName, productBrand, oldPrice, newPrice, productQuantity, photoFile, productDetails)

        try {
            const imageData = new FormData();
            imageData.append('image', photoFile);

            if (photoFile?.name) {
                var imageRes = await axios.post(imageHostingApi, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            const imageUrl = imageRes?.data?.data?.url;

            const updateData = {
                productName,
                productBrand,
                oldPrice: parseInt(oldPrice),
                newPrice: parseInt(newPrice),
                productQuantity: parseInt(productQuantity),
                productImage: imageUrl || productImage,
                productDetails,
                productType,
                productAddDate: productAddDate
            }

            const res = await axiosSecure.patch(`/products/${_id}`, updateData)

            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "Success!",
                    text: "Product update successfully!",
                    icon: "success"
                });
                navigate('/allProduct')
            }


        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }

    }

    if (isPending) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="lg:w-3/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg border shadow-md max-sm:mx-4 ">
                <Helmet>
                    <title>Update Product</title>
                </Helmet>
                <div className="flex justify-end">
                    <Link to='/allProduct' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
                </div>

                <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Update Product</h3>
                <form onSubmit={handleAddProduct}>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                        <div>
                            <p className="font-semibold mb-2">Product Name</p>
                            <input type="text" name="productName" defaultValue={productName} placeholder="Product Name" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Product Type</p>
                            <input type="text" defaultValue={productType} name="productType" placeholder="Product Type" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Product Brand</p>
                            <input type="text" defaultValue={productBrand} name="productBrand" placeholder="Product Brand" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Old Price</p>
                            <input type="text" defaultValue={oldPrice} name="oldPrice" placeholder="Old Price" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">New Price</p>
                            <input type="text" defaultValue={newPrice} name="newPrice" placeholder="New Price" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Product Quantity</p>
                            <input type="text" defaultValue={productQuantity} name="productQuantity" placeholder="Product Quantity" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm md:text-base mb-2">Product Image</p>
                            <input type="file" placeholder="" name="productImage" id="" className="border-2 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2 bg-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm md:text-base mb-2">Product Details</p>
                            <textarea name="productDetails" defaultValue={productDetails} placeholder="Product Details" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2"></textarea>
                        </div>
                    </div>


                    <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 md:py-2 text-center text-lg rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium my-3" type="submit" value="Add Product" />

                    </div>
                </form>

            </div>
        </div>
    );
};

export default UpdateProduct;