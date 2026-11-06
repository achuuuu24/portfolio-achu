'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Globe, Award, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/shared/SocialIcons';
import {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
  SocialLinks,
  ContactInfo,
} from '@/types/portfolio';

interface MultiItemStepProps {
  type: 'education' | 'experience' | 'projects' | 'certifications' | 'socials' | 'contact';
  value: any;
  onChange: (val: any) => void;
}

export const MultiItemStep: React.FC<MultiItemStepProps> = ({ type, value, onChange }) => {
  // CONTACT INFO FORM
  if (type === 'contact') {
    const contact: ContactInfo = value || { email: '', phone: '', location: '' };
    return (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
          <input
            type="email"
            value={contact.email || ''}
            onChange={(e) => onChange({ ...contact, email: e.target.value })}
            placeholder="e.g. alex.rivera@example.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              value={contact.phone || ''}
              onChange={(e) => onChange({ ...contact, phone: e.target.value })}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">City & Country</label>
            <input
              type="text"
              value={contact.location || ''}
              onChange={(e) => onChange({ ...contact, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>
    );
  }

  // SOCIAL LINKS FORM
  if (type === 'socials') {
    const socials: SocialLinks = value || {};
    const socialFields = [
      { key: 'linkedin', label: 'LinkedIn URL', icon: LinkedinIcon, placeholder: 'https://linkedin.com/in/username' },
      { key: 'github', label: 'GitHub URL', icon: GithubIcon, placeholder: 'https://github.com/username' },
      { key: 'twitter', label: 'Twitter / X URL', icon: TwitterIcon, placeholder: 'https://x.com/username' },
      { key: 'instagram', label: 'Instagram URL', icon: InstagramIcon, placeholder: 'https://instagram.com/username' },
      { key: 'behance', label: 'Behance URL', icon: Globe, placeholder: 'https://behance.net/username' },
      { key: 'website', label: 'Personal Website URL', icon: Globe, placeholder: 'https://yourwebsite.com' },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {socialFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {field.label}
              </label>
              <input
                type="url"
                value={(socials as any)[field.key] || ''}
                onChange={(e) => onChange({ ...socials, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          );
        })}
      </div>
    );
  }

  // EDUCATION ITEMS
  if (type === 'education') {
    const items: EducationItem[] = value || [];
    const [inst, setInst] = useState('');
    const [deg, setDeg] = useState('');
    const [yr, setYr] = useState('');
    const [desc, setDesc] = useState('');

    const addItem = () => {
      if (!inst.trim() || !deg.trim()) return;
      onChange([
        ...items,
        {
          id: `edu-${Date.now()}`,
          institution: inst.trim(),
          degree: deg.trim(),
          year: yr.trim() || '2020 - 2024',
          description: desc.trim(),
        },
      ]);
      setInst('');
      setDeg('');
      setYr('');
      setDesc('');
    };

    return (
      <div className="space-y-4">
        {/* Added education cards */}
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <h5 className="font-semibold text-white text-xs">{item.degree}</h5>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{item.institution} • {item.year}</p>
              {item.description && <p className="text-xs text-slate-500 mt-1">{item.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-slate-500 hover:text-rose-400 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Add new education form */}
        <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Institution (e.g. Stanford University)"
              value={inst}
              onChange={(e) => setInst(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Degree (e.g. B.S. in Computer Science)"
              value={deg}
              onChange={(e) => setDeg(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Years (e.g. 2020 - 2024)"
              value={yr}
              onChange={(e) => setYr(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Key honors or focus (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
          <button
            type="button"
            onClick={addItem}
            disabled={!inst.trim() || !deg.trim()}
            className="w-full py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add Educational Milestone
          </button>
        </div>
      </div>
    );
  }

  // EXPERIENCE ITEMS
  if (type === 'experience') {
    const items: ExperienceItem[] = value || [];
    const [comp, setComp] = useState('');
    const [role, setRole] = useState('');
    const [period, setPeriod] = useState('');
    const [desc, setDesc] = useState('');

    const addItem = () => {
      if (!comp.trim() || !role.trim()) return;
      onChange([
        ...items,
        {
          id: `exp-${Date.now()}`,
          company: comp.trim(),
          role: role.trim(),
          period: period.trim() || '2022 - Present',
          description: desc.trim(),
        },
      ]);
      setComp('');
      setRole('');
      setPeriod('');
      setDesc('');
    };

    return (
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <h5 className="font-semibold text-white text-xs">{item.role} · <span className="text-cyan-400">{item.company}</span></h5>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{item.period}</p>
              {item.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-slate-500 hover:text-rose-400 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Role / Title (e.g. Senior Frontend Engineer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Company (e.g. Stripe or Google)"
              value={comp}
              onChange={(e) => setComp(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
          <input
            type="text"
            placeholder="Period (e.g. 2022 - Present)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <textarea
            rows={2}
            placeholder="Brief summary of duties and impact..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <button
            type="button"
            onClick={addItem}
            disabled={!comp.trim() || !role.trim()}
            className="w-full py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add Work Experience
          </button>
        </div>
      </div>
    );
  }

  // PROJECTS ITEMS
  if (type === 'projects') {
    const items: ProjectItem[] = value || [];
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tech, setTech] = useState('');
    const [img, setImg] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80');
    const [liveUrl, setLiveUrl] = useState('');

    const addItem = () => {
      if (!title.trim()) return;
      onChange([
        ...items,
        {
          id: `proj-${Date.now()}`,
          title: title.trim(),
          description: desc.trim() || 'A high-impact project showcasing modern engineering.',
          technologies: tech.split(',').map((t) => t.trim()).filter(Boolean),
          image: img,
          liveUrl: liveUrl.trim(),
        },
      ]);
      setTitle('');
      setDesc('');
      setTech('');
      setLiveUrl('');
    };

    return (
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-slate-700" />
              )}
              <div>
                <h5 className="font-semibold text-white text-xs">{item.title}</h5>
                <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                <div className="flex gap-1.5 mt-1">
                  {(item.technologies || []).slice(0, 3).map((t, ti) => (
                    <span key={ti} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-slate-500 hover:text-rose-400 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 space-y-3">
          <input
            type="text"
            placeholder="Project Title (e.g. Nexus AI Platform)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <textarea
            rows={2}
            placeholder="What does it do and what value did it create?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Technologies (comma-separated, e.g. Next.js, Go, Redis)"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="url"
              placeholder="Live Demo or GitHub Link (optional)"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
          <button
            type="button"
            onClick={addItem}
            disabled={!title.trim()}
            className="w-full py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project Showcase
          </button>
        </div>
      </div>
    );
  }

  // CERTIFICATIONS ITEMS
  if (type === 'certifications') {
    const items: CertificationItem[] = value || [];
    const [title, setTitle] = useState('');
    const [issuer, setIssuer] = useState('');
    const [year, setYear] = useState('');

    const addItem = () => {
      if (!title.trim()) return;
      onChange([
        ...items,
        {
          id: `cert-${Date.now()}`,
          title: title.trim(),
          issuer: issuer.trim() || 'Industry Certification',
          year: year.trim() || '2023',
        },
      ]);
      setTitle('');
      setIssuer('');
      setYear('');
    };

    return (
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <div>
                <h5 className="font-semibold text-white text-xs">{item.title}</h5>
                <p className="text-[11px] text-slate-400">{item.issuer} • {item.year}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-slate-500 hover:text-rose-400 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 space-y-3">
          <input
            type="text"
            placeholder="Certificate / Award Title (e.g. AWS Certified Solutions Architect)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Issuing Organization (e.g. Amazon Web Services)"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Year (e.g. 2023)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
          <button
            type="button"
            onClick={addItem}
            disabled={!title.trim()}
            className="w-full py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certificate / Honor
          </button>
        </div>
      </div>
    );
  }

  return null;
};
