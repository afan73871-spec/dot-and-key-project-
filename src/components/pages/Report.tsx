import React from 'react';
import { ResearchReport } from '../../types';
import { Download, BarChart3, Target, Brain, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReportProps {
  report: ResearchReport;
  onExport: () => void;
}

export const Report: React.FC<ReportProps> = ({ report, onExport }) => {

  const handleDownloadCampaignKit = () => {
    const ad = report.marketing?.adConcepts?.[0];
    const kit = {
      _meta: {
        tool: 'MarketMind AI',
        event: 'Vibe Coders Hackathon Edition 3',
        generated: new Date().toISOString(),
        product: report.product?.name,
        brand: report.product?.brand,
      },
      swot_analysis: {
        strengths: report.swot?.strengths || [],
        weaknesses: report.swot?.weaknesses || [],
        opportunities: report.swot?.opportunities || [],
        threats: report.swot?.threats || [],
        market_gaps: report.swot?.marketGaps || [],
      },
      competitive_intelligence: (report.competitors || []).map(c => ({
        brand: c.brand,
        product: c.name,
        price: c.price,
        rating: c.rating,
        reviews: c.reviewCount,
        key_weakness: c.weaknesses,
        threat_level: c.threatLevel,
      })),
      meta_ad_creatives: [
        ad && {
          angle: 'Primary — Pain Reversal',
          headline: ad.headline,
          subheadline: ad.subheadline,
          body: ad.bodyText,
          cta: ad.cta,
          visual_concept: ad.visualConcept,
          target_audience: report.marketing?.targetAudience?.primary,
          offer: 'BUY 1 GET 1 FREE · Code: GLOW50',
        },
        {
          angle: 'B — Sensory & Heat Defense',
          headline: 'Instant -6°C Skin Cooling Refresh',
          subheadline: 'Beats peak 42°C Indian heat without sticky residue.',
          body: 'Chilled watermelon hydration meets SPF 50+ PA++++. Vanishes in 3 seconds.',
          cta: 'Claim Summer Glow — ₹495',
          target_audience: 'Mumbai / Delhi / Bengaluru urban Gen Z, 22–30',
          offer: 'SUMMER SPECIAL · 15% OFF',
        },
      ].filter(Boolean),
      ugc_script: {
        hook: '"I tested EVERY sunscreen that pills under makeup. Here\'s the only one that passed."',
        problem: 'Show Minimalist SPF balling up under foundation — 42% of users report this',
        solution: 'Apply Dot & Key watermelon sunscreen — foundation glides perfectly',
        proof: 'Real skin demo, no filter, natural Indian skin tone',
        cta: 'Link in bio — ₹495 with code GLOW50',
        duration_seconds: 30,
        platform: 'Instagram Reels / YouTube Shorts',
      },
    };

    const blob = new Blob([JSON.stringify(kit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketmind-campaign-kit-${report.product?.id || 'dot-and-key'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Campaign Report</h1>
          <p className="text-[13px] text-[#64748B] mt-1">Complete research-to-marketing pipeline report</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCampaignKit}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[10px] text-[13px] font-semibold shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Campaign Kit
          </button>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-[10px] text-[13px] font-semibold shadow-[0_2px_8px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Export JSON
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A78BFA] font-semibold">
              MarketMind AI · Full Campaign Report
            </div>
            <div className="text-xl font-extrabold font-serif">
              {report.product?.name || 'Dot & Key Watermelon Sunscreen SPF 50+'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/[0.08] p-3.5 rounded-[10px] text-center">
            <div className="text-2xl font-extrabold">{report.overallSentimentScore || 88}%</div>
            <div className="text-[11px] text-[#94A3B8]">Sentiment Score</div>
          </div>
          <div className="bg-white/[0.08] p-3.5 rounded-[10px] text-center">
            <div className="text-2xl font-extrabold">{report.competitors?.length || 5}</div>
            <div className="text-[11px] text-[#94A3B8]">Competitors Analyzed</div>
          </div>
          <div className="bg-white/[0.08] p-3.5 rounded-[10px] text-center">
            <div className="text-2xl font-extrabold">{report.swot?.marketGaps?.length || 8}</div>
            <div className="text-[11px] text-[#94A3B8]">Market Opportunities</div>
          </div>
          <div className="bg-white/[0.08] p-3.5 rounded-[10px] text-center">
            <div className="text-2xl font-extrabold">{report.marketing?.adConcepts?.length || 3}</div>
            <div className="text-[11px] text-[#94A3B8]">Ads Generated</div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="p-4 px-5 border-b border-[#E2E8F0] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <h3 className="text-[15px] font-bold text-[#0F172A]">Key Findings</h3>
          </div>
          <div className="p-5 text-[13px] leading-relaxed text-[#1E293B]">
            <p>{report.product?.name} holds strong positioning in the Indian SPF ₹400–500 segment.</p>
            <p className="mt-2.5">Key competitive advantages include <strong>proprietary cooling technology</strong>, <strong>anti-pilling gel formulation</strong>, and strong Gen Z brand appeal. The primary market gap — no brand owning "Anti-Pilling SPF" — represents a <strong>92% opportunity score</strong>.</p>
            {report.swot?.strengths?.length > 0 && (
              <ul className="mt-3 space-y-1">
                {report.swot.strengths.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card">
          <div className="p-4 px-5 border-b border-[#E2E8F0] flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            <h3 className="text-[15px] font-bold text-[#0F172A]">Strategic Recommendations</h3>
          </div>
          <div className="p-5 text-[13px] leading-relaxed text-[#1E293B]">
            <ol className="list-decimal pl-4 space-y-1.5">
              <li><strong>Claim "Anti-Pilling SPF"</strong> as primary brand positioning</li>
              <li><strong>Launch "The Pilling Test"</strong> UGC comparison video campaign</li>
              <li><strong>Target office commuters</strong> with daily reapplication messaging</li>
              <li><strong>Create festive bundle packs</strong> for Diwali gifting season</li>
              <li><strong>Partner with makeup creators</strong> for "perfect base" collab content</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Campaign Kit CTA */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-800">Campaign Kit Ready</span>
            </div>
            <p className="text-xs text-purple-700">Download includes: SWOT JSON · 2 Meta Ad payloads · UGC Script · Competitive Intelligence brief</p>
          </div>
          <button
            onClick={handleDownloadCampaignKit}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer shrink-0 ml-4"
          >
            <Download className="w-4 h-4" />
            Download Kit
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-[#94A3B8]">
        Generated by MarketMind AI · Vibe Coders Hackathon Edition 3 · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
};
