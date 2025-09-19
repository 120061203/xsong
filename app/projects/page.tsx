'use client';

import { useState, useEffect } from 'react';
// import { useTheme } from '../contexts/ThemeContext'; // 暫時未使用
import { useAnalytics } from '../hooks/useAnalytics';
import Image from 'next/image';

// WebP 轉換緩存（僅存儲轉換後的 WebP URL，不檢查時間）
const getCacheKey = (url: string) => `project_image_${btoa(url)}`;

const getCachedWebP = (url: string): string | null => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(getCacheKey(url));
    }
    return null;
  } catch (error) {
    console.warn('Failed to read WebP cache:', error);
    return null;
  }
};

const setCachedWebP = (url: string, webpUrl: string) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(getCacheKey(url), webpUrl);
    }
  } catch (error) {
    console.warn('Failed to save WebP cache:', error);
  }
};

// WebP 轉換函數
const convertToWebP = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('WebP conversion only available in browser'));
      return;
    }
    
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

// 生成截圖 URL（直接使用 urlscan.io）
const getScreenshotUrl = (targetUrl: string) => {
  return `https://urlscan.io/liveshot/?width=1280&height=720&url=${encodeURIComponent(targetUrl)}`;
};

// 生成專案圖片 URL（智能選擇最佳格式）
const getProjectImageUrl = (projectId: string) => {
  return `/images/projects/${projectId}`;
};

