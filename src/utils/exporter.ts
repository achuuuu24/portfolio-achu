import { PortfolioData } from '@/types/portfolio';
import { palettes } from './themeStyles';

export function exportPortfolioAsHTML(data: PortfolioData): void {
  const pal = palettes[data.theme.palette] || palettes.cyan;
  const isDark = data.theme.mode === 'dark';
  const bgColor = isDark ? pal.bgDark : pal.bgLight;
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const surfaceColor = isDark ? pal.surfaceDark : pal.surfaceLight;
  const borderColor = isDark ? pal.surfaceBorderDark : pal.surfaceBorderLight;
  const mutedText = isDark ? '#94a3b8' : '#64748b';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.title}</title>
  <meta name="description" content="${data.bio.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: ${bgColor};
      color: ${textColor};
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    nav {
      position: sticky; top: 0; z-index: 50;
      background: ${isDark ? 'rgba(9, 13, 22, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
      backdrop-filter: blur(12px);
      border-bottom: 1px solid ${borderColor};
      padding: 16px 0;
    }
    .nav-inner { display: flex; justify-content: space-between; align-items: center; }
    .brand { font-weight: 700; font-size: 1.15rem; color: ${textColor}; text-decoration: none; }
    .nav-links a {
      color: ${mutedText}; text-decoration: none; margin-left: 20px; font-size: 0.9rem; font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: ${pal.primary}; }
    .hero {
      padding: 90px 0 60px;
      display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center;
    }
    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; text-align: center; }
      .nav-links { display: none; }
    }
    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600;
      background: ${pal.glowColor}; color: ${pal.primary}; border: 1px solid ${pal.primary}40;
      margin-bottom: 20px;
    }
    h1 { font-size: 3rem; line-height: 1.15; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
    .headline { font-size: 1.35rem; color: ${pal.primary}; font-weight: 600; margin-bottom: 20px; }
    .bio { font-size: 1.05rem; color: ${mutedText}; line-height: 1.7; margin-bottom: 28px; }
    .btn-group { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn-primary {
      background: ${pal.primary}; color: ${isDark ? '#020617' : '#ffffff'};
      padding: 12px 26px; border-radius: 8px; font-weight: 600; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s, opacity 0.2s;
    }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
    .btn-secondary {
      background: transparent; color: ${textColor}; border: 1px solid ${borderColor};
      padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;
      transition: background 0.2s;
    }
    .btn-secondary:hover { background: ${isDark ? '#1e293b' : '#f1f5f9'}; }
    .avatar-wrapper { position: relative; text-align: center; }
    .avatar {
      width: 280px; height: 280px; object-fit: cover; border-radius: 24px;
      box-shadow: 0 20px 40px ${pal.glowColor};
      border: 3px solid ${pal.primary}40;
    }
    section { padding: 60px 0; border-top: 1px solid ${borderColor}; }
    .section-title { font-size: 1.85rem; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
    .section-subtitle { color: ${mutedText}; font-size: 0.95rem; margin-bottom: 36px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .card {
      background: ${surfaceColor}; border: 1px solid ${borderColor}; border-radius: 14px;
      padding: 24px; transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-4px); border-color: ${pal.primary}60; }
    .project-img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px; }
    .tech-pill {
      display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;
      background: ${isDark ? '#1e293b' : '#f1f5f9'}; color: ${textColor}; margin: 3px;
    }
    .skill-bar-wrap { margin-bottom: 16px; }
    .skill-bar-label { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
    .skill-bar-bg { height: 8px; background: ${isDark ? '#1e293b' : '#e2e8f0'}; border-radius: 9999px; overflow: hidden; }
    .skill-bar-fill { height: 100%; background: ${pal.primary}; border-radius: 9999px; }
    .timeline-item { border-left: 2px solid ${borderColor}; padding-left: 20px; margin-bottom: 28px; position: relative; }
    .timeline-item::before {
      content: ''; position: absolute; left: -7px; top: 4px; width: 12px; height: 12px;
      background: ${pal.primary}; border-radius: 50%;
    }
    footer { padding: 40px 0; border-top: 1px solid ${borderColor}; text-align: center; color: ${mutedText}; font-size: 0.85rem; }
    .contact-form input, .contact-form textarea {
      width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid ${borderColor};
      background: ${surfaceColor}; color: ${textColor}; margin-bottom: 16px; font-family: inherit;
    }
  </style>
</head>
<body>
  <nav>
    <div class="container nav-inner">
      <a href="#" class="brand">${data.name || 'Portfolio'}</a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>

  <main class="container">
    <div class="hero">
      <div>
        <div class="badge">● Available for Opportunities</div>
        <h1>${data.name}</h1>
        <div class="headline">${data.title}</div>
        <p class="bio">${data.bio}</p>
        <div class="btn-group">
          <a href="#contact" class="btn-primary">Get in Touch</a>
          <a href="#projects" class="btn-secondary">View Work</a>
        </div>
      </div>
      <div class="avatar-wrapper">
        <img src="${data.avatar}" alt="${data.name}" class="avatar">
      </div>
    </div>

    <!-- About Section -->
    <section id="about">
      <h2 class="section-title">About Me</h2>
      <p class="section-subtitle">Background, vision, and core philosophy</p>
      <div class="card">
        <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px;">${data.bio}</p>
        ${data.careerGoals ? `<div style="padding: 16px; border-left: 3px solid ${pal.primary}; background: ${isDark ? '#1e293b40' : '#f8fafc'}; border-radius: 6px;">
          <strong>Career Vision:</strong> ${data.careerGoals}
        </div>` : ''}
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills">
      <h2 class="section-title">Skills & Stack</h2>
      <p class="section-subtitle">Core proficiencies and tools</p>
      <div class="grid">
        <div class="card">
          <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Proficiencies</h3>
          ${data.skills.map(s => `
            <div class="skill-bar-wrap">
              <div class="skill-bar-label"><span>${s.name}</span><span>${s.level}%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: ${s.level}%;"></div></div>
            </div>
          `).join('')}
        </div>
        <div class="card">
          <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Tools & Technologies</h3>
          <div>
            ${data.tools.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
          ${data.hobbies?.length ? `
            <h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.1rem;">Passions & Hobbies</h3>
            <div>
              ${data.hobbies.map(h => `<span class="tech-pill" style="border: 1px dashed ${borderColor};">✦ ${h}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    ${data.projects?.length ? `
    <section id="projects">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">A showcase of crafted work and applications</p>
      <div class="grid">
        ${data.projects.map(p => `
          <div class="card">
            ${p.image ? `<img src="${p.image}" alt="${p.title}" class="project-img">` : ''}
            <h3 style="font-size: 1.2rem; margin-bottom: 8px;">${p.title}</h3>
            <p style="color: ${mutedText}; font-size: 0.9rem; margin-bottom: 16px;">${p.description}</p>
            <div style="margin-bottom: 16px;">
              ${(p.technologies || []).map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn-primary" style="padding: 6px 14px; font-size: 0.85rem;">View Live Demo</a>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Experience Section -->
    ${data.experience?.length ? `
    <section id="experience">
      <h2 class="section-title">Experience</h2>
      <p class="section-subtitle">Career history & leadership</p>
      <div>
        ${data.experience.map(e => `
          <div class="timeline-item">
            <h3 style="font-size: 1.15rem;">${e.role} · <span style="color: ${pal.primary};">${e.company}</span></h3>
            <p style="color: ${mutedText}; font-size: 0.85rem; margin-bottom: 8px;">${e.period} ${e.location ? `• ${e.location}` : ''}</p>
            <p style="margin-bottom: 12px; color: ${textColor};">${e.description}</p>
            ${e.achievements?.length ? `
              <ul style="padding-left: 20px; color: ${mutedText}; font-size: 0.9rem;">
                ${e.achievements.map(a => `<li>${a}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    <section id="contact">
      <h2 class="section-title">Let's Connect</h2>
      <p class="section-subtitle">Send a message or reach out directly</p>
      <div class="grid">
        <div class="card">
          <h3 style="margin-bottom: 12px;">Contact Information</h3>
          <p style="color: ${mutedText}; margin-bottom: 8px;"><strong>Email:</strong> ${data.contact.email}</p>
          ${data.contact.phone ? `<p style="color: ${mutedText}; margin-bottom: 8px;"><strong>Phone:</strong> ${data.contact.phone}</p>` : ''}
          ${data.contact.location ? `<p style="color: ${mutedText}; margin-bottom: 8px;"><strong>Location:</strong> ${data.contact.location}</p>` : ''}
          <div style="margin-top: 20px;">
            <a href="mailto:${data.contact.email}" class="btn-primary">Email Me Directly</a>
          </div>
        </div>
        <div class="card">
          <form class="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully! Thank you for reaching out.');">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea rows="4" placeholder="Your Message..." required></textarea>
            <button type="submit" class="btn-primary" style="width: 100%;">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>© ${new Date().getFullYear()} ${data.name}. Generated with PortfoliAI.</p>
    </div>
  </footer>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportPortfolioAsJSON(data: PortfolioData): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function triggerPrintPortfolio(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

