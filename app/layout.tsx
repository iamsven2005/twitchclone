import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PrismaClient } from '@prisma/client';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SQUARE',
  description: 'Social media as a service', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const prisma = new PrismaClient();

  return (
    <ClerkProvider>
    <html lang="en">
    
      <body className={inter.className}>
        {children}
        <Analytics /><SpeedInsights/>

      <Toaster theme="system" position="bottom-center" />
      <button className="g-recaptcha invisible" data-size="invisible" data-sitekey="6Lcua1MpAAAAAKKmBUx3A_JDXWPt7lP1_Tb1c3ka" data-callback='onSubmit'data-action='submit'>Submit</button>

    </body>
    </html>
    </ClerkProvider>
  );
} catch (error) {
  console.error('Connection error:', error);
  alert('Connection error, please turn off vpn');
  return null;
}
}
