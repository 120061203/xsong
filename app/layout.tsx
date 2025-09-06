import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import { ThemeProvider } from "./contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "xsong.us - 個人作品集",
    template: "%s | xsong.us"
  },
  description: "小松的個人作品集，展示技術專案、演講經驗、教學內容和職涯發展。專精於前端開發、DevOps 和技術分享。",
  keywords: ["個人作品集", "前端開發", "DevOps", "技術分享", "演講", "教學", "React", "Next.js", "Astro", "TypeScript"],
  authors: [{ name: "小松", email: "ccssll120061203@gmail.com" }],
  creator: "小松",
  publisher: "xsong.us",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://xsong.us',
    siteName: 'xsong.us',
    title: 'xsong.us - 個人作品集',
    description: '小松的個人作品集，展示技術專案、演講經驗、教學內容和職涯發展。',
    images: [
      {
        url: 'https://xsong.us/avatar.png',
        width: 1200,
        height: 630,
        alt: 'xsong.us 個人作品集',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xsong.us - 個人作品集',
    description: '小松的個人作品集，展示技術專案、演講經驗、教學內容和職涯發展。',
    images: ['https://xsong.us/avatar.png'],
  },
  verification: {
    google: 'your-google-verification-code', // 需要替換為實際的驗證碼
  },
  alternates: {
    canonical: 'https://xsong.us',
    types: {
      'application/rss+xml': 'https://xsong.us/blog/rss.xml',
    },
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Breadcrumb />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
