import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const colorDescriptions: Record<string, string> = {
  "purple-violet": "deep purple, violet, lavender, and plum colored",
  "pastels": "soft pastel pink, baby blue, light lavender, and cream colored",
  "bold-bright": "vibrant red, orange, hot pink, and yellow colored",
  "white-green": "pure white, cream, and lush green foliage",
  "warm-tones": "warm peach, coral, terracotta, and golden yellow",
};

const vibeDescriptions: Record<string, string> = {
  romantic: "romantic and dreamy with soft textures and flowing shapes",
  modern: "modern and minimalist with clean lines and architectural elements",
  rustic: "rustic and natural with wildflowers and organic textures",
  elegant: "elegant and sophisticated with classic roses and refined details",
  whimsical: "whimsical and playful with unexpected combinations and fun elements",
};

const occasionDescriptions: Record<string, string> = {
  birthday: "a birthday celebration, joyful and celebratory",
  anniversary: "an anniversary, expressing enduring love",
  wedding: "a wedding ceremony, beautiful and memorable",
  sympathy: "expressing sympathy, gentle and comforting",
  "just-because": "a thoughtful everyday gift, bringing joy",
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured. Please add GOOGLE_AI_API_KEY to your environment." },
        { status: 500 }
      );
    }

    const { budget, vibe, colors, occasion } = await request.json();

    // Build the prompt
    const colorDesc = colorDescriptions[colors] || "colorful";
    const vibeDesc = vibeDescriptions[vibe] || "beautiful";
    const occasionDesc = occasionDescriptions[occasion] || "a special occasion";

    const prompt = `Create a stunning professional photograph of a floral bouquet arrangement. The bouquet should be:

- ${colorDesc} flowers
- ${vibeDesc} style
- Perfect for ${occasionDesc}
- Price range around $${budget}
- Shot with professional florist photography lighting
- Clean white or soft neutral background
- High-end floral shop quality
- Wrapped beautifully in complementary paper or placed in an elegant vase
- Sharp focus with artistic shallow depth of field
- Natural, fresh-looking flowers with visible texture and detail

The arrangement should look like something from a premium local florist, handcrafted with care and attention to detail.`;

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use Gemini 2.0 Flash for image generation
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        // @ts-expect-error - responseModalities is valid but not in types yet
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Find the image part in the response
    let imageData: string | null = null;

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          imageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
      if (imageData) break;
    }

    if (!imageData) {
      // Fallback: Try with the newer model name
      const model2 = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-preview-image-generation",
        generationConfig: {
          // @ts-expect-error - responseModalities is valid but not in types yet
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      const result2 = await model2.generateContent(prompt);
      const response2 = await result2.response;

      for (const candidate of response2.candidates || []) {
        for (const part of candidate.content?.parts || []) {
          if (part.inlineData?.mimeType?.startsWith("image/")) {
            imageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
        if (imageData) break;
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: "Could not generate image. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: imageData });
  } catch (error) {
    console.error("Bouquet generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate bouquet" },
      { status: 500 }
    );
  }
}
