import React from 'react';
import { ResearchReport } from '../../types';

interface SentimentProps {
  report: ResearchReport;
}

export const Sentiment: React.FC<SentimentProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-[22px] font-bold text-[#0F172A]">Customer Review Intelligence</h1>
        <p className="text-[13px] text-[#64748B] mt-1">Sentiment analysis from 24,820 verified reviews — Dot & Key Watermelon Sunscreen</p>
      </div>

      {/* Sentiment Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Positive Sentiment</h4>
            <div className="text-[28px] font-extrabold text-[#059669] mt-1 leading-none">68%</div>
            <div className="text-[11px] font-semibold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              ↑ 4% vs last quarter
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D1FAE5] flex items-center justify-center text-xl shrink-0">
            😊
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Negative Sentiment</h4>
            <div className="text-[28px] font-extrabold text-[#EF4444] mt-1 leading-none">18%</div>
            <div className="text-[11px] font-semibold text-[#EF4444] bg-[#FEE2E2] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              ↑ 2% from new SKU
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-xl shrink-0">
            😟
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Neutral Sentiment</h4>
            <div className="text-[28px] font-extrabold text-[#64748B] mt-1 leading-none">14%</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-xl shrink-0">
            😐
          </div>
        </div>
      </div>

      {/* Two Column Grid: Praises vs Complaints matching prototype */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Praises */}
        <div className="card">
          <div className="flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
            <h3 className="text-[15px] font-bold text-[#0F172A]">✅ Top Customer Praises</h3>
            <span className="badge badge-green">4,820 mentions</span>
          </div>
          <div className="p-5 flex flex-col gap-2.5">
            <div className="p-2.5 px-3.5 bg-[#F0FDF4] rounded-[10px] border border-[#BBF7D0]">
              <div className="flex justify-between text-[13px] font-semibold text-[#0F172A]">
                <span>Instant Cooling Sensation</span>
                <span className="text-[#059669]">96%</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[#D1FAE5] rounded-full overflow-hidden">
                <div className="w-[96%] h-full bg-[#10B981] rounded-full"></div>
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-1">4,820 mentions in verified reviews</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#F0FDF4] rounded-[10px] border border-[#BBF7D0]">
              <div className="flex justify-between text-[13px] font-semibold text-[#0F172A]">
                <span>Zero Pilling Under Makeup</span>
                <span className="text-[#059669]">94%</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[#D1FAE5] rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-[#10B981] rounded-full"></div>
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-1">3,940 mentions</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#F0FDF4] rounded-[10px] border border-[#BBF7D0]">
              <div className="flex justify-between text-[13px] font-semibold text-[#0F172A]">
                <span>No White Cast on Dark Skin</span>
                <span className="text-[#059669]">91%</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[#D1FAE5] rounded-full overflow-hidden">
                <div className="w-[91%] h-full bg-[#10B981] rounded-full"></div>
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-1">3,610 mentions</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#F0FDF4] rounded-[10px] border border-[#BBF7D0]">
              <div className="flex justify-between text-[13px] font-semibold text-[#0F172A]">
                <span>Refreshing Watermelon Scent</span>
                <span className="text-[#059669]">88%</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[#D1FAE5] rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-[#10B981] rounded-full"></div>
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-1">2,840 mentions</div>
            </div>
          </div>
        </div>

        {/* Top Complaints */}
        <div className="card">
          <div className="flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
            <h3 className="text-[15px] font-bold text-[#0F172A]">⚠️ Top Complaints & Improvements</h3>
            <span className="badge badge-red">Actionable</span>
          </div>
          <div className="p-5 flex flex-col gap-2.5">
            <div className="p-2.5 px-3.5 bg-[#FEF2F2] rounded-[10px] border border-[#FECACA]">
              <div className="text-[13px] font-semibold text-[#0F172A]">Competitor: "Pills under my foundation"</div>
              <div className="text-[11px] text-[#DC2626] mt-0.5">38% of Minimalist users • Critical pain point</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#FEF2F2] rounded-[10px] border border-[#FECACA]">
              <div className="text-[13px] font-semibold text-[#0F172A]">Competitor: "Feels heavy & greasy in humidity"</div>
              <div className="text-[11px] text-[#DC2626] mt-0.5">29% of Derma Co users • Summer deal-breaker</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#FEF2F2] rounded-[10px] border border-[#FECACA]">
              <div className="text-[13px] font-semibold text-[#0F172A]">Competitor: "White cast visible in photos"</div>
              <div className="text-[11px] text-[#DC2626] mt-0.5">24% of Foxtale users • Social media concern</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#FFF7ED] rounded-[10px] border border-[#FED7AA]">
              <div className="text-[13px] font-semibold text-[#0F172A]">Requested: "Bigger size / value pack option"</div>
              <div className="text-[11px] text-[#B45309] mt-0.5">Improvement request • 1,200+ mentions</div>
            </div>

            <div className="p-2.5 px-3.5 bg-[#FFF7ED] rounded-[10px] border border-[#FED7AA]">
              <div className="text-[13px] font-semibold text-[#0F172A]">Requested: "Travel-size tube version"</div>
              <div className="text-[11px] text-[#B45309] mt-0.5">Improvement request • 890+ mentions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
