'use client';

import React from 'react';
import {
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Award,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Send,
  Sparkles,
  Phone,
} from 'lucide-react';
import { GithubIcon } from '@/components/shared/SocialIcons';
import { PortfolioData } from '@/types/portfolio';
import { palettes, fontPairings } from '@/utils/themeStyles';

interface TemplateProps {
  data: PortfolioData;
}

export const TechDarkTemplate: React.FC<TemplateProps> = ({ data }) => {
  const pal = palettes[data.theme.palette] || palettes.cyan;
  const font = fontPairings[data.theme.fontPairing] || fontPairings.tech;
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
      {/* Top Navbar */}
      <nav
        style={{ borderColor }}
        className="sticky top-0 z-30 backdrop-blur-md border-b bg-opacity-80 px-6 sm:px-12 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: `${pal.primary}20`, borderColor: `${pal.primary}40` }}
            className="w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs"
          >
            <span style={{ color: pal.primary }}>&gt;_</span>
          </div>
          <span className={`font-mono font-bold text-sm sm:text-base tracking-tight`}>
            {data.name || 'Developer'}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-mono">
          {sectionEnabled('about') && (
            <a href="#about" className="hover:opacity-100 opacity-70 transition-opacity">
              // 01. about
            </a>
          )}
          {sectionEnabled('skills') && (
            <a href="#skills" className="hover:opacity-100 opacity-70 transition-opacity">
              // 02. skills
            </a>
          )}
          {sectionEnabled('projects') && (
            <a href="#projects" className="hover:opacity-100 opacity-70 transition-opacity">
              // 03. projects
            </a>
          )}
          {sectionEnabled('experience') && (
            <a href="#experience" className="hover:opacity-100 opacity-70 transition-opacity">
              // 04. experience
            </a>
          )}
          {sectionEnabled('contact') && (
            <a
              href="#contact"
              style={{ borderColor: `${pal.primary}50`, color: pal.primary }}
              className="px-3 py-1.5 rounded-lg border font-semibold hover:bg-white/5 transition-colors"
            >
              contact()
            </a>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 space-y-24">
        {/* HERO SECTION */}
        {sectionEnabled('hero') && (
          <section id="hero" className="pt-6 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div
                style={{ backgroundColor: `${pal.primary}15`, borderColor: `${pal.primary}30`, color: pal.primary }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border"
              >
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: pal.primary }} />
                <span>System.Status: Open to high-impact challenges</span>
              </div>

              <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-none ${font.headingClass}`}>
                Hi, I'm <span style={{ color: pal.primary }}>{data.name || 'Your Name'}</span>
              </h1>

              <div className="text-xl sm:text-2xl font-mono text-slate-400 font-medium">
                &gt; {data.title || 'Full-Stack Software Architect'}
              </div>

              <p className="text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl">
                {data.bio || 'Designing and engineering scalable, resilient web systems and intelligent user interfaces.'}
              </p>

              {/* Location & Contact Pills */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono opacity-80">
                {data.contact.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border" style={{ borderColor }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: pal.primary }} />
                    {data.contact.location}
                  </span>
                )}
                {data.contact.email && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border" style={{ borderColor }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: pal.primary }} />
                    {data.contact.email}
                  </span>
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  style={{ backgroundColor: pal.primary, color: isDark ? '#020617' : '#ffffff' }}
                  className="px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:opacity-90 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Initialize Contact
                </a>
                <a
                  href="#projects"
                  style={{ borderColor }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm border hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4" /> View Repos & Demos
                </a>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div
                  style={{ backgroundColor: pal.primary }}
                  className="absolute -inset-1 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"
                />
                <div
                  style={{ backgroundColor: surfaceBg, borderColor }}
                  className="relative rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b mb-3 text-xs font-mono opacity-60" style={{ borderColor }}>
                    <span>terminal_headshot.png</span>
                    <span>256x256</span>
                  </div>
                  <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-64 sm:w-72 h-64 sm:h-72 object-cover rounded-xl border"
                    style={{ borderColor }}
                  />
                  {data.socialLinks && (
                    <div className="flex items-center justify-center gap-3 pt-4">
                      {data.socialLinks.github && (
                        <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg border hover:opacity-100 opacity-70" style={{ borderColor }}>
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {data.socialLinks.linkedin && (
                        <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg border hover:opacity-100 opacity-70" style={{ borderColor }}>
                          <Layers className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT & GOALS */}
        {sectionEnabled('about') && (
          <section id="about" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: pal.primary }}>01.</span>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
                About & Engineering Philosophy
              </h2>
              <div className="flex-1 h-px ml-4" style={{ backgroundColor: borderColor }} />
            </div>

            <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 sm:p-8 rounded-2xl border space-y-6">
              <p className="text-base sm:text-lg leading-relaxed opacity-90">
                {data.bio}
              </p>

              {data.careerGoals && (
                <div
                  style={{
                    backgroundColor: `${pal.primary}08`,
                    borderLeftColor: pal.primary,
                  }}
                  className="border-l-4 p-4 rounded-r-xl"
                >
                  <h4 className="font-mono text-xs uppercase font-bold tracking-wider mb-1" style={{ color: pal.primary }}>
                    // Career Trajectory & Objectives
                  </h4>
                  <p className="text-sm opacity-85 leading-relaxed">{data.careerGoals}</p>
                </div>
              )}

              {data.hobbies?.length > 0 && (
                <div>
                  <h5 className="font-mono text-xs uppercase font-semibold text-slate-400 mb-2">
                    // Personal Passions & Hobbies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {data.hobbies.map((h, i) => (
                      <span
                        key={i}
                        style={{ borderColor }}
                        className="px-3 py-1 rounded-lg border text-xs font-mono opacity-80"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SKILLS & TOOLS */}
        {sectionEnabled('skills') && (
          <section id="skills" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: pal.primary }}>02.</span>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
                Technical Stack & Skills
              </h2>
              <div className="flex-1 h-px ml-4" style={{ backgroundColor: borderColor }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Proficiency Bars */}
              <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 rounded-2xl border space-y-4">
                <h3 className="font-mono text-sm font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4" style={{ color: pal.primary }} />
                  Core Competencies
                </h3>
                <div className="space-y-3.5">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span>{skill.name}</span>
                        <span style={{ color: pal.primary }}>{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%`, backgroundColor: pal.primary }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Frameworks */}
              <div style={{ backgroundColor: surfaceBg, borderColor }} className="p-6 rounded-2xl border space-y-4">
                <h3 className="font-mono text-sm font-semibold flex items-center gap-2">
                  <Cpu className="w-4 h-4" style={{ color: pal.primary }} />
                  Tools & Production Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: `${pal.primary}12`,
                        borderColor: `${pal.primary}30`,
                        color: pal.primaryLight,
                      }}
                      className="px-3 py-1.5 rounded-lg border text-xs font-mono font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS */}
        {sectionEnabled('projects') && data.projects?.length > 0 && (
          <section id="projects" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: pal.primary }}>03.</span>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
                Featured Deployments & Projects
              </h2>
              <div className="flex-1 h-px ml-4" style={{ backgroundColor: borderColor }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{ backgroundColor: surfaceBg, borderColor }}
                  className="rounded-2xl border overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
                >
                  {proj.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-base group-hover:text-cyan-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs opacity-75 mt-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies?.map((tech, ti) => (
                          <span
                            key={ti}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor }}>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: pal.primary }}
                            className="text-xs font-mono font-semibold flex items-center gap-1 hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono opacity-70 hover:opacity-100 flex items-center gap-1"
                          >
                            <GithubIcon className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {sectionEnabled('experience') && data.experience?.length > 0 && (
          <section id="experience" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: pal.primary }}>04.</span>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>
                Engineering Experience
              </h2>
              <div className="flex-1 h-px ml-4" style={{ backgroundColor: borderColor }} />
            </div>

            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  style={{ backgroundColor: surfaceBg, borderColor }}
                  className="p-6 rounded-2xl border space-y-3 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-lg">
                      {exp.role} <span style={{ color: pal.primary }}>@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono opacity-70 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {exp.period}
                    </span>
                  </div>

                  <p className="text-sm opacity-80 leading-relaxed">{exp.description}</p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {exp.achievements.map((ach, ai) => (
                        <li key={ai} className="text-xs opacity-75 flex items-start gap-2">
                          <span style={{ color: pal.primary }}>▹</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION & CERTIFICATIONS */}
        {(sectionEnabled('education') || sectionEnabled('certifications')) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectionEnabled('education') && data.education?.length > 0 && (
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${font.headingClass}`}>Education</h3>
                {data.education.map((edu) => (
                  <div key={edu.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-5 rounded-xl border space-y-1">
                    <h4 className="font-semibold text-sm">{edu.degree}</h4>
                    <p className="text-xs font-mono" style={{ color: pal.primary }}>{edu.institution}</p>
                    <p className="text-[11px] opacity-60">{edu.year}</p>
                    {edu.description && <p className="text-xs opacity-75 pt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {sectionEnabled('certifications') && data.certifications?.length > 0 && (
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${font.headingClass}`}>Certifications & Honors</h3>
                {data.certifications.map((cert) => (
                  <div key={cert.id} style={{ backgroundColor: surfaceBg, borderColor }} className="p-5 rounded-xl border flex items-center gap-3">
                    <Award className="w-5 h-5 shrink-0" style={{ color: pal.primary }} />
                    <div>
                      <h4 className="font-semibold text-xs">{cert.title}</h4>
                      <p className="text-[11px] opacity-60">{cert.issuer} • {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACT SECTION */}
        {sectionEnabled('contact') && (
          <section id="contact" className="space-y-8 pt-6">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: pal.primary }}>
                // What's Next?
              </span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${font.headingClass}`}>
                Get In Touch
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Whether you have an inquiry, open position, architecture consultation, or just want to discuss distributed tech, my inbox is open!
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Your message has been dispatched.');
                }}
                style={{ backgroundColor: surfaceBg, borderColor }}
                className="p-6 sm:p-8 rounded-2xl border space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                    style={{ borderColor }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                    style={{ borderColor }}
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Your message or collaboration proposal..."
                  className="w-full bg-slate-900 border rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none"
                  style={{ borderColor }}
                />
                <button
                  type="submit"
                  style={{ backgroundColor: pal.primary, color: isDark ? '#020617' : '#ffffff' }}
                  className="w-full py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-90 shadow-lg"
                >
                  Send Transmission
                </button>
              </form>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderColor }} className="border-t py-8 text-center text-xs font-mono opacity-60">
        <p>© {new Date().getFullYear()} {data.name || 'Engineer'}. All rights reserved.</p>
        <p className="mt-1">Generated with PortfoliAI Studio.</p>
      </footer>
    </div>
  );
};
