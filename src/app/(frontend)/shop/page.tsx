import ShopSidebar from "@/components/shared/bar/ShopSidebar";
import ProductCard from "@/components/ui/cards/ProductCard";
import { getAllProducts } from "@/services/getProductsApiFetch";

export default async function ShopPage() {

const products = await getAllProducts();


  


  return (
    <section className="mx-8 my-10 flex gap-6">
    <ShopSidebar/>
    <div>
    <div className="border h-12 mb-6 rounded-lg" />
    <div className="gap-3 md:gap-4 grid grid-cols-2 sm:grid-cols-4 mx-4 md:mx-0">
    {products.map((item:any, index:number) => (
     
      <ProductCard key={index} index={index} item={item} />

    ))}
    </div>
  
    </div>
  </section>
    
  );
}
