# Violet Hues — Where Design Blooms 🌸

A modern, vibrant, and interactive landing page for Violet Hues, a contemporary floral and lifestyle brand that blends art, nature, and design.

## ✨ Features

- **🤖 AI Floral Atelier**: Revolutionary AI-powered bouquet designer using Google Gemini
  - Real-time bouquet generation with Imagen 3.0
  - Interactive customization (flowers, colors, styles, sizes)
  - AI-generated recipes with pricing
  - Upload inspiration photos for instant analysis
  - "Surprise Me" random generation
  - Downloadable designs
- **Animated Hero Section**: Full-viewport hero with particle-based floral bloom effects and GSAP animations
- **Featured Collections**: Masonry grid layout with hover zoom, tilt effects, and smooth transitions
- **The Studio**: Parallax scrolling with glassmorphic overlays and motion clips
- **Custom Creations**: Interactive form with live preview animations
- **Testimonials**: 3D card carousel with smooth transitions
- **Newsletter Signup**: Beautiful subscription form with animated background elements
- **Animated Footer**: Floating petals drifting upward with elegant gradient background
- **Cursor Trail Effect**: Interactive petal trail that follows mouse movement
- **Smooth Scrolling**: Lenis smooth scroll implementation
- **Responsive Design**: Fully responsive across all breakpoints

## 🎨 Design System

### Color Palette
- **Violet Hues**: From pale violet (#faf5ff) to deep purple (#3b0764)
- **Petal Tones**: Soft pinks (#ffd7e0), lilacs (#e6d5f5), cream (#fffbf0)
- **Accent Colors**: Pastel yellows and subtle undertones

### Typography
- **Serif**: Playfair Display for elegant headings
- **Sans-serif**: Inter for clean, modern body text
- Variable font implementation with fluid typography

### Visual Language
- Abstract floral illustrations
- Subtle 3D parallax effects
- Glassmorphism and gradient meshes
- Flowing organic shapes
- Motion flourishes throughout

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **AI Integration**: Google Generative AI (Gemini/Imagen)
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion + GSAP + ScrollTrigger
- **Smooth Scroll**: @studio-freight/lenis
- **Fonts**: Google Fonts API (Inter + Playfair Display)
- **Hosting**: Ready for Vercel deployment

## 📦 Installation

```bash
# Install dependencies
npm install

# Configure AI Atelier (Optional but recommended)
# 1. Get your Google Gemini API key from https://ai.google.dev/
# 2. Copy .env.local.example to .env.local
# 3. Add your API key to .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

**See [AI_ATELIER_SETUP.md](./AI_ATELIER_SETUP.md) for detailed AI Atelier configuration.**

## 🎯 Sections

1. **Hero**: Full-viewport animated hero with floating petals and gradient mesh
2. **🤖 AI Floral Atelier**: AI-powered bouquet designer (see setup guide)
3. **Featured Collections**: Six curated collections in masonry layout
4. **The Studio**: Brand story with parallax image and statistics
5. **Custom Creations**: Interactive request form with animated preview
6. **Testimonials**: Customer reviews with 3D carousel navigation
7. **Newsletter**: Subscription form with animated background
8. **Footer**: Comprehensive footer with floating petal animation

## 🎭 Animations

- GSAP timeline intro animations
- Framer Motion scroll-based reveals
- Parallax effects using useScroll and useTransform
- 3D card flipping in testimonials
- Particle systems for floating petals
- Hover interactions with scale and tilt
- Custom cursor trail effect

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- All sections optimized for each breakpoint

## 🌿 Sustainability Note

The design emphasizes Violet Hues' commitment to sustainability with:
- Eco-conscious messaging
- Local grower partnerships highlighted
- Sustainable sourcing emphasized
- 100% sustainable badge in studio section

## 🎨 Customization

### Tailwind Theme
Custom colors, animations, and utilities are defined in `tailwind.config.ts`. You can easily modify:
- Color palette
- Animation keyframes
- Typography scales
- Spacing and sizing

### Content
All content is easily editable within the component files in `components/sections/`.

## 📄 License

© 2025 Violet Hues. All rights reserved.

## 🚀 Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/violet-hughes)

---

Built with 💜 for Violet Hues
