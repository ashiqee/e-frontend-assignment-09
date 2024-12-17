import React from 'react';

import AllVendorShopCards from './AllVendorShopCard';



const VendorShop = async ({params}:{params:any}) => {
    


    return (
        <div>
       

        <AllVendorShopCards id={params?.id}/>
    
        </div>
    );
};

export default VendorShop;