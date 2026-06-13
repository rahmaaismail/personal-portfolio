import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Rahma Ismail| Software Engineer",
  description:
    "Portfolio of Rahma Ismail - Software Engineering Student at University of Victoria. I am interested in AI and embedded systems.",
  keywords: [
    "Rahma Ismail",
    "Software Engineer",
    "University of Victoria",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Rahma Ismail" }],
  openGraph: {
    title: "Rahma Ismail | Software Engineer",
    description:
      "I engineer solutions where thoughtful design meets technical depth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahma Ismail | Software Engineer",
    description:
      "I engineer solutions where thoughtful design meets technical depth.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}