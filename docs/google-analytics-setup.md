# Google Analytics 4 (GA4) 設定指南

## 📊 概述

本專案已整合 Google Analytics 4 (GA4) 用於追蹤網站流量和用戶行為。GA4 提供更詳細的用戶互動數據，幫助了解網站性能和用戶體驗。

## 🚀 快速開始

### 1. 創建 Google Analytics 帳戶

1. 前往 [Google Analytics](https://analytics.google.com/)
2. 點擊「開始測量」
3. 建立帳戶名稱（例如：xsong.us）
4. 選擇「網站」作為平台
5. 輸入網站 URL：`https://xsong.us`
6. 選擇產業類別和時區

### 2. 獲取 Measurement ID

1. 在 GA4 中，前往「管理」→「資料串流」
2. 點擊你的網站串流
3. 複製「測量 ID」（格式：`G-XXXXXXXXXX`）

### 3. 設定環境變數

創建 `.env.local` 文件並添加：

```bash
# Google Analytics 4 (GA4) 配置
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**重要：** 請將 `G-XXXXXXXXXX` 替換為你的實際 Measurement ID。

## 📈 追蹤功能

### 自動追蹤

- **頁面瀏覽**：自動追蹤所有頁面訪問
- **用戶會話**：追蹤用戶停留時間和互動
- **流量來源**：了解用戶如何到達你的網站

### 自定義事件追蹤

專案中已整合以下自定義事件：

#### 專案頁面 (`/projects`)
- **專案查看**：當用戶點擊專案卡片時
- **GitHub 連結點擊**：追蹤 GitHub 連結的點擊
- **網站訪問**：追蹤「Visit Website」按鈕點擊
- **API 文檔**：追蹤 API 文檔連結點擊

#### 可用的追蹤函數

```typescript
import { useAnalytics } from '../hooks/useAnalytics';

const { 
  trackButtonClick,    // 按鈕點擊
  trackLinkClick,      // 連結點擊
  trackPage,           // 頁面瀏覽
  trackProjectView,    // 專案查看
  trackArticleRead,    // 文章閱讀
  trackDownload,       // 文件下載
  trackSocialClick,    // 社交媒體點擊
  trackSearch          // 搜尋行為
} = useAnalytics();
```

## 🔧 技術實作

### 組件結構

```
app/
├── components/
│   └── GoogleAnalytics.tsx    # GA4 核心組件
├── hooks/
│   └── useAnalytics.ts        # 自定義 Hook
└── layout.tsx                 # 整合到根布局
```

### 性能優化

- **非同步載入**：使用 `strategy="afterInteractive"` 避免阻塞頁面載入
- **條件載入**：只在有 Measurement ID 時載入 GA4
- **最小化影響**：追蹤腳本不影響頁面性能

## 📊 數據分析

### 在 Google Analytics 中查看數據

1. **即時報告**：查看當前在線用戶
2. **獲客報告**：了解流量來源
3. **參與度報告**：查看頁面瀏覽和會話數據
4. **轉換報告**：追蹤目標完成情況

### 重要指標

- **用戶數**：訪問你網站的唯一用戶
- **會話數**：用戶訪問的總次數
- **頁面瀏覽**：用戶查看的頁面總數
- **平均會話時長**：用戶停留時間
- **跳出率**：只查看一個頁面就離開的用戶比例

## 🛠️ 進階設定

### 自定義事件

如需添加新的追蹤事件，請在相應組件中使用：

```typescript
// 在組件中
const { trackButtonClick } = useAnalytics();

// 追蹤按鈕點擊
<button onClick={() => trackButtonClick('Contact Form', 'Header')}>
  聯絡我
</button>
```

### 電子商務追蹤

如需追蹤下載或購買行為：

```typescript
const { trackDownload } = useAnalytics();

// 追蹤文件下載
<a onClick={() => trackDownload('resume.pdf')} href="/resume.pdf">
  下載履歷
</a>
```

## 🔒 隱私考量

- **GDPR 合規**：GA4 預設匿名化處理用戶數據
- **Cookie 政策**：建議在網站上添加 Cookie 使用說明
- **數據保留**：GA4 預設保留數據 14 個月

## 🚨 故障排除

### 常見問題

1. **數據未顯示**
   - 確認 Measurement ID 正確
   - 檢查 `.env.local` 文件是否存在
   - 等待 24-48 小時讓數據出現

2. **開發環境追蹤**
   - 在開發環境中，GA4 仍會發送數據
   - 建議使用不同的 Measurement ID 用於開發

3. **Ad Blocker 影響**
   - 某些 Ad Blocker 會阻擋 GA4
   - 這是正常現象，不影響實際用戶數據

### 驗證設定

使用 Google Analytics Debugger 擴展來驗證追蹤是否正常工作。

## 📚 相關資源

- [Google Analytics 4 官方文檔](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics 整合](https://nextjs.org/docs/advanced-features/measuring-performance)
- [GA4 事件參考](https://developers.google.com/analytics/devguides/collection/ga4/events)
