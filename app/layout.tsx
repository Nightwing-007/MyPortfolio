import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-fira-code",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e0dbd5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://deepakraj-s.vercel.app"),
  title: "Deepakraj S — Portfolio",
  description:
    "Computer Science student & Full-Stack Developer. Explore projects in full-stack development, computer vision, and more.",
  keywords: [
    "Deepakraj S",
    "Full-Stack Developer",
    "React",
    "Spring Boot",
    "MERN Stack",
    "Portfolio",
    "Computer Science",
    "Sri Eshwar College",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Deepakraj S — Portfolio",
    description:
      "Computer Science student & Full-Stack Developer building performant systems with React, Spring Boot, and the MERN stack.",
    type: "website",
    locale: "en_US",
    siteName: "Deepakraj S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepakraj S — Portfolio",
    description:
      "Full-Stack Developer | CS @ Sri Eshwar | Class of 2028",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Inline script to set theme class BEFORE first paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col antialiased bg-bg-base text-text-primary overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
