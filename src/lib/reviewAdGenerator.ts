import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ReviewAdCompositeResult {
  reviewQuote: string;
  author: string;
  source: string;
  extractedPain: string;
  counterHook: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  adImageDataUrl: string;
  skinTypeTarget: 'Oily Skin' | 'Dry Skin' | 'Combination Skin';
}

/**
 * Transforms an actual customer review directly into a high-impact advertising image
 */
export async function convertCustomerReviewToAdImage(
  reviewText: string,
  author: string,
  source: string,
  productTarget: string = 'Dot & Key Watermelon Sunscreen SPF 50+'
): Promise<ReviewAdCompositeResult> {
  let headline = 'No More Foundation Pilling';
  let counterHook = 'Your SPF Should Not Ruin Your Makeup.';
  let subheadline = 'Clinically certified anti-pilling water-break gel.';
  let ctaText = 'Fix Your Base — ₹495';
  let extractedPain = 'Makeup Pilling & Flaking';
  let skinTypeTarget: 'Oily Skin' | 'Dry Skin' | 'Combination Skin' = 'Combination Skin';
  let basePhoto = '/campaign_oily.jpg';

  // 1. Analyze the review with Gemini 2.5 Flash to extract pain and generate punchy counter-ad copy
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
You are a senior beauty growth marketer for Dot & Key.
Analyze this REAL customer review:
"${reviewText}"

Determine:
1. The exact customer pain/love point (e.g. "Pilling Under Foundation", "Greasy in Mumbai Humidity", "Dry Winter Tightness")
2. Which Indian skin type this review belongs to ("Oily Skin", "Dry Skin", or "Combination Skin")
3. A punchy 4-7 word advertising headline that directly addresses and solves this review quote for "${productTarget}".
4. A bold 1-sentence hook calling out the review.
5. A subheadline emphasizing Dot & Key's solution.
6. A CTA text with price ₹495.

Return ONLY valid JSON (no markdown):
{
  "extractedPain": "short flaw tag",
  "skinTypeTarget": "Oily Skin",
  "headline": "headline here",
  "counterHook": "hook here",
  "subheadline": "subheadline here",
  "ctaText": "cta here"
}
`;
    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
    const parsed = JSON.parse(text);
    if (parsed.headline) headline = parsed.headline;
    if (parsed.counterHook) counterHook = parsed.counterHook;
    if (parsed.subheadline) subheadline = parsed.subheadline;
    if (parsed.ctaText) ctaText = parsed.ctaText;
    if (parsed.extractedPain) extractedPain = parsed.extractedPain;
    if (parsed.skinTypeTarget) skinTypeTarget = parsed.skinTypeTarget;
  } catch (err) {
    console.warn('Gemini review analysis fallback:', err);
  }

  // Select matching commercial product photograph
  if (skinTypeTarget === 'Oily Skin' || reviewText.toLowerCase().includes('greas') || reviewText.toLowerCase().includes('humid')) {
    basePhoto = '/campaign_oily.jpg';
    skinTypeTarget = 'Oily Skin';
  } else if (skinTypeTarget === 'Dry Skin' || reviewText.toLowerCase().includes('dry') || reviewText.toLowerCase().includes('tight')) {
    basePhoto = '/campaign_dry.jpg';
    skinTypeTarget = 'Dry Skin';
  } else {
    basePhoto = '/campaign_combination.jpg';
    skinTypeTarget = 'Combination Skin';
  }

  // 2. Composite the review quote directly onto the real commercial product photography
  const adImageDataUrl = await renderReviewAdCanvas(
    basePhoto,
    reviewText,
    author,
    source,
    headline,
    subheadline,
    counterHook,
    ctaText,
    extractedPain
  );

  return {
    reviewQuote: reviewText,
    author,
    source,
    extractedPain,
    counterHook,
    headline,
    subheadline,
    ctaText,
    adImageDataUrl,
    skinTypeTarget
  };
}

function renderReviewAdCanvas(
  basePhotoUrl: string,
  reviewText: string,
  author: string,
  source: string,
  headline: string,
  subheadline: string,
  counterHook: string,
  ctaText: string,
  extractedPain: string
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(basePhotoUrl);
        return;
      }

      // Draw real commercial beauty product photograph
      ctx.drawImage(img, 0, 0, 1080, 1080);

      // Dark luxurious studio gradient vignette
      const topGrad = ctx.createLinearGradient(0, 0, 0, 480);
      topGrad.addColorStop(0, 'rgba(15, 23, 42, 0.94)');
      topGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.82)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, 1080, 480);

      const bottomGrad = ctx.createLinearGradient(0, 680, 0, 1080);
      bottomGrad.addColorStop(0, 'transparent');
      bottomGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.8)');
      bottomGrad.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, 680, 1080, 400);

      // 1. Brand Header
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 28px "Sora", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('DOT & KEY', 540, 65);

      ctx.fillStyle = '#A78BFA';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('DIRECT-FROM-REVIEW MARKETING AD', 540, 95);

      // 2. Real Customer Review Card in Header (The Proof)
      const cardW = 860;
      const cardH = 175;
      const cardX = 540 - cardW / 2;
      const cardY = 120;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      roundRect(ctx, cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Verified Review Badge
      const badgeText = `VERIFIED ${source.toUpperCase()} REVIEW`;
      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.letterSpacing = '1.5px';
      const badgeW = ctx.measureText(badgeText).width + 28;
      const badgeH = 26;
      ctx.fillStyle = '#EF4444';
      roundRect(ctx, cardX + 24, cardY + 16, badgeW, badgeH, 13);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(badgeText, cardX + 24 + badgeW / 2, cardY + 16 + badgeH / 2);

      // Review Quote (cleanly wrapped inside the card)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'italic 600 19px "Inter", sans-serif';
      ctx.letterSpacing = '0px';
      const cleanQuote = reviewText.length > 130 ? `"${reviewText.slice(0, 130)}..."` : `"${reviewText}"`;
      wrapAndCenterText(ctx, cleanQuote, 540, cardY + 80, cardW - 60, 26);

      // Author & Star Rating
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.fillStyle = '#FBBF24';
      ctx.fillText('★★★★★', 490, cardY + 145);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '500 13px "Inter", sans-serif';
      ctx.fillText(`— ${author}`, 590, cardY + 145);

      // 3. Bottom Counter-Attack Ad Headline
      ctx.font = 'bold 14px "Inter", sans-serif';
      ctx.fillStyle = '#2DD4BF';
      ctx.letterSpacing = '2.5px';
      ctx.fillText(counterHook.toUpperCase(), 540, 835);

      const headlineFontSize = headline.length > 30 ? 36 : 44;
      ctx.font = `900 ${headlineFontSize}px "Sora", serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '-0.5px';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 18;
      wrapAndCenterText(ctx, headline, 540, 895, 920, headlineFontSize * 1.25);
      ctx.shadowBlur = 0;

      // Subheadline
      ctx.font = '500 19px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.letterSpacing = '0px';
      wrapAndCenterText(ctx, subheadline, 540, 960, 880, 26);

      // Bottom CTA Button
      ctx.font = 'bold 16px "Sora", sans-serif';
      ctx.letterSpacing = '0.5px';
      const ctaW = Math.max(240, ctx.measureText(ctaText).width + 60);
      const ctaH = 46;
      const ctaY = 1018;

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(167, 139, 250, 0.45)';
      ctx.shadowBlur = 16;
      roundRect(ctx, 540 - ctaW / 2, ctaY - ctaH / 2, ctaW, ctaH, 23);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#0F172A';
      ctx.fillText(ctaText, 540, ctaY);

      try {
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      } catch (err) {
        resolve(basePhotoUrl);
      }
    };
    img.onerror = () => resolve(basePhotoUrl);
    img.src = basePhotoUrl;
  });
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