// 智能圖片組件，自動選擇 WebP 或 PNG
interface SmartImageProps {
  projectId: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

function SmartImage({ projectId, alt, className, fill, width, height, priority = false, sizes }: SmartImageProps) {
  const [imageSrc, setImageSrc] = useState(`/images/projects/webp/${projectId}.webp`);
  const [fallbackSrc] = useState(`/images/projects/png/${projectId}.png`);

  const handleError = () => {
    // 如果 WebP 載入失敗，回退到 PNG
    if (imageSrc.includes('/webp/')) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
    />
  );
}

// A/B 測試圖片組件，展示兩個版本
interface ABTestImageProps {
  projectId: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

function ABTestImage({ projectId, alt, className, fill, width, height, priority = false, sizes }: ABTestImageProps) {
  const [currentVersion, setCurrentVersion] = useState<'A' | 'B'>('A');
  
  const getImageSrc = (version: 'A' | 'B') => {
    return `/images/projects/webp/${projectId}-${version.toLowerCase()}.webp`;
  };

  const getFallbackSrc = (version: 'A' | 'B') => {
    return `/images/projects/png/${projectId}-${version.toLowerCase()}.png`;
  };

  const handleError = (e: any) => {
    // 如果 WebP 載入失敗，回退到 PNG
    const target = e.target as HTMLImageElement;
    if (target.src.includes('.webp')) {
      target.src = getFallbackSrc(currentVersion);
    }
  };

  const switchVersion = () => {
    setCurrentVersion(currentVersion === 'A' ? 'B' : 'A');
  };

  return (
    <div className="relative group">
      <img
        src={getImageSrc(currentVersion)}
        alt={`${alt} - Version ${currentVersion}`}
        className={className}
        onError={handleError}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover'
        }}
      />
      {/* A/B 切換按鈕 */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={switchVersion}
          className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-all duration-200"
          title={`切換到 Version ${currentVersion === 'A' ? 'B' : 'A'}`}
        >
          A/B
        </button>
      </div>
      {/* 版本標示 */}
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-blue-500 bg-opacity-80 text-white px-2 py-1 rounded text-xs">
          Version {currentVersion}
        </span>
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: 'aws-deployment-strategies',
    title: 'AWS 部署策略實驗平台',
    description: '一個完整的 AWS 部署策略學習平台，實作藍綠部署、金絲雀部署、A/B 測試等多種現代化部署技術，透過 ALB 和 CodeDeploy 實現零停機部署。',
    longDescription: '這是一個專為學習和實作現代化部署策略而設計的實驗平台。專案涵蓋了四種主要的部署策略：藍綠部署 (Blue-Green Deployment)、金絲雀部署 (Canary Deployment)、A/B 測試部署 (A/B Testing Deployment) 和符號連結回滾部署 (Symlink Rollback Deployment)。使用 AWS Application Load Balancer (ALB) 進行流量分配與路由，透過 CodeDeploy 服務實現自動化部署管理。整個架構包含 Blue/Green EC2 實例群、S3 儲存桶、Target Groups 等完整的 AWS 雲端環境。這個平台的核心價值在於提供零停機部署、風險控制、數據驅動決策和自動化流程，讓開發者能夠安全地學習和實作各種現代化的部署技術。',
    image: getProjectImageUrl('aws-deployment-strategies'),
    technologies: ['Terraform', 'AWS', 'ALB', 'CodeDeploy', 'EC2', 'S3', 'Target Groups', '藍綠部署', '金絲雀部署', 'A/B Testing', '零停機部署', '自動化部署', '雲端架構'],
    githubUrl: 'https://github.com/120061203/codedeploy-terraform-ec2', // 私人倉庫
    liveUrl: 'http://blue-green-canary-alb-873311364.us-west-2.elb.amazonaws.com/',
    backgroundColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    textColor: 'text-white',
    lastUpdated: '2025-09-19',
    features: [
      '藍綠部署 (Blue-Green Deployment) 實作',
      '金絲雀部署 (Canary Deployment) 策略',
      'A/B 測試部署 (A/B Testing Deployment)',
      '符號連結回滾部署 (Symlink Rollback)',
      'AWS Application Load Balancer 流量分配',
      'CodeDeploy 自動化部署管理',
      'EC2 實例群管理與切換',
      'S3 儲存桶應用程式檔案管理',
      'Target Groups 健康檢查與路由',
      '零停機部署實現',
      '風險控制與回滾機制',
      '數據驅動的部署決策',
      '完整的 AWS 雲端環境架構',
      '部署策略學習與實驗平台'
    ]
  },
  {
    id: 'app-hub',
    title: 'App Hub - 企業級基礎設施管理',
    description: '使用 Terraform 進行基礎設施即代碼管理的企業級專案，包含完整的 AWS 資源配置、VPC 網路設計和 CI/CD 流程。',
    longDescription: '這是一個企業級的基礎設施管理專案，主要焦點在於使用 Terraform 進行基礎設施即代碼 (Infrastructure as Code) 的實踐。專案包含完整的 AWS 資源配置，包括 VPC 網路設計、ECR 容器倉庫管理、App Runner 服務部署等。採用微服務架構，使用 FastAPI 和 Rust 作為應用服務，但核心價值在於展示如何通過 Terraform 實現可重複、可維護的基礎設施管理。包含完整的團隊協作流程，Infrastructure Team 負責 Terraform 配置和 AWS 資源管理，Development Team 負責應用程式開發。',
    image: getProjectImageUrl('app-hub'),
    technologies: ['Terraform', 'AWS', 'VPC', 'ECR', 'App Runner', '基礎設施即代碼IaC', '微服務架構', 'CI/CD', 'Bitbucket Pipelines', 'Docker', 'FastAPI', 'Rust'],
    githubUrl: 'https://github.com/120061203/app-hub', // 私人倉庫
    liveUrl: 'https://ayfmhwarbk.us-east-2.awsapprunner.com/',
    backgroundColor: 'bg-gradient-to-br from-slate-700 to-gray-800',
    textColor: 'text-white',
    lastUpdated: '2025-09-12',
    features: [
      'Terraform 基礎設施即代碼管理',
      'AWS 資源完整配置與管理',
      'VPC 網路架構設計與隔離',
      'ECR 容器映像倉庫管理',
      'App Runner 服務自動部署',
      '環境隔離 (Dev/Prod) 配置',
      'Bitbucket Pipelines CI/CD 整合',
      '團隊協作開發流程設計',
      '安全群組與 IAM 權限管理',
      'DynamoDB 狀態鎖定配置',
      'S3 存儲桶資源管理',
      '企業級最佳實踐實施'
    ]
  },
  {
    id: 'go-shorturl',
    title: 'Go ShortURL',
    description: '使用 Go 和 Vue.js 實作的短網址服務，提供高效能的重定向和統計功能。',
    longDescription: '這是一個全端短網址服務，使用 Go 語言作為後端 API，Vue.js 作為前端框架。提供短網址生成、重定向、點擊統計等功能。後端使用 PostgreSQL 資料庫，支援高併發處理和即時統計。前端採用現代化設計，提供直觀的用戶介面。',
    image: getProjectImageUrl('go-shorturl'),
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
    description: '一個現代化的技術分享與作品集網站，展示專案、工具和專業經驗。',
    longDescription: '這個技術分享與作品集網站使用 Next.js 建構，具有乾淨現代的設計，支援深色/淺色主題。包含專案展示、技術文章、互動工具（如白板），以及跨所有裝置無縫運作的響應式佈局。網站展示了現代網頁開發實踐和各種技術技能。',
    image: getProjectImageUrl('xsong-personal-website'),
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
    image: getProjectImageUrl('calendar-todo-app'),
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
    image: getProjectImageUrl('whiteboard'),
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
          loading={priority ? "eager" : "lazy"}
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
  const { trackProjectView, trackLinkClick } = useAnalytics();

  const filteredProjects = selectedFilter === 'All' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.technologies.includes(selectedFilter));


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


        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
              style={{ 
                animationDelay: `${index * 150}ms`, // 每個卡片間隔 150ms
                animationName: 'fadeInUp',
                animationDuration: '1s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out, border-color 0.5s ease-out'
              }}
              onClick={() => {
                setSelectedProject(project);
                trackProjectView(project.title);
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.backgroundColor} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20" style={{ height: '192px' }}>
                  {project.id === 'aws-deployment-strategies' ? (
                    <ABTestImage
                      projectId="aws-ab-testing"
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <SmartImage
                      projectId={project.id}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3} // 前三個項目優先載入
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
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
                    {/* 私人倉庫標籤 */}
                    {(project.id === 'app-hub' || project.id === 'aws-deployment-strategies') && (
                      <span className="px-3 py-1 bg-orange-500 bg-opacity-90 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-100 hover:scale-105 border border-orange-400 border-opacity-50 font-semibold">
                        🔒 私人倉庫
                      </span>
                    )}
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
                    {/* 私人倉庫標籤 */}
                    {(selectedProject.id === 'app-hub' || selectedProject.id === 'aws-deployment-strategies') && (
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full border border-orange-400 font-semibold">
                        🔒 私人倉庫
                      </span>
                    )}
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
                    <div className="relative h-64" style={{ height: '256px' }}>
                      {selectedProject.id === 'aws-deployment-strategies' ? (
                        <ABTestImage
                          projectId="aws-ab-testing"
                          alt={`${selectedProject.title} screenshot`}
                          fill
                          className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <SmartImage
                          projectId={selectedProject.id}
                          alt={`${selectedProject.title} screenshot`}
                          fill
                          className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
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
                      <div className="flex flex-col space-y-4">
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('GitHub', selectedProject.githubUrl!)}
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
                            onClick={() => trackLinkClick('Visit Website', selectedProject.liveUrl!)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Visit Website
                          </a>
                        )}
                        {selectedProject.id === 'app-hub' && (
                          <a
                            href="https://ayfmhwarbk.us-east-2.awsapprunner.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('API Documentation', 'https://ayfmhwarbk.us-east-2.awsapprunner.com/docs')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <i className="fas fa-code mr-2"></i>
                            API Documentation
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
  