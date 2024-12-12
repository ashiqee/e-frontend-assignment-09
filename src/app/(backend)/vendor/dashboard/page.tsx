
import React from 'react';

import VendorAllShop from '../components/VendorAllShop';

import { getCurrentUser } from '@/services/AuthService';

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