import { Helmet } from "react-helmet";


const AddProduct = () => {

    const handleAddProduct = e =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
       const  productName = form.get('productName')
       const productBrand = form.get('productBrand')
       const oldPrice = form.get('oldPrice')
       const newPrice = form.get('newPrice')
       const productQuantity = form.get('productQuantity')
       const productImage = form.get('productImage')
       const productDetails = form.get('productDetails')

       console.table(productName, productBrand, oldPrice, newPrice, productQuantity, productImage, productDetails)
        
    }

    return (
        <div> 
            <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg bg-gradient-to-r from-orange-200 to-red-200 shadow-md max-sm:mx-4 ">
                <Helmet>
                    <title>Login</title>
                </Helmet>

                <h3 className="text-3xl font-bold text-center text-orange-600 my-4">Add Product</h3>
                <form onSubmit={handleAddProduct}>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <div>
                        <p className="font-semibold">Product Name</p>
                        <input type="text" name="productName" placeholder="Product Name" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" /> 
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
                    </div>
                    <div>
                    <p className="font-semibold text-sm md:text-base">Product Details</p>
                   <textarea name="productDetails" placeholder="Product Details" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2"></textarea>
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