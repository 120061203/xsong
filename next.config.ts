import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 暫時移除 output: 'export' 以支援開發
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '',
  basePath: '',
  eslint: {
    // 忽略建置時的 ESLint 錯誤
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
