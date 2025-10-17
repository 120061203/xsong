'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  figmaUrl?: string;
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

// ---- Color utilities for contrast handling on light backgrounds ----
function hexToRgbInt(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.match(/^#?([0-9a-fA-F]{6})$/);
  if (!m) return null;
  const num = parseInt(m[1], 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  // WCAG relative luminance
  const toLin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const R = toLin(r);
  const G = toLin(g);
  const B = toLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function shouldApplyDarkOverlay(backgroundSpec: string): boolean {
  // Extract hex colors from arbitrary tailwind class like bg-[linear-gradient(...#xxxxxx,#yyyyyy)]
  const hexes = backgroundSpec.match(/#[0-9a-fA-F]{6}/g);
  if (!hexes || hexes.length === 0) return false;
  const luminances = hexes
    .map(h => hexToRgbInt(h))
    .filter(Boolean)
    .map(rgb => relativeLuminance(rgb as { r: number; g: number; b: number }));
  if (luminances.length === 0) return false;
  const avg = luminances.reduce((a, b) => a + b, 0) / luminances.length;
  // If background is bright (avg luminance high), add dark overlay to improve contrast
  return avg > 0.6; // lower threshold for better safety
}

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
  const [imageSrc, setImageSrc] = useState(`/images/projects/webp/${projectId}.webp?v=${Date.now()}`);
  const [fallbackSrc] = useState(`/images/projects/png/${projectId}.png?v=${Date.now()}`);

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
    id: 'ansible-tutorial',
    title: 'Ansible 基礎設施自動部署',
    description: '專業級 Ansible 自動化部署解決方案，展示企業級 DevOps 實踐與安全最佳實踐。包含 Ansible Vault 安全加密、SSH 金鑰認證、Nginx 自動化部署等完整功能。',
    longDescription: '這是一個展示專業 Ansible 技能的完整自動化部署專案，專為企業級 DevOps 實踐設計。專案包含 Ansible Vault 安全加密保護敏感資訊、SSH 金鑰認證實現無密碼自動化部署、安全最佳實踐的 Git 安全與敏感資訊管理、Nginx 自動化部署提供完整的 Web 伺服器配置，以及模組化設計的可擴展基礎架構代碼。專案架構包含 inventory 主機清單管理、playbooks 自動化劇本、roles 可重用角色、vault.yml 加密敏感資訊、.gitignore Git 安全配置等完整結構。技術涵蓋 Ansible 2.19+ 自動化部署引擎、Python 3.12+ 運行環境、Ubuntu 22.04+ 目標作業系統、Nginx Web 伺服器、SSH 安全連接、Git 版本控制等現代化技術。',
    image: getProjectImageUrl('ansible-tutorial'),
    technologies: ['Ansible', 'Python', 'Ubuntu', 'Nginx', 'SSH', 'Git', 'Vault', 'DevOps', 'IaC', '自動化部署', '安全最佳實踐', '基礎設施即代碼'],
    githubUrl: 'https://github.com/120061203/ansible-tutorial',
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#1a1a1a,#2d2d2d)]',
    textColor: 'text-white',
    lastUpdated: '2025-10-14',
    features: [
      'Ansible Vault 安全加密 - 企業級敏感資訊保護',
      'SSH 金鑰認證 - 無密碼自動化部署',
      '安全最佳實踐 - Git 安全與敏感資訊管理',
      'Nginx 自動化部署 - 完整的 Web 伺服器配置',
      '模組化設計 - 可擴展的基礎架構代碼',
      'Inventory 主機清單管理',
      'Playbooks 自動化劇本設計',
      'Roles 可重用角色架構',
      'Vault 敏感資訊加密管理',
      '一鍵部署解決方案',
      'Infrastructure as Code 實踐',
      '版本控制最佳實踐',
      '企業級安全標準',
      '自動化部署流程',
      '完整的專案文檔',
      '環境變數配置支援',
      '多環境支援 (Dev/Staging/Prod)',
      '學習資源與最佳實踐指南'
    ]
  },
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#ababab,#f4f4f4)]',
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
    id: 'gcp-terraform',
    title: 'GCP Terraform 教學專案',
    description: '完整的 GCP Terraform 教學專案，從基礎到生產環境的實作，涵蓋 VPC、Compute、GKE、Cloud SQL 與模組化最佳實踐。',
    longDescription: '這是一個針對 Google Cloud Platform (GCP) 的 Terraform 教學專案，針對初學者到中級使用者設計，循序漸進地帶你從 Terraform 基礎到生產環境規劃。內容包含 VPC 網路、Compute Engine、GKE、Cloud SQL 與模組化設計等主題，並示範如何以 IaC 策略落地實作，最後提供環境分離與 CI/CD 整合的實戰案例。',
    image: getProjectImageUrl('gcp-terraform'),
    technologies: [
      'Terraform', 'GCP', 'VPC', 'Compute Engine', 'GKE', 'Cloud SQL',
      'Modules', 'IaC', 'CI/CD', 'gcloud', '安全最佳實踐'
    ],
    githubUrl: 'https://github.com/120061203/terraform-gcp',
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#19365f,#244d87)]',
    textColor: 'text-white',
    lastUpdated: '2025-09-15',
    features: [
      '第1章：Terraform 基礎、Provider 與 State 管理',
      '第2章：VPC/子網/防火牆/路由配置',
      '第3章：Compute Engine、磁碟、負載平衡與自動擴展',
      '第4章：GKE 叢集、Node Pool、服務/Ingress 部署',
      '第5章：Cloud SQL 建立、備份與高可用',
      '第6章：模組化設計與版本管理',
      '第7章：生產環境範例（dev/staging/prod）與變數管理',
      '成本控管與清理腳本、實作練習與解答'
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#a8997e,#f0dbb4)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#555c61,#7a838a)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#625d90,#8c85ce)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#6a6f99,#979edb)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#221e35,#302b4b)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#161c26,#202836)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#aeaeae,#f8f9f9)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#363b43,#4d5460)]',
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
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#b0b0b0,#fbfbfc)]',
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
  },
  {
    id: 'AirPocket',
    title: 'AirPocket - 空氣口袋',
    description: '結合 IoT 裝置、Android 應用程式與後端服務的智慧空氣品質監測系統。整合 EPA 和 LASS 開放資料，提供即時空氣品質資訊與景點推薦功能。',
    longDescription: 'AirPocket（空氣口袋）是一個創新的空氣品質監測平台，透過自製的 IoT 感測器裝置、Android 行動應用程式，以及整合 EPA 和 LASS 開放資料，為使用者提供即時、準確的空氣品質資訊。系統不僅能監測空氣品質，還能推薦適合的旅遊景點，並提供社交功能讓使用者分享資訊。專案特色包括即時空氣品質監測整合 EPA 官方測站與 LASS 社群資料、IoT 裝置連接支援藍牙連接自製空氣品質感測器、智慧地圖顯示 Google Maps 整合視覺化顯示空氣品質數據、景點推薦系統基於空氣品質推薦適合的旅遊景點、社交功能好友系統與資料分享、個人化設定空汙警報閾值設定。',
    image: getProjectImageUrl('AirPocket'),
    technologies: ['Android', 'Java', 'Python', 'Flask', 'MySQL', 'ESP32', 'IoT', 'Bluetooth', 'MQTT', 'Google Maps API', 'EPA API', 'LASS API', '空氣品質監測', '智慧推薦', '社交功能'],
    githubUrl: 'https://github.com/120061203/AirPocket0310',
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#79985b,#add982)]',
    textColor: 'text-white',
    lastUpdated: '2021-12-10',
    features: [
      '🏆 資訊工程學系畢業專題競賽佳作',
      '🏆 廠商獎 - 業界認可',
      '即時空氣品質監測：整合 EPA 官方測站與 LASS 社群資料',
      'IoT 裝置連接：支援藍牙連接自製空氣品質感測器',
      '智慧地圖顯示：Google Maps 整合，視覺化顯示空氣品質數據',
      '景點推薦系統：基於空氣品質推薦適合的旅遊景點',
      '社交功能：好友系統與資料分享',
      '個人化設定：空汙警報閾值設定',
      '視覺化設計：直觀的小樹狀態指示器',
      '創新整合：結合 IoT 硬體、行動應用與開放資料',
      '智慧推薦：基於空氣品質的景點推薦系統',
      'Android 原生應用程式開發',
      'Python Flask 後端服務',
      'ESP32 空氣品質感測器',
      'Bluetooth 通訊協定',
      'MQTT 訊息傳遞',
      'HTTP API 整合'
    ]
  },
  {
    id: 'smartWatch',
    title: 'SmartWatch - 智慧手錶',
    description: '基於 ESP8266 的智慧手錶專案，整合多種感測器、MQTT 通訊協定、LINE Bot 聊天機器人和行事曆管理功能。即時監測生理數據和環境資訊，並透過 LINE Bot 提供互動式服務。',
    longDescription: '這是一個基於 ESP8266 的智慧手錶專案，整合了多種感測器、MQTT 通訊協定、LINE Bot 聊天機器人和行事曆管理功能。手錶能夠即時監測使用者的生理數據和環境資訊，並透過 LINE Bot 提供互動式服務。專案特色包括即時生理監測心率、體溫、濕度、海拔高度、OLED 顯示 128x64 像素螢幕支援時間顯示和感測器數據、MQTT 通訊即時數據傳輸和遠端控制、LINE Bot 整合透過 LINE 聊天機器人查詢數據和管理行事曆、行事曆管理新增查詢刪除個人行程、IoT Talk 整合支援 IoT Talk 平台數據交換。感測器支援包括 MAX30105 心率監測、HTU21DF 溫濕度感測、BMP085 氣壓和海拔測量、DHT11 溫濕度感測備用。',
    image: getProjectImageUrl('smartWatch'),
    technologies: ['ESP8266', 'Arduino', 'C++', 'Python', 'Django', 'MQTT', 'LINE Bot API', 'OLED', 'MAX30105', 'HTU21DF', 'BMP085', 'DHT11', 'IoT', '物聯網', '嵌入式系統', '聊天機器人', 'SQLite', 'WiFi', 'I2C'],
    githubUrl: 'https://github.com/120061203/smartWatch',
    liveUrl: 'https://www.youtube.com/watch?v=pxb9cMqjrr4',
    backgroundColor: 'bg-[linear-gradient(to_bottom_right,#131a2b,#1b253e)]',
    textColor: 'text-white',
    lastUpdated: '2022-06-19',
    features: [
      '🏆 2022數位聯網智動化創新應用競賽 - 佳作',
      '即時生理監測：心率、體溫、濕度、海拔高度',
      'OLED 顯示：128x64 像素螢幕，支援時間顯示和感測器數據',
      'MQTT 通訊：即時數據傳輸和遠端控制',
      'LINE Bot 整合：透過 LINE 聊天機器人查詢數據和管理行事曆',
      '行事曆管理：新增、查詢、刪除個人行程',
      'IoT Talk 整合：支援 IoT Talk 平台數據交換',
      '感測器支援：MAX30105 心率監測、HTU21DF 溫濕度感測',
      '氣壓測量：BMP085 氣壓和海拔測量',
      '備用感測器：DHT11 溫濕度感測',
      '系統架構：智慧手錶 → MQTT Broker → Django LINE Bot Server',
      '硬體整合：ESP8266 開發板與多種感測器',
      '軟體架構：Arduino 程式碼 + Python Django 後端',
      '通訊協定：WiFi、MQTT、HTTP、I2C',
      '資料庫：SQLite 儲存使用者資料和行事曆',
      '顯示技術：SSD1306 OLED 顯示器',
      '登山救援：專為登山救援設計的智慧手錶',
      '即時監控：24/7 生理數據監測',
      '遠端控制：透過 LINE Bot 遠端管理手錶功能',
      '數據交換：支援 IoT Talk 平台數據交換'
    ]
  }
  ,
  {
    id: 'solar-smart-blinds',
    title: 'Solar Smart Blinds - 太陽能智能百葉窗',
    description: '以物聯網結合太陽能供電與光感測，智慧調節百葉窗角度，降低室內溫度並提升能源效率。',
    longDescription: '太陽能智能百葉窗是一個結合物聯網技術的創新解決方案，針對建築物西曬等高熱負載情境，透過 TSL2591 高精度光感測器偵測環境光線強度，結合太陽能板供電與 MG996R 伺服馬達的精準角度控制，自動調整百葉窗角度，有效降低室內溫度並節能。系統採用 ESP8266 (NodeMCU) 作為主控，內建 Web 介面與 WiFi 遠端控制，支援手動與自動雙模式。',
    image: getProjectImageUrl('solar-smart-blinds'),
    technologies: ['IoT', 'ESP8266', 'NodeMCU', 'TSL2591', 'MG996R', 'Arduino', 'Web Server', 'WiFi', 'Solar Power', 'Energy Saving'],
    githubUrl: 'https://github.com/120061203/SolarSmartBlinds',
    liveUrl: 'https://www.youtube.com/watch?v=5qzH5zYsH84',
    backgroundColor: 'bg-[linear-gradient(135deg,#172f52,#214375)]',
    textColor: 'text-white',
    lastUpdated: '2020-07-01',
    features: [
      '🏆 台灣潔能科技創意實作競賽 - 全國20強',
      '🥈 第九屆激發學生創意競賽 - 第二名',
      '太陽能供電：整合太陽能板，綠能自給自足',
      '智能光感測：TSL2591 高精度感測環境光線',
      '自動調節：依光強自動調整百葉窗角度',
      '精準控制：MG996R 伺服馬達角度控制',
      '物聯網控制：WiFi 遠端與內建 Web 介面',
      '雙模式：自動/手動模式切換'
    ]
  }
  ,
  {
    id: 'time-manager-master',
    title: 'Time Manager Master - 任務批次切分工具',
    description: '將任務依指定數量切分與分配，適合平均拆分待辦、依時段/人力/裝置容量進行批次處理。',
    longDescription: 'Time Manager Master 是一個可將一長串任務清單依指定數量 n 拆分為若干批次的工具。支援貼上或表單輸入、即時預覽切分結果，未來可擴充分享/導出等功能。適合將待辦分派給多人（每人 5 個）、依時段規劃批次（每時段 10 個），或按裝置/節點容量拆分（每台機器 100 個）。',
    image: getProjectImageUrl('time-manager-master'),
    technologies: ['React', 'TypeScript', 'Create React App', 'Jest', 'React Testing Library', 'CSS', 'Node.js', 'npm', 'Figma', 'UI', 'Design'],
    githubUrl: 'https://github.com/120061203/timeManagerMaster',
    liveUrl: 'https://120061203.github.io/timeManagerMaster/',
    figmaUrl: 'https://www.figma.com/proto/hhdYSyzxvzJwQqGfxHa8lZ/%E6%99%82%E9%96%93%E7%AE%A1%E7%90%86%E5%A4%A7%E5%B8%AB?node-id=1-2&starting-point-node-id=1%3A2',
    backgroundColor: 'bg-[linear-gradient(135deg,#1e3a8a,#2563eb)]',
    textColor: 'text-white',
    lastUpdated: '2024-06-17',
    features: [
      '指定數量切分：輸入目標數量 n，自動拆分批次（每批最多 n 個）',
      '彈性輸入：支援表單輸入或從既有資料來源貼上',
      '即時預覽：切分結果即時顯示，便於微調',
      '分享/導出：可複製、下載或分享切分結果（可擴充）'
    ]
  }
  ,
  {
    id: 'seismic-Mini-Houses',
    title: 'Seismic Mini Houses - 耐震迷你屋 (ESP32 MQTT 加速度感測)',
    description: '以 ESP32 + MPU6050 蒐集 XYZ 加速度，透過 MQTT 傳至 Node-RED 即時視覺化，模擬耐震結構測試的 STEM 教育專案。',
    longDescription: '本專案為 STEM 教育活動：使用 ESP32 與 MPU6050 蒐集三軸加速度資料，經由 MQTT (PubSubClient) 上傳至 Node-RED 進行即時處理與視覺化，協助學生理解耐震結構與資料串流。提供 ESP32 範例程式、Node-RED flow 匯入與分組 topic 規劃示例，支援 VS Code/PlatformIO 或 Arduino IDE。',
    image: getProjectImageUrl('seismic-Mini-Houses'),
    technologies: ['ESP32', 'MPU6050', 'MQTT', 'Node-RED', 'Arduino IDE', 'C++', 'STEM', 'IoT'],
    githubUrl: 'https://github.com/120061203/seismic-Mini-Houses',
    liveUrl: 'https://docs.google.com/presentation/d/14juVDNWW6G2ekUi6InJelPNI09F7_nUu7zZbT7NLxyE/edit?usp=drive_link',
    pdfUrl: 'https://raw.githubusercontent.com/120061203/seismic-Mini-Houses/main/%E8%AB%96%E6%96%87/0~5_STEM%E8%80%90%E9%9C%87%E8%BF%B7%E4%BD%A0%E5%B1%8B%E4%B9%8B6E%E6%95%99%E5%AD%B8%E8%A8%AD%E8%A8%88%E8%88%87%E5%AD%B8%E7%BF%92%E6%88%90%E6%95%88%E6%8E%A2%E8%A8%8E.pdf',
    backgroundColor: 'bg-[linear-gradient(135deg,#0f172a,#1e293b)]',
    textColor: 'text-white',
    lastUpdated: '2025-01-21',
    features: [
      'ESP32 + MPU6050：蒐集 XYZ 三軸加速度',
      'MQTT 傳輸：PubSubClient 上傳即時資料',
      'Node-RED 流程：匯入 JSON 即可視覺化',
      '分組題材：支援多 topic（/group1/acc、/group2/acc）',
      '教學友善：提供上傳步驟與函式庫清單'
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
                      All ({allTechnologies.length})
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
                    {tech} ({projects.filter(p => p.technologies.includes(tech)).length})
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
                      {tech} ({projects.filter(p => p.technologies.includes(tech)).length})
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
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 h-full flex flex-col"
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
              {/* Background Gradient + adaptive contrast overlay for light backgrounds */}
              {(() => {
                const isArbitrary = project.backgroundColor.startsWith('bg-[');
                const style = isArbitrary
                  ? {
                      backgroundImage: project.backgroundColor
                        .slice(4, -1) // remove 'bg-[' and trailing ']'
                        .replaceAll('_', ' '), // to_bottom_right -> to bottom right
                    }
                  : undefined;
                const className = isArbitrary
                  ? 'absolute inset-0 opacity-90'
                  : `absolute inset-0 bg-gradient-to-br ${project.backgroundColor} opacity-90`;
                const needOverlay = isArbitrary && shouldApplyDarkOverlay(project.backgroundColor);
                return (
                  <>
                    <div className={className} style={style as React.CSSProperties}></div>
                    {needOverlay && (
                      <div className="absolute inset-0 bg-black/35" aria-hidden="true"></div>
                    )}
                  </>
                );
              })()}
              
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
                  <div className="flex items-center justify-between mt-auto">
                    <Link href={`/projects/${project.id}`} className="text-sm hover:underline cursor-pointer opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                      View Details
                    </Link>
                    <div className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const projectUrl = `${window.location.origin}/projects/${project.id}`;
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
                        {selectedProject.liveUrl && (() => {
                          const isYouTube = selectedProject.liveUrl!.includes('youtube.com');
                          const isSlides = selectedProject.id === 'seismic-Mini-Houses';
                          const isGrafana = selectedProject.id === 'jenkins-grafana';
                          const label = isYouTube ? 'Watch on YouTube' : (isSlides ? 'Visit Slides' : (isGrafana ? 'View Grafana Dashboard' : 'Visit Website'));
                          const iconClass = isYouTube ? 'fab fa-youtube' : (isSlides ? 'fas fa-file-powerpoint' : (isGrafana ? 'fas fa-chart-line' : 'fas fa-external-link-alt'));
                          const colorClass = isYouTube ? 'bg-red-600 hover:bg-red-700' : (isGrafana ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700');
                          return (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackLinkClick(label, selectedProject.liveUrl!)}
                              className={`inline-flex items-center px-3 sm:px-4 py-2 text-white text-sm sm:text-base rounded-lg transition-colors break-all ${colorClass}`}
                            >
                              <i className={`${iconClass} mr-2`}></i>
                              {label}
                            </a>
                          );
                        })()}
                        {selectedProject.figmaUrl && (
                          <a
                            href={selectedProject.figmaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLinkClick('Figma Prototype', selectedProject.figmaUrl!)}
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors break-all"
                          >
                            <i className="fab fa-figma mr-2"></i>
                            View Figma Prototype
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
  