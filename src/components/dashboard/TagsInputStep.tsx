'use client';

import React, { useState } from 'react';
import { Plus, X, Sparkles, Sliders } from 'lucide-react';
import { SkillItem } from '@/types/portfolio';

interface TagsInputStepProps {
  isSkillsMode?: boolean;
  value: any[];
  onChange: (items: any[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

export const TagsInputStep: React.FC<TagsInputStepProps> = ({
  isSkillsMode = false,
  value = [],
  onChange,
  suggestions = [],
  placeholder = 'Type and press Enter or click +',
}) => {
  const [inputText, setInputText] = useState('');
  const [activeLevel, setActiveLevel] = useState(85);

  const handleAdd = (textToAdd?: string) => {
    const raw = (textToAdd !== undefined ? textToAdd : inputText).trim();
    if (!raw) return;

    if (isSkillsMode) {
      const skills = (value as SkillItem[]) || [];
      if (!skills.some((s) => s.name.toLowerCase() === raw.toLowerCase())) {
        onChange([
          ...skills,
          {
            id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: raw,
            level: activeLevel,
          },
        ]);
      }
    } else {
      const tags = (value as string[]) || [];
      if (!tags.includes(raw)) {
        onChange([...tags, raw]);
      }
    }

    if (textToAdd === undefined) {
      setInputText('');
    }
  };

  const handleRemove = (indexOrId: number | string) => {
    if (isSkillsMode) {
      onChange((value as SkillItem[]).filter((s) => s.id !== indexOrId && s.name !== indexOrId));
    } else {
      onChange((value as string[]).filter((_, idx) => idx !== indexOrId));
    }
  };

  const handleUpdateSkillLevel = (id: string, newLevel: number) => {
    if (!isSkillsMode) return;
    onChange(
      (value as SkillItem[]).map((s) => (s.id === id ? { ...s, level: newLevel } : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* Input row */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          <button
            type="button"
            onClick={() => handleAdd()}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {isSkillsMode && (
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/40 rounded-lg border border-slate-800 text-xs text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Default proficiency level for new skill:</span>
            <span className="font-semibold text-cyan-400">{activeLevel}%</span>
            <input
              type="range"
              min="40"
              max="100"
              value={activeLevel}
              onChange={(e) => setActiveLevel(Number(e.target.value))}
              className="flex-1 accent-cyan-400 h-1 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Selected Items */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block">
          Added ({value.length})
        </label>
        {value.length === 0 ? (
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 text-center text-xs text-slate-500">
            Nothing added yet. Choose from quick suggestions below or type your own above.
          </div>
        ) : isSkillsMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(value as SkillItem[]).map((skill) => (
              <div
                key={skill.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-xs">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-cyan-400 font-semibold">{skill.level}%</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(skill.id)}
                      className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleUpdateSkillLevel(skill.id, Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(value as string[]).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Quick Add Pills */}
      {suggestions.length > 0 && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Suggestions (Click to Add)
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => {
              const alreadyAdded = isSkillsMode
                ? (value as SkillItem[]).some(
                    (s) => s.name.toLowerCase() === suggestion.toLowerCase()
                  )
                : (value as string[]).includes(suggestion);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !alreadyAdded && handleAdd(suggestion)}
                  disabled={alreadyAdded}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    alreadyAdded
                      ? 'bg-slate-800 text-slate-500 cursor-default opacity-50 line-through'
                      : 'bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40'
                  }`}
                >
                  + {suggestion}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

