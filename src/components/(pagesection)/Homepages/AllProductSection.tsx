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
    limit: 12, // Default limit
    searchTerm: '',
  });

  const [products, setProducts] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch product data and total count
  const { data: flashSaleProduct, isLoading } = useGetAllProductsForPublic(query);
  const totalCount = flashSaleProduct?.data?.paginateData?.total || 0; // Assume totalCount is available in API response
  const router = useRouter();

  // Update product list
  useEffect(() => {
    if (flashSaleProduct?.data.products) {
      setProducts((prev) => {
        const newProducts = flashSaleProduct.data.products.filter(
          (product: any) => !prev.some((p: any) => p.id === product.id) // Prevent duplicates
        );
        return [...prev, ...newProducts];
      });
      setIsFetching(false);
    }
  }, [flashSaleProduct]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      !isFetching &&
      !isLoading &&
      products.length < totalCount
    ) {
      setIsFetching(true);
      setQuery((prev) => ({
        ...prev,
        page: prev.page ? prev.page + 1 : 1, // Increment page
        limit: (prev.limit || 12) + 12, // Increment limit
      }));
    }
  }, [isFetching, isLoading, products.length, totalCount]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="my-10 gap-4 container mx-auto">
      <h2 className="text-2xl text-center py-10">All Products</h2>
      <div>
        <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 mx-4 md:mx-0">
          {products.map((item: any, index: number) => (
            <ProductCard key={item.id || index} index={index} item={item} />
          ))}
          {/* Show skeletons only when loading or fetching */}
          {(isLoading || isFetching) &&
            products.length < totalCount+1 && // Stop skeletons when all products are loaded
            Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      </div>
      {isFetching && products.length < totalCount && (
        <p className="text-center text-gray-500 mt-4">Loading more products...</p>
      )}
      {products.length >= totalCount && (
        <p className="text-center text-gray-500 mt-4">All products are loaded.</p>
      )}
    </div>
  );
};

export default AllProductSection;
