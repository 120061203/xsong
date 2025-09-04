'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const pathname = usePathname();

  // 同步檢查路徑，立即重定向
  const urlMatch = pathname.match(/^\/url\/(.+)$/);
  if (urlMatch) {
    const shortCode = urlMatch[1];
    console.log('重定向到:', `https://go-shorturl.vercel.app/url/${shortCode}`);
    // 立即重定向，不等待任何渲染
    if (typeof window !== 'undefined') {
      window.location.replace(`https://go-shorturl.vercel.app/url/${shortCode}`);
    }
    // 返回空組件，避免渲染任何內容
    return null;
  }

  // 如果不是短網址，顯示標準 404 頁面
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">正在轉址...</p>
        <Link 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          返回首頁
        </Link>
      </div>
    </div>
  );
}
