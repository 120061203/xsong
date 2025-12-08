# 網站統計系統設定指南

## 📊 概述

本專案已整合自建統計系統，用於追蹤網站訪問人數、點擊次數等數據。統計儀表板位於 `/status` 頁面（不顯示在導航欄中）。

## 🚀 功能特點

### 自動追蹤
- **頁面訪問**：自動追蹤所有頁面訪問
- **獨立訪客**：基於 IP 地址統計獨立訪客數
- **點擊事件**：追蹤按鈕、連結、社交媒體等點擊

### 統計數據
- 總訪問次數
- 獨立訪客數
- 總點擊次數
- 熱門頁面（前 10 名）
- 熱門點擊事件（前 10 名）
- 最近 7 天統計

## 📍 訪問儀表板

訪問 `https://xsong.us/status` 查看統計數據（此頁面不顯示在導航欄中）。

## 🔧 技術實現

### 文件結構

```
app/
├── api/
│   └── analytics/
│       └── route.ts          # 統計 API（存儲和獲取數據）
├── components/
│   └── AnalyticsTracker.tsx # 自動追蹤頁面訪問
├── hooks/
│   └── useAnalytics.ts       # 統計追蹤 Hook
├── status/
│   └── page.tsx              # 統計儀表板頁面
lib/
└── analytics.ts              # 統計工具函數
```

### 數據存儲

目前使用內存存儲（開發環境）。生產環境建議：

1. **Upstash Redis**（推薦）
   - 免費層：10,000 請求/天
   - 設置簡單，與 Vercel 完美整合

2. **Supabase**
   - 免費層：500MB 數據庫
   - PostgreSQL 數據庫

3. **Vercel KV**
   - 與 Vercel 平台整合
   - 需要 Vercel Pro 計劃

## 📝 使用方式

### 在組件中追蹤點擊

```typescript
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function MyComponent() {
  const { trackSocialClick, trackButtonClick, trackDownload } = useAnalytics();

  return (
    <>
      <a 
        href="https://github.com/..."
        onClick={() => trackSocialClick('github')}
      >
        GitHub
      </a>
      
      <button 
        onClick={() => {
          trackButtonClick('Submit', 'form');
          // ... 其他邏輯
        }}
      >
        提交
      </button>
    </>
  );
}
```

### 可用的追蹤函數

```typescript
const {
  trackButtonClick,    // 按鈕點擊
  trackLinkClick,      // 連結點擊
  trackPage,           // 頁面瀏覽（已自動追蹤）
  trackProjectView,    // 專案查看
  trackArticleRead,    // 文章閱讀
  trackDownload,       // 文件下載
  trackSocialClick,    // 社交媒體點擊
  trackSearch          // 搜尋行為
} = useAnalytics();
```

## ⚠️ 注意事項

### 靜態導出限制

如果使用 `next build` 進行靜態導出（GitHub Pages），API Routes 不會工作。需要：

1. **使用 Vercel 部署**（推薦）
   - API Routes 完全支持
   - 自動部署和擴展

2. **使用外部服務**
   - 將 API 邏輯移到外部服務（如 Vercel Serverless Functions）
   - 或使用第三方統計服務

### 數據持久化

當前實現使用內存存儲，服務器重啟後數據會丟失。生產環境必須使用數據庫：

```typescript
// 示例：使用 Upstash Redis
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 在 API route 中使用
const stats = await redis.get('analytics:stats') || defaultStats;
await redis.set('analytics:stats', updatedStats);
```

## 🔒 隱私考量

- 統計數據基於 IP 地址識別獨立訪客（不存儲完整 IP）
- 不收集個人身份信息
- 符合 GDPR 基本要求

## 🚨 故障排除

### 儀表板顯示「無法獲取統計數據」

1. 確認 API route 正常工作（檢查 `/api/analytics`）
2. 檢查網絡請求是否成功
3. 確認服務器端存儲是否正常

### 統計數據不更新

1. 確認 `AnalyticsTracker` 組件已添加到 `layout.tsx`
2. 檢查瀏覽器控制台是否有錯誤
3. 確認 API route 可以接收 POST 請求

## 📈 未來改進

- [ ] 集成 Upstash Redis 實現數據持久化
- [ ] 添加更多統計維度（設備類型、瀏覽器、國家等）
- [ ] 實現數據導出功能
- [ ] 添加實時統計更新（WebSocket）
- [ ] 添加統計數據可視化圖表

