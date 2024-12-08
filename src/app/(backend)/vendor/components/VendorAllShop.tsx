"use client"
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const VendorAllShop = ({shops}:{shops:any}) => {
    return (
        <div>
            

            {

shops ?   <ul>
{   shops.map((shop:any)=>(
    <li  key={shop.id}>
      <Link href={`/vendor/shop/${shop.id}`} className="flex flex-col justify-center items-center">
        
      <Image src={shop?.logo} className='w-28 h-20 mx-auto rounded-3xl ' />
       <h3>  {shop.name}</h3>
         
      </Link>
          </li>
))}

</ul> : <>Shop Not available</>
           
           }
        </div>
    );
};

export default VendorAllShop;