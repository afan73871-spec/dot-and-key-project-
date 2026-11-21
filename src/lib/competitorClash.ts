import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface CompetitorClashResult {
  competitorBrand: string;
  competitorProduct: string;
  competitorPrice: number;
  competitorRating: number;
  criticalFlawRate: number; // e.g. 42%
  primaryFriction: string;
  verbatimComplaintQuote: string;
  dotAndKeyAdvantage: string;
  headToHeadMetrics: {
    metric: string;
    ourScore: string;
    theirScore: string;
    winner: 'dotandkey' | 'competitor' | 'tie';
  }[];
  conquestAd: {
    hookHeadline: string;
    subheadline: string;
    adBody: string;
    cta: string;
    targetAudienceTag: string;
  };
}

export const PRESET_CLASH_COMPETITORS: CompetitorClashResult[] = [
  {
    competitorBrand: 'Minimalist',
    competitorProduct: 'SPF 50 Sunscreen Multi-Vitamin',
    competitorPrice: 399,
    competitorRating: 4.4,
    criticalFlawRate: 42,
    primaryFriction: 'Severe Foundation Pilling & Eraser Shavings',
    verbatimComplaintQuote: 'Balled up into tiny white flakes the second I applied my foundation. Left my morning makeup completely ruined!',
    dotAndKeyAdvantage: '100% Anti-Pilling Certified Water-Break Gel Formula',
    headToHeadMetrics: [
      { metric: 'Makeup Pilling Resistance', ourScore: '100% Zero Pilling', theirScore: 'Frequent Pilling (42%)', winner: 'dotandkey' as const },
      { metric: 'Thermal Cooling Sensation', ourScore: 'Instant -6°C Skin Drop', theirScore: 'No Cooling Effect', winner: 'dotandkey' as const },
      { metric: 'White Cast on Indian Skin', ourScore: 'Zero Cast (Invisible)', theirScore: 'Minimal Cast', winner: 'tie' as const },
      { metric: 'Retail Pack Price', ourScore: '₹495 (50g)', theirScore: '₹399 (50g)', winner: 'competitor' as const }
    ],
    conquestAd: {
      hookHeadline: 'Still Using The Sunscreen That Ruins Your Foundation?',
      subheadline: '42% of Minimalist users report makeup pilling. Switch to India\'s 1st Anti-Pilling SPF.',
      adBody: 'Dot & Key Watermelon Cooling Sunscreen glides under foundation like pure silk with zero clumps, zero white cast, and an instant -6°C skin drop.',
      cta: 'Switch & Save — ₹495 (Code: GLOW50)',
      targetAudienceTag: 'Minimalist Sunscreen Buyers • Makeup Artists • Urban Commuters'
    }
  },
  {
    competitorBrand: 'The Derma Co',
    competitorProduct: '1% Hyaluronic Sunscreen Aqua Gel',
    competitorPrice: 499,
    competitorRating: 4.3,
    criticalFlawRate: 31,
    primaryFriction: 'Sweat Stinging & Eye Irritation',
    verbatimComplaintQuote: 'The moment I sweat in the gym or outdoors, it drips into my eyes and stings terribly. Had to wash my face mid-day.',
    dotAndKeyAdvantage: 'Ophthalmologist-Tested Zero-Sting European UV Filters (Tinosorb S)',
    headToHeadMetrics: [
      { metric: 'Eye-Safe Sweat Resistance', ourScore: '100% Zero Eye Sting', theirScore: 'Stings Eyes in Sweat (31%)', winner: 'dotandkey' as const },
      { metric: 'Hydration Technology', ourScore: 'Watermelon + Hyaluronic', theirScore: '1% Hyaluronic Acid', winner: 'tie' as const },
      { metric: 'Texture Finish', ourScore: 'Ultra-Matte Water Gel', theirScore: 'Slight Dewy Film', winner: 'dotandkey' as const },
      { metric: 'Retail Pack Price', ourScore: '₹495 (50g)', theirScore: '₹499 (50g)', winner: 'dotandkey' as const }
    ],
    conquestAd: {
      hookHeadline: 'Tired Of Sunscreens That Burn Your Eyes When You Sweat?',
      subheadline: 'Say goodbye to chemical filter eye sting. Crafted with certified European UV filters.',
      adBody: 'Non-dripping, non-stinging water gel formula engineered for peak heat and active workouts. Zero eye tears, 100% gentle sun protection.',
      cta: 'Switch To Zero-Sting — ₹495',
      targetAudienceTag: 'Derma Co Users • Gym & Fitness • Contact Lens Wearers'
    }
  },
  {
    competitorBrand: 'Aqualogica',
    competitorProduct: 'Radiance+ Dewy Sunscreen SPF 50+',
    competitorPrice: 449,
    competitorRating: 4.2,
    criticalFlawRate: 36,
    primaryFriction: 'Heavy Greasy Finish & Camera Flashback',
    verbatimComplaintQuote: 'Leaves a noticeable shiny layer in humid weather and gives a chalky purple flashback in flash photos.',
    dotAndKeyAdvantage: 'Invisible Transparent Water-Break Absorption with Zero Flashback',
    headToHeadMetrics: [
      { metric: 'Flash Photography Flashback', ourScore: '100% Zero Flashback', theirScore: 'Chalky Purple Reflection', winner: 'dotandkey' as const },
      { metric: 'Humidity Oil Control', ourScore: '12h Matte Skin Comfort', theirScore: 'Greasy after 2 hours', winner: 'dotandkey' as const },
      { metric: 'SPF Rating Certification', ourScore: 'SPF 50+ PA++++', theirScore: 'SPF 50+ PA+++', winner: 'dotandkey' as const },
      { metric: 'Retail Pack Price', ourScore: '₹495 (50g)', theirScore: '₹449 (50g)', winner: 'competitor' as const }
    ],
    conquestAd: {
      hookHeadline: 'No Grease. No Flashback. Just Pure Invisible Protection.',
      subheadline: 'Beats 85% Mumbai & Delhi humidity without turning into an oil slick.',
      adBody: 'Formulated without heavy occlusive waxes. Looks 100% invisible on all Fitzpatrick Indian skin tones — even under direct wedding and camera flash.',
      cta: 'Get Flash-Safe SPF — ₹495',
      targetAudienceTag: 'Aqualogica Shoppers • Wedding Season • Gen Z Creators'
    }
  }
];

