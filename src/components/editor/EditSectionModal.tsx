'use client';

import React, { useState } from 'react';
import { X, Save, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({ isOpen, onClose }) => {
  const { portfolio, updatePortfolio } = usePortfolio();

  const [formData, setFormData] = useState({
    name: portfolio.name,
    title: portfolio.title,
    bio: portfolio.bio,
    avatar: portfolio.avatar,
    email: portfolio.contact.email,
    phone: portfolio.contact.phone || '',
    location: portfolio.contact.location || '',
    careerGoals: portfolio.careerGoals || '',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    updatePortfolio({
      name: formData.name,
      title: formData.title,
      bio: formData.bio,
      avatar: formData.avatar,
      contact: {
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      },
      careerGoals: formData.careerGoals,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm sm:text-base">
              Quick Content Editor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Professional Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Short Introduction / Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Profile Image URL</label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Career Goals & Vision</label>
            <textarea
              rows={2}
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

