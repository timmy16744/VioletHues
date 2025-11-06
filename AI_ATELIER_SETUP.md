# AI Floral Atelier - Setup Guide

## Overview

The AI Floral Atelier is a powerful, AI-powered bouquet design tool integrated directly into the Violet Hues landing page. It uses Google's Gemini AI (Imagen 3.0 for image generation and Gemini 1.5 Flash for analysis) to create stunning, realistic bouquet visualizations and detailed recipes with pricing.

## Features

### 🎨 Bouquet Customization
- **Flower Selection**: Choose from 12 popular flower varieties
- **Color Palettes**: 5 curated palettes plus custom color picker
- **Arrangement Styles**: 6 professional styles (Wild & Organic, Classic Round, Modern Minimalist, etc.)
- **Size & Shape**: Configure bouquet size and shape preferences
- **Quick Presets**: 3 pre-configured designs for instant inspiration
- **Surprise Me**: Random generation for creative exploration

### 🤖 AI-Powered Generation
- **Image Generation**: Ultra-realistic studio product photography using Imagen 3.0
- **Recipe Creation**: Detailed ingredient lists with quantities and pricing
- **Image Analysis**: Upload inspiration photos to extract design elements
- **Cost Estimation**: Real-time wholesale pricing calculations (AUD)

### 💎 User Experience
- **Expandable Interface**: Compact initial state, expands on demand
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion transitions throughout
- **Download Images**: Save generated bouquets as JPG files
- **Brand Integration**: Seamless Violet Hues aesthetic

## Setup Instructions

### 1. Get Your Google Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to "Get API Key"
4. Create a new API key
5. Copy the API key (starts with `AI...`)

### 2. Configure Environment Variables

1. Open the `.env.local` file in the project root:
   ```bash
   # The file already exists with a placeholder
   ```

2. Add your API key:
   ```env
   NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=AIza...YourActualKeyHere
   ```

3. Save the file

**Important**: Never commit your `.env.local` file to git. It's already in `.gitignore`.

### 3. Install Dependencies

```bash
npm install
```

This will install:
- `@google/generative-ai` - Google's Generative AI SDK
- All existing dependencies (Next.js, Framer Motion, etc.)

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and navigate to the AI Atelier section (right after the hero).

### 5. Test the AI Features

1. **Quick Test**: Click "Create Your Bouquet" to generate with default settings
2. **Custom Design**: Expand the interface and customize flowers, colors, etc.
3. **Surprise Me**: Click the dice button for random generation
4. **Upload Test**: Try uploading a bouquet photo to test image analysis

## Architecture

### File Structure

```
VioletHues/
├── lib/
│   ├── constants.ts           # Flower types, palettes, styles
│   └── geminiService.ts       # AI integration service
├── components/
│   └── sections/
│       └── AIAtelier.tsx      # Main component
├── .env.local.example         # Example configuration
└── .env.local                 # Your API key (git-ignored)
```

### Key Components

#### `constants.ts`
Defines all configuration options:
- `FLOWER_OPTIONS`: Available flower types
- `COLOR_PALETTES`: Predefined color schemes
- `ARRANGEMENT_STYLES`: Bouquet styles
- `SIZES` & `BOUQUET_SHAPES`: Size and shape options
- `PRESET_BOUQUETS`: Quick-start configurations

#### `geminiService.ts`
Handles all AI operations:
- `generateBouquetImage()`: Creates realistic bouquet images
- `generateBouquetRecipe()`: Generates ingredient list with pricing
- `analyzeBouquetImage()`: Extracts design elements from uploaded photos

#### `AIAtelier.tsx`
Main UI component:
- Expandable interface design
- State management for configuration
- Loading states and error handling
- Image display and recipe presentation

## API Usage & Costs

### Google Gemini Pricing (as of 2025)

**Imagen 3.0 (Image Generation)**:
- Free tier: 50 requests/day
- Paid tier: $0.04 per image

**Gemini 1.5 Flash (Text/Analysis)**:
- Free tier: 1,500 requests/day
- Paid tier: Very low cost per request

### Rate Limiting

The free tier is sufficient for development and testing. For production:
- Consider implementing request caching
- Add user rate limiting
- Monitor usage via Google Cloud Console

## Customization

### Adding New Flowers

Edit `lib/constants.ts`:

```typescript
export const FLOWER_OPTIONS = [
  { id: 'lavender', name: 'Lavender' },
  // Add your flower here
];
```

### Adding New Color Palettes

```typescript
export const COLOR_PALETTES = [
  {
    id: 'custom_palette',
    name: 'My Custom Palette',
    description: 'a beautiful custom color scheme',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
  },
];
```

### Modifying the UI

The component uses Tailwind CSS with the Violet Hues theme:
- Primary colors: `violet-*` (50-900)
- Accent colors: `pink-*`, `purple-*`
- Glass effects: `glass` utility class

## Troubleshooting

### "API key is not configured" Error

**Solution**: Ensure `.env.local` exists with the correct key:
```env
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=AIza...
```

Restart the dev server after adding the key.

### Image Generation Fails

**Possible causes**:
1. Invalid API key
2. Rate limit exceeded (check console)
3. Network issues

**Solution**: Check browser console for detailed error messages.

### Build Errors

**TypeScript errors**: Run `npm run build` to see all errors
**Missing dependencies**: Run `npm install` to ensure all packages are installed

### Image Not Displaying

**Cause**: The Gemini API returns images in base64 format
**Solution**: Ensure `generatedImageUrl` state is properly set

## Production Considerations

### Security
- ✅ API key is stored in environment variables
- ✅ `.env.local` is git-ignored
- ⚠️ Consider backend proxy for production to hide API key
- ⚠️ Implement user authentication for extended use

### Performance
- ✅ Images are lazy-loaded
- ✅ Component uses React optimization hooks
- 💡 Consider implementing image caching
- 💡 Add loading skeletons for better UX

### Scaling
- Add request queuing for multiple users
- Implement caching layer (Redis/CDN)
- Consider serverless functions for API calls
- Monitor usage with Google Cloud Console

## Support

### Documentation
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Issues
If you encounter problems:
1. Check the browser console for errors
2. Verify API key is correct
3. Test with default configuration first
4. Review the service logs in `lib/geminiService.ts`

## Future Enhancements

Potential features to add:
- [ ] Save favorite designs to localStorage
- [ ] Share designs via URL
- [ ] Export to PDF
- [ ] Email quotes
- [ ] Admin panel for managing inventory
- [ ] Integration with e-commerce platform
- [ ] Multi-language support
- [ ] A/B testing different styles

---

Built with 💜 for Violet Hues
