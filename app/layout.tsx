import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/decorative/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Violet Hues | Bespoke Floral Atelier",
  description: "An intimate floral atelier crafting bespoke arrangements for life's most precious moments. Weddings, celebrations, and everyday beauty by Chiara.",
  keywords: ["luxury florist", "bespoke flowers", "wedding florals", "floral atelier", "designer bouquets", "artisan florist"],
  openGraph: {
    title: "Violet Hues | Bespoke Floral Atelier",
    description: "An intimate floral atelier crafting bespoke arrangements for life's most precious moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased bg-ivory text-noir font-sans selection:bg-champagne/30 selection:text-noir">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