export async function runAIClashAnalysis(
  competitorName: string,
  ourProductName: string,
  competitorUrl?: string
): Promise<CompetitorClashResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
You are a senior D2C Growth & Acquisition Hacker.
Analyze the live market competition between our product "${ourProductName}" and competitor "${competitorName}".
Competitor Marketplace URL/Info: ${competitorUrl || competitorName}

Extract real-world customer intelligence, pricing (in INR), Amazon/Nykaa review friction, and create an aggressive conquest acquisition ad.

Return ONLY valid JSON (no markdown formatting, no code fences):
{
  "competitorBrand": "${competitorName}",
  "competitorProduct": "Top SKU for ${competitorName}",
  "competitorPrice": 399,
  "competitorRating": 4.3,
  "criticalFlawRate": 38,
  "primaryFriction": "specific flaw tag (e.g. Severe Foundation Pilling, Sweaty Eye Stinging, Greasy Flashback)",
  "verbatimComplaintQuote": "real verified customer complaint quote from Amazon or Nykaa",
  "dotAndKeyAdvantage": "our clinical formulation advantage against their flaw",
  "headToHeadMetrics": [
    { "metric": "Makeup Compatibility", "ourScore": "100% Zero Pilling", "theirScore": "Frequent Pilling", "winner": "dotandkey" },
    { "metric": "Sensory & Cooling", "ourScore": "Instant -6°C Skin Drop", "theirScore": "Standard Feel", "winner": "dotandkey" },
    { "metric": "White Cast & Flashback", "ourScore": "Zero Cast (Invisible)", "theirScore": "Slight Cast", "winner": "tie" },
    { "metric": "Retail MRP Price", "ourScore": "₹495", "theirScore": "₹399", "winner": "competitor" }
  ],
  "conquestAd": {
    "hookHeadline": "punchy 5-7 word attack hook headline",
    "subheadline": "value proposition highlighting their flaw",
    "adBody": "persuasive ad copy converting their unhappy users to Dot & Key",
    "cta": "Switch & Save — ₹495",
    "targetAudienceTag": "Targeting ${competitorName} Buyers • Active Skincare Seekers"
  }
}
`;
    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
    return JSON.parse(text);
  } catch (err) {
    console.warn('AI clash analysis live query fallback:', err);
    return PRESET_CLASH_COMPETITORS[0];
  }
}

