# xsong.us - 技術分享與作品集

一個使用 Next.js 和 Astro 構建的現代化個人網站，包含部落格系統、專案展示和工具區塊。

🌐 **網站連結**: [https://xsong.us](https://xsong.us)

## 🏷️ 專案狀態

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwind-css&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)

![Deploy Status](https://img.shields.io/badge/deploy-passing-green)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-blue?logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-enabled-green?logo=github-actions&logoColor=white)

![Version](https://img.shields.io/badge/version-1.1.0-orange)
![License](https://img.shields.io/badge/license-Apache%202.0-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white)

![WebP Optimization](https://img.shields.io/badge/WebP%20Optimization-enabled-green)
![Security](https://img.shields.io/badge/Security-enhanced-red)
![SEO](https://img.shields.io/badge/SEO-optimized-blue)
![RSS Feed](https://img.shields.io/badge/RSS%20Feed-available-orange)

![Website](https://img.shields.io/badge/website-xsong.us-blue?logo=vercel&logoColor=white)
![Uptime](https://img.shields.io/badge/uptime-99.9%25-green)
![Performance](https://img.shields.io/badge/performance-A++++++++++++++++-green)
![Build Status](https://img.shields.io/badge/build-passing-green)

## 🚀 主要功能

- **現代化設計**: 簡潔響應式設計，支援深色/淺色主題
- **部落格系統**: 基於 Astro 的部落格，支援 Markdown 技術文章
- **專案展示**: 展示專案截圖和詳細描述
- **工具區塊**: 互動式工具和實用功能
- **短網址重定向**: 自定義 404 頁面與短網址重定向
- **GitHub Pages 部署**: 透過 GitHub Actions 自動化部署
- **SEO 優化**: 完整的 SEO 設定，包含 meta 標籤、結構化數據和網站地圖
- **RSS 訂閱**: 自動生成部落格文章的 RSS 訂閱源
- **複製功能**: 一鍵複製網址和電子郵件功能，提升使用者體驗
- **流暢導航**: 增強的滾動到區塊功能，帶有彈跳動畫效果
- **進階圖片優化**: WebP 轉換、全域預載入和智能快取
- **安全優先的截圖 API**: 受保護的代理 API，具備速率限制和網域白名單
- **即時專案截圖**: 動態網站截圖，具備錯誤處理和重試機制
- **A/B 測試展示**: 支援多版本圖片切換展示
- **自動 Badge 更新**: 即時更新專案狀態和版本資訊

## 🛠️ 技術棧

- **前端框架**: Next.js 15.5.2 (App Router)
- **部落格系統**: Astro 5.x
- **樣式框架**: TailwindCSS 3.4.0
- **部署平台**: GitHub Pages
- **CI/CD**: GitHub Actions
- **圖片處理**: Sharp (WebP 轉換)
- **程式語言**: TypeScript 5.0

## 📁 專案結構

```
xsong.us/
├── app/                    # Next.js 應用程式目錄
│   ├── components/         # React 組件
│   ├── contexts/          # React 上下文
│   ├── globals.css        # 全域樣式
│   └── layout.tsx         # 根佈局
├── blog-astro/            # Astro 部落格專案
│   ├── src/
│   │   ├── content/       # 部落格內容 (Markdown)
│   │   ├── layouts/       # Astro 佈局
│   │   └── pages/         # Astro 頁面
│   └── astro.config.mjs   # Astro 配置
├── public/                # 靜態資源
│   └── images/projects/   # 專案圖片 (PNG/WebP)
├── .github/workflows/     # GitHub Actions 工作流程
└── scripts/              # 建置腳本
    ├── convert-images.js  # 圖片轉換腳本
    └── update-badges.js   # Badge 更新腳本
```

## 🚀 快速開始

### 環境需求

- Node.js 18+
- npm/yarn/pnpm

### 開發環境設定

1. **複製專案**
   ```bash
   git clone https://github.com/120061203/xsong.git
   cd xsong
   ```

2. **安裝依賴套件**
   ```bash
   npm install
   cd blog-astro && npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **建置 Astro 部落格 (可選)**
   ```bash
   cd blog-astro
   npm run build
   ```

5. **轉換圖片為 WebP 格式**
```bash
   npm run convert:images
   ```

6. **更新專案 Badges**
   ```bash
   npm run update:badges
   ```

## 🚀 部署流程

本專案使用 GitHub Actions 自動化部署到 GitHub Pages。

### 部署流程

1. **Next.js 建置**: 建置主要網站
2. **Astro 部落格建置**: 建置部落格系統
3. **圖片轉換**: 自動轉換 PNG 為 WebP 格式
4. **檔案組織**: 複製檔案到正確位置
5. **GitHub Pages 部署**: 部署到 GitHub Pages
6. **Badge 更新**: 自動更新專案狀態 Badges

### 關鍵配置檔案

- `.github/workflows/nextjs.yml` - GitHub Actions 工作流程
- `.github/workflows/update-badges.yml` - Badge 自動更新工作流程
- `next.config.ts` - Next.js 配置
- `blog-astro/astro.config.mjs` - Astro 配置
- `scripts/convert-images.js` - 圖片轉換腳本
- `scripts/update-badges.js` - Badge 更新腳本

## 🎯 最新功能 (v1.1.0)

### ✨ 新增功能
- **AWS 部署策略實驗平台**: 展示藍綠部署、金絲雀部署、A/B 測試等現代化部署策略
- **A/B 測試圖片切換**: 支援多版本圖片展示，可即時切換不同版本
- **自動 Badge 更新系統**: 即時更新專案狀態、版本號、網站狀態等資訊
- **WebP 圖片優化**: 自動轉換 PNG/JPG 為 WebP 格式，減少 80-90% 檔案大小
- **安全增強**: 多層安全保護，包含速率限制、網域白名單、URL 驗證

### 🔧 技術改進
- **智能圖片載入**: WebP 優先，PNG 備用，支援快取和預載入
- **CORS 保護**: 伺服器端代理，消除跨域問題
- **錯誤處理**: 優雅的錯誤處理和重試機制
- **性能優化**: 優先載入和智能快取策略

### 🛡️ 安全特性
- **網域白名單**: 只允許已核准的網域進行截圖
- **協定限制**: 僅允許 HTTP/HTTPS，阻擋危險協定
- **私人網路保護**: 防止存取內部 IP 範圍
- **請求超時**: 30 秒超時防止資源耗盡
- **檔案大小限制**: 10MB 最大值防止 DoS 攻擊

## 📝 部落格內容管理

### 新增部落格文章

1. 在 `blog-astro/src/content/blog/` 中建立新的 Markdown 檔案
2. 添加必要的 frontmatter 欄位：
   ```markdown
   ---
   title: "文章標題"
   description: "文章描述"
   pubDate: 2025-01-21T14:30:00+08:00
   updatedDate: 2025-01-21T14:30:00+08:00
   heroImage: "../../assets/images/your-post/your-image.png"
   categories: ["技術分享", "部落格建立"]
   tags: ["Astro", "Next.js", "技術寫作"]
   ---
   ```
3. 使用 Markdown 撰寫內容
4. 提交並推送 - GitHub Actions 會自動重建和部署

### 圖片管理

#### 建議圖片尺寸
- **主圖**: 1200x630px (16:9 比例)
- **內容圖片**: 800x600px 或類似尺寸
- **格式**: PNG, JPG, 或 WebP

#### 圖片目錄結構
```
blog-astro/src/assets/images/
├── your-post-name/
│   ├── your-post-1.png
│   ├── your-post-2.jpg
│   └── ...
```

## 🔍 SEO 與 RSS 功能

### SEO 優化
- **Meta 標籤**: 動態頁面標題和描述
- **結構化數據**: JSON-LD 格式的作者和文章資訊
- **網站地圖**: 自動生成 sitemap.xml
- **Open Graph**: 社群媒體分享優化
- **Twitter Cards**: 增強 Twitter 分享

### RSS 訂閱
- **自動生成**: 從部落格文章自動生成 RSS 訂閱源
- **訂閱位置**: `/blog/rss.xml`
- **使用者頁面**: `/rss` 友善的訂閱頁面
- **一鍵複製**: RSS 網址複製功能
- **文章預覽**: 最近 30 天的文章預覽

### 使用者體驗
- **一鍵複製**: 文章網址和電子郵件複製功能
- **流暢導航**: 平滑滾動和彈跳動畫效果
- **視覺回饋**: 綠色勾選確認和自動回復

## 🤝 貢獻指南

1. Fork 這個專案
2. 建立功能分支
3. 進行修改
4. 本地測試
5. 提交 Pull Request

## 📄 授權條款

本專案採用 [Apache License 2.0](LICENSE) 開源授權。

---

**版本**: 1.1.0  
**最後更新**: 2025年9月

## 🆕 版本更新記錄

### v1.1.0 (2025-09-19)
- ✨ 新增 AWS 部署策略實驗平台
- ✨ 新增 A/B 測試圖片切換功能
- ✨ 新增自動 Badge 更新系統
- 🔧 WebP 圖片優化 (減少 80-90% 檔案大小)
- 🛡️ 安全增強 (速率限制、網域白名單)
- 🚀 性能優化 (智能快取、優先載入)

### v0.1.0 (初始版本)
- 🎨 現代化設計和響應式佈局
- 📝 Astro 部落格系統
- 🖼️ 專案展示功能
- 🔧 GitHub Actions 自動部署
- 📱 SEO 優化和 RSS 訂閱
