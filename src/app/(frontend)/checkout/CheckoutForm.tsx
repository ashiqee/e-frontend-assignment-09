"use client"
import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import TRTextarea from "@/components/forms/TRTextarea";
import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/react";
import { ListOrdered } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutForm({data,user}:{data:any,user:any}) {
    const router = useRouter()
    const [payment, setPaymentMethod] = useState("cashOnDelivery");
    

    const onSubmit = (data:any)=>{
        console.log(data);
        
    }
    
    return (
        <div className="w-full p-4 px-10">

<h3>Shipping Address</h3>


<TRForm onSubmit={onSubmit}
defaultValues={{
    email:user.email,
    name: user.fullName,
    contactNumber: user.contactNumber,
    address: user.address
}}
>
        <div className="py-3 flex gap-4 items-center">
          <TRInput
            isRequired
            readOnly
            label="Email"
            name="email"
            type="email"
           
          />
          <TRInput
            isRequired
            label="Mobile Number"
            name="contactNumber"
            type="tel"
          
          />
        </div>
        <div className="py-3 space-y-3">
          <TRInput
            isRequired
            label="Full Name"
            name="name"
            type="text"
           
          />
          <TRTextarea
            rows={2}
            isRequired
            label="Full Address"
            name="address"
            type="text"
           
          />
        </div>

        <div className="flex gap-2 mb-4 justify-between">
          <RadioGroup
            className="space-y-4"
            color="secondary"
            defaultValue="cashOnDelivery"
            onValueChange={(value)=>setPaymentMethod(value)}
        
            label="Select your Payment method"
          >
            <Radio value="cashOnDelivery">Cash on Delivery</Radio>
            <Radio value="payWithAmarPay">Pay Now</Radio>
          </RadioGroup>
          <div className="flex flex-col justify-end">
          <div className=" text-[15px] my-2">
          <TRInput
            label="Coupon"
            name="coupon"
            type="text"
            size="sm"
           
          />
                <div className=" w-full p-2  text-md  ">
                   <p className="flex gap-10 justify-between items-center"> Total Items : <span className="text-right ">{data?.totalQuantity}</span></p>
                    <p className="flex gap-10 justify-between items-center">Tolal: <span  className="text-right  font-bold"> {(data?.subtotal).toFixed(2)}</span></p>
                    <p className="flex gap-10 justify-between items-center">Discount: <span  className="text-right  font-bold"> {0}</span></p>
                    <p className="flex gap-10 justify-between items-center">SubTolal: <span  className="text-right  font-bold"> {(data?.subtotal).toFixed(2)}</span></p>
                </div>
             
            </div>

          {payment === "cashOnDelivery"? 
          <Button
          color="success"
          type="button"
        
          onClick={onSubmit}
        >
         Confirm Order
        </Button>
          
          : <Button color="warning" onPress={()=>router.push("/payment")}>

          <ListOrdered /> Pay Now
          
          </Button> }
            
          </div>
        </div>
      </TRForm>

<div className="flex gap-4 justify-center pt-10">
             
             
            </div>
        </div>
    );
}