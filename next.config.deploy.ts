import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 恢復靜態導出
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
