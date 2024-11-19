import { Helmet } from "react-helmet"; 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllProductTable from "./AllProductTable";
import InStockProduct from "./InStockProduct";
import StockOutProduct from "./StockOutProduct";


const AllProduct = () => { 

    return (
        <div>
            <Helmet>
                <title>All product</title>
            </Helmet>
            <h3 className="text-2xl font-medium text-center text-orange-500 mt-5">All Product</h3>
             
            <div>
            <Tabs>
                <div className="md:text-center my-5 md:font-bold text-xs">
                <TabList>
                    <Tab>All Product</Tab>
                    <Tab>In Stock</Tab>
                    <Tab>Stock Out</Tab>
                </TabList>
                </div>

                <TabPanel>
                     <AllProductTable></AllProductTable>
                </TabPanel>
                <TabPanel>
                      <InStockProduct></InStockProduct>
                </TabPanel>
                <TabPanel>
                     <StockOutProduct></StockOutProduct>
                </TabPanel>
            </Tabs>
            </div>
        </div>
    );
};

export default AllProduct;