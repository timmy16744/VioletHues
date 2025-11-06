import { Hero } from '@/components/sections/Hero'
import { FeaturedCollections } from '@/components/sections/FeaturedCollections'
import { Studio } from '@/components/sections/Studio'
import { CustomCreations } from '@/components/sections/CustomCreations'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'
import { Footer } from '@/components/sections/Footer'
import { CursorTrail } from '@/components/CursorTrail'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <CursorTrail />
      <Hero />
      <FeaturedCollections />
      <Studio />
      <CustomCreations />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
