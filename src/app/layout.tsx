import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/globals.css';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClassTing Quiz!',
  description: 'ClassTing Quiz! is a quiz app for ClassTing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
