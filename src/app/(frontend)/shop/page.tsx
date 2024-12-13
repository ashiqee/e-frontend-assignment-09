import ShopSidebar from "@/components/shared/bar/ShopSidebar";
import AllShopProducts from "../_components/pages/shoppage/AllShopProduct";


export default async function ShopPage() {




  


  return (
    <section className="mx-8 my-10 flex gap-6">
    <ShopSidebar/>
    <div>
    <div className="border h-12 mb-6 rounded-lg" />
    
    <AllShopProducts/>

    </div>
  </section>
    
  );
}
