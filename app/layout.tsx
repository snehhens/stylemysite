import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Style My Site - Free Website Design for Ambitious Dreamers",
  description:
    "Get a stunning, free website for your small business or creative project. Empowering ambitious dreamers with beautiful, functional websites.",
  keywords: [
    "Free Website Design",
    "Small Business Website",
    "Free Website for Startups",
    "Style My Site",
    "Website for Dreamers",
    "Free Website Builder",
    "Custom Website Design",
  ],
  openGraph: {
    title: "Style My Site - Free Website Design for Ambitious Dreamers",
    description:
      "Get a stunning, free website for your small business or creative project. Empowering ambitious dreamers with beautiful, functional websites.",
    images: [
      {
        url: "/og-image.png", // Add your OpenGraph image here
        width: 1200,
        height: 630,
        alt: "Style My Site - Free Website Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Style My Site - Free Website Design for Ambitious Dreamers",
    description:
      "Get a stunning, free website for your small business or creative project. Empowering ambitious dreamers with beautiful, functional websites.",
    images: ["/og-image.png"], // Add your Twitter image here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}