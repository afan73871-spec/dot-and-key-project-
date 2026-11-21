import React from 'react';
import { Search, Plus, Rocket, PlayCircle } from 'lucide-react';
import { Page, ResearchReport } from '../../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  activeReport: ResearchReport;
  onExport: () => void;
  onTriggerJudgeDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onTriggerJudgeDemo,
}) => {
  const pageNames: Record<Page, string> = {
    dashboard: 'Dashboard',
    'product-research': 'Product Research',
    'review-research': 'Review Research',
    research: 'Product Research',
    competitors: 'Competitors',
    'competitor-clash': 'Competitor Review Clash & Conquest',
    sentiment: 'Review Intelligence',
    'image-studio': 'AI Image Generation Studio',
    swot: 'SWOT Analysis',
    marketing: 'Marketing Studio',
    report: 'Campaign Report'
  };

  return (
    <header className="h-[60px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-7 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
        <span>🧠</span>
        <span>/</span>
        <span className="text-[#1E293B] font-semibold">{pageNames[currentPage]}</span>
      </div>

      {/* Search Input matching prototype */}
      <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-3.5 py-2 w-[280px] focus-within:border-[#A78BFA] focus-within:ring-2 focus-within:ring-[#7C3AED]/10 transition">
        <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
        <input 
          type="text" 
          placeholder="Search products, competitors, insights..." 
          className="border-none bg-transparent outline-none text-[13px] text-[#1E293B] w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        {onTriggerJudgeDemo && (
          <button
            onClick={onTriggerJudgeDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-[10px] text-[12px] font-black shadow-sm hover:shadow-md hover:scale-102 transition cursor-pointer"
            title="Automatically run the winning 60s hackathon demo flow"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
            <span>60s Judge Demo Flow</span>
          </button>
        )}

        <button
          onClick={() => setCurrentPage('product-research')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-[10px] text-[13px] font-semibold shadow-[0_2px_8px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Research</span>
        </button>
      </div>
    </header>
  );
};
