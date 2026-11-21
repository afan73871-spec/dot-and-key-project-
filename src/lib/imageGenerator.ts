import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface CampaignCreativeVisual {
  id: string;
  skinType: 'Oily Skin' | 'Dry Skin' | 'Combination Skin';
  personaTitle: string;
  headline: string;
  subheadline: string;
  marketingDescription: string;
  targetAudience: string;
  marketingStrategy: string;
  ctaText: string;
  offerBadge: string;
  formulaPill: string;
  imagePrompt: string;
  realImageBaseUrl: string;
  features: string[];
}

export const CAMPAIGN_BASE_CONFIGS: Record<string, CampaignCreativeVisual> = {
  'Oily Skin': {
    id: 'campaign-oily-skin',
    skinType: 'Oily Skin',
    personaTitle: 'Urban Commuter & Sebum Defense',
    headline: 'Lightweight Hydration. Zero Greasy Feel.',
    subheadline: 'Oil-free water-break gel drops skin temperature by -6°C. Vanishes in 3 seconds.',
    marketingDescription: 'Engineered specifically for Indian high-humidity climates (Mumbai, Chennai, Kolkata). Dissolves instantly into pores without leaving a sticky film or causing mid-day makeup separation.',
    targetAudience: 'Ages 18-28 dealing with excess T-Zone shine, acne-prone skin, and tropical humidity.',
    marketingStrategy: 'Lead with thermal contrast messaging ("Beat 85% Humidity") + instant absorption proof. Position against heavy competitive occlusives.',
    ctaText: 'Claim Matte Glow — ₹495',
    offerBadge: '100% OIL-FREE • NON-COMEDOGENIC',
    formulaPill: 'Ultra-Lightweight Aqua Gel',
    imagePrompt: 'Professional commercial beauty photography of a luxury lightweight aqua gel moisturizer glass jar on a reflective wet surface with fresh crystal clear splashing water droplets, clean teal mint and aqua green aesthetic, high-end cosmetics studio lighting, 8k resolution, crisp focus',
    realImageBaseUrl: '/campaign_oily.jpg',
    features: ['Instant -6°C Skin Cooling Drop', 'Zero Shine & 12h Oil Control', '100% Foundation Anti-Pilling']
  },
  'Dry Skin': {
    id: 'campaign-dry-skin',
    skinType: 'Dry Skin',
    personaTitle: 'Barrier Quench & Cellular Repair',
    headline: 'Deep Hydration for Beautifully Soft Skin.',
    subheadline: '5D Multi-Molecular Hyaluronic Acid + Ceramide Complex for 72-hour moisture lock.',
    marketingDescription: 'Designed for dry and compromised skin barriers battling winter winds and air-conditioned dehydration. Restores cellular moisture without heavy white residue or dull chalky patches.',
    targetAudience: 'Ages 22-38 experiencing flakiness, tightness after face wash, and sensitivity in Delhi NCR, Jaipur, Punjab.',
    marketingStrategy: 'Focus on barrier rehabilitation and clinical lipid replenishment. Use soothing rich sensory imagery to communicate deep nourishing relief.',
    ctaText: 'Restore Deep Hydration — ₹495',
    offerBadge: '72H INTENSE MOISTURE LOCK',
    formulaPill: 'Velvet Ceramide Soufflé',
    imagePrompt: 'Luxury high-end skincare rich hydrating cream jar in warm golden amber lighting, glowing soft radiant skin background, dewy honey and rose floral aesthetics, elegant cosmetic packaging, editorial Vogue beauty shot',
    realImageBaseUrl: '/campaign_dry.jpg',
    features: ['72-Hour Continuous Hydration', 'Multi-Ceramide Barrier Shield', 'Instant Plump & Radiance']
  },
  'Combination Skin': {
    id: 'campaign-combination-skin',
    skinType: 'Combination Skin',
    personaTitle: 'Dual-Zone Balance & Primer Replacement',
    headline: 'Balanced Care. Beautiful Skin.',
    subheadline: 'Smart micro-targeting hydrates dry cheeks while balancing oily T-zones seamlessly.',
    marketingDescription: 'The ultimate holy grail for daily makeup wearers and dual-zone skin. Clinically certified anti-pilling formula doubles as a skin-smoothing makeup primer.',
    targetAudience: 'Ages 20-34 urban professionals wearing daily foundation or BB cream in Bengaluru, Pune, Gurgaon.',
    marketingStrategy: 'Exploit the #1 consumer complaint in competitor reviews: makeup pilling. Position Dot & Key as the only cosmetic-compatible daily moisturizer.',
    ctaText: 'Get Dual-Zone Balance — ₹495',
    offerBadge: 'ANTI-PILLING CERTIFIED BASE',
    formulaPill: 'Hybrid Balancing Emulsion',
    imagePrompt: 'Minimalist modern luxury balancing gel cream skincare bottle on smooth marble pedestal with fresh botanical leaf and gentle water ripple, clean dual-tone aesthetic, contemporary cosmetics commercial photography',
    realImageBaseUrl: '/campaign_combination.jpg',
    features: ['Self-Adjusting Moisture Balance', '100% Anti-Pilling Under Foundation', 'Niacinamide Pore Refinement']
  }
};

