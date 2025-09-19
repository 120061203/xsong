# 智能圖片格式腳本

## 🖼️ 自動圖片轉換為 WebP 格式（保留原始檔案）

這個腳本會自動將 `public/images/projects/` 目錄中的所有 PNG/JPG 圖片轉換為 WebP 格式，同時保留原始檔案。網站會智能地選擇最佳格式。

## 🚀 使用方法

### 轉換所有圖片
```bash
npm run convert:images
```

### 直接運行腳本
```bash
node scripts/convert-images.js
```

## 📊 轉換效果

- **檔案大小減少**: 69-97%
- **載入速度提升**: 顯著提升
- **品質保持**: 80% 品質設定，平衡大小和品質
- **兼容性**: 同時支援 WebP 和原始格式
- **智能選擇**: 瀏覽器自動選擇最佳格式

## 🔧 技術細節

- **使用 Sharp**: 跨平台的圖片處理庫
- **支援格式**: PNG, JPG, JPEG → WebP
- **品質設定**: 80% 品質，6 級壓縮努力
- **自動跳過**: 已存在的 WebP 檔案會自動跳過

## 🌍 跨平台支援

- ✅ **Windows**: 完全支援
- ✅ **macOS**: 完全支援  
- ✅ **Linux**: 完全支援
- ✅ **Docker**: 完全支援

## 📁 檔案結構

```
public/images/projects/
├── png/                           # 原始格式圖片
│   ├── app-hub.png
│   ├── aws-deployment-strategies.png
│   ├── calendar-todo-app.png
│   ├── go-shorturl.png
│   ├── whiteboard.png
│   └── xsong-personal-website.jpg
└── webp/                          # WebP 格式圖片
    ├── app-hub.webp
    ├── aws-deployment-strategies.webp
    ├── calendar-todo-app.webp
    ├── go-shorturl.webp
    ├── whiteboard.webp
    └── xsong-personal-website.webp
```

## 🧠 智能格式選擇

網站會自動：
1. **優先載入 WebP**: 支援 WebP 的瀏覽器會載入更小的 WebP 檔案
2. **自動回退**: 如果 WebP 載入失敗，自動切換到原始 PNG/JPG
3. **無縫體驗**: 用戶不會看到任何載入錯誤或格式問題

## 💡 使用建議

1. **添加新圖片後**: 運行 `npm run convert:images`
2. **部署前**: 確保所有圖片都已轉換為 WebP
3. **版本控制**: 可以只提交 WebP 檔案，不提交原始 PNG/JPG

## 🔄 自動化集成

可以將此腳本集成到 CI/CD 流程中：

```yaml
# GitHub Actions 範例
- name: Convert images to WebP
  run: npm run convert:images
```
