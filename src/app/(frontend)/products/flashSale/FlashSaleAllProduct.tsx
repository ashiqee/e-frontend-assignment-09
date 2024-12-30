"use client";
import React, { useState } from "react";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

import ProductCard from "@/components/ui/cards/ProductCard";
import { useGetAllProductsForPublic } from "@/hooks/products.hook";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";

interface QueryState {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const FlashSalesAllProduct = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 20,
    searchTerm: "",
  });
  const { data: flashSaleProduct, isLoading } =
    useGetAllProductsForPublic(query);

  const products = flashSaleProduct?.data.flashSaleProduct || [];

  return (
    <div className="md:my-20 md:flex gap-4  container mx-auto">
      <div>
        <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 mx-4 md:mx-0">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.map((item: any, index: number) => (
                <ProductCard key={index} index={index} item={item} />
              ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default FlashSalesAllProduct;
