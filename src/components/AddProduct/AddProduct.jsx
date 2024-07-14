import axios from "axios";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";




const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProduct = () => {

    const axiosSecure = useAxiosSecure()

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

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;

            const data = {
                productName,
                productBrand,
                oldPrice: parseInt(oldPrice),
                newPrice: parseInt(newPrice),
                productQuantity: parseInt(productQuantity),
                productImage: imageUrl,
                productDetails,
                productType,
                productAddDate:date
            } 

            axiosSecure.post('/products', data)
                .then(res => { 
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Product added successfully!",
                            icon: "success"
                        });
                         
                    } 
                }) 

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }

    }

    return (
        <div>
            <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg bg-gradient-to-r from-orange-200 to-red-200 shadow-md max-sm:mx-4 ">
                <Helmet>
                    <title>Add Product</title>
                </Helmet>

                <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Add Product</h3>
                <form onSubmit={handleAddProduct}>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                        <div>
                            <p className="font-semibold">Product Name</p>
                            <input type="text" name="productName" placeholder="Product Name" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">Product Type</p>
                            <input type="text" name="productType" placeholder="Product Type" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">Product Brand</p>
                            <input type="text" name="productBrand" placeholder="Product Brand" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">Old Price</p>
                            <input type="text" name="oldPrice" placeholder="Old Price" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">New Price</p>
                            <input type="text" name="newPrice" placeholder="New Price" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">Product Quantity</p>
                            <input type="text" name="productQuantity" placeholder="Product Quantity" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm md:text-base">Product Image</p>
                            <input type="file" placeholder="" name="productImage" id="" className="border-2 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2 bg-white" />
                        </div>
                    <div>
                        <p className="font-semibold text-sm md:text-base">Product Details</p>
                        <textarea name="productDetails" placeholder="Product Details" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2"></textarea>
                    </div>
                    </div>


                    <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 md:py-2 text-center text-lg rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-bold my-3" type="submit" value="Add Product" />

                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddProduct;