import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/xsong' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/xsong' : '',
};

export default nextConfig;
