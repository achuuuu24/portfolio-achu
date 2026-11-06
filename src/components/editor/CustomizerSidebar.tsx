'use client';

import React, { useState } from 'react';
import {
  Palette,
  Layout,
  Type,
  Sun,
  Moon,
  Layers,
  Sparkles,
  Download,
  Share2,
  FileCode,
  FileText,
  Edit3,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { palettes, fontPairings } from '@/utils/themeStyles';
import { TemplateId, PaletteId, FontPairingId } from '@/types/portfolio';
import { exportPortfolioAsHTML, exportPortfolioAsJSON, triggerPrintPortfolio } from '@/utils/exporter';

interface CustomizerSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenEditModal: () => void;
}

export const CustomizerSidebar: React.FC<CustomizerSidebarProps> = ({
  isOpen,
  onToggle,
  onOpenEditModal,
}) => {
  const {
    portfolio,
    updateTheme,
    toggleSection,
    reorderSections,
    runAIAutoDesign,
    switchToWizard,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'theme' | 'sections' | 'export'>('theme');
  const [copiedLink, setCopiedLink] = useState(false);

  const templates: { id: TemplateId; name: string; tag: string }[] = [
    { id: 'tech', name: 'Tech Dark', tag: 'Developer / Engineer' },
    { id: 'minimal', name: 'Minimal Studio', tag: 'UI/UX / Photo' },
    { id: 'creative', name: 'Creative Bold', tag: 'Design / Media' },
    { id: 'executive', name: 'Executive Pro', tag: 'Freelancer / Lead' },
    { id: 'academic', name: 'Academic Clean', tag: 'Student / Scholar' },
  ];

  const handleCopyLink = () => {
    const slug = (portfolio.name || 'portfolio').toLowerCase().replace(/\s+/g, '-');
    const fakeLiveUrl = `${window.location.origin}?user=${slug}`;
    navigator.clipboard.writeText(fakeLiveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...portfolio.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;
    reorderSections(newSections);
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-white">Studio Customizer</h2>
          </div>
          <button
            onClick={onToggle}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            Close ✕
          </button>
        </div>

        {/* AI Insight Badge if available */}
        {portfolio.theme.aiRecommendationReason && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-[11px] uppercase tracking-wider text-cyan-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Design Match
              </span>
              <button
                onClick={runAIAutoDesign}
                className="underline hover:text-white transition-colors"
              >
                Re-Analyze
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {portfolio.theme.aiRecommendationReason}
            </p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 p-2 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'theme'
                ? 'bg-slate-800 text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Style & Theme
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'sections'
                ? 'bg-slate-800 text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Sections
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-slate-800 text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeTab === 'theme' && (
            <div className="space-y-6">
              {/* Dark / Light Toggle */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateTheme({ mode: 'dark' })}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      portfolio.theme.mode === 'dark'
                        ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Dark Mode
                  </button>
                  <button
                    onClick={() => updateTheme({ mode: 'light' })}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      portfolio.theme.mode === 'light'
                        ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Light Mode
                  </button>
                </div>
              </div>

              {/* Template Selectors */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Portfolio Template
                </label>
                <div className="space-y-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => updateTheme({ template: tpl.id })}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        portfolio.theme.template === tpl.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs">{tpl.name}</div>
                        <div className="text-[10px] text-slate-400">{tpl.tag}</div>
                      </div>
                      {portfolio.theme.template === tpl.id && (
                        <Check className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette Selector */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Color Palette ({Object.keys(palettes).length})
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(palettes).map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => updateTheme({ palette: pal.id })}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        portfolio.theme.palette === pal.id
                          ? 'border-cyan-400 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/20 shadow"
                        style={{ backgroundColor: pal.primary }}
                      />
                      <span className="text-[11px] font-medium truncate">{pal.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography Selector */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Typography Pairing
                </label>
                <div className="space-y-2">
                  {Object.entries(fontPairings).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => updateTheme({ fontPairing: key as FontPairingId })}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        portfolio.theme.fontPairing === key
                          ? 'bg-cyan-500/10 border-cyan-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-400">
                  Manage & Reorder Sections
                </span>
                <button
                  onClick={onOpenEditModal}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Quick Edit Info
                </button>
              </div>

              <div className="space-y-2">
                {portfolio.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`p-1 rounded ${
                          section.enabled
                            ? 'text-cyan-400 hover:text-cyan-300'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title={section.enabled ? 'Hide Section' : 'Show Section'}
                      >
                        {section.enabled ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className={section.enabled ? 'text-white font-medium' : 'text-slate-500 line-through'}>
                        {section.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === portfolio.sections.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-cyan-400 block">Instant Export Tools</span>
                <p>Download your complete portfolio ready to deploy to GitHub Pages, Vercel, Netlify, or print.</p>
              </div>

              {/* Download Standalone HTML */}
              <button
                onClick={() => exportPortfolioAsHTML(portfolio)}
                className="w-full p-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <FileCode className="w-4 h-4" /> Download HTML & CSS Web Bundle
              </button>

              {/* Print to PDF */}
              <button
                onClick={triggerPrintPortfolio}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" /> Print / Save as PDF
              </button>

              {/* Shareable Link */}
              <button
                onClick={handleCopyLink}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                {copiedLink ? 'Link Copied to Clipboard!' : 'Generate Shareable Link'}
              </button>

              {/* Export JSON */}
              <button
                onClick={() => exportPortfolioAsJSON(portfolio)}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white text-xs border border-slate-800 flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Backup Portfolio Data (JSON)
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onOpenEditModal}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Edit Content
          </button>
          <button
            onClick={switchToWizard}
            className="w-full py-2.5 rounded-xl text-slate-400 hover:text-cyan-300 text-xs font-medium transition-colors"
          >
            ← Return to Conversational Questionnaire
          </button>
        </div>
      </aside>
    </>
  );
};

