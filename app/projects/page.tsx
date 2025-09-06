'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

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
    const img = document.createElement('img');
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

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
  lastUpdated: string;
}

// 截圖服務配置（只使用最穩定的服務）
const screenshotServices = [
  {
    name: 'urlscan',
    url: (targetUrl: string) => `https://urlscan.io/liveshot/?width=1280&height=720&url=${targetUrl}`
  }
];

// 根據 URL 的 hash 值選擇截圖服務（確保服務器端和客戶端一致）
const getScreenshotUrl = (targetUrl: string) => {
  // 使用 URL 的 hash 值來確保服務器端和客戶端選擇相同的服務
  const hash = targetUrl.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const serviceIndex = Math.abs(hash) % screenshotServices.length;
  return screenshotServices[serviceIndex].url(targetUrl);
};

const projects: Project[] = [
  {
    id: 'go-shorturl',
    title: 'Go ShortURL',
    description: '使用 Go 和 Vue.js 實作的短網址服務，提供高效能的重定向和統計功能。',
    longDescription: '這是一個全端短網址服務，使用 Go 語言作為後端 API，Vue.js 作為前端框架。提供短網址生成、重定向、點擊統計等功能。後端使用 PostgreSQL 資料庫，支援高併發處理和即時統計。前端採用現代化設計，提供直觀的用戶介面。',
    image: getScreenshotUrl('https://go-shorturl.vercel.app'),
    technologies: ['Go', 'Vue.js', 'PostgreSQL', 'Supabase', 'RESTful API', 'Vercel', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/120061203/go-shorturl',
    liveUrl: 'https://go-shorturl.vercel.app',
    backgroundColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '高效能 Go 後端 API',
      '現代化 Vue.js 前端介面',
      '短網址生成與重定向',
      '點擊統計與分析',
      'PostgreSQL 資料持久化',
      'Vercel 部署與 CDN',
      'RESTful API 設計',
      '高併發處理能力'
    ]
  },
  {
    id: 'xsong-personal-website',
    title: 'xsong.us',
    description: '一個現代化的個人作品集網站，展示專案、工具和專業經驗。',
    longDescription: '這個個人作品集網站使用 Next.js 建構，具有乾淨現代的設計，支援深色/淺色主題。包含專案展示、互動工具（如白板），以及跨所有裝置無縫運作的響應式佈局。網站展示了現代網頁開發實踐和各種技術技能。',
    image: getScreenshotUrl('https://xsong.us'),
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'React', 'Astro'],
    githubUrl: 'https://github.com/120061203/xsong',
    liveUrl: 'https://xsong.us',
    backgroundColor: 'bg-gradient-to-br from-slate-600 to-gray-700',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '現代響應式設計，支援深色/淺色主題',
      '互動式專案展示與篩選功能',
      '內建工具（白板）',
      '乾淨專業的 UI/UX 設計',
      '使用 Next.js 進行 SEO 優化',
      '快速載入與優化圖片',
      '行動優先的響應式設計',
      '無障礙導航與互動'
    ]
  },
  {
    id: 'calendar-todo-app',
    title: 'Calendar Todo App',
    description: '一個結合日曆和待辦事項管理的綜合應用程式，具有現代化 UI 和即時同步功能。',
    longDescription: '這個應用程式結合了日曆功能和任務管理，讓用戶可以直觀地組織行程和追蹤日常任務。使用 React 前端和 Material-UI 設計系統，提供美觀且易用的介面。支援拖放操作來管理事件和任務。',
    image: getScreenshotUrl('https://120061203.github.io/calendar-todo-app'),
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Material-UI', 'FullCalendar', 'Jest', 'CRUD Operations', 'RESTful API', 'Real-time Sync'],
    githubUrl: 'https://github.com/120061203/calendar-todo-app',
    liveUrl: 'https://120061203.github.io/calendar-todo-app/',
    backgroundColor: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '互動式日曆，支援拖放事件',
      '完整的 CRUD 操作（創建、讀取、更新、刪除）',
      'Supabase 後端即時資料庫',
      '任務管理，具有優先級設定',
      '跨裝置即時同步',
      'RESTful API 設計',
      '所有螢幕尺寸的響應式設計',
      '使用 PostgreSQL 進行資料持久化',
      '清潔架構實作',
      '全面測試（87+ 個測試案例）',
      '使用 Winston 的專業日誌系統'
    ]
  },
  {
    id: 'whiteboard-tool',
    title: 'Whiteboard Tool',
    description: '一個多功能白板應用程式，具有多種顯示模式、文字效果和即時自訂功能。',
    longDescription: '一個互動式白板工具，支援各種顯示模式，包括靜態文字、倒數計時器和跑馬燈效果。具有進階文字樣式功能，包括陰影、邊框、漸層和發光效果。非常適合簡報、公告和數位看板使用。',
    image: getScreenshotUrl('https://xsong.us/tools/whiteboard'),
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Canvas API', 'React'],
    githubUrl: 'https://github.com/120061203/xsong/tree/main/app/tools/whiteboard',
    liveUrl: 'https://xsong.us/tools/whiteboard',
    backgroundColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '多種顯示模式（靜態文字、倒數計時、跑馬燈）',
      '進階文字效果（陰影、邊框、漸層、發光）',
      '即時自訂顏色和字體',
      '內建模板和主題',
      '截圖和全螢幕功能',
      '所有裝置的響應式設計',
      '快速存取的鍵盤快捷鍵',
      '玻璃擬態和現代 UI 效果'
    ]
  }
];

