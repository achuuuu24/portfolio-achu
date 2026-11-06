'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  SkipForward,
  Eye,
  RotateCcw,
  Bot,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { portfolioQuestions } from '@/data/questions';
import { ImageUploadStep } from './ImageUploadStep';
import { TagsInputStep } from './TagsInputStep';
import { MultiItemStep } from './MultiItemStep';

export const ConversationalWizard: React.FC = () => {
  const {
    portfolio,
    currentStepIndex,
    totalSteps,
    lastAIFeedback,
    setAnswer,
    nextStep,
    prevStep,
    skipStep,
    loadPreset,
    resetPortfolio,
    switchToPreview,
  } = usePortfolio();

  const currentQ = portfolioQuestions[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Retrieve current value for this step's key
  const getCurrentValue = () => {
    if (currentQ.key === 'location') return portfolio.contact.location;
    return (portfolio as any)[currentQ.key];
  };

  const currentValue = getCurrentValue();

  // Validate if step can proceed
  const canProceed = () => {
    if (currentQ.isOptional) return true;
    if (currentQ.key === 'name') return Boolean(portfolio.name?.trim());
    if (currentQ.key === 'title') return Boolean(portfolio.title?.trim());
    if (currentQ.key === 'contact') return Boolean(portfolio.contact?.email?.trim());
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
              Portfoli<span className="text-cyan-400">AI</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Studio Generator
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Conversational Portfolio Builder
            </p>
          </div>
        </div>

        {/* Quick Tools & Presets */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            <span className="text-slate-400 px-2 flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" /> Demo Presets:
            </span>
            <button
              onClick={() => loadPreset('developer')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-[11px] font-medium transition-colors"
            >
              Developer
            </button>
            <button
              onClick={() => loadPreset('designer')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-[11px] font-medium transition-colors"
            >
              UI/UX Designer
            </button>
            <button
              onClick={() => loadPreset('photographer')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-[11px] font-medium transition-colors"
            >
              Photographer
            </button>
          </div>

          <button
            onClick={switchToPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:border-cyan-400/50"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={resetPortfolio}
            title="Reset All"
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Conversation Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        {/* Progress Bar Header */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 tracking-wide uppercase">
              Question {currentStepIndex + 1} of {totalSteps}
            </span>
            <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-sm shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* AI Companion Message Bubble */}
        <div className="mb-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex items-start gap-3.5 animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                PortfoliAI Designer
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {lastAIFeedback ? (
                <span className="text-cyan-300 font-medium">{lastAIFeedback}</span>
              ) : (
                currentQ.aiMessage
              )}
            </p>
          </div>
        </div>

        {/* Current Question Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Step #{currentQ.id}
              </span>
              {currentQ.isOptional && (
                <span className="text-xs text-slate-500 italic">Optional question</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {currentQ.question}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              {currentQ.subtext}
            </p>
          </div>

          {/* Dynamic Input Control based on Question inputType */}
          <div className="space-y-4">
            {currentQ.inputType === 'text' && (
              <div className="space-y-3">
                <input
                  type="text"
                  autoFocus
                  value={currentValue || ''}
                  onChange={(e) => setAnswer(currentQ.key, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed()) {
                      e.preventDefault();
                      nextStep();
                    }
                  }}
                  placeholder={currentQ.placeholder}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-5 py-4 text-base text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                />

                {currentQ.suggestions && currentQ.suggestions.length > 0 && (
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Suggested Choices:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentQ.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAnswer(currentQ.key, suggestion)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            currentValue === suggestion
                              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                              : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentQ.inputType === 'textarea' && (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  autoFocus
                  value={currentValue || ''}
                  onChange={(e) => setAnswer(currentQ.key, e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner leading-relaxed"
                />
                {currentQ.suggestions && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Inspiration Starters:
                    </label>
                    {currentQ.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAnswer(currentQ.key, s)}
                        className="text-left w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-white transition-all line-clamp-2"
                      >
                        "{s}"
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentQ.inputType === 'image' && (
              <ImageUploadStep
                value={currentValue}
                onChange={(url) => setAnswer(currentQ.key, url)}
                suggestions={currentQ.suggestions}
              />
            )}

            {currentQ.inputType === 'tags' && (
              <TagsInputStep
                isSkillsMode={currentQ.key === 'skills'}
                value={currentValue}
                onChange={(tags) => setAnswer(currentQ.key, tags)}
                suggestions={currentQ.suggestions}
                placeholder={currentQ.placeholder}
              />
            )}

            {['contact', 'socials', 'education', 'experience', 'projects', 'certifications'].includes(
              currentQ.inputType
            ) && (
              <MultiItemStep
                type={currentQ.inputType as any}
                value={currentValue}
                onChange={(val) => setAnswer(currentQ.key, val)}
              />
            )}
          </div>

          {/* Action Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              {currentQ.isOptional && (
                <button
                  type="button"
                  onClick={skipStep}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" /> Skip Question
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              {currentStepIndex === totalSteps - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" /> Generate My Portfolio
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        PortfoliAI • Intelligent Portfolio Generation Studio
      </footer>
    </div>
  );
};

