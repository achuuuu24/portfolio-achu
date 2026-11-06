'use client';

import React, { useRef, useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploadStepProps {
  value: string;
  onChange: (url: string) => void;
  suggestions?: string[];
}

export const ImageUploadStep: React.FC<ImageUploadStepProps> = ({
  value,
  onChange,
  suggestions = [],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Preview & Drop Area */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 backdrop-blur-sm">
        <div className="relative group shrink-0">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20 bg-slate-800 flex items-center justify-center">
            {value ? (
              <img src={value} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-10 h-10 text-slate-500" />
            )}
          </div>
          {value && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-white font-medium text-base mb-1">Upload Your Headshot</h4>
          <p className="text-slate-400 text-xs mb-4">
            Supports PNG, JPG, WebP. Recommended square aspect ratio (1:1).
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Upload className="w-3.5 h-3.5" />
              Choose File from Device
            </button>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer border ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
              }`}
            >
              or Drag & Drop Image Here
            </div>
          </div>
        </div>
      </div>

      {/* Preset Professional Avatars */}
      {suggestions.length > 0 && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Or Choose from High-Res Curated Presets
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {suggestions.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(url)}
                className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                  value === url
                    ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/30'
                    : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                {value === url && (
                  <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white stroke-[3] drop-shadow" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Direct URL input */}
      <div className="pt-2">
        <label className="text-xs text-slate-400 block mb-1.5">Or Paste Direct Image Web URL:</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="button"
            onClick={() => {
              if (customUrl.trim()) onChange(customUrl.trim());
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Apply URL
          </button>
        </div>
      </div>
    </div>
  );
};

