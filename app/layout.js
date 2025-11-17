import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./Provider";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hayati - Premium Fashion for Trendy Souls | Online Clothing Store",
  description: "Discover the latest fashion trends at Hayati. Shop premium quality men's and women's clothing, accessories, and lifestyle products. Free shipping, easy returns, and COD available. Express your unique style with our curated collection.",
  keywords: "fashion, clothing, men's wear, women's wear, accessories, online shopping, trendy fashion, premium quality, free shipping",
  icons: {
    icon: "/hayati-high-resolution-logo.ico",
  },
  openGraph: {
    title: "Hayati - Premium Fashion for Trendy Souls",
    description: "Discover the latest fashion trends at Hayati. Shop premium quality men's and women's clothing with free shipping and easy returns.",
    type: "website",
    siteName: "Hayati",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayati - Premium Fashion for Trendy Souls",
    description: "Discover the latest fashion trends at Hayati. Shop premium quality clothing with free shipping.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <Navbar/>
        {children} {/* padding to prevent overlap */}
        </Providers>
      </body>
    </html>
  );
}
