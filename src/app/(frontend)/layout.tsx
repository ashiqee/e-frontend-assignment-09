import { Navbar } from "@/components/navbar";
import MiniBar from "@/components/shared/bar/MiniBar";
import MordernNavbar from "@/components/shared/bar/MordernNavbar";
import StickyNavBar from "@/components/shared/bar/StickyNavBar";
import Footer from "@/components/shared/Footer";
import "@/styles/globals.css";

import { Link } from "@nextui-org/link";



export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 <div className="flex flex-col justify-between min-h-screen">
<main>
<div className="hidden md:block">
<MiniBar/>
  <MordernNavbar/>
  <StickyNavBar/>
</div>
  <Navbar/>


{children}
</main>
 <Footer/>
 </div>
  );
}
