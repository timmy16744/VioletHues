import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  FLOWER_OPTIONS,
  COLOR_PALETTES,
  ARRANGEMENT_STYLES,
  BOUQUET_SHAPES,
  type BouquetConfig,
  type RecipeItem,
} from './constants';

const getGenAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Google Gemini API key is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateBouquetImage = async (config: BouquetConfig): Promise<string> => {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

  const {
    flowers,
    customFlowers,
    colorPalette,
    customColorPalette,
    customColors,
    arrangementStyle,
    customArrangementStyle,
    negativePrompt,
    size,
    shape,
    customShape,
    extras,
  } = config;

  const styleDescription =
    arrangementStyle === 'custom'
      ? customArrangementStyle
      : ARRANGEMENT_STYLES.find((s) => s.id === arrangementStyle)?.description || 'beautiful';

  const flowerListFromIds = flowers
    .map((fId) => FLOWER_OPTIONS.find((f) => f.id === fId)?.name)
    .filter(Boolean)
    .join(', ');
  const allFlowers = [flowerListFromIds, customFlowers].filter(Boolean).join(', ');

  let paletteDescription;
  if (colorPalette === 'custom') {
    const textPart = customColorPalette || 'a beautiful custom color scheme';
    const colorPart =
      customColors && customColors.length > 0
        ? `. The palette must specifically include these colors: ${customColors.join(', ')}.`
        : '';
    paletteDescription = `${textPart}${colorPart}`;
  } else {
    paletteDescription =
      COLOR_PALETTES.find((p) => p.id === colorPalette)?.description || 'colorful';
  }

  const bouquetShape = shape === 'custom' ? customShape : shape;

  const subjectParts = [
    `- Arrangement Style: ${styleDescription}.`,
    `- Shape: A ${size.toLowerCase()} ${bouquetShape} bouquet.`,
    `- Featured Flowers: A beautiful, harmonious combination of ${allFlowers}.`,
    `- Color Palette: The bouquet strictly adheres to a ${paletteDescription}.`,
  ];

  if (extras) {
    subjectParts.push(`- Embellishments: It is tastefully adorned with ${extras}.`);
  }

  const prompt = `Create an ultra-realistic, chic, and elegant studio product photograph of a florist's bouquet.

The bouquet subject:
${subjectParts.join('\n')}

The composition and style (These rules are critical for a consistent look):
- Background: A seamless, flat, neutral, light gray studio background (#E6E6E6).
- Framing: The bouquet is perfectly centered in the frame.
- Lighting: Lit with a large, diffuse softbox from the front-right to create soft, flattering light and gentle shadows. There is a subtle fill light to soften contrast. No harsh lighting, no dramatic shadows, no lens flares.
- Shadow: A soft, natural contact shadow is visible directly beneath the bouquet/vase.
- Camera: Shot with a 50mm prime lens at f/8 on a full-frame camera for a clean look with moderate depth of field. The camera angle is level with the middle of the bouquet.
- Style: The final image must look like a high-end, minimalist product photo. It should be clean, sharp, and aesthetically pleasing. The contrast and saturation are neutral and true to life.

Constraints (What to avoid):
- Absolutely no people, hands, text, logos, or distracting elements.
- The background must be completely plain and uniform.
- Avoid any "artistic" effects like vignettes, heavy grain, or dramatic color grading. The look is clean and commercial. ${negativePrompt ? `Also avoid: ${negativePrompt}` : ''}`;

  const result = await model.generateContent(prompt);
  const response = result.response;

  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('No image generated');
  }

  const parts = response.candidates[0].content.parts;
  const imageParts = parts.filter((part: any) => part.inlineData);

  if (imageParts && imageParts.length > 0) {
    const imageData = imageParts[0].inlineData;
    if (imageData && imageData.mimeType && imageData.data) {
      return `data:${imageData.mimeType};base64,${imageData.data}`;
    }
  }

  throw new Error('Image generation failed');
};

