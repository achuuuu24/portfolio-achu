import { PortfolioData, ThemeConfig, TemplateId, PaletteId, FontPairingId } from '@/types/portfolio';

export interface AIAnalysisResult {
  detectedCategory: string;
  theme: ThemeConfig;
  insights: string[];
}

export function analyzePortfolio(data: Partial<PortfolioData>): AIAnalysisResult {
  const titleLower = (data.title || '').toLowerCase();
  const bioLower = (data.bio || '').toLowerCase();
  const skillsText = (data.skills || []).map((s) => s.name.toLowerCase()).join(' ');
  const toolsText = (data.tools || []).join(' ').toLowerCase();

  const combined = `${titleLower} ${bioLower} ${skillsText} ${toolsText}`;

  // Check Developer
  const isDeveloper =
    /developer|engineer|software|backend|frontend|fullstack|full-stack|devops|architect|python|javascript|typescript|react|code|golang|rust|data scientist|ai|ml|machine learning/.test(
      combined
    );

  // Check UI/UX Designer
  const isUXDesigner =
    /ui\/ux|ui|ux|product design|interaction design|user experience|interface|design system|figma|prototyping|hcd/.test(
      combined
    );

  // Check Photographer / Visual Artist
  const isPhotographer =
    /photo|photographer|cinematographer|visual storyteller|lens|camera|editorial photography|lightroom|fine art/.test(
      combined
    );

  // Check Graphic / Motion Designer / Artist
  const isGraphicDesigner =
    /graphic|motion|illustrator|brand design|art director|3d|blender|animation|visual designer|creative director/.test(
      combined
    );

  // Check Student / Academic
  const isStudent =
    /student|graduate|undergraduate|candidate|intern|b\.s\.|m\.s\.|ph\.d\.|university|college|academic/.test(
      combined
    );

  // Check Freelancer / Agency / Consultant
  const isFreelancer =
    /freelance|consultant|agency|client|founder|contractor|growth|marketing|services/.test(
      combined
    );

  let detectedCategory = 'Modern Professional';
  let template: TemplateId = 'executive';
  let palette: PaletteId = 'indigo';
  let fontPairing: FontPairingId = 'modern';
  let mode: 'dark' | 'light' = 'dark';
  let reason = '';
  let insights: string[] = [];

  if (isPhotographer) {
    detectedCategory = 'Visual Storyteller & Photographer';
    template = 'minimal';
    palette = 'editorial';
    fontPairing = 'editorial';
    mode = 'dark';
    reason =
      'Selected Editorial Aesthetic layout with high-contrast warm sand tones and editorial serif typography to let your imagery take center stage.';
    insights = [
      'Image-first masonry & full-bleed showcases prioritized',
      'Warm sand & deep charcoal color grading',
      'Editorial serif display typography for timeless elegance',
    ];
  } else if (isUXDesigner) {
    detectedCategory = 'Product & UI/UX Designer';
    template = 'minimal';
    palette = 'violet';
    fontPairing = 'creative';
    mode = 'dark';
    reason =
      'Selected Minimal Studio layout with cyber violet accents, soft glassmorphism, and modern typography to highlight your interface precision and craft.';
    insights = [
      'Visual case study spotlight cards',
      'Glassmorphic cards with soft dimensional elevation',
      'Sophisticated violet & rose accent palette',
    ];
  } else if (isGraphicDesigner) {
    detectedCategory = 'Creative & Graphic Designer';
    template = 'creative';
    palette = 'amber';
    fontPairing = 'creative';
    mode = 'dark';
    reason =
      'Selected Bold Creative design with sunset amber gradients and dynamic asymmetry to match your artistic identity.';
    insights = [
      'Vibrant gradient overlays and punchy contrast',
      'Asymmetric layout blocks for expressive rhythm',
      'Dynamic typography that commands attention',
    ];
  } else if (isDeveloper) {
    detectedCategory = 'Software Engineer & Technologist';
    template = 'tech';
    palette = 'cyan';
    fontPairing = 'tech';
    mode = 'dark';
    reason =
      'Selected Tech Dark architecture with neon cyan accents, terminal-style tags, and monospace accents to communicate technical rigor and authority.';
    insights = [
      'Monospace code metrics and interactive tech stack chips',
      'Dark slate canvas with cyber neon accents',
      'Structured timeline for engineering experience and projects',
    ];
  } else if (isStudent) {
    detectedCategory = 'Emerging Talent & Scholar';
    template = 'academic';
    palette = 'emerald';
    fontPairing = 'clean';
    mode = 'dark';
    reason =
      'Selected Academic Clean template with emerald accents and prominent education and project showcases to highlight your momentum and foundations.';
    insights = [
      'Spotlight on academic achievements and coursework',
      'Fresh emerald & mint palette representing growth',
      'Structured project cards with GitHub and demo badges',
    ];
  } else if (isFreelancer) {
    detectedCategory = 'Independent Consultant & Freelancer';
    template = 'executive';
    palette = 'indigo';
    fontPairing = 'modern';
    mode = 'dark';
    reason =
      'Selected Executive Pro layout with royal indigo tones and high-conversion contact anchors to turn visitors into business opportunities.';
    insights = [
      'High-conversion hero call-to-action buttons',
      'Trust-building social proof and project highlights',
      'Direct contact module with instant email integration',
    ];
  } else {
    // Default smart match
    detectedCategory = 'Creative Professional';
    template = 'tech';
    palette = 'cyan';
    fontPairing = 'modern';
    mode = 'dark';
    reason =
      'Selected Modern High-Contrast layout with balanced typography and dynamic section hierarchy to showcase your multidimensional expertise.';
    insights = [
      'Balanced visual hierarchy across all sections',
      'Accessible high-contrast palette',
      'Fluid responsiveness for mobile and desktop viewing',
    ];
  }

  return {
    detectedCategory,
    theme: {
      template,
      palette,
      fontPairing,
      mode,
      aiRecommendationReason: reason,
    },
    insights,
  };
}

