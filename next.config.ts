import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
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
  // 確保靜態檔案正確服務
  experimental: {
    staticGenerationRetryCount: 0,
  },
};

export default nextConfig;
