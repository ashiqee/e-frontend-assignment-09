"use client"
import React, { useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';

import ProductCard from '@/components/ui/cards/ProductCard';
import { useGetAllProductsForPublic } from '@/hooks/products.hook';


interface QueryState {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    searchTerm?: string;

  }

const FeaturedSection =  () => {
    const [query, setQuery] = useState<QueryState>({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        page: 1,
        limit: 6,
        searchTerm: '',
        
     });
    const {data:flashSaleProduct ,isLoading}= useGetAllProductsForPublic(query);

const products= flashSaleProduct?.data.flashSaleProduct || []



  
    return (
        <div className='md:my-20 md:flex gap-4 container mx-auto'>
            <Image className='h-full p-4 md:p-0 md:w-96 object-fit' src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flash-sale-design-template-de1ed8f28321fef5a13d120fb7911841_screen.jpg?ts=1637050530' />
 <div>
 <div className="gap-3 md:gap-4 grid grid-cols-2 sm:grid-cols-3 mx-4 md:mx-0">
    {products.map((item:any, index:number) => (
     
      <ProductCard key={index} index={index} item={item} />

    ))}
    </div>
    <Link href={`/flashSale`}> <Button  className='flex mt-4 mx-auto justify-center' color='warning' variant='bordered' >View More</Button>
    </Link>
    </div>    </div>
    );
};

export default FeaturedSection;