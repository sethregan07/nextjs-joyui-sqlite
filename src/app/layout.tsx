import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CssVarsProvider } from '@mui/joy/styles';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js with Joy UI and SQLite",
  description: "A full-stack app using Next.js, TypeScript, Joy UI, and SQLite",
};

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
        <CssVarsProvider>
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
