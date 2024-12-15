
import AllProductSection from "@/components/(pagesection)/Homepages/AllProductSection";
import FeaturedSection from "@/components/(pagesection)/Homepages/FeaturedSection";
import HomepageSlider from "@/components/ui/Slider/HomepageSlider";



export default async function Home() {



  return (
    <>
    
    <section className="max-h-[600px]">
   <HomepageSlider/>

    </section>
    <section className=" md:px-6">
<FeaturedSection />
    </section>
    <section className=" md:px-6">
<AllProductSection />
    </section>
    </>
  );
}
