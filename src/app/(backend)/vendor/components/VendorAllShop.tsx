"use client"
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const VendorAllShop = ({shops}:{shops:any}) => {
    return (
        <div>


<div className='my-10 border p-2 shadow-lg rounded-md w-48'>
           <h2 className='my-3 bg-slate-300/15 p-3 rounded-lg text-xl text-center'> Top Five Shop</h2>

            {

shops ?   <div className='grid grid-rows-5 gap-4'>
{   shops.map((shop:any)=>(
    <div  key={shop.id}>
      <Link className="flex gap-4 items-center" href={`/vendor/shop/${shop.id}`}>
        
      <Image className='w-12 h-12 mx-auto rounded-3xl ' src={shop?.logo} />
       <h3>  {shop.name}</h3>
         
      </Link>
          </div>
))}

</div> : <>Shop Not available</>
           
           }
        </div>

        {/* product */}

        {/* orders  */}

        
        </div>
    );
};

export default VendorAllShop;