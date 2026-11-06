'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ConversationalWizard } from '@/components/dashboard/ConversationalWizard';
import { PortfolioPreview } from '@/components/preview/PortfolioPreview';
import { Bot, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { activeView, isGenerating } = usePortfolio();

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white space-y-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center animate-bounce shadow-2xl shadow-cyan-500/40">
            <Sparkles className="w-10 h-10 text-slate-950" />
          </div>
          <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-xl animate-pulse -z-10" />
        </div>

        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight">
            Crafting Your Personalized Portfolio...
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Analyzing your craft, skills, and personality to curate the ideal design layout, typography pairing, and color grading.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <Bot className="w-4 h-4 animate-spin" />
          <span>Generating assets & component hierarchy...</span>
        </div>
      </div>
    );
  }

  return activeView === 'wizard' ? <ConversationalWizard /> : <PortfolioPreview />;
}
