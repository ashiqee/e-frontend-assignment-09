'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/ui/cards/ProductCard';
import { useGetAllProductsForPublic } from '@/hooks/products.hook';
import ProductCardSkeleton from '@/components/skeletons/ProductssSkeleton';

interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const AllProductSection = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 12,
    searchTerm: '',
  });

  const [products, setProducts] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { data: flashSaleProduct, isLoading } = useGetAllProductsForPublic(query);
  const router = useRouter();

  // Fetch more products on page change
  useEffect(() => {
    if (flashSaleProduct?.data.products) {
      setProducts((prev) => [...prev, ...flashSaleProduct.data.products]);
      setIsFetching(false);
    }
  }, [flashSaleProduct]);

  // Handle scrolling
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200 && !isFetching && !isLoading) {
      setIsFetching(true);
      setQuery((prev) => ({
        ...prev,
        page: (prev.page || 1) + 1, // Increment the page number
      }));
    }
  }, [isFetching, isLoading]);

  // Add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="my-10 gap-4 container mx-auto">
      <h2 className="text-2xl text-center py-10">All Products</h2>
      <div>
        <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 mx-4 md:mx-0">
          {products.map((item: any, index: number) => (
            <ProductCard key={index} index={index} item={item} />
          ))}
          {isLoading || isFetching
            ? Array.from({ length: query.limit || 12 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AllProductSection;
