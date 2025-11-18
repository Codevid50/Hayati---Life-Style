import BewakoofSwiper from "./components/Swipesection";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hayati - Premium Fashion for Trendy Souls | Online Clothing Store",
  description: "Welcome to Hayati - your ultimate destination for premium fashion. Discover trendy men's and women's clothing, accessories, and lifestyle products. Free shipping, easy returns, and exceptional quality.",
  keywords: "fashion, clothing, online shopping, men's fashion, women's fashion, trendy clothes, premium quality, free shipping, fashion store",
  openGraph: {
    title: "Hayati - Premium Fashion for Trendy Souls",
    description: "Discover the latest fashion trends at Hayati. Shop premium quality clothing with free shipping and easy returns.",
    type: "website",
    images: [
      {
        url: "/hayati-high-resolution-logo.png",
        width: 800,
        height: 600,
        alt: "Hayati Fashion Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayati - Premium Fashion for Trendy Souls",
    description: "Discover the latest fashion trends at Hayati. Shop premium quality clothing with free shipping.",
    images: ["/hayati-high-resolution-logo.png"],
  },
};

export default function Home() {
  return (
    < >
      <Header />
      <BewakoofSwiper />
      <main className="pt-[100px]  overflow-hidden ">
        <div className="h-[86.2vh] w-full bg-[#020617] relative ">
  {/* Dark Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
    }}
  />
  {/* Hero / Boxes Background */}
        <div
          className="w-full bg-cover bg-center relative -mt-25 lg:pt-12"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Logo */}
            <div>
                <Image
                  src="/hayati-high-resolution-logo.png"
                  alt="Logo"
                  width={250}
                  height={96}
                  className="rounded-lg mx-4 shadow-black shadow-lg w-[250px] h-24 object-cover cursor-pointer"
                  priority
                />
            </div>

            {/* Boxes Section */}
            <div className="boxes flex  gap-5 justify-center mt-5 flex-wrap">
              {/* Men Box */}
              <div
                className="relative w-[40%] sm:w-[220px] h-[280px] flex items-center justify-center lg:w-60 lg:h-80 rounded-2xl overflow-hidden group z-10"
              >
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Men's Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 220px, 240px"
                />
                {/* Make sure nothing blocks the button */}
                <div className="z-20 mt-50">
                  <Link href="/men">
                    <button className="bg-white border border-yellow-600 font-extrabold rounded-md text-2xl py-2 px-20 cursor-pointer hover:bg-yellow-100 transition-all">
                      MEN
                    </button>
                  </Link>
                </div>
              </div>

              {/* Women Box */}
              <div
                className="relative w-[40%] sm:w-[220px] h-[280px] flex items-center justify-center lg:w-60 lg:h-80 rounded-2xl overflow-hidden group z-10"
              >
                <Image
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"
                  alt="Women's Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 220px, 240px"
                />
               <div className="z-20 mt-50">
                  <Link href="/women">
                    <button className="bg-white border  border-yellow-600 font-extrabold rounded-md text-2xl py-2 px-13 cursor-pointer hover:bg-yellow-100 transition-all">
                      WOMEN
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
        </div>
</div>

      </main>


    </>
  );
}
