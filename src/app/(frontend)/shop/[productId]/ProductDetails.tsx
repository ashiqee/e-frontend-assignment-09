"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import CartsModal from "../../_components/modals/CartModal";

import { useAddToCart } from "@/hooks/carts.hook";
import { useGetCurrentUser } from "@/hooks/users.hook";
import { useGetProductDetailsForPublic } from "@/hooks/products.hook";





const ProductDetails = ({ id }: { id: string }) => {
  const { data: result, isSuccess  ,isLoading } = useGetProductDetailsForPublic(id);
  const addtoCartMutation = useAddToCart()
  const {data:user,isLoading:userLoading}= useGetCurrentUser();
  const [isOpen,setIsOpen]=useState(false);
  const [cartItemQty,setCartItemQty]=useState(1);
  const queryClient = useQueryClient();
  const product = result?.data ;
  const router = useRouter()
  
  // Ensure images is always an array
  const [previewImg, setPreviewImg] = useState(
    product?.images?.[0] || ""
  );

  // Update preview image when product changes
  useEffect(() => {
    setPreviewImg(product?.images?.[0] || "");
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


 const handleAddToCart = ()=>{

  
  if(!user){
    toast.warning("Please registation first for add to cart")
    router.push("/register")

    return
  }else if(user?.role !== "CUSTOMER"){
    toast.warning("Only Customer can add to cart")

    return
  }


  const formData = new FormData();

  const cartsData = {
    cart: {
      productId:product.id,
      quantity:cartItemQty
    }
  }

  formData.append("data", JSON.stringify(cartsData));

  addtoCartMutation.mutate(formData, {
    onSuccess: () => {
        toast.success("Product added to cart successfully");
      queryClient.invalidateQueries({ queryKey: ['carts'] }); 
      setIsOpen(true); 
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add product to cart');
    },
  });
};

  return (
    <div className="mx-4 md:mx-0">
      <section className="md:flex gap-6">
        <div className="md:flex flex flex-col-reverse gap-3">
          <div className="px-4 md:w-[160px] md:h-[600px] ">
            {product.images.map((img: string, i: number) => (
              <Image
                key={i}
                alt={product.name}
                className={`${previewImg === img && "border-primary  border-2"} 
                
                rounded-md shadow-md mb-4 shadow-slate-800`}
                height={120}
                src={img}
                width={120}
                onClick={() => setPreviewImg(img)}
              />
            ))}
          </div>
          <div className="overflow-hidden md:min-w-[600px] md:h-[600px]">
          {
              !previewImg ? <>Loading Images....</> :<Image
              alt={product.name}
              className={` rounded-md hover:scale-125 duration-1000 w-full h-full shadow-md shadow-slate-800`}
              height={1200}
              src={previewImg}
              width={1200}
            />
          }
          </div>
        </div>

        <div className="h-[600px] w-full  overflow-hidden">
    
     <div className="space-y-5 mt-5  md:mt-0">
            <h1 className="md:text-4xl text-xl font-bold">{product?.name.slice(0,60)}</h1>
    
            <p className="flex gap-4 items-center text-3xl">
              TK {product?.price}
              <span className="text-gray-400 text-[16.5px] font-normal  line-through ">
                Tk {product?.discount}
              </span>
            </p>
{/* 
            {product?.variant.color && <p>Color: {product?.variant.color}</p>}
            {product?.variant.size && <p>Size: {product?.variant.size}</p>}

            <div>
              {product?.images?.length >= 2 && (
                <>
                  <p className="mb-2">Color:{previewImg?.label}</p>
                  <div className="flex gap-4 ">
                    {product?.variant?.colors?.map((img: any, i: number) => (
                      <Image
                        className={`${
                          previewImg === img.imgUrl && "border-primary border-2"
                        } rounded-md shadow-md shadow-slate-800`}
                        onClick={() => setPreviewImg(img)}
                        key={i}
                        alt="images"
                        width={60}
                        height={60}
                        src={img.imgUrl}
                      />
                    ))}
                  </div>
                </>
              )}
            </div> */}

            <div className="flex gap-4  items-center">
              {/* quantity  */}
              <div>
                <p>Quantity</p>
                <div className="flex gap-4 mt-2 items-center">
                  <div className="flex gap-4 border-[0.1px] border-primary/45 rounded-md  px-4 max-w-24 p-2">
                    <button>-</button>
                    <p>1</p>
                    <button>+</button>
                  </div>

                  <Button className="text-black min-w-full text-md hover:bg-white hover:scale-105 duration-1000 font-bold" onPress={handleAddToCart}>
                    Add To Cart
                  </Button>
                </div>
              </div>

              {/* add to cart  */}
            </div>

            {/* description  */}
       
            <div className="max-w-2xl my-6">{product.description}</div>

            
          </div>
    

         
        </div>
      </section>
   
   <section className="container mx-auto">
   <div className="max-w-2xl my-6">{product.description}</div>
   </section>

   {isLoading && <p>Loading...</p>}
{
  isOpen && <><CartsModal cartsData={""} id="" isOpen={isOpen} setIsOpen={setIsOpen}/></>
}

    </div>
  );
};

export default ProductDetails;