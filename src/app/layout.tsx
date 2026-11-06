import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PortfoliAI — AI-Powered Personal Portfolio Website Generator',
  description:
    'An interactive, intelligent portfolio builder that transforms your answers into a personalized, professionally designed portfolio website with live preview and instant export.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth dark`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950 min-h-screen">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
