import ProductTable from '@/app/(backend)/components/ProductTable';
import { getVendorShopData } from '@/services/VendorShopService';
import React from 'react';

const VendorShop = async ({params}:{params:any}) => {
    const id = params.id
    const {data} = await getVendorShopData(id);


    return (
        <div>
          {data?.name as string}

          <h3>All Products</h3>

         <ProductTable products={data?.products}/>
        </div>
    );
};

export default VendorShop;