import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nikita Surani - Full Stack Developer",
  description:
    "Full Stack Developer with 3.5+ years of experience building scalable backend systems and modern web applications.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${dmSans.variable} ${syne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
