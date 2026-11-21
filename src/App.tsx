import React, { useState } from 'react';
import { Page, ResearchReport } from './types';
import { getSavedReports } from './lib/storage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/pages/Dashboard';
import { ProductResearch } from './components/pages/ProductResearch';
import { ReviewResearch } from './components/pages/ReviewResearch';
import { Competitors } from './components/pages/Competitors';
import { Sentiment } from './components/pages/Sentiment';
import { SWOT } from './components/pages/SWOT';
import { Marketing } from './components/pages/Marketing';
import { Report } from './components/pages/Report';
import { CompetitorClash } from './components/pages/CompetitorClash';
import { ImageCampaignStudio } from './components/pages/ImageCampaignStudio';
import { EmptyView } from './components/pages/EmptyView';
import { LiveScrapedReview } from './lib/reviewFetcher';

export default function App() {
  const [allReports, setAllReports] = useState<ResearchReport[]>(() => getSavedReports());
  const [activeReport, setActiveReport] = useState<ResearchReport | null>(() => {
    const list = getSavedReports();
    return list.length > 0 ? list[0] : null;
  });
  const [currentPage, setCurrentPage] = useState<Page>('product-research');
  
  // Cross-page state: real mined reviews delivered to Skin Type Precision & Marketing Studio
  const [minedReviews, setMinedReviews] = useState<LiveScrapedReview[]>([]);

  const handleReportCreated = (newReport: ResearchReport) => {
    setAllReports(prev => [newReport, ...prev]);
    setActiveReport(newReport);
  };

  const handleSelectReport = (id: string) => {
    const found = allReports.find(r => r.id === id);
    if (found) {
      setActiveReport(found);
    }
  };

  const handleJudgeDemoFlow = () => {
    // 60-Second Guided Judge Demo Flow:
    // 1. Set to Product Research
    setCurrentPage('product-research');
    
    // 2. After brief pause, navigate smoothly to Competitor Clash
    setTimeout(() => {
      setCurrentPage('competitor-clash');
    }, 1500);

    // 3. Then take the judge straight to Marketing Studio
    setTimeout(() => {
      setCurrentPage('marketing');
    }, 3800);
  };

  const handleExport = () => {
    if (!activeReport) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${activeReport.id}-campaign-kit.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        allReports={allReports}
        activeReport={activeReport}
        onSelectReport={handleSelectReport}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          activeReport={activeReport!}
          onExport={handleExport}
          onTriggerJudgeDemo={handleJudgeDemoFlow}
        />

        <main className="flex-1 overflow-y-auto px-7 py-6 pb-12">
          {currentPage === 'dashboard' && (
            <Dashboard
              report={activeReport}
              allReports={allReports}
              setCurrentPage={setCurrentPage}
              onSelectReport={handleSelectReport}
            />
          )}

          {(currentPage === 'product-research' || (currentPage as string) === 'research') && (
            <ProductResearch
              onReportCreated={handleReportCreated}
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === 'review-research' && (
            <ReviewResearch
              onReportCreated={handleReportCreated}
              setCurrentPage={setCurrentPage}
              onReviewsMined={setMinedReviews}
            />
          )}

          {currentPage === 'competitors' && (
            activeReport ? (
              <Competitors report={activeReport} />
            ) : (
              <EmptyView report={activeReport} setCurrentPage={setCurrentPage} title="No Competitor Intelligence Generated Yet" />
            )
          )}

          {currentPage === 'competitor-clash' && (
            <CompetitorClash report={activeReport} setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'sentiment' && (
            activeReport ? (
              <Sentiment report={activeReport} />
            ) : (
              <EmptyView report={activeReport} setCurrentPage={setCurrentPage} title="No Sentiment Intelligence Available" />
            )
          )}

          {currentPage === 'image-studio' && (
            <ImageCampaignStudio report={activeReport} setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'swot' && (
            activeReport ? (
              <SWOT report={activeReport} setCurrentPage={setCurrentPage} />
            ) : (
              <EmptyView report={activeReport} setCurrentPage={setCurrentPage} title="No SWOT Matrix Available" />
            )
          )}

          {currentPage === 'marketing' && (
            activeReport ? (
              <Marketing report={activeReport} />
            ) : (
              <EmptyView report={activeReport} setCurrentPage={setCurrentPage} title="No Marketing Studio Campaigns Available" />
            )
          )}

          {currentPage === 'report' && (
            activeReport ? (
              <Report report={activeReport} onExport={handleExport} />
            ) : (
              <EmptyView report={activeReport} setCurrentPage={setCurrentPage} title="No Campaign Report Available" />
            )
          )}
        </main>
      </div>
    </div>
  );
}
