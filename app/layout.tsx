import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Violet Hues | Bespoke Floral Designs by Chiara",
  description: "Personal local florist creating bespoke floral arrangements with love. Wedding flowers, special occasions, and everyday beauty by Chiara.",
  keywords: ["florist", "flowers", "wedding flowers", "bouquets", "floral design", "local florist", "bespoke arrangements"],
  openGraph: {
    title: "Violet Hues | Bespoke Floral Designs",
    description: "Personal local florist creating bespoke floral arrangements with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-white text-deep-violet">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
