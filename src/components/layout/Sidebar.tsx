import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Sparkles, 
  FileText,
  UserCheck,
  Swords
} from 'lucide-react';
import { Page, ResearchReport } from '../../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  allReports: ResearchReport[];
  activeReport: ResearchReport | null;
  onSelectReport: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  allReports,
  activeReport,
  onSelectReport
}) => {
  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard, section: 'Main' },
    { id: 'product-research' as Page, label: 'Product Research', icon: Package, section: 'Research Tools' },
    { id: 'review-research' as Page, label: 'Review Research', icon: MessageSquare, section: null },
    { id: 'competitors' as Page, label: 'Competitors', icon: Users, section: 'Intelligence' },
    { id: 'competitor-clash' as Page, label: 'Competitor Clash', icon: Swords, section: null },
    { id: 'sentiment' as Page, label: 'Review Intelligence', icon: MessageSquare, section: null },
    { id: 'image-studio' as Page, label: 'AI Image Campaigns', icon: Sparkles, section: 'Create' },
    { id: 'swot' as Page, label: 'SWOT Analysis', icon: TrendingUp, section: null },
    { id: 'marketing' as Page, label: 'Marketing Studio', icon: Sparkles, section: 'Create' },
    { id: 'report' as Page, label: 'Campaign Report', icon: FileText, section: null },
  ];

  return (
    <aside className="w-[260px] bg-[#0F172A] text-white flex flex-col fixed h-screen z-50 select-none">
      {/* Brand Header */}
      <div className="p-[20px] pb-[16px] flex items-center gap-3 border-b border-white/[0.08]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-xl shadow-[0_4px_12px_rgba(124,58,237,0.3)]">
          🧠
        </div>
        <div>
          <h2 className="text-[15px] font-extrabold tracking-tight text-white">MarketMind AI</h2>
          <span className="text-[11px] text-[#A78BFA] font-medium block">Intelligence → Marketing</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <React.Fragment key={item.id}>
              {item.section && (
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] px-3 pt-4 pb-1.5 font-semibold">
                  {item.section}
                </div>
              )}
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-[13px] font-medium transition duration-200 text-left relative cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/15 text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-[#8B5CF6]"></span>
                )}
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#A78BFA]' : 'opacity-70'}`} />
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}

        {/* Live Reports List */}
        {allReports.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/[0.08]">
            <div className="text-[10px] uppercase tracking-wider text-[#64748B] px-3 pb-2 font-semibold">
              Live Reports ({allReports.length})
            </div>
            <div className="space-y-1">
              {allReports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelectReport(r.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs truncate transition cursor-pointer ${
                    activeReport?.id === r.id
                      ? 'bg-purple-600/20 text-purple-200 font-bold border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {r.product.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Start New Scan CTA */}
      <div className="p-3">
        <button
          onClick={() => setCurrentPage('product-research')}
          className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-900/30"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New AI Research</span>
        </button>
      </div>
    </aside>
  );
};
