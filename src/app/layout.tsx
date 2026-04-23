import type { Metadata } from "next";
import { Sarabun, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "ระบบฐานข้อมูลสมรรถนะการเขียนภาษาอังกฤษ · CbKST",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${sarabun.variable} ${plexMono.variable}`}>
      <body className="font-sarabun bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}