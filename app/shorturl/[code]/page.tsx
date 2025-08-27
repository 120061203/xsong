'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface UrlData {
  code: string;
  url: string;
}

// 新增：生成靜態路徑參數
export async function generateStaticParams() {
  // 這裡可以預先生成一些常用的短網址路徑
  // 或者返回空陣列，讓 Next.js 知道這是動態路由
  return [];
}

export default function ShortUrlRedirect() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [urlData, setUrlData] = useState<UrlData | null>(null);

  useEffect(() => {
    const code = params.code as string;
    
    if (!code) {
      setError('無效的短網址');
      setIsLoading(false);
      return;
    }

    // 從 API 獲取短網址資料
    const fetchUrlData = async () => {
      try {
        const response = await fetch('/api/shorturl');
        if (response.ok) {
          const data = await response.json();
          const foundUrl = data.urls.find((item: UrlData) => item.code === code);
          
          if (foundUrl) {
            setUrlData(foundUrl);
            // 自動重定向
            setTimeout(() => {
              window.location.href = foundUrl.url;
            }, 2000);
          } else {
            setError('短網址不存在或已失效');
          }
        } else {
          setError('無法獲取短網址資料');
        }
      } catch (err) {
        setError('發生錯誤，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrlData();
  }, [params.code]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">正在處理短網址...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            短網址無效
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <a
            href="/tools/shorturl"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-green-600 hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
          >
            建立新的短網址
          </a>
        </div>
      </div>
    );
  }

  if (urlData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            正在重定向...
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            即將前往：<span className="font-mono text-sm break-all">{urlData.url}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            如果沒有自動跳轉，請點擊下方按鈕
          </p>
          <a
            href={urlData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-green-600 hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
          >
            前往網址
          </a>
        </div>
      </div>
    );
  }

  return null;
}
 
