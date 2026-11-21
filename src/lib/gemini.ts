import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResearchReport } from '../types';

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function runGeminiAnalysis(
  productName: string,
  brand: string,
  category: string,
  url?: string
): Promise<Partial<ResearchReport>> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are a senior D2C Market Intelligence & E-commerce Strategy Director specializing in Indian beauty and skincare (brands like Dot & Key, Minimalist, The Derma Co, Aqualogica, Plum, Foxtale).

Analyze this product:
- Product Name: ${productName}
- Brand: ${brand}
- Category: ${category}
- Product URL: ${url || 'N/A'}

TASK FOR REAL PRICING EXTRACTION:
1. Extract or determine the exact real MRP retail price in Indian Rupees (INR) for this product from the given URL or official catalog. 
2. Determine real total prices for 3 top competitors on Amazon India / Nykaa (e.g. Minimalist SPF 50 MRP is ₹399, Derma Co 1% HA SPF is ₹499, Aqualogica is ₹449).

Respond with ONLY valid JSON (no markdown formatting, no code fences, just raw JSON) following this structure:
{
  "productPrice": 495,
  "productSize": "50g",
  "productDescription": "string (detailed 2-3 sentence product overview)",
  "keyBenefits": ["benefit 1", "benefit 2", "benefit 3", "benefit 4"],
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"],
  "competitors": [
    {
      "name": "string (Product name)",
      "brand": "string (Brand name)",
      "price": 399,
      "rating": 4.4,
      "reviewCount": 41200,
      "threatLevel": "High",
      "pricePerUnit": "50g Pack",
      "weakness": "string (specific customer complaint, e.g. pilling, white cast)",
      "strength": "string (their competitive moat)"
    }
  ],
  "topPraises": ["praise 1", "praise 2", "praise 3", "praise 4"],
  "topComplaints": ["competitor complaint 1", "competitor complaint 2", "competitor complaint 3"],
  "swotStrengths": ["strength 1", "strength 2", "strength 3"],
  "swotWeaknesses": ["weakness 1", "weakness 2"],
  "swotOpportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
  "swotThreats": ["threat 1", "threat 2"],
  "marketGaps": [
    "gap 1 with opportunity percentage",
    "gap 2 with opportunity percentage"
  ],
  "adHeadline": "string (punchy, high-converting ad headline with emoji)",
  "adSubheadline": "string (value proposition addressing competitor flaw)",
  "instagramCaption": "string (engaging IG caption with emojis)",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"],
  "ugcHook": "string (0-3s video hook calling out competitor problem)",
  "videoScenes": [
    {
      "scene": 1,
      "timeCode": "00:00 - 00:03",
      "voiceOver": "string",
      "visual": "string",
      "audio": "string"
    },
    {
      "scene": 2,
      "timeCode": "00:04 - 00:10",
      "voiceOver": "string",
      "visual": "string",
      "audio": "string"
    },
    {
      "scene": 3,
      "timeCode": "00:11 - 00:19",
      "voiceOver": "string",
      "visual": "string",
      "audio": "string"
    },
    {
      "scene": 4,
      "timeCode": "00:20 - 00:25",
      "voiceOver": "string",
      "visual": "string",
      "audio": "string"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean response in case markdown formatting is included
    const cleanJson = responseText
      .replace(/```json/gi, '')
      .replace(/```/gi, '')
      .trim();

    const parsed = JSON.parse(cleanJson);
    return parsed;
  } catch (error) {
    console.warn('Gemini API call returned error or quota limit, using intelligent fallback:', error);
    return null as any;
  }
}

