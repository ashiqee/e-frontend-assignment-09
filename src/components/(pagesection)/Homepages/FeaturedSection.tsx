import React from 'react';

import ProductCard from '@/components/ui/cards/ProductCard';

const FeaturedSection =  ( {products}:{products:any}) => {

  
    return (
        <div className='my-20 container mx-auto'>
             <div className="gap-3 md:gap-4 grid grid-cols-2 sm:grid-cols-4 mx-4 md:mx-0">
    {products.slice(10,18).map((item:any, index:number) => (
     
      <ProductCard key={index} index={index} item={item} />

    ))}
    </div>
        </div>
    );
};

export default FeaturedSection;