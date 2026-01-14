import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import { ThemeProvider } from "./contexts/ThemeContext";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsTracker from "./components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // 字體優化：添加字體交換
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // 字體優化：添加字體交換
});

export const metadata: Metadata = {
  title: {
    default: "xsong.us - 技術分享與作品集",
    template: "%s | xsong.us"
  },
  description: "小松的技術分享平台，包含技術文章、專案作品、演講心得與職涯經驗。專精於前端開發、DevOps 和技術分享。",
  keywords: ["技術分享", "前端開發", "DevOps", "個人作品集", "演講", "教學", "React", "Next.js", "Astro", "TypeScript"],
  authors: [{ name: "小松" }],
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
    title: 'xsong.us - 技術分享與作品集',
    description: '小松的技術分享平台，包含技術文章、專案作品、演講心得與職涯經驗。',
    images: [
      {
        url: 'https://xsong.us/avatar.png',
        width: 1200,
        height: 630,
        alt: 'xsong.us 技術分享與作品集',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xsong.us - 技術分享與作品集',
    description: '小松的技術分享平台，包含技術文章、專案作品、演講心得與職涯經驗。',
    images: ['https://xsong.us/avatar.png'],
  },
  // Google 驗證已通過 DNS 自動驗證，無需在此處設置
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
    <html lang="zh-TW" translate="no">
      <head>
        {/* 預載入關鍵資源 */}
        <link rel="preload" href="/avatar.png" as="image" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//urlscan.io" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* 非同步載入 Font Awesome CSS - 使用 script 方式 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'preload';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
                link.as = 'style';
                link.onload = function() {
                  this.onload = null;
                  this.rel = 'stylesheet';
                };
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        
        {/* 備用方案：noscript */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </noscript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`} translate="no">
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-56MXC3D7');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-56MXC3D7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        
        <ThemeProvider>
          <AnalyticsTracker />
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
