import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Violet Hues — Where Design Blooms',
  description: 'Floral artistry reimagined for the modern era. Contemporary floral and lifestyle brand blending art, nature, and design.',
  keywords: ['floral design', 'floral artistry', 'lifestyle brand', 'contemporary florals', 'violet hues'],
  authors: [{ name: 'Violet Hues' }],
  openGraph: {
    title: 'Violet Hues — Where Design Blooms',
    description: 'Floral artistry reimagined for the modern era.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
