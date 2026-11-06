'use client';

import React from 'react';
import { ExternalLink, Mail, MapPin, GraduationCap, Award, BookOpen } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';
import { palettes, fontPairings } from '@/utils/themeStyles';

export const AcademicCleanTemplate: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const pal = palettes[data.theme.palette] || palettes.emerald;
  const font = fontPairings[data.theme.fontPairing] || fontPairings.clean;
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
          <GraduationCap className="w-5 h-5" style={{ color: pal.primary }} />
          <span className={`font-bold text-base tracking-tight ${font.headingClass}`}>
            {data.name}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium opacity-80">
          <a href="#education" className="hover:opacity-100">Education</a>
          <a href="#projects" className="hover:opacity-100">Projects</a>
          <a href="#skills" className="hover:opacity-100">Skills</a>
          <a href="#contact" style={{ color: pal.primary }} className="font-semibold">Contact</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {/* HERO */}
        {sectionEnabled('hero') && (
          <section id="hero" className="flex flex-col sm:flex-row items-center gap-8 pt-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 shrink-0 shadow-lg" style={{ borderColor: pal.primary }}>
              <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-3 text-center sm:text-left flex-1">
              <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight ${font.headingClass}`}>
                {data.name}
              </h1>
              <p className="text-lg font-medium" style={{ color: pal.primary }}>
                {data.title}
              </p>
              <p className="text-sm opacity-80 leading-relaxed max-w-xl">{data.bio}</p>
              {data.contact.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs opacity-70">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{data.contact.location}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {sectionEnabled('education') && data.education?.length > 0 && (
          <section id="education" className="space-y-4">
            <h2 className={`text-2xl font-bold border-b pb-2 flex items-center gap-2 ${font.headingClass}`} style={{ borderColor }}>
              <GraduationCap className="w-5 h-5" style={{ color: pal.primary }} />
              Academic Background
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-5 rounded-xl border space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm sm:text-base">{edu.degree}</h3>
                    <span className="text-xs opacity-70">{edu.year}</span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: pal.primary }}>{edu.institution}</p>
                  {edu.description && <p className="text-xs opacity-80 leading-relaxed pt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {sectionEnabled('projects') && data.projects?.length > 0 && (
          <section id="projects" className="space-y-4">
            <h2 className={`text-2xl font-bold border-b pb-2 flex items-center gap-2 ${font.headingClass}`} style={{ borderColor }}>
              <BookOpen className="w-5 h-5" style={{ color: pal.primary }} />
              Projects & Coursework
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-5 rounded-xl border flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm">{proj.title}</h3>
                    <p className="text-xs opacity-75 mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies?.map((tech, ti) => (
                        <span key={ti} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: pal.primary }} className="text-xs font-semibold inline-flex items-center gap-1 hover:underline">
                        View Project <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS & TOOLS */}
        {sectionEnabled('skills') && (
          <section id="skills" className="space-y-4">
            <h2 className={`text-2xl font-bold border-b pb-2 ${font.headingClass}`} style={{ borderColor }}>
              Skills & Methodologies
            </h2>
            <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 rounded-xl border space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s) => (
                  <span key={s.id} style={{ borderColor }} className="px-3 py-1.5 rounded-lg border text-xs font-medium">
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
              {data.tools?.length > 0 && (
                <div className="pt-2 border-t" style={{ borderColor }}>
                  <p className="text-xs opacity-70 mb-2">Technologies & Libraries:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.tools.map((t, idx) => (
                      <span key={idx} style={{ backgroundColor: `${pal.primary}15`, color: pal.primary }} className="px-2.5 py-1 rounded text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CONTACT */}
        {sectionEnabled('contact') && (
          <section id="contact" style={{ backgroundColor: surfaceBg, borderColor }} className="p-8 rounded-xl border text-center space-y-3">
            <h2 className={`text-2xl font-bold ${font.headingClass}`}>Connect & Research Collaboration</h2>
            <p className="text-xs opacity-75 max-w-md mx-auto">Open to full-time roles, internships, and research opportunities.</p>
            <div className="pt-2">
              <a href={`mailto:${data.contact.email}`} style={{ backgroundColor: pal.primary, color: '#ffffff' }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold">
                <Mail className="w-3.5 h-3.5" /> {data.contact.email}
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
