"use client";
import React, { useState } from "react";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

import ProductCard from "@/components/ui/cards/ProductCard";
import { useGetAllProductsForPublic } from "@/hooks/products.hook";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import FlashSale from "./FlashSaleTimer";

interface QueryState {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const FeaturedSection = () => {
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
    <div className="md:my-6 md:flex gap-4  container mx-auto">
      <div className="flex flex-col gap-4">
      
      <FlashSale/>
        <Image
          className="h-full p-4 md:p-0 md:w-96 object-cover"
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flash-sale-design-template-de1ed8f28321fef5a13d120fb7911841_screen.jpg?ts=1637050530"
        />
      
      </div>
      <div>
        <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 mx-4 md:mx-0">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products
                ?.slice(0, 10)
                .map((item: any, index: number) => (
                  <ProductCard key={index} index={index} item={item} />
                ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default FeaturedSection;
