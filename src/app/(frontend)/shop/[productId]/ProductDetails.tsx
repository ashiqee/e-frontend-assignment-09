"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import React, { useState } from "react";





const ProductDetails = ({ product }: { product: any }) => {
  const [previewImg, setPreviewImg] = useState(product.images[0]);
  


  return (
    <div className="mx-4 md:mx-0">
      <section className="md:flex gap-6">
        <div className="flex gap-3">
          <div className="px-4 w-[160px] h-[600px] ">
            {product.images.map((img: string, i: number) => (
              <Image
                key={i}
                alt="images"
                className={`${previewImg === img && "border-primary  border-2"} 
                
                rounded-md shadow-md mb-4 shadow-slate-800`}
                height={120}
                src={img}
                width={120}
                onClick={() => setPreviewImg(img)}
              />
            ))}
          </div>
          <div className="overflow-hidden min-w-[600px] h-[600px]">
            <Image
              alt="images"
              className={` rounded-md hover:scale-125 duration-1000 shadow-md shadow-slate-800`}
              height={600}
              src={previewImg.imgUrl ? previewImg.imgUrl : previewImg}
              width={600}
            />
          </div>
        </div>

        <div className="h-[600px]  overflow-hidden">
    
     <div className="space-y-5 mt-5  md:mt-0">
            <h1 className="md:text-4xl text-xl font-bold">{product?.title.slice(0,60)}</h1>
    
            <p className="flex gap-4 items-center text-3xl">
              TK {product?.price}
              <span className="text-gray-400 text-[16.5px] font-normal  line-through ">
                Tk {product?.regularPrice}
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

                  <Button className="text-black min-w-full text-md hover:bg-white hover:scale-105 duration-1000 font-bold">
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


    </div>
  );
};

export default ProductDetails;