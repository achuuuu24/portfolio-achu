# ⚡ PortfoliAI — AI-Powered Personal Portfolio Website Generator

> **An intelligent, conversational portfolio generation platform that turns answers into personalized, agency-grade professional portfolios. Zero coding required.**

Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Concept & Experience

Users don't need any coding or web design knowledge. PortfoliAI acts as their personal creative director and web designer through two synchronized interfaces:

1. **Interface A: Conversational Creation Dashboard**
   - Asks questions **one by one** in a friendly, conversational sequence.
   - Interactive progress bar with live completion percentage.
   - Specialized input controls: text inputs with suggestion pills, bio textareas with templates, headshot upload / Unsplash preset selector / drag & drop, interactive skill rating sliders, tech tag chips, and milestone cards.
   - Friendly AI feedback delivered after every response with smooth transitions.
   - One-click **Demo Presets** (Senior Full-Stack Engineer, Lead UI/UX Designer, Editorial Photographer) for instant testing.
   - Persistent `localStorage` state saving.

2. **Interface B: Live Portfolio Preview & Customization Studio**
   - Instant visual preview with **Device Switcher**: Desktop (100%), Tablet (768px frame), and Mobile (375px phone frame with notch).
   - **Intelligent Design AI Engine**: Analyzes the user's title, bio, skills, and tools to automatically apply the optimal template, typography, and color palette.
   - **5 Distinct Professional Templates**:
     - `Tech Dark`: Modern dark tech aesthetic with terminal tags, monospace accents, and engineering metrics.
     - `Minimal Studio`: Editorial typography, tactile cards, and visual gallery for designers & photographers.
     - `Creative Bold`: High-energy asymmetric layouts, vibrant gradients, and expressive headings.
     - `Executive Pro`: Conversion-optimized layout with trust badges and CTA consultation anchors.
     - `Academic Clean`: Academic timeline, research interests, and project repository badges.
   - **8 Harmonious Color Palettes**: Cyber Cyan, Neon Violet, Emerald Mint, Sunset Amber, Royal Indigo, Vibrant Coral, Editorial Sand, and Monochrome Slate.
   - **Live Customization Sidebar**: Switch templates, palettes, fonts, light/dark mode, and reorder/toggle sections in real-time.
   - **Quick Content Editor**: In-place modal to tweak personal data instantly without leaving the preview.
   - **Export Capabilities**:
     - Standalone **HTML/CSS/JS Single-File Bundle** ready to host anywhere.
     - **PDF / Print View** with dedicated `@media print` clean stylesheet.
     - **Shareable Link** generator copied to clipboard.
     - **JSON Data Backup** export.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the conversational generator!

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🧠 Intelligent Design Matching Logic

PortfoliAI analyzes answers in real-time:
- **Developers / Engineers**: Mapped to `Tech Dark` template with `Cyber Cyan` palette and monospace accents.
- **Product & UI/UX Designers**: Mapped to `Minimal Studio` with `Neon Violet` and glassmorphic depth.
- **Photographers & Visual Artists**: Mapped to `Editorial Sand` with serif typography and full-bleed image frames.
- **Graphic Designers & Content Creators**: Mapped to `Creative Bold` with `Sunset Amber` gradients.
- **Students & Researchers**: Mapped to `Academic Clean` with `Emerald Mint` and education spotlights.
- **Freelancers & Consultants**: Mapped to `Executive Pro` with `Royal Indigo` and high-conversion consultation CTAs.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15.5+ App Router
- **Runtime / UI**: React 19
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide Icons & Custom SVG Brand Icons
- **Fonts**: Inter, JetBrains Mono, Playfair Display, Plus Jakarta Sans
"# portfolio-achu" 
