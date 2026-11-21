import React from 'react';
import { ResearchReport, Page } from '../../types';

interface ViewProps {
  report: ResearchReport | null;
  setCurrentPage: (page: Page) => void;
  title: string;
}

export const EmptyView: React.FC<ViewProps> = ({ setCurrentPage, title }) => (
  <div className="card p-12 text-center max-w-lg mx-auto my-12 space-y-4">
    <div className="text-4xl">🔍</div>
    <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
    <p className="text-xs text-[#64748B] leading-relaxed">
      Please enter a product in Product Research to generate real competitor intelligence, sentiment analysis, and marketing campaigns.
    </p>
    <button
      onClick={() => setCurrentPage('product-research')}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white rounded-xl text-xs font-bold shadow-md hover:-translate-y-0.5 transition cursor-pointer"
    >
      Go to Product Research →
    </button>
  </div>
);
