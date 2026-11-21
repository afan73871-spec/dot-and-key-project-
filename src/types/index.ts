// All TypeScript interfaces for MarketMind AI

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  url?: string;
  description: string;
  ingredients: string[];
  rating: number;
  reviewCount: number;
  keyBenefits: string[];
  targetAudience: string;
  pricePerUnit?: string;
  size?: string;
}

export interface Competitor {
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  strengths: string[];
  weaknesses: string[];
  keyIngredients: string[];
  features: string[];
  threatLevel: 'High' | 'Medium' | 'Low';
  marketShare?: number;
  pricePerUnit?: string;
}

export interface SentimentBreakdown {
  positive: number;
  negative: number;
  neutral: number;
  topComplaints: string[];
  topCompliments: string[];
  topPraises?: string[];
  requestedImprovements: string[];
  customerPreferences: string[];
  sentimentTrend: { month: string; score: number }[];
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  marketGaps: string[];
  customerNeeds: string[];
  productImprovements: string[];
}

export interface InsightChain {
  id: string;
  complaint: string;
  customerInsight: string;
  marketOpportunity: string;
  marketingAngle: string;
  generatedAd: string;
  evidence: string;
}

export interface AdConcept {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'Nykaa' | 'Amazon';
  format: string;
  headline: string;
  subheadline: string;
  bodyText: string;
  cta: string;
  visualConcept: string;
  targetAudience: string;
  insightSource: string;
}

export interface StoryboardScene {
  scene: number;
  timeCode: string;
  description: string;
  visualDirection: string;
  voiceOver: string;
  audioNote: string;
}

export interface VideoScript {
  title: string;
  platform: string;
  duration: string;
  hook: string;
  scenes: StoryboardScene[];
  cta: string;
}

export interface MarketingContent {
  targetAudience: {
    primary: string;
    demographics: string[];
    psychographics: string[];
    painPoints: string[];
  };
  socialCaptions: { platform: string; caption: string; hashtags: string[] }[];
  productDescription: string;
  adConcepts: AdConcept[];
  videoScript: VideoScript;
  storyboard: StoryboardScene[];
  emailSubjectLines: string[];
  insightChains: InsightChain[];
}

export interface ResearchReport {
  id: string;
  createdAt: string;
  status: 'complete' | 'partial' | 'draft';
  product: Product;
  competitors: Competitor[];
  sentiment: SentimentBreakdown;
  swot: SWOTAnalysis;
  marketing: MarketingContent;
  marketOpportunityScore: number;
  overallSentimentScore: number;
}

export type Page =
  | 'dashboard'
  | 'product-research'
  | 'review-research'
  | 'research'
  | 'competitors'
  | 'competitor-clash'
  | 'sentiment'
  | 'image-studio'
  | 'swot'
  | 'marketing'
  | 'report';

export type AnalysisStep =
  | 'idle'
  | 'product'
  | 'competitors'
  | 'sentiment'
  | 'swot'
  | 'marketing'
  | 'saving'
  | 'done'
  | 'error';
