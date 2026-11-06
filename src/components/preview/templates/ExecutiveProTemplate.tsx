'use client';

import React from 'react';
import { ExternalLink, Mail, MapPin, Calendar, Award, CheckCircle, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';
import { palettes, fontPairings } from '@/utils/themeStyles';

export const ExecutiveProTemplate: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const pal = palettes[data.theme.palette] || palettes.indigo;
  const font = fontPairings[data.theme.fontPairing] || fontPairings.modern;
  const isDark = data.theme.mode === 'dark';

  const sectionEnabled = (id: string) =>
    data.sections.find((s) => s.id === id)?.enabled ?? true;

  const bgStyle = isDark
    ? { backgroundColor: pal.bgDark, color: '#f8fafc' }
    : { backgroundColor: pal.bgLight, color: '#0f172a' };

  const surfaceBg = isDark ? pal.surfaceDark : pal.surfaceLight;
  const borderColor = isDark ? pal.surfaceBorderDark : pal.surfaceBorderLight;

  return (
    <div style={bgStyle} className={`min-h-screen ${font.bodyClass} transition-colors duration-300`}>
      <header style={{ borderColor }} className="sticky top-0 z-30 backdrop-blur-md border-b bg-opacity-80 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div style={{ backgroundColor: pal.primary }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {data.name?.charAt(0) || 'E'}
          </div>
          <span className={`font-bold text-base tracking-tight ${font.headingClass}`}>
            {data.name || 'Executive'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            style={{ backgroundColor: pal.primary, color: '#ffffff' }}
            className="px-5 py-2 rounded-lg font-semibold text-xs tracking-wide shadow-md transition-all hover:opacity-95"
          >
            Consultation / Hire
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 space-y-24">
        {/* HERO */}
        {sectionEnabled('hero') && (
          <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            <div className="md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Independent Specialist & Advisor</span>
              </div>

              <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight ${font.headingClass}`}>
                {data.name}
              </h1>

              <div style={{ color: pal.primary }} className="text-xl sm:text-2xl font-semibold">
                {data.title}
              </div>

              <p className="text-base sm:text-lg opacity-80 leading-relaxed max-w-xl">
                {data.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  style={{ backgroundColor: pal.primary, color: '#ffffff' }}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center gap-2 shadow-lg"
                >
                  Book Discovery Call <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#experience"
                  style={{ borderColor }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm border hover:bg-white/5 transition-all"
                >
                  Review Track Record
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 shadow-xl" style={{ borderColor }}>
                <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        )}

        {/* EXPERIENCE / TRACK RECORD */}
        {sectionEnabled('experience') && data.experience?.length > 0 && (
          <section id="experience" className="space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
              Leadership & Advisory Track Record
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 rounded-xl border space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">{exp.role}</h3>
                      <p className="text-xs font-semibold" style={{ color: pal.primary }}>{exp.company} • {exp.period}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80 pt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS / CASE STUDIES */}
        {sectionEnabled('projects') && data.projects?.length > 0 && (
          <section id="projects" className="space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
              High-Impact Case Studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 rounded-xl border space-y-3">
                  {proj.image && <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover rounded-lg" />}
                  <h3 className="font-bold text-lg">{proj.title}</h3>
                  <p className="text-xs opacity-80 leading-relaxed">{proj.description}</p>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: pal.primary }} className="text-xs font-semibold inline-flex items-center gap-1 hover:underline">
                      View Engagement <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {sectionEnabled('contact') && (
          <section id="contact" style={{ backgroundColor: surfaceBg, borderColor }} className="p-8 rounded-2xl border text-center space-y-4">
            <h2 className={`text-2xl sm:text-3xl font-bold ${font.headingClass}`}>Ready to Elevate Your Outcomes?</h2>
            <p className="text-sm opacity-80 max-w-lg mx-auto">Direct advisory engagements, interim leadership, and strategic consultations.</p>
            <div className="pt-2">
              <a href={`mailto:${data.contact.email}`} style={{ backgroundColor: pal.primary, color: '#ffffff' }} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" /> {data.contact.email}
              </a>
            </div>
          </section>
        )}
      </div>

      <footer style={{ borderColor }} className="border-t py-8 text-center text-xs opacity-60">
        <p>© {new Date().getFullYear()} {data.name}. Generated with PortfoliAI Studio.</p>
      </footer>
    </div>
  );
};

