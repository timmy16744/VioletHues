import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { AIAtelier } from '@/components/sections/AIAtelier'
import { FeaturedCollections } from '@/components/sections/FeaturedCollections'
import { Studio } from '@/components/sections/Studio'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'
import { Footer } from '@/components/sections/Footer'
import { CursorTrail } from '@/components/CursorTrail'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <CursorTrail />
      <FloatingCTA />
      <Hero />
      <HowItWorks />
      <AIAtelier />
      <FeaturedCollections />
      <Studio />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
