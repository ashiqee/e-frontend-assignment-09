import React from 'react';


import { getVendorShopData } from '@/services/VendorShopService';


const VendorShop = async ({params}:{params:any}) => {
    const id = params.id
    const {data} = await getVendorShopData(id);


    return (
        <div>
          {data?.name as string}

          <h3>All Products</h3>

         {/* <ProductTable products={data?.products}/> */}
        </div>
    );
};

export default VendorShop;