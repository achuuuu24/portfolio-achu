'use client';

import React from 'react';
import {
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Send,
  Globe,
  Award,
} from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';
import { palettes, fontPairings } from '@/utils/themeStyles';

export const MinimalStudioTemplate: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const pal = palettes[data.theme.palette] || palettes.violet;
  const font = fontPairings[data.theme.fontPairing] || fontPairings.editorial;
  const isDark = data.theme.mode === 'dark';

  const sectionEnabled = (id: string) =>
    data.sections.find((s) => s.id === id)?.enabled ?? true;

  const bgStyle = isDark
    ? { backgroundColor: pal.bgDark, color: '#f8fafc' }
    : { backgroundColor: pal.bgLight, color: '#171717' };

  const surfaceBg = isDark ? pal.surfaceDark : pal.surfaceLight;
  const borderColor = isDark ? pal.surfaceBorderDark : pal.surfaceBorderLight;

  return (
    <div style={bgStyle} className={`min-h-screen ${font.bodyClass} transition-colors duration-300`}>
      {/* Editorial Header */}
      <header
        style={{ borderColor }}
        className="sticky top-0 z-30 backdrop-blur-xl border-b bg-opacity-70 px-8 sm:px-16 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className={`text-lg sm:text-xl font-bold tracking-tight ${font.headingClass}`}>
            {data.name || 'Studio'}
          </span>
          <span className="text-[11px] uppercase tracking-widest opacity-60">/ Portfolio</span>
        </div>

        <div className="hidden sm:flex items-center gap-8 text-xs uppercase tracking-widest opacity-80">
          {sectionEnabled('about') && <a href="#about" className="hover:opacity-100 transition-opacity">About</a>}
          {sectionEnabled('projects') && <a href="#works" className="hover:opacity-100 transition-opacity">Selected Works</a>}
          {sectionEnabled('skills') && <a href="#skills" className="hover:opacity-100 transition-opacity">Expertise</a>}
          {sectionEnabled('experience') && <a href="#journey" className="hover:opacity-100 transition-opacity">Journey</a>}
          {sectionEnabled('contact') && (
            <a
              href="#contact"
              style={{ backgroundColor: pal.primary, color: isDark ? '#ffffff' : '#ffffff' }}
              className="px-4 py-1.5 rounded-full font-semibold transition-all hover:scale-105"
            >
              Contact
            </a>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-16 py-16 space-y-32">
        {/* HERO SECTION */}
        {sectionEnabled('hero') && (
          <section id="hero" className="space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-wider" style={{ borderColor }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: pal.primary }} />
              <span>Available for Creative Collaborations & Directorship</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h1 className={`text-4xl sm:text-7xl font-semibold leading-[1.08] tracking-tight ${font.headingClass}`}>
                  {data.name || 'Your Name'}
                </h1>

                <p className="text-xl sm:text-3xl font-light opacity-80 leading-relaxed" style={{ color: pal.primary }}>
                  {data.title || 'Product & Interaction Designer'}
                </p>

                <p className="text-base sm:text-xl font-normal opacity-75 max-w-2xl leading-relaxed">
                  {data.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#contact"
                    style={{ backgroundColor: pal.primary, color: '#ffffff' }}
                    className="px-8 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90 flex items-center gap-2"
                  >
                    Discuss a Project <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#works"
                    style={{ borderColor }}
                    className="px-8 py-3.5 rounded-full font-medium text-sm border hover:bg-white/5 transition-all"
                  >
                    Explore Gallery
                  </a>
                </div>
              </div>

              {/* Portrait */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative">
                  <div
                    style={{ borderColor }}
                    className="w-64 h-80 sm:w-72 sm:h-96 rounded-[32px] overflow-hidden border-2 shadow-2xl relative"
                  >
                    <img
                      src={data.avatar}
                      alt={data.name}
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </div>
                  {data.contact.location && (
                    <div
                      style={{ backgroundColor: surfaceBg, borderColor }}
                      className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl border shadow-lg flex items-center gap-2 text-xs"
                    >
                      <MapPin className="w-3.5 h-3.5" style={{ color: pal.primary }} />
                      <span>{data.contact.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FEATURED WORKS GALLERY */}
        {sectionEnabled('projects') && data.projects?.length > 0 && (
          <section id="works" className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6" style={{ borderColor }}>
              <div>
                <span className="text-xs uppercase tracking-widest opacity-60">Portfolio Archive</span>
                <h2 className={`text-3xl sm:text-5xl font-semibold mt-1 ${font.headingClass}`}>
                  Selected Works
                </h2>
              </div>
              <p className="text-sm opacity-60 max-w-xs">
                A curation of strategic digital products, physical mediums, and experiential spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  style={{ backgroundColor: surfaceBg, borderColor }}
                  className="rounded-3xl border overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                >
                  {proj.image && (
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white">
                        0{idx + 1}
                      </div>
                    </div>
                  )}

                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-xl sm:text-2xl font-bold ${font.headingClass}`}>
                        {proj.title}
                      </h3>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: pal.primary, borderColor }}
                          className="p-2 rounded-full border hover:scale-110 transition-transform"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm opacity-75 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.technologies?.map((tech, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-3 py-1 rounded-full border opacity-75"
                          style={{ borderColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERTISE & CRAFT */}
        {sectionEnabled('skills') && (
          <section id="skills" className="space-y-12">
            <div className="border-b pb-6" style={{ borderColor }}>
              <span className="text-xs uppercase tracking-widest opacity-60">Capabilities</span>
              <h2 className={`text-3xl sm:text-5xl font-semibold mt-1 ${font.headingClass}`}>
                Expertise & Toolkit
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold opacity-60">Core Disciplines</h3>
                <div className="space-y-4">
                  {data.skills.map((s) => (
                    <div key={s.id} className="pb-3 border-b flex justify-between items-center" style={{ borderColor }}>
                      <span className="text-base font-medium">{s.name}</span>
                      <span className="text-xs opacity-60">{s.level}% Mastery</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold opacity-60">Software & Tools</h3>
                <div className="flex flex-wrap gap-2.5">
                  {data.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      style={{ borderColor }}
                      className="px-4 py-2 rounded-full border text-xs font-medium hover:border-violet-400 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {data.hobbies?.length > 0 && (
                  <div className="pt-6">
                    <h3 className="text-xs uppercase tracking-widest font-semibold opacity-60 mb-3">
                      Interests & Creative Inspiration
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.hobbies.map((h, hi) => (
                        <span
                          key={hi}
                          style={{ backgroundColor: `${pal.primary}10`, color: pal.primary }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* JOURNEY & EXPERIENCE */}
        {sectionEnabled('experience') && data.experience?.length > 0 && (
          <section id="journey" className="space-y-12">
            <div className="border-b pb-6" style={{ borderColor }}>
              <span className="text-xs uppercase tracking-widest opacity-60">Chronology</span>
              <h2 className={`text-3xl sm:text-5xl font-semibold mt-1 ${font.headingClass}`}>
                Professional Journey
              </h2>
            </div>

            <div className="space-y-10">
              {data.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b" style={{ borderColor }}>
                  <div className="md:col-span-4">
                    <span className="text-xs uppercase tracking-widest opacity-60">{exp.period}</span>
                    <h3 className={`text-xl font-bold mt-1 ${font.headingClass}`}>{exp.company}</h3>
                    <p className="text-sm opacity-80" style={{ color: pal.primary }}>{exp.role}</p>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <p className="text-sm sm:text-base opacity-85 leading-relaxed">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="space-y-1 text-xs sm:text-sm opacity-70 list-disc pl-5">
                        {exp.achievements.map((ach, ai) => (
                          <li key={ai}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INQUIRIES & CONTACT */}
        {sectionEnabled('contact') && (
          <section id="contact" className="py-12 border-t" style={{ borderColor }}>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <span className="text-xs uppercase tracking-widest opacity-60">Inquiries & Availability</span>
              <h2 className={`text-4xl sm:text-6xl font-semibold tracking-tight ${font.headingClass}`}>
                Let's Create Together
              </h2>
              <p className="text-base opacity-80 leading-relaxed">
                Currently taking on select commissions, design leadership roles, and ambitious creative collaborations.
              </p>
              <div className="pt-4">
                <a
                  href={`mailto:${data.contact.email}`}
                  style={{ backgroundColor: pal.primary, color: '#ffffff' }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-xl"
                >
                  <Mail className="w-4 h-4" /> {data.contact.email}
                </a>
              </div>
            </div>
          </section>
        )}
      </div>

      <footer style={{ borderColor }} className="border-t py-12 text-center text-xs opacity-60">
        <p>© {new Date().getFullYear()} {data.name}. Curated with PortfoliAI Studio.</p>
      </footer>
    </div>
  );
};
