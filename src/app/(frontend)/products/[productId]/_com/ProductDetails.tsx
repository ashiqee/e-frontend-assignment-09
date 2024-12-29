"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAddToCart } from "@/hooks/carts.hook";
import { useGetCurrentUser } from "@/hooks/users.hook";
import { useGetProductDetailsForPublic } from "@/hooks/products.hook";
import ProductDetailsSkeleton from "./ProductDetailSkeleton";
import CartsModal from "@/app/(frontend)/_components/modals/CartModal";
import { ShoppingCart } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import ProductCard from "@/components/ui/cards/ProductCard";
import ReviewsSection from "./ReviewsSection";
import ZoomSliderModal from "./ZoomSliderModal";


const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`} />
);

const emptyImg = "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=";

const ProductDetails = ({ id }: { id: string }) => {
  // Hooks for data fetching and state management
  const { data: result, isLoading } = useGetProductDetailsForPublic(id);
  const { data: user } = useGetCurrentUser();
  const addtoCartMutation = useAddToCart();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Local states
  const [isOpen, setIsOpen] = useState(false);
  const [parchaseQty, setParchaseQty] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Extract product and related details
    const product = result?.data?.product;
    const reviews = product?.reviews || [];
    const relatedProducts = result?.data?.similarProducts || [];
    const [previewImg, setPreviewImg] = useState(product?.images?.[0] || emptyImg);

  useEffect(() => {
    if (product?.images?.[0]) setPreviewImg(product.images[0]);
  }, [product]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!result) return <>Shop not found</>;

  // Add to cart handler
  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please register first to add to cart");
      router.push("/register");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.warning("Only Customers can add to the cart");
      return;
    }

    const formData = new FormData();
    const cartsData = { cart: { productId: product.id, quantity: parchaseQty } };
    formData.append("data", JSON.stringify(cartsData));

    addtoCartMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Product added to cart successfully");
        queryClient.invalidateQueries({ queryKey: ["carts"] });
        setIsOpen(true);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to add product to cart");
      },
    });
  };

  return (
    <div className=" ">
      <section className="md:flex gap-6">
        {/* Product Images */}
        <div className="md:flex flex md:flex-row flex-col-reverse gap-2">
          <div className="md:px-1 w-16  md:w-[155px] md:h-[600px]">
            {product.images.map((img: string, i: number) => (
              <Image
                key={i}
                alt={product.name}
                className={`rounded-md w-full shadow-md mb-4 ${previewImg === img && "border-primary border-2"}`}
                height={120}
                src={img}
                width={120}
                onClick={() => setPreviewImg(img)}
              />
            ))}
          </div>
          <div className="overflow-hidden  md:w-[800px] md:h-[600px]">
            <Image
              alt={product.name}
              className="rounded-md object-cover hover:scale-125 duration-1000 w-full h-full shadow-md"
              height={1200}
              src={previewImg}
              width={1200}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
       

        {/* Product Details */}
        <div className="md:h-[600px] mb-10 md:mb-0 w-full overflow-hidden">
          <div className="space-y-3 mt-5 md:mt-0">
            <h1 className="md:text-4xl text-xl font-bold">{product?.name.slice(0, 70)}</h1>
            <p className="flex gap-4 items-center text-xl md:text-3xl">
              TK {product?.price}
              <span className="text-gray-400 text-[16.5px] font-normal line-through">
                Tk {product?.discount + product?.price}
              </span>
            </p>
            <p className="flex gap-4 items-center text-sm">Category: {product?.category?.name}</p>
            <p className="text-sm">Description:<br />{product.description}</p>
            <Link
              href={`/shop/${product?.vendorShop?.id}`}
              className="flex mt-2 px-2 bg-slate-950/15 rounded-md w-fit p-2 gap-2 items-center"
            >
              <Avatar size="sm" src={product?.vendorShop?.logo} />
              {product?.vendorShop?.name}
            </Link>
            <div className="flex gap-4 mt-4 items-center">
              <div className="flex items-center text-xl font-bold gap-4 border-[0.1px] border-primary/45 rounded-md">
                <button
                  className="bg-slate-400/5 p-1 px-4"
                  onClick={() => setParchaseQty((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <p>{parchaseQty}</p>
                <button
                  className="bg-slate-400/5 p-1 px-4"
                  onClick={() => setParchaseQty(parchaseQty + 1)}
                >
                  +
                </button>
              </div>
              <Button
                className="text-md hover:bg-sky-700/25 hover:scale-105 duration-1000 font-bold"
                onPress={handleAddToCart}
              >
                <ShoppingCart /> Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container md:my-10 mx-auto">
        <ReviewsSection reviews={reviews} />
      </section>

      {/* Related Products */}
      <section className="container my-10 mx-auto">
        <h3 className="text-2xl">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 mt-5 gap-4">
          {relatedProducts.map((relatedProduct: any) => (
            <ProductCard key={relatedProduct.id} index={relatedProduct.id} item={relatedProduct} />
          ))}
        </div>
      </section>

      {isOpen && <CartsModal cartsData={""} id="" isOpen={isOpen} setIsOpen={setIsOpen} />}

     
    </div>
  );
};

export default ProductDetails;
