import React from 'react';
import { 
  Package, 
  Users, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Flame,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ResearchReport, Page } from '../../types';

interface DashboardProps {
  report: ResearchReport | null;
  allReports: ResearchReport[];
  setCurrentPage: (page: Page) => void;
  onSelectReport: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  allReports,
  setCurrentPage,
  onSelectReport
}) => {
  if (allReports.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Welcome to MarketMind AI</h1>
          <p className="text-[13px] text-[#64748B] mt-1">Autonomous market intelligence to marketing content platform</p>
        </div>

        <div className="card p-12 text-center max-w-xl mx-auto my-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">No Product Researched Yet</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto leading-relaxed">
              Enter any product URL or name to analyze competitor offerings, customer sentiment, SWOT gaps, and generate marketing campaigns.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('product-research')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-xl text-xs font-bold shadow-md hover:-translate-y-0.5 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Your First AI Research</span>
          </button>
        </div>
      </div>
    );
  }

  const active = allReports[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-[22px] font-bold text-[#0F172A]">Welcome back</h1>
        <p className="text-[13px] text-[#64748B] mt-1">Here's your real-time market intelligence overview</p>
      </div>

      {/* Stats Row with Professional Lucide Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Products Researched</h4>
            <div className="text-[28px] font-extrabold text-[#0F172A] mt-1 leading-none">{allReports.length}</div>
            <div className="text-[11px] font-semibold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              Active Intelligence
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] border border-purple-150 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Competitors Analyzed</h4>
            <div className="text-[28px] font-extrabold text-[#0F172A] mt-1 leading-none">
              {allReports.reduce((s, r) => s + r.competitors.length, 0)}
            </div>
            <div className="text-[11px] font-semibold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              Tracked Across Platforms
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#DBEAFE] border border-blue-150 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Avg Sentiment Score</h4>
            <div className="text-[28px] font-extrabold text-[#0F172A] mt-1 leading-none">
              {active.overallSentimentScore}%
            </div>
            <div className="text-[11px] font-semibold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              Positive Feedback
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D1FAE5] border border-emerald-150 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <h4 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Market Opportunities</h4>
            <div className="text-[28px] font-extrabold text-[#0F172A] mt-1 leading-none">
              {active.swot.marketGaps.length}
            </div>
            <div className="text-[11px] font-semibold text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-md mt-2 inline-flex items-center gap-1">
              Actionable Angles
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] border border-amber-150 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sentiment Overview */}
        <div className="card">
          <div className="flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
            <h3 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Customer Sentiment Overview</span>
            </h3>
            <span className="badge badge-green">{active.product.name}</span>
          </div>
          <div className="p-5">
            <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
              <svg className="w-40 h-40 shrink-0" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E2E8F0" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray={`${active.sentiment.positive} ${100 - active.sentiment.positive}`} strokeDashoffset="25" strokeLinecap="round"/>
                <text x="18" y="17" textAnchor="middle" fontSize="4.5" fontWeight="800" fill="#0F172A" fontFamily="Sora">{active.sentiment.positive}%</text>
                <text x="18" y="21" textAnchor="middle" fontSize="2" fill="#64748B" fontFamily="Inter">Positive</text>
              </svg>
              <div className="flex flex-col gap-2.5 text-[13px] w-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"></div>
                  <span className="font-bold text-[#0F172A] min-w-[36px]">{active.sentiment.positive}%</span>
                  <span>Positive Reviews</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0"></div>
                  <span className="font-bold text-[#0F172A] min-w-[36px]">{active.sentiment.negative}%</span>
                  <span>Negative Reviews</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] shrink-0"></div>
                  <span className="font-bold text-[#0F172A] min-w-[36px]">{active.sentiment.neutral}%</span>
                  <span>Neutral Reviews</span>
                </div>
                <div className="mt-2 p-2 px-3 bg-[#D1FAE5] rounded-lg text-[11px] font-semibold text-[#059669] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Top Praise: "{active.sentiment.topCompliments[0]}"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Market Opportunities */}
        <div className="card">
          <div className="flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
            <h3 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Top Market Opportunities</span>
            </h3>
            <span className="badge badge-purple">AI Generated</span>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {active.swot.marketGaps.slice(0, 3).map((gap, i) => (
              <div key={i} className="p-3 bg-[#F5F3FF] border border-[#DDD6FE] rounded-[10px]">
                <div className="text-[13px] font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{gap}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-[#8B5CF6] rounded-full"></div>
                  </div>
                  <span className="text-[11px] font-bold text-[#7C3AED]">High ROI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card">
        <div className="flex items-center justify-between p-4 px-5 border-b border-[#E2E8F0]">
          <h3 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-600" />
            <span>Researched Products</span>
          </h3>
          <button 
            onClick={() => setCurrentPage('product-research')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-[10px] text-xs font-semibold shadow-xs hover:-translate-y-0.5 transition cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>+ New Research</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] uppercase tracking-wider text-[#64748B]">
                <th className="py-2.5 px-4 font-semibold">Product</th>
                <th className="py-2.5 px-4 font-semibold">Sentiment</th>
                <th className="py-2.5 px-4 font-semibold">Competitors</th>
                <th className="py-2.5 px-4 font-semibold">Opportunities</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#1E293B]">
              {allReports.map((r) => (
                <tr key={r.id} className="hover:bg-[#FAFBFF]">
                  <td className="py-3 px-4 font-semibold text-[#0F172A] flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{r.product.name} ({r.product.brand})</span>
                  </td>
                  <td className="py-3 px-4"><span className="font-bold text-[#059669]">{r.overallSentimentScore}%</span> positive</td>
                  <td className="py-3 px-4">{r.competitors.length} analyzed</td>
                  <td className="py-3 px-4"><span className="badge badge-purple">{r.swot.marketGaps.length} found</span></td>
                  <td className="py-3 px-4 text-[#64748B]">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        onSelectReport(r.id);
                        setCurrentPage('competitors');
                      }}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Radar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
