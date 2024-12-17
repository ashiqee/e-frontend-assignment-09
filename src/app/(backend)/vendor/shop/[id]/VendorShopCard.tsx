'use client'
import { useGetAllVendorShopsOrders } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function VendorShopCards({id}:{id:string}) {
    const {data,isLoading}= useGetAllVendorShopsOrders(id)

    const shops=data?.data;
    const products= shops?.products;
    const ordersItem =products?.orderItems;

   
    
    return (
        <div>
<h2>Total Sales Reports</h2>
<div className="grid grid-cols-2 2xl:grid-cols-10 md:grid-cols-6 gap-4 items-center">
    {
        products?.map((product:any)=>(
            <div key={product.id.toString()}>
                <Link href={`/products/${product.id}`}>
                <Image className="size-36 mx-auto" src={product.images[0]} />
                <p className="text-center">{product.name}</p>
                </Link>
                <p className="bg-sky-700/15 p-3 text-xl font-bold rounded-md text-center">{product?.salesQty}</p>
                <p className="bg-sky-700/15 p-3 text-xl font-bold rounded-md text-center">{product?.salesQty*product.price}</p>
            
            
            </div>
        ))
    }
</div>

        </div>
    );
}