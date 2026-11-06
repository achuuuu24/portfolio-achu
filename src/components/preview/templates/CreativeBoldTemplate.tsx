'use client';

import React from 'react';
import { ExternalLink, Sparkles, Send, Mail, MapPin, ArrowRight, Award } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';
import { palettes, fontPairings } from '@/utils/themeStyles';

export const CreativeBoldTemplate: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const pal = palettes[data.theme.palette] || palettes.amber;
  const font = fontPairings[data.theme.fontPairing] || fontPairings.creative;
  const isDark = data.theme.mode === 'dark';

  const sectionEnabled = (id: string) =>
    data.sections.find((s) => s.id === id)?.enabled ?? true;

  const bgStyle = isDark
    ? { backgroundColor: pal.bgDark, color: '#ffffff' }
    : { backgroundColor: pal.bgLight, color: '#0f172a' };

  const surfaceBg = isDark ? pal.surfaceDark : pal.surfaceLight;
  const borderColor = isDark ? pal.surfaceBorderDark : pal.surfaceBorderLight;

  return (
    <div style={bgStyle} className={`min-h-screen ${font.bodyClass} transition-colors duration-300 overflow-x-hidden`}>
      {/* Top Banner */}
      <nav style={{ borderColor }} className="border-b px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pal.primary }} />
          <span className={`text-xl font-black uppercase tracking-tighter ${font.headingClass}`}>
            {data.name || 'CREATIVE'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <a
            href="#contact"
            style={{ backgroundColor: pal.primary, color: '#000000' }}
            className="px-5 py-2.5 rounded-full font-black hover:opacity-90 transition-opacity"
          >
            LET'S TALK
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 space-y-28">
        {/* HERO SECTION */}
        {sectionEnabled('hero') && (
          <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-8 space-y-6">
              <div
                style={{ backgroundColor: `${pal.primary}20`, borderColor: `${pal.primary}40`, color: pal.primaryLight }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
              >
                <Sparkles className="w-4 h-4" />
                <span>Creative Director & Builder</span>
              </div>

              <h1 className={`text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-[0.95] ${font.headingClass}`}>
                {data.name || 'Your Name'}
              </h1>

              <div
                style={{ color: pal.primary }}
                className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight"
              >
                {data.title || 'Creative Specialist'}
              </div>

              <p className="text-base sm:text-xl opacity-80 max-w-2xl font-medium leading-relaxed">
                {data.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  style={{ backgroundColor: pal.primary, color: '#000000' }}
                  className="px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-wider flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl"
                >
                  Explore Work <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  style={{ borderColor }}
                  className="px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-wider border hover:bg-white/10 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div
                  style={{ backgroundColor: pal.primary, borderColor: pal.primary }}
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4"
                >
                  <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {sectionEnabled('projects') && data.projects?.length > 0 && (
          <section id="projects" className="space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: pal.primary }}>
                01 // SHOWCASE
              </span>
              <h2 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter ${font.headingClass}`}>
                FEATURED WORK
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{ backgroundColor: surfaceBg, borderColor }}
                  className="rounded-3xl border overflow-hidden p-6 space-y-4 hover:border-amber-400 transition-colors group"
                >
                  {proj.image && (
                    <div className="aspect-video rounded-2xl overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <h3 className={`text-2xl font-black uppercase ${font.headingClass}`}>
                    {proj.title}
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies?.map((tech, ti) => (
                      <span
                        key={ti}
                        style={{ backgroundColor: `${pal.primary}15`, color: pal.primary }}
                        className="text-xs font-bold px-3 py-1 rounded-lg uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: pal.primary }}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline pt-2"
                    >
                      Launch Live <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS & ARSENAL */}
        {sectionEnabled('skills') && (
          <section id="skills" className="space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: pal.primary }}>
                02 // CAPABILITIES
              </span>
              <h2 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter ${font.headingClass}`}>
                CREATIVE ARSENAL
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-8 rounded-3xl border space-y-4">
                <h3 className="font-bold text-lg uppercase tracking-wider">Top Competencies</h3>
                <div className="space-y-4">
                  {data.skills.map((s) => (
                    <div key={s.id} className="space-y-1">
                      <div className="flex justify-between font-bold text-xs uppercase">
                        <span>{s.name}</span>
                        <span style={{ color: pal.primary }}>{s.level}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.level}%`, backgroundColor: pal.primary }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-8 rounded-3xl border space-y-4">
                <h3 className="font-bold text-lg uppercase tracking-wider">Tools of the Trade</h3>
                <div className="flex flex-wrap gap-2.5">
                  {data.tools.map((t, idx) => (
                    <span
                      key={idx}
                      style={{ borderColor }}
                      className="px-4 py-2 rounded-xl border text-xs font-black uppercase hover:bg-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {sectionEnabled('contact') && (
          <section id="contact" style={{ backgroundColor: surfaceBg, borderColor }} className="p-8 sm:p-14 rounded-3xl border text-center space-y-6">
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: pal.primary }}>
              READY TO COLLABORATE?
            </span>
            <h2 className={`text-4xl sm:text-7xl font-black uppercase tracking-tighter ${font.headingClass}`}>
              LET'S MAKE WAVES
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">
              Have an ambitious vision or project? Drop me a message directly.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${data.contact.email}`}
                style={{ backgroundColor: pal.primary, color: '#000000' }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl"
              >
                <Mail className="w-5 h-5" /> {data.contact.email}
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
