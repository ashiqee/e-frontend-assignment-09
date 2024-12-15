import { Navbar } from "@/components/navbar";
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
<Navbar/>

{children}
</main>
 <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Kidz Bazar</p>
              </Link>
            </footer>
 </div>
  );
}