export async function generateAIEnhancedCopy(
  skinType: 'Oily Skin' | 'Dry Skin' | 'Combination Skin',
  productName: string
): Promise<Partial<CampaignCreativeVisual>> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
You are a senior beauty performance marketing creative director for Dot & Key skincare.
Generate a tailored advertising campaign copy for ${productName} specifically targeting: "${skinType}".

Return ONLY valid JSON matching this schema:
{
  "headline": "punchy 5-7 word headline",
  "subheadline": "compelling 10-15 word subhead addressing specific pain",
  "marketingStrategy": "2-sentence strategic rationale based on consumer psychology",
  "ctaText": "action-oriented CTA with price"
}
`;
    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
    return JSON.parse(text);
  } catch (err) {
    console.warn('Gemini copy generation fallback:', err);
    return {};
  }
}

/**
 * Composites high-resolution real commercial beauty photograph with crisp luxury advertising typography and graphics
 */
export async function createRealAdComposite(
  skinType: 'Oily Skin' | 'Dry Skin' | 'Combination Skin'
): Promise<string> {
  const cfg = CAMPAIGN_BASE_CONFIGS[skinType];
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(cfg.realImageBaseUrl);
        return;
      }

      // Draw real commercial product photograph covering the canvas
      ctx.drawImage(img, 0, 0, 1080, 1080);

      // Studio Vignette / Lighting Enhancement Gradients
      const topGrad = ctx.createLinearGradient(0, 0, 0, 360);
      topGrad.addColorStop(0, 'rgba(10, 15, 29, 0.92)');
      topGrad.addColorStop(0.5, 'rgba(10, 15, 29, 0.6)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, 1080, 360);

      const bottomGrad = ctx.createLinearGradient(0, 680, 0, 1080);
      bottomGrad.addColorStop(0, 'transparent');
      bottomGrad.addColorStop(0.4, 'rgba(10, 15, 29, 0.7)');
      bottomGrad.addColorStop(1, 'rgba(10, 15, 29, 0.96)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, 680, 1080, 400);

      // Brand Title Header
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 32px "Sora", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('DOT & KEY', 540, 75);

      ctx.fillStyle = skinType === 'Oily Skin' ? '#2DD4BF' : skinType === 'Dry Skin' ? '#FBBF24' : '#C4B5FD';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.letterSpacing = '5px';
      ctx.fillText('CLINICAL BOTANICAL INTELLIGENCE', 540, 115);

      // Offer Pill Badge
      renderPill(ctx, 540, 160, cfg.offerBadge, skinType);

      // Large Campaign Headline Hook (Clean multi-line centered wrap)
      const headlineFontSize = cfg.headline.length > 32 ? 36 : 44;
      ctx.font = `900 ${headlineFontSize}px "Sora", serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '-0.5px';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 18;
      wrapAndCenterText(ctx, cfg.headline, 540, 850, 940, headlineFontSize * 1.25);
      ctx.shadowBlur = 0;

      // Subheadline (Multi-line centered wrap)
      ctx.font = '500 20px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.letterSpacing = '0px';
      wrapAndCenterText(ctx, cfg.subheadline, 540, 935, 920, 28);

      // Bottom CTA Button Bar
      renderCtaButton(ctx, 540, 1015, cfg.ctaText);

      try {
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      } catch (e) {
        resolve(cfg.realImageBaseUrl);
      }
    };
    img.onerror = () => {
      resolve(cfg.realImageBaseUrl);
    };
    img.src = cfg.realImageBaseUrl;
  });
}

function renderPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  skinType: string
) {
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const width = ctx.measureText(text).width + 36;
  const height = 32;
  const color = skinType === 'Oily Skin' ? '#2DD4BF' : skinType === 'Dry Skin' ? '#FBBF24' : '#C4B5FD';

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  roundRect(ctx, x - width / 2, y - height / 2, width, height, height / 2);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function renderCtaButton(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.font = 'bold 18px "Sora", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const width = Math.max(260, ctx.measureText(text).width + 64);
  const height = 50;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, x - width / 2, y - height / 2, width, height, height / 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#0F172A';
  ctx.fillText(text, x, y);
}

function wrapAndCenterText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + ' ' + word;
    if (ctx.measureText(testLine).width < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight);
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

