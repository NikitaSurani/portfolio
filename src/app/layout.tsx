import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";



// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-dm-sans",
//   weight: ["300", "400", "500"],
// });

// const syne = Syne({
//   subsets: ["latin"],
//   variable: "--font-syne",
//   weight: ["400", "600", "700", "800"],
// });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nikita Surani – Full Stack Developer",
  description:
    "Full Stack Developer with 3.5+ years of experience in building scalable backend systems and modern web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
