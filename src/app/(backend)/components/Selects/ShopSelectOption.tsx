import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useGetCurrentUser } from "@/hooks/users.hook";
import Loading from "@/components/shared/Loading";

type Shop = {
  id: number;
  name: string;
  logo: string;
};

type ShopSelectOptionProps = {
  shops: Shop[];
  setSearchTerm: any;
};

export default function ShopSelectOption({ setSearchTerm }: ShopSelectOptionProps) {
  const {data:result,isLoading}=useGetCurrentUser();

  if(isLoading) return <Loading/>
  const shops = result?.vendorShops;
  

  
  
  return (
    <div className="flex gap-2  w-full items-center">
    <Select
      classNames={{
        base: "w-60",
        trigger: "h-12",
      }}
      items={shops}
      label="Select Shop"
      labelPlacement="outside"
      
      placeholder="Select a shop"
      onSelectionChange={(selectedKey) => {
        const selectedShop = shops.find((shop:any) => shop.id.toString() === selectedKey);
       
      }}
      renderValue={(selectedItems) => {
        const selectedKey = selectedItems[0]?.key;
        const selectedShop = shops.find((shop:any) => shop.id.toString() === selectedKey);
        if (selectedShop) {
            
          setSearchTerm(selectedShop.id);
        }else{
          setSearchTerm(0)
        }

        if (selectedShop) {
          return (
            <div key={selectedShop.id} className="flex items-center gap-2">
              <Avatar
                alt={selectedShop.name}
                className="flex-shrink-0"
                size="sm"
                src={selectedShop.logo}
              />
              <div className="flex flex-col">
                <span>{selectedShop.name}</span>
              </div>
            </div>
          );
        }
        return null;
      }}
    >
      {shops.map((shop:any) => (
        <SelectItem key={shop.id.toString()} textValue={shop.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={shop.name} className="flex-shrink-0" size="sm" src={shop.logo} />
            <div className="flex flex-col">
              <span className="text-small">{shop.name}</span>
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
   
    </div>
  );
}
