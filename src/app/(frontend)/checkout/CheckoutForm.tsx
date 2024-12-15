"use client"
import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/react";
import { ListOrdered } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCreateOrder } from "@/hooks/orders.hook";
import TRTextarea from "@/components/forms/TRTextarea";
import TRInput from "@/components/forms/TRInput";
import TRForm from "@/components/forms/TRFrom";

export default function CheckoutForm({cartItems,user}:{cartItems:any,user:any}) {
    const router = useRouter()
    const [payment, setPaymentMethod] = useState("cashOnDelivery");
    const [discount, setDiscount] = useState(0);
    const createOrderMutation = useCreateOrder()
    
    const totalPrice = cartItems.subtotal - discount;

    const onSubmit = (data:any)=>{

        const formData = new FormData()

        const formattedCartItems = cartItems.cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
        }));
            const orderData = {

                   order: {
                    cartItems:formattedCartItems,
                    totalPrice: totalPrice,
                    fullName: data.name,
                    mobile: data.contactNumber,
                    address: data.address,
                    paymentMethod: payment,
                   }
            }

            formData.append("data",JSON.stringify(orderData));

            createOrderMutation.mutate(formData)
     
    }
    
    return (
        <div className="w-full p-4 px-10">

<h3>Shipping Address</h3>


<TRForm defaultValues={{
    email:user.email,
    name: user.fullName,
    contactNumber: user.contactNumber,
    address: user.address
}}
onSubmit={onSubmit}
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
            isRequired
            label="Full Address"
            name="address"
            rows={2}
            type="text"
           
          />
        </div>

        <div className="flex gap-2 mb-4 justify-between">
          <RadioGroup
            className="space-y-4"
            color="secondary"
            defaultValue="cashOnDelivery"
            label="Select your Payment method"
        
            onValueChange={(value)=>setPaymentMethod(value)}
          >
            <Radio value="cashOnDelivery">Cash on Delivery</Radio>
            <Radio value="payWithAmarPay">Pay Now</Radio>
          </RadioGroup>
          <div className="flex flex-col justify-end">
          <div className=" text-[15px] my-2">
          <TRInput
            label="Coupon"
            name="coupon"
            size="sm"
            type="text"
           
          />
                <div className=" w-full p-2  text-md  ">
                   <p className="flex gap-10 justify-between items-center"> Total Items : <span className="text-right ">{cartItems?.totalQuantity}</span></p>
                    <p className="flex gap-10 justify-between items-center">Tolal: <span  className="text-right  font-bold"> {(cartItems?.subtotal).toFixed(2)}</span></p>
                    <p className="flex gap-10 justify-between items-center">Discount: <span  className="text-right  font-bold">-  {discount}</span></p>
                    <p className="flex gap-10 justify-between items-center">SubTolal: <span  className="text-right  font-bold"> {(totalPrice).toFixed(2)}</span></p>
                </div>
             
            </div>

          {payment === "cashOnDelivery"? 
          <Button
          color="success"
          type="submit"
            
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

<div className="flex gap-4 justify-center pt-10" />
        </div>
    );
}