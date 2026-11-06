'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  SlidersHorizontal,
  ArrowLeft,
  Download,
  Share2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { TechDarkTemplate } from './templates/TechDarkTemplate';
import { MinimalStudioTemplate } from './templates/MinimalStudioTemplate';
import { CreativeBoldTemplate } from './templates/CreativeBoldTemplate';
import { ExecutiveProTemplate } from './templates/ExecutiveProTemplate';
import { AcademicCleanTemplate } from './templates/AcademicCleanTemplate';
import { CustomizerSidebar } from '../editor/CustomizerSidebar';
import { EditSectionModal } from '../editor/EditSectionModal';
import { exportPortfolioAsHTML } from '@/utils/exporter';

export const PortfolioPreview: React.FC = () => {
  const { portfolio, deviceMode, setDeviceMode, switchToWizard } = usePortfolio();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Render the selected template
  const renderTemplate = () => {
    switch (portfolio.theme.template) {
      case 'tech':
        return <TechDarkTemplate data={portfolio} />;
      case 'minimal':
        return <MinimalStudioTemplate data={portfolio} />;
      case 'creative':
        return <CreativeBoldTemplate data={portfolio} />;
      case 'executive':
        return <ExecutiveProTemplate data={portfolio} />;
      case 'academic':
        return <AcademicCleanTemplate data={portfolio} />;
      default:
        return <TechDarkTemplate data={portfolio} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-x-hidden">
      {/* Top Studio Control Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={switchToWizard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Questionnaire</span>
          </button>

          <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-3">
            <span className="text-xs font-bold text-white tracking-tight">
              {portfolio.name || 'Personal Portfolio'}
            </span>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {portfolio.theme.template} • {portfolio.theme.palette}
            </span>
          </div>
        </div>

        {/* Responsive Device Viewport Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop Full View"
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'tablet'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Sidebar and Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportPortfolioAsHTML(portfolio)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download HTML</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Main Preview Stage Area */}
      <div className="flex-1 overflow-auto flex justify-center items-start p-0 sm:p-4 bg-slate-950/80">
        {deviceMode === 'desktop' && (
          <div className="w-full shadow-2xl transition-all duration-300">
            {renderTemplate()}
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="my-6 max-w-[768px] w-full rounded-[36px] overflow-hidden border-[10px] border-slate-800 shadow-2xl bg-black">
            {/* Tablet Mockup Top Notch */}
            <div className="h-4 bg-slate-800 flex justify-center items-center">
              <div className="w-8 h-1 rounded-full bg-slate-700" />
            </div>
            <div className="max-h-[85vh] overflow-y-auto">{renderTemplate()}</div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="my-6 max-w-[375px] w-full rounded-[44px] overflow-hidden border-[12px] border-slate-800 shadow-2xl bg-black">
            {/* Phone Notch */}
            <div className="h-6 bg-slate-800 flex justify-center items-center">
              <div className="w-16 h-3 rounded-full bg-slate-900 flex items-center justify-end pr-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">{renderTemplate()}</div>
          </div>
        )}
      </div>

      {/* Customizer Sidebar */}
      <CustomizerSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Quick Edit Modal */}
      <EditSectionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