export const generateBouquetRecipe = async (
  config: BouquetConfig,
  imageUrl: string
): Promise<RecipeItem[]> => {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const { flowers, customFlowers, size } = config;
  const flowerListFromIds = flowers
    .map((fId) => FLOWER_OPTIONS.find((f) => f.id === fId)?.name)
    .filter(Boolean)
    .join(', ');
  const allFlowers = [flowerListFromIds, customFlowers].filter(Boolean).join(', ');

  if (!allFlowers) {
    return [];
  }

  const base64Data = imageUrl.split(',')[1];
  if (!base64Data) {
    throw new Error('Invalid image URL provided for recipe generation');
  }

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Data,
    },
  };

  const prompt = `You are a professional florist creating a recipe for the bouquet in the provided image. The original request was for a ${size.toLowerCase()} bouquet featuring these specific flowers: ${allFlowers}.

Your task is to create a detailed and accurate recipe to replicate the bouquet shown in the image.
- First, analyze the image to identify all visible flowers and foliage, including any fillers.
- Your recipe **must include every flower** from the original request list (${allFlowers}).
- Based on the image and the requested size, determine a realistic stem quantity for each item in the recipe.
- For each item, provide an estimated current wholesale price per stem in AUD (e.g., '$2.50').
The final recipe should be a plausible list of ingredients to create this exact bouquet. Return ONLY a JSON object with a "recipe" array, without any markdown formatting.`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [imagePart, { text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const response = result.response;
  const text = response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed.recipe || [];
  } catch (error) {
    console.error('Failed to parse recipe JSON:', error, 'Raw response:', text);
    throw new Error('Could not generate bouquet recipe');
  }
};

export const analyzeBouquetImage = async (
  file: File
): Promise<Partial<BouquetConfig>> => {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

  const availableFlowers = FLOWER_OPTIONS.map((f) => f.name).join(', ');
  const availablePalettes = COLOR_PALETTES.map((p) => p.name).join(', ');
  const availableStyles = ARRANGEMENT_STYLES.map((s) => s.name).join(', ');
  const availableShapes = BOUQUET_SHAPES.join(', ');

  const prompt = `Analyze this image of a flower bouquet. Identify the main flower types (choose from the provided list), the overall color palette (choose from list), and the arrangement style and shape (choose from lists). Return this information as a JSON object with "flowers" (array of names), "colorPalette" (single name), "arrangementStyle" (single name), and "shape" (single name) properties.

Available flowers: [${availableFlowers}]
Available palettes: [${availablePalettes}]
Available styles: [${availableStyles}]
Available shapes: [${availableShapes}]`;

  const imagePart = {
    inlineData: {
      mimeType: file.type,
      data: base64Data,
    },
  };

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [imagePart, { text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const response = result.response;
  const text = response.text();

  try {
    const analysis = JSON.parse(text);

    const flowerIds = analysis.flowers
      ?.map((name: string) =>
        FLOWER_OPTIONS.find((f) => f.name.toLowerCase() === name.toLowerCase())?.id
      )
      .filter(Boolean);

    const colorPaletteId = COLOR_PALETTES.find(
      (p) => p.name.toLowerCase() === analysis.colorPalette?.toLowerCase()
    )?.id;

    const arrangementStyleId = ARRANGEMENT_STYLES.find(
      (s) => s.name.toLowerCase() === analysis.arrangementStyle?.toLowerCase()
    )?.id;

    const bouquetShape = BOUQUET_SHAPES.find(
      (s) => s.toLowerCase() === analysis.shape?.toLowerCase()
    );

    const config: Partial<BouquetConfig> = {};
    if (flowerIds && flowerIds.length > 0) config.flowers = flowerIds;
    if (colorPaletteId) config.colorPalette = colorPaletteId;
    if (arrangementStyleId) config.arrangementStyle = arrangementStyleId;
    if (bouquetShape) config.shape = bouquetShape;

    return config;
  } catch (error) {
    console.error('Failed to parse image analysis JSON:', error);
    throw new Error('Could not analyze image');
  }
};
