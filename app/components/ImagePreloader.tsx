'use client';

import { useEffect, useState } from 'react';

// WebP 轉換緩存（僅存儲轉換後的 WebP URL，不檢查時間）
const getCacheKey = (url: string) => `project_image_${btoa(url)}`;

const getCachedWebP = (url: string): string | null => {
  try {
    return localStorage.getItem(getCacheKey(url));
  } catch (error) {
    console.warn('Failed to read WebP cache:', error);
    return null;
  }
};

const setCachedWebP = (url: string, webpUrl: string) => {
  try {
    localStorage.setItem(getCacheKey(url), webpUrl);
  } catch (error) {
    console.warn('Failed to save WebP cache:', error);
  }
};

// WebP 轉換函數
const convertToWebP = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new HTMLImageElement();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const webpUrl = URL.createObjectURL(blob);
          resolve(webpUrl);
        } else {
          reject(new Error('Failed to convert to WebP'));
        }
      }, 'image/webp', 0.6);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};

// 截圖服務配置
const screenshotServices = [
  {
    name: 'urlscan',
    url: (targetUrl: string) => `https://urlscan.io/liveshot/?width=1280&height=720&url=${targetUrl}`
  },
  {
    name: 'htmlcsstoimage',
    url: (targetUrl: string) => `https://htmlcsstoimage.com/demo?url=${targetUrl}`
  }
];

// 根據 URL 的 hash 值選擇截圖服務（確保服務器端和客戶端一致）
const getScreenshotUrl = (targetUrl: string) => {
  const hash = targetUrl.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const serviceIndex = Math.abs(hash) % screenshotServices.length;
  return screenshotServices[serviceIndex].url(targetUrl);
};

// 前6個專案的配置
const firstSixProjects = [
  {
    title: 'Go ShortURL',
    image: getScreenshotUrl('https://go-shorturl.vercel.app')
  },
  {
    title: 'xsong.us',
    image: getScreenshotUrl('https://xsong.us')
  },
  {
    title: 'Calendar Todo App',
    image: getScreenshotUrl('https://120061203.github.io/calendar-todo-app')
  },
  {
    title: 'Whiteboard Tool',
    image: getScreenshotUrl('https://xsong.us/tools/whiteboard')
  },
  {
    title: 'Box Generator',
    image: getScreenshotUrl('https://xsong.us/tools/boxgen')
  },
  {
    title: 'URL Shortener',
    image: getScreenshotUrl('https://xsong.us/url')
  }
];

export default function ImagePreloader() {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      let completed = 0;
      
      console.log('開始全局預載入前6個專案圖片...');
      
      for (const project of firstSixProjects) {
        try {
          // 檢查是否已有緩存
          const cachedWebP = getCachedWebP(project.image);
          if (cachedWebP) {
            console.log(`專案 ${project.title} 使用緩存 WebP`);
            completed++;
            setPreloadProgress((completed / firstSixProjects.length) * 100);
            continue;
          }
          
          // 轉換為 WebP 並緩存
          console.log(`預載入專案 ${project.title} 的圖片...`);
          const webpUrl = await convertToWebP(project.image);
          setCachedWebP(project.image, webpUrl);
          
          completed++;
          setPreloadProgress((completed / firstSixProjects.length) * 100);
          console.log(`專案 ${project.title} 預載入完成 (${completed}/${firstSixProjects.length})`);
          
          // 添加小延遲避免過於頻繁的 API 調用
          await new Promise(resolve => setTimeout(resolve, 300));
          
        } catch (error) {
          console.warn(`專案 ${project.title} 預載入失敗:`, error);
          completed++;
          setPreloadProgress((completed / firstSixProjects.length) * 100);
        }
      }
      
      console.log('全局預載入完成！');
      setIsPreloading(false);
    };
    
    // 延遲 1 秒後開始預載入，讓頁面先載入完成
    const timer = setTimeout(() => {
      preloadImages();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 不渲染任何內容，只是背景預載入
  return null;
}
