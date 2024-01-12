
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Video',
  description: 'Video Streaming Service', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {children}<Analytics /><SpeedInsights/>
      <Toaster theme="system" position="bottom-center" />
    </body>
    </html>
    </ClerkProvider>

  )
}
