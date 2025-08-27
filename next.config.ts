import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,  // 保持 /index.html 路徑乾淨
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
