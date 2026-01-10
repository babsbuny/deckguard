import type { Metadata } from 'next';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaddleLoader from '@/components/PaddleLoader';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'DeckGuard | Pitch Deck Risk Analyzer',
  description: 'Eliminate friction before you send. Pre-send risk check for your pitch deck.',
  keywords: ['pitch deck', 'startup', 'investor', 'risk analysis', 'fundraising'],
  authors: [{ name: 'Lucete Lab' }],
  openGraph: {
    title: 'DeckGuard | Pitch Deck Risk Analyzer',
    description: 'Eliminate friction before you send.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-main text-text-primary font-sans min-h-screen flex flex-col">
        <PaddleLoader />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
