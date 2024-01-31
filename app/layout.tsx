import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; 
import { ConvexClientProvider } from "@/Providers/convex-client-provider";
import { ModalProvider } from "@/Providers/modal-provider";import { SpeedInsights } from "@vercel/speed-insights/next"
import { PrismaClient } from '@prisma/client';
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { Unauthenticated } from "convex/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SQUARE',
  description: 'Social media as a service', 
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  try {
    const prisma = new PrismaClient();

  return (
    <html lang="en">
      <body className={inter.className}>
      <ConvexClientProvider>

      <Script src="https://www.google.com/recaptcha/api.js"></Script>
            <Toaster />
            <ModalProvider />
            {children}
        <Analytics /><SpeedInsights/>

        </ConvexClientProvider>

        <button className="g-recaptcha invisible" data-size="invisible" data-sitekey="6Lcua1MpAAAAAKKmBUx3A_JDXWPt7lP1_Tb1c3ka" data-callback='onSubmit'data-action='submit'>Submit</button>

      </body>
    </html>
  );
} catch (error) {
  alert('Connection error, please turn off vpn');
  return null;
}
}