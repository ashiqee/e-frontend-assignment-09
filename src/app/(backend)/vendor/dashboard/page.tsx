
import React from 'react';

import VendorAllShop from '../components/VendorAllShop';

import { getCurrentUser } from '@/services/AuthService';

const VendorProfile = async () => {

    const user =  await getCurrentUser();

   
    
    return (
        <div>
            Dashboard

            {/* all shop  */}
    <VendorAllShop shops={user?.vendorShops}/>
  
        </div>
    );
};

export default VendorProfile;