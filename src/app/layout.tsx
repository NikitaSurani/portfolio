import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nikita Surani - Software Engineer",
  description:
    "Software Engineer with 3.5+ years of experience building scalable backend systems and modern web applications.",
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
      data-theme="light"
      className={`${plusJakarta.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
