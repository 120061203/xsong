# 短網址重定向功能

## 概述

xsong.us 現在支援短網址重定向功能，當用戶訪問 `/url/xxxxx` 格式的 URL 時，會自動重定向到短網址服務。

## 功能特點

### ✅ 自動重定向
- 訪問 `https://xsong.us/url/xxxxx` 時自動重定向到 `https://go-shorturl.vercel.app/url/xxxxx`
- 3秒倒計時後自動重定向
- 顯示重定向目標 URL

### ✅ 用戶體驗
- 美觀的重定向頁面設計
- 載入動畫和倒計時顯示
- 錯誤處理和回退選項
- 支援 ESC 鍵快速返回

### ✅ 技術實現
- 純 HTML + JavaScript 實現
- 兼容 GitHub Pages 靜態託管
- 不影響現有網站功能
- 響應式設計

## 使用方法

### 對於用戶
1. 訪問 `https://xsong.us/url/你的短網址代碼`
2. 等待 3 秒自動重定向
3. 或點擊「返回首頁」手動返回

### 對於開發者
1. 確保 `public/404.html` 文件存在
2. 運行 `npm run build:export` 構建
3. 部署到 GitHub Pages

## 文件結構

```
public/
├── 404.html              # 重定向邏輯頁面
└── test-redirect.html    # 測試頁面（僅開發用）

scripts/
└── copy-404.js          # 構建腳本

out/
└── 404.html             # 生產版本（自動生成）
```

## 重定向邏輯

```javascript
// 檢查 URL 格式
const urlMatch = currentPath.match(/^\/url\/(.+)$/);

if (urlMatch) {
    // 提取短網址代碼
    const shortCode = urlMatch[1];
    
    // 重定向到短網址服務
    window.location.href = `https://go-shorturl.vercel.app/url/${shortCode}`;
}
```

## 錯誤處理

- **無效 URL**: 顯示錯誤信息，提供返回首頁選項
- **重定向失敗**: 捕獲錯誤並顯示友好提示
- **網路問題**: 提供手動重定向連結

## 測試

### 本地測試
1. 運行 `npm run build:export`
2. 使用本地伺服器測試 `out/` 目錄
3. 訪問 `/url/test123` 測試重定向

### 生產測試
1. 部署到 GitHub Pages
2. 訪問 `https://xsong.us/url/test123`
3. 驗證重定向功能

## 注意事項

- 重定向目標為 `https://go-shorturl.vercel.app`
- 僅處理 `/url/` 開頭的 URL
- 其他 404 錯誤仍顯示標準錯誤頁面
- 測試文件不會包含在生產版本中

## 更新日誌

- **2025-01-15**: 初始實現
- 添加自動重定向功能
- 實現用戶友好的重定向頁面
- 添加錯誤處理和回退選項
