'use client';

import { useState, useEffect } from 'react';

// import { useTheme } from '../contexts/ThemeContext'; // 暫時未使用
import { useAnalytics } from '../hooks/useAnalytics';
import Image from 'next/image';
import LogoLoop from '../../components/LogoLoop';

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
  pdfUrl?: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
  lastUpdated: string;
}

// 生成截圖 URL（直接使用 urlscan.io）

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

function ABTestImage({ projectId, alt, className }: ABTestImageProps) {
  const [currentVersion, setCurrentVersion] = useState<'A' | 'B'>('A');
  
  const getImageSrc = (version: 'A' | 'B') => {
    return `/images/projects/webp/${projectId}-${version.toLowerCase()}.webp`;
  };

  const getFallbackSrc = (version: 'A' | 'B') => {
    return `/images/projects/png/${projectId}-${version.toLowerCase()}.png`;
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
    <div className="relative group w-full h-full">
      <img
        src={getImageSrc(currentVersion)}
        alt={`${alt} - Version ${currentVersion}`}
        className={className}
        onError={handleError}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      {/* A/B 切換按鈕 */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={switchVersion}
          className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs hover:bg-opacity-90 transition-all duration-200 font-medium shadow-lg"
          title={`切換到 Version ${currentVersion === 'A' ? 'B' : 'A'}`}
        >
          A/B
        </button>
      </div>
      {/* 版本標示 */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-blue-500 bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
          Version {currentVersion}
        </span>
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: 'cv-latex',
    title: '履歷自動編譯系統',
    description: '專業的 LaTeX 履歷專案，專為 Song Lin Chen 設計，提供現代化、美觀且易於維護的履歷模板。專案支援多種格式輸出，並整合了自動化編譯系統和 GitHub Pages 部署。',
    longDescription: '這是一個專業的 LaTeX 履歷專案，專為 Song Lin Chen 設計，提供現代化、美觀且易於維護的履歷模板。專案支援多種格式輸出，並整合了自動化編譯系統和 GitHub Pages 部署。專案特色包括現代化設計使用專業的 LaTeX 排版，支援中英文混合；響應式佈局優化的頁面佈局，適合各種閱讀環境；個人化標識文件名包含個人姓名和時間戳記；自動化編譯使用 Makefile 簡化編譯流程；清晰結構源文件和輸出文件分離管理；自動清理編譯後自動清理輔助文件。專案目標是為 Song Lin Chen 提供一個專業、美觀且易於維護的履歷模板，支援快速編譯和版本管理、個人化文件名格式、專業的排版效果、易於修改和擴展。',
    image: getProjectImageUrl('cv-latex'),
    technologies: ['LaTeX', 'PDF', 'GitHub Pages', 'Makefile', '自動化編譯', '版本管理', '專業排版', '中英文混合', '響應式設計', '個人化模板', '時間戳記', '文件管理'],
    githubUrl: 'https://github.com/120061203/cv',
    liveUrl: 'https://120061203.github.io/cv/',
    pdfUrl: 'https://github.com/120061203/cv/raw/main/output/songlinchen_resume_20250505.pdf',
    backgroundColor: 'bg-gradient-to-br from-red-600 to-pink-700',
    textColor: 'text-white',
    lastUpdated: '2025-10-01',
    features: [
      '現代化 LaTeX 排版設計，支援中英文混合',
      '響應式佈局優化，適合各種閱讀環境',
      '個人化標識：文件名包含個人姓名和時間戳記',
      '自動化編譯：使用 Makefile 簡化編譯流程',
      '清晰結構：源文件和輸出文件分離管理',
      '自動清理：編譯後自動清理輔助文件',
      'GitHub Pages 自動部署',
      '專業的排版效果和視覺設計',
      '易於修改和擴展的模板結構',
      '快速編譯和版本管理',
      '多種格式輸出支援',
      '時間戳記自動生成'
    ]
  },
  {
    id: 'gogoshop',
    title: 'GOGO茶飲 - 線上飲料店系統',
    description: '完整的線上飲料店電商系統，包含用戶端購物功能和管理員後台，支援飲料客製化選項（甜度、冰塊、配料）和完整的訂單管理流程。',
    longDescription: 'GOGO茶飲是一個專為飲料店設計的完整電商系統，採用PHP + MySQL技術架構。系統包含雙重身份管理，一般用戶可以註冊登入、瀏覽32種飲料商品、客製化選擇甜度冰塊配料、管理購物車和下單。管理員後台提供商品管理、會員管理、訂單處理等功能。系統特色包括完整的電商流程、客製化選項、響應式設計、訂單狀態追蹤，以及PHPMailer郵件發送和圖形驗證碼等安全功能。資料庫設計包含users、drinks、toppings、cart、orders等主要資料表，支援複雜的訂單明細管理。',
    image: getProjectImageUrl('gogoshop'),
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'SCSS', 'PHPMailer', '電商系統', 'B2C', '購物車', '訂單管理', '用戶管理', '管理員後台', '響應式設計', '圖形驗證碼'],
    githubUrl: 'https://github.com/120061203/gogoshop',
    backgroundColor: 'bg-gradient-to-br from-green-600 to-emerald-700',
    textColor: 'text-white',
    lastUpdated: '2021-01-10',
    features: [
      '完整的電商系統架構（用戶端 + 管理員後台）',
      '用戶註冊/登入系統與忘記密碼功能',
      '32種飲料商品展示與價格管理',
      '購物車功能支援客製化選項',
      '飲料客製化：甜度、冰塊、配料選擇',
      '12種配料選項（珍珠、波霸、布丁等）',
      '完整的訂單管理與狀態追蹤',
      'MySQL資料庫設計與優化',
      'PHPMailer郵件發送功能',
      '圖形驗證碼安全驗證',
      '響應式設計支援手機桌面版',
      '雙重身份系統（用戶/管理員）',
      '歷史訂單查看與管理',
      '商品管理與庫存控制'
    ]
  },
  {
    id: 'tab-library',
    title: 'Tab Library - Chrome 擴充功能',
    description: '基於 Chrome Extension API 開發的分頁管理工具，使用 Manifest V3 架構，整合 Chrome Tabs API 和 Windows API 實現分頁卡片化展示、即時搜尋與 JSON 序列化功能。',
    longDescription: 'Tab Library 採用 Chrome Extension Manifest V3 架構開發，核心技術基於 Chrome Tabs API 和 Windows API 進行分頁狀態監控與管理。使用原生 JavaScript ES6+ 語法實現事件驅動架構，整合 Chrome Storage API 進行狀態持久化。前端採用響應式 CSS Grid 佈局與 Flexbox 排版，支援動態 DOM 操作與事件委派機制。搜尋功能基於正則表達式匹配演算法，支援標題、URL 和網域的多維度篩選。分組功能透過 Chrome Windows API 獲取視窗上下文，使用 Map 資料結構進行分頁分類。匯出/匯入功能採用 JSON 序列化與反序列化技術，整合 Chrome Downloads API 實現檔案下載。',
    image: getProjectImageUrl('tab-library'),
    technologies: ['Chrome Extension', 'Manifest V3', 'Chrome Tabs API', 'Chrome Windows API', 'JavaScript ES6+', 'DOM Manipulation', 'Event Delegation', 'CSS Grid', 'Flexbox', 'JSON Serialization', 'Regular Expressions', 'Map Data Structure', 'Event-Driven Architecture'],
    githubUrl: 'https://github.com/120061203/TabLibrary-ChromeExtension',
    liveUrl: 'https://chromewebstore.google.com/detail/tab-library/cfgmbkjbfjbkkgojnfnmlabjhbbpppnf',
    backgroundColor: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    textColor: 'text-white',
    lastUpdated: '2025-09-27',
    features: [
      'Chrome Extension Manifest V3 架構實作',
      'Chrome Tabs API 與 Windows API 整合',
      '事件驅動架構與 DOM 操作',
      '正則表達式搜尋演算法',
      'JSON 序列化與反序列化',
      'CSS Grid 與 Flexbox 響應式佈局',
      '事件委派機制優化效能',
      'Map 資料結構分頁分類',
      'Apache License 2.0 開源授權'
    ]
  },
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
  },
  {
    id: 'jenkins-grafana',
    title: 'Jenkins + Grafana Cloud 自動部署',
    description: '完整的 DevOps 自動化流程，使用 Jenkins 自動部署 Grafana Dashboard 到 Grafana Cloud，並建立 24/7 網站監控系統。整合 Cloudflare Tunnel 暴露服務和 GitHub Webhook 觸發機制。',
    longDescription: '這是一個完整的 CI/CD 專案，實現了 DevOps 自動化流程。使用 Jenkins 作為 CI/CD 工具，自動將 Grafana Dashboard 部署到 Grafana Cloud，並建立 24/7 網站監控系統。專案包含完整的自動化流程：GitHub Webhook 觸發 Jenkins 自動建置、Dashboard 自動上傳到 Grafana Cloud、部署結果自動檢查、告警自動發送到指定 email。整合了 Prometheus 監控、AlertManager 告警管理、Blackbox 外部監控等多種監控工具。使用 Cloudflare Tunnel 進行安全的服務暴露，提供完整的基礎設施監控解決方案。',
    image: getProjectImageUrl('jenkins-grafana'),
    technologies: ['Jenkins', 'Grafana Cloud', 'Prometheus', 'AlertManager', 'Blackbox', 'Docker', 'Terraform', 'MySQL', 'Nginx', 'Cloudflare Tunnel', 'GitHub Webhook', 'CI/CD', 'DevOps', '監控系統', '自動化部署', '告警系統'],
    githubUrl: 'https://github.com/120061203/jenkins-grafana',
    liveUrl: 'https://xsong.grafana.net/a/grafana-synthetic-monitoring-app/checks',
    backgroundColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    textColor: 'text-white',
    lastUpdated: '2025-10-08',
    features: [
      '✅ 自動觸發：GitHub Webhook → Jenkins 自動建置',
      '✅ 自動部署：Dashboard 自動上傳到 Grafana Cloud',
      '✅ 自動驗證：部署結果自動檢查',
      '✅ 自動通知：告警發送到指定 email',
      'Cloudflare Tunnel 安全服務暴露',
      'GitHub Webhook 即時觸發機制',
      'Jenkins Pipeline 自動化流程',
      'Grafana Cloud Dashboard 管理',
      'Prometheus 監控數據收集',
      'AlertManager 告警規則配置',
      'Blackbox 外部網站監控',
      'Docker 容器化部署',
      'Terraform 基礎設施管理',
      'MySQL 數據庫監控',
      'Nginx 反向代理配置',
      '24/7 網站可用性監控',
      '完整的 DevOps 最佳實踐'
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

// 震撼的標籤同時出現 - 營造視覺衝擊
function calculateDelay(index: number, technologies: string[]): number {
  if (index === 0) return 0; // 第一個標籤立即開始
  
  // 快速連續出現：前20個標籤在2秒內全部出現
  if (index < 20) {
    return index * 0.1; // 每0.1秒出現一個
  }
  
  // 後續標籤稍微延遲，但不會太久
  const baseDelay = 2 + (index - 20) * 0.2; // 2秒後開始，每0.2秒一個
  
  // 隨機微調：讓標籤不會完全同步
  const randomAdjustment = (index % 3) * 0.1; // 0-0.2秒的隨機調整
  
  return baseDelay + randomAdjustment;
}

// 不再需要動態計算消失位置，使用固定的動畫路徑

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showStaticTags, setShowStaticTags] = useState(false);
  const [tagProperties, setTagProperties] = useState<Array<{
    opacity: number, 
    transform: string, 
    horizontalOffset: number, 
    animationSpeed: number, 
    animationDirection: number
  }>>([]);
  const { trackProjectView, trackLinkClick } = useAnalytics();

  // 處理 tag 點擊的函數
  const handleTagClick = (tech: string) => {
    if (selectedFilter === tech) {
      // 如果點擊的是當前選中的 tag，則取消選中（回到 All）
      setSelectedFilter('All');
    } else {
      // 否則選中該 tag，但保持當前的顯示模式（靜態或移動）
      setSelectedFilter(tech);
      // 不改變 showStaticTags 狀態，保持當前的顯示模式
    }
  };

  const handleAllClick = () => {
    if (selectedFilter === 'All') {
      // 如果已經是 All，切換靜態/移動模式
      setShowStaticTags(!showStaticTags);
    } else {
      // 如果選擇了特定標籤，回到 All 並顯示移動模式
      setSelectedFilter('All');
      setShowStaticTags(false);
    }
  };

  // 初始化標籤屬性
  useEffect(() => {
    const properties = allTechnologies.map((tech, index) => {
      return {
        opacity: 1,
        transform: 'translateY(0px)',
        horizontalOffset: 0,
        animationSpeed: 12,
        animationDirection: 1
      };
    });
    setTagProperties(properties);
  }, []);

  // 添加安全頭部
  useEffect(() => {
    // 設置安全頭部
    if (typeof window !== 'undefined') {
      // 防止點擊劫持
      document.documentElement.style.setProperty('--frame-options', 'DENY');
      document.documentElement.style.setProperty('--content-type-options', 'nosniff');
      document.documentElement.style.setProperty('--referrer-policy', 'strict-origin-when-cross-origin');
    }
  }, []);

  // 錨點檢測和自動打開專案
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = projects.find(p => p.id === projectId);
        if (project) {
          // 滾動到對應專案
          const element = document.getElementById(`project-${projectId}`);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            
            // 延遲打開專案詳情，讓滾動動畫完成
            setTimeout(() => {
              setSelectedProject(project);
              trackProjectView(project.title);
            }, 800);
          }
        }
      }
    };

    // 頁面載入時檢查錨點
    handleHashChange();

    // 監聽 hash 變化
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const filteredProjects = selectedFilter === 'All' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.technologies.includes(selectedFilter));


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索我的專案作品，從全端應用到互動工具，每個專案都展現了不同的技術挑戰和解決方案。
          </p>
        </div>

        {/* Filter Buttons - 靜態標籤佈局 */}
        <div className="relative mb-8">
          {/* All 按鈕 */}
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={handleAllClick}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        selectedFilter === 'All'
                          ? showStaticTags 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'   // 靜態模式：藍色
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'   // 移動模式：和其他標籤一樣
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      All
                    </button>
                  </div>

          {/* 技術標籤 - 根據顯示模式狀態顯示不同效果 */}
          <div className="px-4">
            {showStaticTags ? (
              /* 靜態模式：展開所有標籤 */
              <div className="flex flex-wrap justify-center gap-3 py-4">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleTagClick(tech)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                      selectedFilter === tech
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            ) : (
              /* 移動模式：LogoLoop 移動效果 */
              <LogoLoop
                logos={allTechnologies.map((tech) => ({
                  node: (
                    <button
                      onClick={() => handleTagClick(tech)}
                      className={`px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                        selectedFilter === tech
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {tech}
                    </button>
                  ),
                  title: tech,
                  ariaLabel: `篩選 ${tech} 相關專案`
                }))}
                speed={100}
                direction="left"
                logoHeight={30}
                gap={35}
                pauseOnHover={true}
                fadeOut={false}
                scaleOnHover={true}
                className="h-16"
              />
            )}
          </div>
        </div>


        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
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
                <div className="relative w-full mb-4 rounded-xl overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20" style={{ aspectRatio: '2/1', height: 'auto' }}>
                  {project.id === 'aws-deployment-strategies' ? (
                    <ABTestImage
                      projectId="aws-ab-testing"
                      alt={`${project.title} screenshot`}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                        style={{ 
                          transitionDelay: `${index * 50}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span 
                        className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 border border-white border-opacity-30"
                      >
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm hover:underline cursor-pointer opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                      View Details
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const projectUrl = `${window.location.origin}/projects#project-${project.id}`;
                          navigator.clipboard.writeText(projectUrl);
                          // 視覺反饋
                          const button = e.currentTarget;
                          const svgElement = button.querySelector('svg');
                          if (svgElement) {
                            const originalIcon = svgElement.outerHTML;
                            svgElement.outerHTML = `
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                              </svg>
                            `;
                            button.classList.add('bg-green-500', 'text-green-100');
                            button.classList.remove('bg-white', 'bg-opacity-20');
                            setTimeout(() => {
                              const newSvgElement = button.querySelector('svg');
                              if (newSvgElement) {
                                newSvgElement.outerHTML = originalIcon;
                              }
                              button.classList.remove('bg-green-500', 'text-green-100');
                              button.classList.add('bg-white', 'bg-opacity-20');
                            }, 2000);
                          }
                        }}
                        className="px-2 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 border border-white border-opacity-30"
                        title="複製專案連結"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <i className="fas fa-external-link-alt opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col border-2 border-gray-300 dark:border-gray-600 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start p-4 sm:p-6 border-b-2 border-gray-200 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    {/* 私人倉庫標籤 */}
                    {(selectedProject.id === 'app-hub' || selectedProject.id === 'aws-deployment-strategies') && (
                      <span className="px-2 sm:px-3 py-1 bg-orange-500 text-white text-xs sm:text-sm rounded-full border border-orange-400 font-semibold">
                        🔒 私人倉庫
                      </span>
                    )}
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        style={{
                          transitionDelay: `${index * 50}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    最後更新：{new Date(selectedProject.lastUpdated).toLocaleDateString('zh-TW', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl sm:text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-2"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-3 sm:p-4 lg:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {/* Project Image */}
                    <div className="relative" style={{ aspectRatio: '16/9', height: 'auto' }}>
                      {selectedProject.id === 'aws-deployment-strategies' ? (
                        <ABTestImage
                          projectId="aws-ab-testing"
                          alt={`${selectedProject.title} screenshot`}
                          className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
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
                    <div className="min-w-0 w-full">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        專案描述
                      </h3>
                      <div className="w-full overflow-hidden">
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed break-words" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('GitHub', selectedProject.githubUrl!)}
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors break-all"
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
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors break-all"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Visit Website
                          </a>
                        )}
                        {selectedProject.pdfUrl && (
                          <a
                            href={selectedProject.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('Download PDF', selectedProject.pdfUrl!)}
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors break-all"
                          >
                            <i className="fas fa-file-pdf mr-2"></i>
                            Download PDF
                          </a>
                        )}
                        {selectedProject.id === 'app-hub' && (
                          <a
                            href="https://ayfmhwarbk.us-east-2.awsapprunner.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('API Documentation', 'https://ayfmhwarbk.us-east-2.awsapprunner.com/docs')}
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors break-all"
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
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      主要功能
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-0.5 flex-shrink-0"></i>
                          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">{feature}</span>
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
  