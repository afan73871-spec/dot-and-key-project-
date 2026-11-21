import { ResearchReport } from '../types';

const STORAGE_KEY = 'marketmind_research_reports';

export function getSavedReports(): ResearchReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveReport(report: ResearchReport): void {
  try {
    const existing = getSavedReports();
    const filtered = existing.filter(r => r.id !== report.id);
    const updated = [report, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save report', e);
  }
}

