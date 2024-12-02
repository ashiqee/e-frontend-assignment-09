
import FeaturedSection from "@/components/(pagesection)/Homepages/FeaturedSection";
import HomepageSlider from "@/components/ui/Slider/HomepageSlider";
import { getAllProducts } from "@/services/getProductsApiFetch";



export default async function Home() {

  const products = await getAllProducts();


  return (
    <>
    
    <section className="max-h-[600px]">
   <HomepageSlider/>

    </section>
    <section className=" md:px-6">
<FeaturedSection products={products}/>
    </section>
    </>
  );
}
