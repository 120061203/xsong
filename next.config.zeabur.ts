import type { NextConfig } from "next";

// Zeabur 部署配置（支持 API Routes）
const nextConfig: NextConfig = {
  // 移除静态导出，启用 API Routes
  // output: 'export', // 注释掉，Zeabur 需要动态渲染
  images: {
    unoptimized: true, // 如果需要图片优化，可以改为 false
  },
  trailingSlash: true,
  assetPrefix: '',
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  typedRoutes: false,
  serverExternalPackages: [],
  skipTrailingSlashRedirect: true,
  // 性能优化配置
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
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
  // 添加安全 HTTP 头部配置
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

