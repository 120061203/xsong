'use client';

import { useEffect } from 'react';

export default function CVPage() {
  useEffect(() => {
    // 直接重定向到PDF，避免渲染
    window.location.replace('/songlinchen_20250505.pdf');
  }, []);

  // 返回一個簡單的載入頁面，避免完整渲染
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">正在重定向到CV...</p>
      </div>
    </div>
  );
}