// 按更新日期排序（最新的在前）
const sortedProjects = [...projects].sort((a, b) => 
  new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
);

// 獲取所有技術標籤
const allTechnologies = Array.from(
  new Set(projects.flatMap(project => project.technologies))
).sort();

// 優化的圖片組件
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

function OptimizedImage({ src, alt, className, fill, width, height, priority = false }: OptimizedImageProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [isVisible, setIsVisible] = useState(priority);
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  // 檢查是否有緩存，如果有緩存就不顯示載入狀態
  const [showLoading, setShowLoading] = useState(() => !getCachedWebP(src));
  const maxRetries = 2;

  // 懶加載：使用 Intersection Observer
  useEffect(() => {
    if (priority) return; // 優先載入的圖片不需要懶加載

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // 提前 50px 開始載入
        threshold: 0.1
      }
    );

    const currentElement = document.querySelector(`[data-image-src="${src}"]`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // 圖片優化和緩存處理
  useEffect(() => {
    if (!isVisible) return;

    // 如果圖片已經有緩存，立即設置為載入完成
    const cachedWebP = getCachedWebP(src);
    if (cachedWebP) {
      setOptimizedSrc(cachedWebP);
      setImageState('loaded');
      setShowLoading(false);
      return;
    }

    const loadOptimizedImage = async () => {
      try {
        console.log(`Loading image: ${src}`);
        // 檢查是否有已轉換的 WebP 緩存
        const cachedWebP = getCachedWebP(src);
        if (cachedWebP) {
          console.log(`Using cached WebP for: ${src}`);
          setOptimizedSrc(cachedWebP);
          // 如果有緩存，立即顯示圖片，不需要載入狀態
          setImageState('loaded');
          setShowLoading(false);
          return;
        }

        // 生成備用圖片 URL（使用不同的截圖服務）
        const getFallbackUrl = (originalUrl: string, retryIndex: number) => {
          const urlMatch = originalUrl.match(/url=([^&]+)/) || 
                          originalUrl.match(/url=(.+)$/) ||
                          originalUrl.match(/\/\/([^\/]+)/);
          
          if (!urlMatch) return originalUrl;
          
          const targetUrl = urlMatch[1];
          const services = [
            `https://urlscan.io/liveshot/?width=1280&height=720&url=${targetUrl}`,
            `https://htmlcsstoimage.com/demo?url=${targetUrl}`
          ];
          
          return services[retryIndex % services.length];
        };

        const currentSrc = retryCount > 0 ? getFallbackUrl(src, retryCount) : src;
        console.log(`Converting to WebP: ${currentSrc}`);
        
        // 嘗試轉換為 WebP
        try {
          const webpUrl = await convertToWebP(currentSrc);
          console.log(`WebP conversion successful for: ${src}`);
          setCachedWebP(src, webpUrl);
          setOptimizedSrc(webpUrl);
          // 添加短暫延遲以顯示載入狀態
          setTimeout(() => {
            setImageState('loaded');
            setShowLoading(false);
          }, 800);
        } catch (webpError) {
          console.warn('WebP conversion failed, using original:', webpError);
          setOptimizedSrc(currentSrc);
          // 添加短暫延遲以顯示載入狀態
          setTimeout(() => {
            setImageState('loaded');
            setShowLoading(false);
          }, 800);
        }
      } catch (error) {
        console.error('Image loading failed:', error);
        setImageState('error');
      }
    };

    loadOptimizedImage();
  }, [isVisible, src, retryCount]);

  const handleError = () => {
    console.log(`Image error for ${src}, retry count: ${retryCount}`);
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setImageState('loading');
      setShowLoading(true); // 重試時重新顯示載入狀態
    } else {
      setImageState('error');
      setShowLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full" data-image-src={src}>
      {/* 載入狀態 */}
      {showLoading && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">即時連線中</p>
          </div>
        </div>
      )}
      
      {/* 錯誤狀態 */}
      {imageState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-500 dark:text-gray-400">截圖載入失敗</p>
            <button 
              onClick={() => {
                setRetryCount(0);
                setImageState('loading');
              }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              重試
            </button>
          </div>
        </div>
      )}
      
      {/* 佔位符（未載入時） */}
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <i className="fas fa-image text-4xl text-gray-300 dark:text-gray-600 mb-2"></i>
            <p className="text-sm text-gray-400 dark:text-gray-500">準備載入...</p>
          </div>
        </div>
      )}
      
      {/* 實際圖片 */}
      {isVisible && !showLoading && (
        <Image
          src={optimizedSrc}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={`${className} ${imageState === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          priority={priority}
          onLoad={() => setImageState('loaded')}
          onError={handleError}
        />
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  const filteredProjects = selectedFilter === 'All' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.technologies.includes(selectedFilter));

  // 預載入前6個專案的 WebP 圖片
  useEffect(() => {
    const preloadFirstSixProjects = async () => {
      const firstSixProjects = sortedProjects.slice(0, 6);
      let completed = 0;
      
      console.log('開始預載入前6個專案圖片...');
      
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
          await new Promise(resolve => setTimeout(resolve, 200));
          
        } catch (error) {
          console.warn(`專案 ${project.title} 預載入失敗:`, error);
          completed++;
          setPreloadProgress((completed / firstSixProjects.length) * 100);
        }
      }
      
      console.log('前6個專案預載入完成！');
      setIsInitialLoad(false);
    };
    
    preloadFirstSixProjects();
  }, []);

  // 預載入圖片
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = sortedProjects.slice(0, 3).map(project => project.image);
      
      for (const imageSrc of imagesToPreload) {
        try {
          const img = new window.Image();
          img.src = imageSrc;
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
          });
          setPreloadedImages(prev => new Set([...prev, imageSrc]));
        } catch (error) {
          console.warn(`Failed to preload image: ${imageSrc}`);
        }
      }
    };

    preloadImages();
  }, []);

  // 當篩選改變時，預載入可見的圖片
  useEffect(() => {
    const preloadVisibleImages = async () => {
      const visibleImages = filteredProjects.slice(0, 6).map(project => project.image);
      
      for (const imageSrc of visibleImages) {
        if (!preloadedImages.has(imageSrc)) {
          try {
            const img = new window.Image();
            img.src = imageSrc;
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
            });
            setPreloadedImages(prev => new Set([...prev, imageSrc]));
          } catch (error) {
            console.warn(`Failed to preload image: ${imageSrc}`);
          }
        }
      }
    };

    preloadVisibleImages();
  }, [selectedFilter, preloadedImages]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索我的專案作品，從全端應用到互動工具，每個專案都展現了不同的技術挑戰和解決方案。
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedFilter === 'All'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedFilter(tech)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === tech
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* 預載入進度指示器 */}
        {isInitialLoad && (
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                正在預載入專案圖片...
              </span>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {Math.round(preloadProgress)}%
              </span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div 
                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${preloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
              style={{ 
                ...(isInitialLoad && {
                  animationDelay: `${index * 150}ms`, // 每個卡片間隔 150ms
                  animation: 'fadeInUp 1s ease-out forwards'
                }),
                transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out, border-color 0.5s ease-out'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.backgroundColor} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 6} // 前六個項目優先載入
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`text-xl font-bold mb-2 ${project.textColor}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-3 ${project.textColor} opacity-90 line-clamp-3`}>
                    {project.description}
                  </p>
                  
                  {/* Last Updated Date */}
                  <div className="mb-3">
                    <span className="text-xs opacity-75 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      更新於 {new Date(project.lastUpdated).toLocaleDateString('zh-TW', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 border border-white border-opacity-30"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 border border-white border-opacity-30">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm hover:underline cursor-pointer opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                      View Details
                    </span>
                    <i className="fas fa-external-link-alt opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col border-2 border-gray-300 dark:border-gray-600 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start p-6 border-b-2 border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-300 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    最後更新：{new Date(selectedProject.lastUpdated).toLocaleDateString('zh-TW', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Project Image */}
                    <div className="relative h-64">
                      <OptimizedImage
                        src={selectedProject.image}
                        alt={`${selectedProject.title} screenshot`}
                        fill
                        className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        priority={true}
                      />
                    </div>

                    {/* Project Details */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        專案描述
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>

                      {/* Links */}
                      <div className="space-y-3">
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                          >
                            <i className="fab fa-github mr-2"></i>
                            View on GitHub
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-3"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      主要功能
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <i className="fas fa-check-circle text-green-500 mr-3"></i>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
  