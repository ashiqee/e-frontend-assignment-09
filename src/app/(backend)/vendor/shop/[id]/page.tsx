import React from 'react';
import VendorShopCards from './VendorShopCard';



const VendorShop = async ({params}:{params:any}) => {
    


    return (
        <div>
       

          <h3>All Products</h3>
        <VendorShopCards id={params?.id}/>
         {/* <ProductTable products={data?.products}/> */}
        </div>
    );
};

export default VendorShop;