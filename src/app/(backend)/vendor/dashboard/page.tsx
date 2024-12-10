
import { getCurrentUser } from '@/services/AuthService';
import { getAllProducts } from '@/services/ProductsServices';
import { Image } from '@nextui-org/react';
import React from 'react';
import VendorAllShop from '../components/VendorAllShop';

const VendorProfile = async () => {

    const user =  await getCurrentUser();

    console.log(">>>",user?.vendorShops);
    
    return (
        <div>
            Dashboard

            {/* all shop  */}
    <VendorAllShop shops={user?.vendorShops}/>
  
        </div>
    );
};

export default VendorProfile;