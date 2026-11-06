import { PaletteId, FontPairingId } from '@/types/portfolio';

export interface PaletteDefinition {
  id: PaletteId;
  name: string;
  primary: string;
  primaryLight: string;
  accent: string;
  bgDark: string;
  surfaceDark: string;
  surfaceBorderDark: string;
  bgLight: string;
  surfaceLight: string;
  surfaceBorderLight: string;
  glowColor: string;
  gradientBadge: string;
  buttonClass: string;
  accentText: string;
}

export const palettes: Record<PaletteId, PaletteDefinition> = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan & Slate',
    primary: '#06b6d4',
    primaryLight: '#22d3ee',
    accent: '#3b82f6',
    bgDark: '#090d16',
    surfaceDark: '#0f172a',
    surfaceBorderDark: '#1e293b',
    bgLight: '#f8fafc',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#e2e8f0',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    gradientBadge: 'from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/30 text-cyan-400',
    buttonClass: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25',
    accentText: 'text-cyan-400',
  },
  violet: {
    id: 'violet',
    name: 'Neon Violet & Rose',
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    accent: '#ec4899',
    bgDark: '#0d0b18',
    surfaceDark: '#18142a',
    surfaceBorderDark: '#2e264f',
    bgLight: '#faf5ff',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#f3e8ff',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    gradientBadge: 'from-purple-500/20 via-pink-500/10 to-transparent border-purple-500/30 text-purple-300',
    buttonClass: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-purple-500/25',
    accentText: 'text-purple-400',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint & Forest',
    primary: '#10b981',
    primaryLight: '#34d399',
    accent: '#06b6d4',
    bgDark: '#06130d',
    surfaceDark: '#0d2218',
    surfaceBorderDark: '#1a3e2e',
    bgLight: '#f0fdf4',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#dcfce7',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    gradientBadge: 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400',
    buttonClass: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25',
    accentText: 'text-emerald-400',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Amber & Coral',
    primary: '#f59e0b',
    primaryLight: '#fbbf24',
    accent: '#f97316',
    bgDark: '#140e05',
    surfaceDark: '#231809',
    surfaceBorderDark: '#3d2b12',
    bgLight: '#fffbeb',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#fef3c7',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    gradientBadge: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400',
    buttonClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25',
    accentText: 'text-amber-400',
  },
  indigo: {
    id: 'indigo',
    name: 'Royal Indigo & Sky',
    primary: '#6366f1',
    primaryLight: '#818cf8',
    accent: '#38bdf8',
    bgDark: '#090b16',
    surfaceDark: '#111528',
    surfaceBorderDark: '#212948',
    bgLight: '#f8fafc',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#e0e7ff',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    gradientBadge: 'from-indigo-500/20 via-sky-500/10 to-transparent border-indigo-500/30 text-indigo-400',
    buttonClass: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25',
    accentText: 'text-indigo-400',
  },
  coral: {
    id: 'coral',
    name: 'Vibrant Coral & Tangerine',
    primary: '#f43f5e',
    primaryLight: '#fb7185',
    accent: '#f97316',
    bgDark: '#15080c',
    surfaceDark: '#241018',
    surfaceBorderDark: '#3d1b28',
    bgLight: '#fff1f2',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#ffe4e6',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    gradientBadge: 'from-rose-500/20 via-orange-500/10 to-transparent border-rose-500/30 text-rose-400',
    buttonClass: 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/25',
    accentText: 'text-rose-400',
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Warm Sand & Charcoal',
    primary: '#d97706',
    primaryLight: '#f59e0b',
    accent: '#78716c',
    bgDark: '#121110',
    surfaceDark: '#1c1a17',
    surfaceBorderDark: '#302d28',
    bgLight: '#faf8f5',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#e7e5e4',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    gradientBadge: 'from-amber-600/20 via-stone-500/10 to-transparent border-amber-600/30 text-amber-300',
    buttonClass: 'bg-stone-100 hover:bg-white text-stone-900 shadow-stone-800/20',
    accentText: 'text-amber-300',
  },
  slate: {
    id: 'slate',
    name: 'Monochrome Silver & Slate',
    primary: '#94a3b8',
    primaryLight: '#cbd5e1',
    accent: '#e2e8f0',
    bgDark: '#0b0f14',
    surfaceDark: '#121820',
    surfaceBorderDark: '#1e2835',
    bgLight: '#f8fafc',
    surfaceLight: '#ffffff',
    surfaceBorderLight: '#e2e8f0',
    glowColor: 'rgba(148, 163, 184, 0.25)',
    gradientBadge: 'from-slate-500/20 via-gray-500/10 to-transparent border-slate-500/30 text-slate-300',
    buttonClass: 'bg-slate-200 hover:bg-white text-slate-900 shadow-slate-900/30',
    accentText: 'text-slate-300',
  },
};

export const fontPairings: Record<
  FontPairingId,
  { name: string; headingClass: string; bodyClass: string; description: string }
> = {
  modern: {
    name: 'Modern Sans (Plus Jakarta + Inter)',
    headingClass: 'font-sans font-bold tracking-tight',
    bodyClass: 'font-sans font-normal',
    description: 'Crisp, contemporary, and versatile across all digital roles.',
  },
  editorial: {
    name: 'Editorial Serif (Playfair + Sans)',
    headingClass: 'font-serif font-medium tracking-normal',
    bodyClass: 'font-sans font-normal leading-relaxed',
    description: 'Elegant, literary, and high-fashion aesthetics.',
  },
  tech: {
    name: 'Tech Monospace & Clean Sans',
    headingClass: 'font-mono font-semibold tracking-tight',
    bodyClass: 'font-sans font-normal',
    description: 'Terminal-inspired, engineer-focused, and precise.',
  },
  creative: {
    name: 'Creative Avant-Garde (Display + Sans)',
    headingClass: 'font-sans font-extrabold tracking-tighter',
    bodyClass: 'font-sans font-normal',
    description: 'Punchy, expressive, and dynamic for design leaders.',
  },
  clean: {
    name: 'Clean Academic (Geometric Sans)',
    headingClass: 'font-sans font-semibold tracking-wide',
    bodyClass: 'font-sans font-light',
    description: 'Airy, legible, and balanced for scholars and graduates.',
  },
};

