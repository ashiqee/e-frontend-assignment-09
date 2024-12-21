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

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`} />
);

const emptyImg = "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="

const ProductDetails = ({ id }: { id: string }) => {
  const { data: result, isSuccess, isLoading } = useGetProductDetailsForPublic(id);
  const addtoCartMutation = useAddToCart();
  const { data: user, isLoading: userLoading } = useGetCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [parchaseQty, setParchaseQty] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();
  const product = result?.data?.product;
  const relatedProducts = result?.data?.similarProducts;

  const [previewImg, setPreviewImg] = useState(product?.images?.[0] || emptyImg);

  useEffect(() => {
    setPreviewImg(product?.images?.[0] || emptyImg);
  }, [product]);

  if (isLoading) {
    return <><ProductDetailsSkeleton/></>
  }

  if (!result) {
    return <>Shop not found</>;
  }

  console.log(result);
  

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please register first to add to cart");
      router.push("/register");
      return;
    } else if (user?.role !== "CUSTOMER") {
      toast.warning("Only Customers can add to the cart");
      return;
    }

    const formData = new FormData();
    const cartsData = {
      cart: {
        productId: product.id,
        quantity: parchaseQty,
      },
    };

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



  const reviews = [
    { username: "Alice", rating: 5, comment: "Fantastic quality!" },
    { username: "Bob", rating: 4, comment: "Really liked it!" },
    { username: "Charlie", rating: 3, comment: "Average experience." },
  ];


  return (
    <div className="mx-4 md:mx-0">
      <section className="md:flex gap-6">
        <div className="md:flex flex md:flex-row flex-col-reverse gap-3">
          <div className="px-4 md:w-[160px] md:h-[600px]">
            {product.images.map((img: string, i: number) => (
              <Image
                key={i}
                alt={product.name}
                className={`${
                  previewImg === img && "border-primary border-2"
                } rounded-md shadow-md mb-4`}
                height={120}
                src={img}
                width={120}
                onClick={() => setPreviewImg(img)}
              />
            ))}
          </div>
          <div className="overflow-hidden md:min-w-[600px] md:h-[600px]">
            <Image
              alt={product.name}
              className="rounded-md hover:scale-125 duration-1000 w-full h-full shadow-md"
              height={1200}
              src={previewImg}
              width={1200}
            />
          </div>
        </div>

        <div className="h-[600px] w-full overflow-hidden">
          <div className="space-y-3 mt-5 md:mt-0">
            <h1 className="md:text-4xl text-xl font-bold">{product?.name.slice(0, 60)}</h1>
            <p className="flex gap-4 items-center text-3xl">
              TK {product?.price}
            
              <span className="text-gray-400 text-[16.5px] font-normal line-through">
                Tk {product?.discount + product?.price}
              </span>
            </p>
            <p className="flex gap-4 items-center text-sm">
            Category: {product?.category?.name}
            </p>
            <div className="flex gap-4 items-center">
              <div>
                
                <div>
                <div className="max-w-4xl space-y-3 ">


                 
                 <p> 
                  Description:
                  <br />
                  {product.description}</p>
                  
                  <p >
                  Shop Details: <Link href={`/shop/${product?.vendorShop?.id}`} className="flex mt-2 gap-2 items-center"> 
                 <Avatar size="sm" src={product?.vendorShop?.logo }/> {product?.vendorShop?.name}</Link></p>

                </div>
                </div>
              
                <div className="flex gap-4 mt-4 items-center">
                  <div className="flex items-center text-xl font-bold gap-4 border-[0.1px] border-primary/45 rounded-md  ">
                    <button
                    className="bg-slate-400/5 p-1.5 px-4"
                      onClick={() => setParchaseQty((prevQty) => Math.max(1, prevQty - 1))}
                    >
                      -
                    </button>
                    <p>{parchaseQty}</p>
                    <button 
                     className="bg-slate-400/5 p-1.5 px-4"
                    onClick={() => setParchaseQty(parchaseQty + 1)}>+</button>
                  </div>
                  <Button
                    className="text-md hover:bg-sky-700/25 hover:scale-105 duration-1000 font-bold"
                    onPress={handleAddToCart}
                  >
                    <ShoppingCart/>
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container my-10 mx-auto">
       
       <ReviewsSection reviews={reviews}/>

      </section>
      <section className="container my-10 mx-auto">
       <h3 className="text-2xl">
        Related Products

      
       </h3>

       <div className="grid grid-cols-6 mt-5 gap-4">
       {
          relatedProducts?.map((product:any)=>(
            <ProductCard key={product.id} index={product.id} item={product}/>
          ))
        }
       </div>
      </section>
      {isOpen && <CartsModal cartsData={""} id="" isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ProductDetails;
