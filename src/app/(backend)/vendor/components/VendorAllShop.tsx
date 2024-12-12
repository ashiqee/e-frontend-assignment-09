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
      <Link className="flex flex-col justify-center items-center" href={`/vendor/shop/${shop.id}`}>
        
      <Image className='w-28 h-20 mx-auto rounded-3xl ' src={shop?.logo} />
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