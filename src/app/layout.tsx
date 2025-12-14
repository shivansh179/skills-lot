import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SkillSlot - Hire Tech Talent by the Hour, Instantly',
  description:
    'Access a vetted network of developers, designers & experts ready to solve your problems now. Pay only for the hours you use.',
  keywords: [
    'freelance',
    'developers',
    'designers',
    'tech talent',
    'hourly hiring',
    'on-demand',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
