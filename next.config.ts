import type { NextConfig } from "next";

// 检测是否在支持 API Routes 的环境
// 方法1: 检查环境变量
const isZeabur = process.env.ZEABUR === 'true' || 
                 process.env.ZEABUR === '1' ||
                 process.env.ZEABUR_ENV !== undefined ||
                 process.env.ZEABUR_PROJECT_ID !== undefined;
const isVercel = process.env.VERCEL === '1' || 
                 process.env.VERCEL === 'true' ||
                 process.env.VERCEL_ENV !== undefined;
const isOtherPlatform = process.env.RAILWAY_ENVIRONMENT !== undefined ||
                        process.env.RENDER !== undefined ||
                        process.env.FLY_APP_NAME !== undefined;

// 方法2: 检查是否存在 API routes 目录（如果存在，说明需要支持 API Routes）
const fs = require('fs');
const path = require('path');
const apiRoutesExist = fs.existsSync(path.join(process.cwd(), 'app', 'api'));

// 如果检测到任何支持 API Routes 的平台，或者存在 API routes 目录，就不使用静态导出
// 默认情况下，如果存在 API routes，就不使用静态导出（更安全）
const supportsApiRoutes = isZeabur || isVercel || isOtherPlatform || 
                          process.env.NEXT_PUBLIC_DISABLE_STATIC_EXPORT === 'true' ||
                          apiRoutesExist; // 如果存在 API routes，默认支持

// 调试信息
console.log('[Next.js Config] Environment detection:', {
  isZeabur,
  isVercel,
  isOtherPlatform,
  apiRoutesExist,
  supportsApiRoutes,
  willUseStaticExport: !supportsApiRoutes,
  ZEABUR: process.env.ZEABUR,
  VERCEL: process.env.VERCEL,
});

const nextConfig: NextConfig = {
  // 在支持 API Routes 的平台上不进行静态导出
  // 在 GitHub Pages 上使用静态导出
  ...(supportsApiRoutes ? {} : { output: 'export' }), // 仅在非 API Routes 支持环境静态导出
  images: {
    unoptimized: true, // 禁用圖片優化（與靜態導出相容）
  },
  trailingSlash: true,
  assetPrefix: '',
  basePath: '',
  eslint: {
    // ✅ 完全忽略 ESLint 錯誤
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ 完全忽略 TS 型別錯誤
    ignoreBuildErrors: true,
  },
  // 額外設定：強制忽略型別檢查
  typedRoutes: false,
  serverExternalPackages: [],
  // 在開發模式下跳過靜態檔案檢查
  skipTrailingSlashRedirect: true,
  // 性能優化配置
  compress: true, // 啟用 gzip 壓縮
  poweredByHeader: false, // 移除 X-Powered-By 標頭
  generateEtags: true, // 啟用 ETags
  // 確保靜態檔案正確服務
  experimental: {
    // staticGenerationRetryCount: 0, // 移除這個配置，可能是 Next.js 15 的 bug
    optimizeCss: true, // 優化 CSS
    optimizePackageImports: ['react', 'react-dom'], // 優化包導入
  },
  // 添加重定向配置
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/songlinchen_20250505.pdf',
        permanent: false,
      },
    ];
  },
  // 添加路径重写配置（用于服务 Astro blog）
  // 注意：我们使用 app/blog/[[...slug]]/route.ts 来处理所有 /blog/* 请求
  // 所以这里不需要 rewrites，避免与 API route 冲突
  async rewrites() {
    // 仅在非静态导出模式下使用 rewrites（静态导出不支持 rewrites）
    if (supportsApiRoutes) {
      return [
        // 移除了 /blog/:path* 的 rewrite，因为由 API route 处理
        // 如果需要其他路径的 rewrite，可以在这里添加
      ];
    }
    return [];
  },
  // 添加安全 HTTP 頭部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },
};

export default nextConfig;