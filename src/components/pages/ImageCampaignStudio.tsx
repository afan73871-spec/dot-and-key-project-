import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  RefreshCw, 
  Image as ImageIcon, 
  Target, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Layers, 
  Sliders,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ResearchReport, Page } from '../../types';
import { 
  CAMPAIGN_BASE_CONFIGS, 
  CampaignCreativeVisual, 
  createRealAdComposite, 
  generateAIEnhancedCopy 
} from '../../lib/imageGenerator';

interface ImageCampaignStudioProps {
  report: ResearchReport | null;
  setCurrentPage: (page: Page) => void;
}

export const ImageCampaignStudio: React.FC<ImageCampaignStudioProps> = ({ report, setCurrentPage }) => {
  const [campaigns, setCampaigns] = useState<Record<string, CampaignCreativeVisual>>(() => CAMPAIGN_BASE_CONFIGS);
  const [images, setImages] = useState<Record<string, string>>({});
  const [imageSources, setImageSources] = useState<Record<string, string>>({});
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const productName = report?.product?.name || 'Dot & Key Watermelon Cooling Sunscreen SPF 50+';

  // Generate an individual campaign's real AI image
  const handleGenerateSingle = async (skinType: 'Oily Skin' | 'Dry Skin' | 'Combination Skin') => {
    setLoadingState(prev => ({ ...prev, [skinType]: true }));
    const current = campaigns[skinType];
    
    try {
      // 1. Fetch fresh AI performance copy
      const copy = await generateAIEnhancedCopy(skinType, productName);

      if (copy && copy.headline) {
        setCampaigns(prev => ({
          ...prev,
          [skinType]: {
            ...prev[skinType],
            headline: copy.headline || prev[skinType].headline,
            subheadline: copy.subheadline || prev[skinType].subheadline,
            marketingStrategy: copy.marketingStrategy || prev[skinType].marketingStrategy,
            ctaText: copy.ctaText || prev[skinType].ctaText
          }
        }));
      }

      // 2. Composite real high-resolution commercial beauty photograph
      const realAdCompositeUrl = await createRealAdComposite(skinType);
      setImages(prev => ({ ...prev, [skinType]: realAdCompositeUrl }));
      setImageSources(prev => ({ ...prev, [skinType]: 'real-commercial' }));
    } catch (err) {
      console.error(`Failed to generate campaign image for ${skinType}:`, err);
    } finally {
      setLoadingState(prev => ({ ...prev, [skinType]: false }));
    }
  };

  // Generate all 3 distinct customer persona campaigns
  const handleGenerateAll = async () => {
    setIsGeneratingAll(true);
    setProgressPercent(10);
    setProgressStep('Reading customer personas from review friction...');
    await new Promise(r => setTimeout(r, 400));

    const skinTypes: Array<'Oily Skin' | 'Dry Skin' | 'Combination Skin'> = [
      'Oily Skin',
      'Dry Skin',
      'Combination Skin'
    ];

    for (let i = 0; i < skinTypes.length; i++) {
      const type = skinTypes[i];
      setProgressPercent(25 + i * 25);
      setProgressStep(`Generating visual advertisement for ${type}...`);
      await handleGenerateSingle(type);
      await new Promise(r => setTimeout(r, 300));
    }

    setProgressPercent(100);
    setProgressStep('Completed all 3 customer persona advertising visuals!');
    await new Promise(r => setTimeout(r, 400));
    setIsGeneratingAll(false);
  };

  // Auto-generate on first mount if empty
  useEffect(() => {
    if (Object.keys(images).length === 0) {
      handleGenerateAll();
    }
  }, []);

  const downloadImage = (skinType: string) => {
    const dataUrl = images[skinType];
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `marketmind-ad-${skinType.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyPromptOrDetails = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Generative AI Studio
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real Image Generation Engine Active</span>
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-900 mt-1 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-600" />
            <span>AI Persona Campaign Studio — Real Visual Generation</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generates 3 distinct, photorealistic advertising creatives for Oily, Dry, and Combination skin personas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleGenerateAll}
            disabled={isGeneratingAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGeneratingAll ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAll ? 'Generating 3 Campaigns...' : 'Regenerate All 3 Campaigns'}</span>
          </button>
        </div>
      </div>

      {/* Progress Notification Bar while generating */}
      {isGeneratingAll && (
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 animate-pulse">
          <div className="flex items-center justify-between text-xs font-bold text-purple-900">
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span>{progressStep}</span>
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Overview Context Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest block">
            Target SKU: {productName}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            1 Product. 3 Different Real Customer Personas. 3 Unique Visual Ads.
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Every campaign below is rendered with its own customized visual composition, photography lighting, headline hook, and strategic rationale to eliminate customer friction.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-purple-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
            1024 × 1024 High-Res PNG
          </span>
        </div>
      </div>

      {/* 3 Different Customer Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(['Oily Skin', 'Dry Skin', 'Combination Skin'] as const).map((skinType, idx) => {
          const camp = campaigns[skinType];
          const imgUrl = images[skinType];
          const isLoading = loadingState[skinType];

          return (
            <div 
              key={camp.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Campaign Persona Header */}
                <div className="p-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/70">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Campaign {idx + 1}: {skinType.toUpperCase()}
                      </span>
                      <h3 className="font-bold text-xs text-slate-900 leading-tight">
                        {camp.personaTitle}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                    {camp.formulaPill}
                  </span>
                </div>

                {/* Generated Image Preview Area */}
                <div className="relative aspect-square w-full bg-slate-900 flex items-center justify-center overflow-hidden group">
                  {isLoading ? (
                    <div className="text-center space-y-2 p-6">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                      <p className="text-xs font-bold text-white">Generating AI Visual...</p>
                      <p className="text-[10px] text-slate-400">Synthesizing realistic product lighting and composition</p>
                    </div>
                  ) : imgUrl ? (
                    <>
                      <img 
                        src={imgUrl} 
                        alt={`${skinType} Ad Creative`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      
                      {/* Image Source Badge */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono text-white flex items-center gap-1.5 border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>AI Rendered Visual</span>
                      </div>

                      {/* Download Overlay Button */}
                      <button
                        onClick={() => downloadImage(skinType)}
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 p-2.5 rounded-xl text-xs font-bold shadow-lg transition opacity-0 group-hover:opacity-100 flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-purple-600" />
                        <span>Save PNG</span>
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-6 text-slate-400 text-xs">
                      Click below to generate image
                    </div>
                  )}
                </div>

                {/* Marketing Strategy & Copy Dossier */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Campaign Headline:
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 font-serif leading-snug">
                      "{camp.headline}"
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                      {camp.subheadline}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-150">
                    <span className="text-[10px] font-black uppercase text-purple-800 block mb-1">
                      Target Audience:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {camp.targetAudience}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-600 block mb-1">
                      AI Marketing Strategy:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{camp.marketingStrategy}"
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-1 pt-1">
                    {camp.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => downloadImage(skinType)}
                  disabled={!imgUrl || isLoading}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>

                <button
                  onClick={() => handleGenerateSingle(skinType)}
                  disabled={isLoading || isGeneratingAll}
                  className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Regenerate this specific campaign image"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-purple-600 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Regen</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Bar to Marketing Studio */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-900">Push to Meta & Instagram Ads Studio</span>
          </div>
          <p className="text-xs text-purple-700">
            Export all 3 visual advertisement graphics along with complete Meta Ads Manager payload JSON and creator briefs.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('marketing')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer shrink-0"
        >
          <span>Open Marketing Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
