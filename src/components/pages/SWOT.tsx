import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { ResearchReport, Page } from '../../types';

interface SWOTProps {
  report: ResearchReport;
  setCurrentPage?: (page: Page) => void;
}

export const SWOT: React.FC<SWOTProps> = ({ report, setCurrentPage }) => {
  return (
    <div className="space-y-6">
      {/* Page Header matching prototype */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">SWOT Analysis & Market Gaps</h1>
          <p className="text-[13px] text-[#64748B] mt-0.5">Strategic analysis generated from competitor intelligence and customer review mining</p>
        </div>

        {setCurrentPage && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('product-research')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Go to Product Research</span>
            </button>
            <button
              onClick={() => setCurrentPage('marketing')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-2xs hover:from-purple-700 transition cursor-pointer"
            >
              <span>Convert to Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* SWOT 2x2 Grid exactly matching prototype CSS classes & emojis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
        <div className="swot-cell s-cell">
          <h4><span className="text-[18px]">💪</span> Strengths</h4>
          <ul>
            {report?.swot?.strengths?.length ? (
              report.swot.strengths.map((s, i) => <li key={i}>{s}</li>)
            ) : (
              <>
                <li>Proprietary -6°C cooling watermelon gel-cream technology</li>
                <li>Zero white cast on all Indian skin tones</li>
                <li>Anti-pilling formulation for makeup layering</li>
                <li>Strong 4.6★ rating across 24K+ reviews</li>
                <li>Premium brand aesthetic appeals to Gen Z</li>
              </>
            )}
          </ul>
        </div>

        <div className="swot-cell w-cell">
          <h4><span className="text-[18px]">⚡</span> Weaknesses</h4>
          <ul>
            {report?.swot?.weaknesses?.length ? (
              report.swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)
            ) : (
              <>
                <li>₹96 premium vs Minimalist (₹399 vs ₹495)</li>
                <li>Only 50g size — no value/family pack option</li>
                <li>No travel-size or trial-size SKU</li>
                <li>Limited offline retail presence vs Garnier</li>
              </>
            )}
          </ul>
        </div>

        <div className="swot-cell o-cell">
          <h4><span className="text-[18px]">🚀</span> Opportunities</h4>
          <ul>
            {report?.swot?.opportunities?.length ? (
              report.swot.opportunities.map((o, i) => <li key={i}>{o}</li>)
            ) : (
              <>
                <li>"Anti-Pilling SPF" niche — no competitor owns this</li>
                <li>Gen Z office commuter segment (daily reapplication need)</li>
                <li>UGC viral content — "The Pilling Test" comparison format</li>
                <li>Festive bundle packs for Diwali / wedding season</li>
                <li>Partnership with makeup brands for "perfect base" collab</li>
              </>
            )}
          </ul>
        </div>

        <div className="swot-cell t-cell">
          <h4><span className="text-[18px]">🛡️</span> Threats</h4>
          <ul>
            {report?.swot?.threats?.length ? (
              report.swot.threats.map((t, i) => <li key={i}>{t}</li>)
            ) : (
              <>
                <li>Aggressive copycat launches from Aqualogica & Foxtale</li>
                <li>K-Beauty brands entering Indian market at lower prices</li>
                <li>Minimalist's clinical positioning gaining dermatologist endorsements</li>
                <li>Price-sensitive customers switching during inflationary periods</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Market Gap Cards matching original prototype */}
      <div className="card">
        <div className="card-header flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
          <h3 className="text-[15px] font-bold text-[#0F172A]">🎯 Identified Market Gaps</h3>
          <span className="badge badge-purple">AI Discovered</span>
        </div>
        <div className="card-body p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-[10px] border border-[#DDD6FE] bg-[#F5F3FF]">
              <div className="text-[11px] uppercase font-bold text-[#7C3AED] tracking-wider mb-1">
                Gap #1 — Product Positioning
              </div>
              <div className="text-xs text-[#1E293B] font-medium leading-relaxed">
                No Indian brand owns the "Anti-Pilling SPF" category. 42% of competitor users complain about pilling under makeup.
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-[#8B5CF6] rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-[#7C3AED]">92% opportunity</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] border border-[#DDD6FE] bg-[#F5F3FF]">
              <div className="text-[11px] uppercase font-bold text-[#7C3AED] tracking-wider mb-1">
                Gap #2 — Sensory Differentiation
              </div>
              <div className="text-xs text-[#1E293B] font-medium leading-relaxed">
                No competitor offers an instant cooling sensation on application. This can become a unique sensory signature.
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                  <div className="w-[87%] h-full bg-[#8B5CF6] rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-[#7C3AED]">87% opportunity</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] border border-[#DDD6FE] bg-[#F5F3FF]">
              <div className="text-[11px] uppercase font-bold text-[#7C3AED] tracking-wider mb-1">
                Gap #3 — Audience Segment
              </div>
              <div className="text-xs text-[#1E293B] font-medium leading-relaxed">
                Young office commuters who wear makeup daily are underserved. No SPF brand targets "makeup-compatible SPF" directly.
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-[#8B5CF6] rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-[#7C3AED]">78% opportunity</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[10px] border border-[#DDD6FE] bg-[#F5F3FF]">
              <div className="text-[11px] uppercase font-bold text-[#7C3AED] tracking-wider mb-1">
                Gap #4 — Content Format
              </div>
              <div className="text-xs text-[#1E293B] font-medium leading-relaxed">
                "Before/After pilling test" comparison videos are untapped viral content format in the Indian skincare space.
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#8B5CF6] rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-[#7C3AED]">85% opportunity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
