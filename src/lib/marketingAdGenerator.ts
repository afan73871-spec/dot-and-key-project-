import { GoogleGenerativeAI } from '@google/generative-ai';

const OPENAI_API_KEY = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export interface GeneratedAdImageResult {
  imageUrl: string;
  source: 'openai-gpt-image' | 'real-commercial-composite';
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Attempts real AI image generation using the provided OpenAI API key first,
 * and falls back seamlessly to high-resolution photo compositing if OpenAI credits are exhausted.
 */
export async function generateMarketingStudioAdImage(
  productName: string,
  headline: string,
  subheadline: string,
  cta: string,
  aspectRatio: '1:1' | '9:16' = '1:1'
): Promise<GeneratedAdImageResult> {
  // 1. Try OpenAI Image API with the user provided key
  try {
    const prompt = `Commercial professional beauty product advertisement photography for Dot & Key ${productName}, luxury cosmetics jar with fresh water droplets on reflective studio surface, clean elegant aesthetic, soft studio lighting, 8k resolution`;
    
    // Test OpenAI endpoint
    const openAiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-image-1-mini',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    const openAiData = await openAiResponse.json();
    if (openAiData.data && openAiData.data[0]?.url) {
      return {
        imageUrl: openAiData.data[0].url,
        source: 'openai-gpt-image',
        headline,
        subheadline,
        cta
      };
    } else {
      console.warn('OpenAI API returned credit limit or notice:', openAiData?.error?.message || openAiData);
    }
  } catch (err) {
    console.warn('OpenAI request error, switching to High-Res Studio Composite:', err);
  }

  // 2. High-Resolution 1080x1080 Real Commercial Product Photography Composite
  const compositeUrl = await renderMarketingAdComposite(
    productName,
    headline,
    subheadline,
    cta,
    aspectRatio
  );

  return {
    imageUrl: compositeUrl,
    source: 'real-commercial-composite',
    headline,
    subheadline,
    cta
  };
}

function renderMarketingAdComposite(
  productName: string,
  headline: string,
  subheadline: string,
  cta: string,
  aspectRatio: '1:1' | '9:16'
): Promise<string> {
  return new Promise((resolve) => {
    const width = 1080;
    const height = aspectRatio === '9:16' ? 1920 : 1080;
    const basePhoto = '/campaign_oily.jpg';

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(basePhoto);
        return;
      }

      // Draw real product photography
      ctx.drawImage(img, 0, 0, width, height);

      // Studio Vignettes
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.35);
      topGrad.addColorStop(0, 'rgba(15, 23, 42, 0.94)');
      topGrad.addColorStop(0.6, 'rgba(15, 23, 42, 0.6)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height * 0.35);

      const bottomGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      bottomGrad.addColorStop(0, 'transparent');
      bottomGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.7)');
      bottomGrad.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Brand Header
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 32px "Sora", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('DOT & KEY', width / 2, 75);

      ctx.fillStyle = '#2DD4BF';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.letterSpacing = '5px';
      ctx.fillText('CLINICAL BOTANICAL INTELLIGENCE', width / 2, 115);

      // Promo Pill
      renderBadge(ctx, width / 2, 160, 'BUY 1 GET 1 FREE • CODE: GLOW50', '#EF4444');

      // Headline (Multi-line wrap support so long text never overflows or overlaps)
      const cleanHeadline = headline.replace(/🍉|🌿|❄️|🍊/g, '').trim();
      const headlineFontSize = cleanHeadline.length > 32 ? 36 : 44;
      ctx.font = `900 ${headlineFontSize}px "Sora", serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '-0.5px';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 18;

      const headlineY = height - (aspectRatio === '9:16' ? 360 : 250);
      wrapAndCenterText(ctx, cleanHeadline, width / 2, headlineY, width - 140, headlineFontSize * 1.25);
      ctx.shadowBlur = 0;

      // Subheadline (Multi-line wrap support)
      ctx.font = '500 20px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.letterSpacing = '0px';
      const subY = height - (aspectRatio === '9:16' ? 240 : 155);
      wrapAndCenterText(ctx, subheadline, width / 2, subY, width - 160, 28);

      // CTA Button
      ctx.font = 'bold 18px "Sora", sans-serif';
      ctx.letterSpacing = '0.5px';
      const ctaW = Math.max(260, ctx.measureText(cta).width + 64);
      const ctaH = 50;
      const ctaY = height - (aspectRatio === '9:16' ? 120 : 75);

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(45, 212, 191, 0.45)';
      ctx.shadowBlur = 16;
      roundRect(ctx, width / 2 - ctaW / 2, ctaY - ctaH / 2, ctaW, ctaH, 25);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#0F172A';
      ctx.fillText(cta, width / 2, ctaY);

      try {
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      } catch (e) {
        resolve(basePhoto);
      }
    };
    img.onerror = () => resolve(basePhoto);
    img.src = basePhoto;
  });
}

function renderBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  accentColor: string
) {
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const width = ctx.measureText(text).width + 36;
  const height = 32;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  roundRect(ctx, x - width / 2, y - height / 2, width, height, height / 2);
  ctx.fill();

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
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

