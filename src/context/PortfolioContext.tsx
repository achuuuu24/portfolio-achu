'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  ThemeConfig,
  SectionConfig,
  DeviceMode,
} from '@/types/portfolio';
import { initialEmptyPortfolio, demoPresets } from '@/data/defaultPortfolio';
import { portfolioQuestions } from '@/data/questions';
import { analyzePortfolio } from '@/utils/aiAnalyzer';

interface PortfolioContextType {
  portfolio: PortfolioData;
  currentStepIndex: number;
  totalSteps: number;
  activeView: 'wizard' | 'preview';
  deviceMode: DeviceMode;
  lastAIFeedback: string | null;
  isGenerating: boolean;
  setAnswer: (key: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  skipStep: () => void;
  loadPreset: (presetKey: 'developer' | 'designer' | 'photographer') => void;
  resetPortfolio: () => void;
  updatePortfolio: (updater: Partial<PortfolioData> | ((prev: PortfolioData) => PortfolioData)) => void;
  updateTheme: (partialTheme: Partial<ThemeConfig>) => void;
  toggleSection: (id: string) => void;
  reorderSections: (newSections: SectionConfig[]) => void;
  runAIAutoDesign: () => void;
  switchToPreview: () => void;
  switchToWizard: () => void;
  setDeviceMode: (mode: DeviceMode) => void;
  dismissFeedback: () => void;
}

const STORAGE_KEY = 'portfoliai_user_state_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialEmptyPortfolio);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'wizard' | 'preview'>('wizard');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [lastAIFeedback, setLastAIFeedback] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Restore saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.portfolio) setPortfolio(parsed.portfolio);
        if (typeof parsed.currentStepIndex === 'number') setCurrentStepIndex(parsed.currentStepIndex);
        if (parsed.activeView) setActiveView(parsed.activeView);
      }
    } catch (e) {
      console.warn('Failed to restore saved portfolio state', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          portfolio,
          currentStepIndex,
          activeView,
        })
      );
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }, [portfolio, currentStepIndex, activeView, isInitialized]);

  const currentQuestion = portfolioQuestions[currentStepIndex];

  const setAnswer = (key: string, value: any) => {
    setPortfolio((prev) => {
      if (key === 'location') {
        return {
          ...prev,
          contact: {
            ...prev.contact,
            location: value,
          },
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const advanceWithFeedback = (val?: any) => {
    const feedback = currentQuestion?.aiFeedbackAfter
      ? currentQuestion.aiFeedbackAfter(val)
      : 'Saved! Moving to the next question...';
    setLastAIFeedback(feedback);

    if (currentStepIndex < portfolioQuestions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed all questions! Run AI design selection and transition to preview!
      finishAndGenerate();
    }
  };

  const nextStep = () => {
    const currentValue = (portfolio as any)[currentQuestion.key];
    advanceWithFeedback(currentValue);
  };

  const skipStep = () => {
    setLastAIFeedback(`Skipped "${currentQuestion.question}". You can always add this later in the editor!`);
    if (currentStepIndex < portfolioQuestions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      finishAndGenerate();
    }
  };

  const prevStep = () => {
    setLastAIFeedback(null);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < portfolioQuestions.length) {
      setCurrentStepIndex(index);
      setActiveView('wizard');
    }
  };

  const finishAndGenerate = () => {
    setIsGenerating(true);
    // Analyze and select best design
    const analysis = analyzePortfolio(portfolio);
    setTimeout(() => {
      setPortfolio((prev) => ({
        ...prev,
        theme: analysis.theme,
      }));
      setIsGenerating(false);
      setActiveView('preview');
      setLastAIFeedback(
        `🎉 Portfolio Generated! Our AI selected the "${analysis.theme.template.toUpperCase()}" template with "${analysis.theme.palette.toUpperCase()}" palette based on your craft as ${analysis.detectedCategory}.`
      );
    }, 700);
  };

  const runAIAutoDesign = () => {
    const analysis = analyzePortfolio(portfolio);
    setPortfolio((prev) => ({
      ...prev,
      theme: analysis.theme,
    }));
    setLastAIFeedback(analysis.theme.aiRecommendationReason || 'Smart theme applied!');
  };

  const loadPreset = (presetKey: 'developer' | 'designer' | 'photographer') => {
    const preset = demoPresets[presetKey];
    if (preset) {
      setPortfolio(preset);
      setActiveView('preview');
      setLastAIFeedback(`Loaded sample portfolio for ${preset.name} (${preset.title})!`);
    }
  };

  const resetPortfolio = () => {
    if (confirm('Are you sure you want to start over? This will reset all questions.')) {
      setPortfolio(initialEmptyPortfolio);
      setCurrentStepIndex(0);
      setActiveView('wizard');
      setLastAIFeedback(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updatePortfolio = (
    updater: Partial<PortfolioData> | ((prev: PortfolioData) => PortfolioData)
  ) => {
    setPortfolio((prev) => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }));
  };

  const updateTheme = (partialTheme: Partial<ThemeConfig>) => {
    setPortfolio((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...partialTheme,
      },
    }));
  };

  const toggleSection = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    }));
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setPortfolio((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const switchToPreview = () => setActiveView('preview');
  const switchToWizard = () => setActiveView('wizard');
  const dismissFeedback = () => setLastAIFeedback(null);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        currentStepIndex,
        totalSteps: portfolioQuestions.length,
        activeView,
        deviceMode,
        lastAIFeedback,
        isGenerating,
        setAnswer,
        nextStep,
        prevStep,
        goToStep,
        skipStep,
        loadPreset,
        resetPortfolio,
        updatePortfolio,
        updateTheme,
        toggleSection,
        reorderSections,
        runAIAutoDesign,
        switchToPreview,
        switchToWizard,
        setDeviceMode,
        dismissFeedback,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

