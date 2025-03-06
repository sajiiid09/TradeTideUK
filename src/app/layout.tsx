import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/common/navbar";
import { SessionProvider } from "next-auth/react";
import NextHead from "@/components/common/metaData";
import { 
  APP_DESCRIPTION, 
  APP_KEYWORDS, 
  APP_NAME 
} from "@/constants/app.constant";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = NextHead({
  title: APP_NAME,
  appName: 'ShoppersCorner',
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
