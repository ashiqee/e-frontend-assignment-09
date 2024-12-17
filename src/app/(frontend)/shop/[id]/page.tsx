import React from 'react';

import AllVendorShopCards from './AllVendorShopCard';



const VendorShop = async ({params}:{params:any}) => {
    


    return (
        <div>
       

          <h3>All Products</h3>
        <AllVendorShopCards id={params?.id}/>
         {/* <ProductTable products={data?.products}/> */}
        </div>
    );
};

export default VendorShop;