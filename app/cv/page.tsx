'use client';

import { useEffect } from 'react';

export default function CVPage() {
  useEffect(() => {
    // 直接下載PDF檔案，最快速度
    const link = document.createElement('a');
    link.href = '/songlinchen_20250505.pdf';
    link.download = 'songlinchen_20250505.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 立即重定向到首頁，避免停留在空白頁面
    window.location.replace('/');
  }, []);

  // 返回null，完全不渲染任何內容
  return null;
}
