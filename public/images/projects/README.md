# 專案圖片存放目錄

這個目錄用於存放各個專案的展示圖片，採用分格式存放的方式。

## 📁 資料夾結構

```
public/images/projects/
├── png/                           # 原始格式圖片 (PNG/JPG)
│   ├── aws-deployment-strategies.png
│   ├── app-hub.png
│   ├── go-shorturl.png
│   ├── xsong-personal-website.jpg
│   ├── calendar-todo-app.png
│   └── whiteboard.png
└── webp/                          # WebP 格式圖片
    ├── aws-deployment-strategies.webp
    ├── app-hub.webp
    ├── go-shorturl.webp
    ├── xsong-personal-website.webp
    ├── calendar-todo-app.webp
    └── whiteboard.webp
```

## 📁 文件命名規則

請按照以下格式命名圖片文件：

```
{專案ID}.{格式}
```

例如：
- `aws-deployment-strategies.png`
- `aws-deployment-strategies.webp`

## 🖼️ 需要的圖片文件

根據專案配置，你需要準備以下圖片：

1. `aws-deployment-strategies.png` - AWS 部署策略實驗平台
2. `app-hub.png` - App Hub 企業級基礎設施管理
3. `go-shorturl.png` - Go ShortURL
4. `xsong-personal-website.jpg` - xsong.us 個人網站
5. `calendar-todo-app.png` - Calendar Todo App
6. `whiteboard.png` - Whiteboard Tool

## 📐 圖片規格建議

- **格式**: PNG 或 JPG (原始格式)
- **尺寸**: 1280x720 像素 (16:9 比例)
- **檔案大小**: 建議小於 500KB
- **品質**: 高品質，適合展示

## 🔄 自動轉換為 WebP

使用以下命令自動將 PNG/JPG 轉換為 WebP：

```bash
npm run convert:images
```

這會：
1. 讀取 `png/` 資料夾中的所有圖片
2. 轉換為 WebP 格式
3. 保存到 `webp/` 資料夾
4. 保留原始檔案

## 🧠 智能格式選擇

網站會自動：
1. **優先載入 WebP**: 支援 WebP 的瀏覽器會載入更小的 WebP 檔案
2. **自動回退**: 如果 WebP 載入失敗，自動切換到原始 PNG/JPG
3. **無縫體驗**: 用戶不會看到任何載入錯誤或格式問題

## 📝 添加新圖片

1. 將原始圖片放入 `png/` 資料夾
2. 運行 `npm run convert:images` 轉換為 WebP
3. 確保圖片文件名與專案 ID 一致
4. 網站會自動使用智能格式選擇
