#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('🗜️ 開始壓縮大圖片...');

const compressImage = async (inputPath, quality = 85) => {
  try {
    const originalSize = fs.statSync(inputPath).size;
    const tempPath = inputPath + '.tmp';
    
    // 根據檔案類型選擇壓縮方式，保持色彩品質
    const ext = path.extname(inputPath).toLowerCase();
    
    if (ext === '.png') {
      // PNG: 使用較溫和的壓縮，保持色彩品質
      await sharp(inputPath)
        .png({ 
          compressionLevel: 6, // 降低壓縮等級 (0-9)
          quality: quality,
          palette: true, // 使用調色板減少檔案大小
          colors: 256 // 限制顏色數量
        })
        .toFile(tempPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG: 使用較高品質設定
      await sharp(inputPath)
        .jpeg({ 
          quality: quality,
          progressive: true, // 漸進式載入
          mozjpeg: true // 使用 mozjpeg 編碼器
        })
        .toFile(tempPath);
    } else {
      console.log(`⏭️  跳過 ${path.basename(inputPath)} (不支援的格式)`);
      return null;
    }
    
    const compressedSize = fs.statSync(tempPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    // 替換原檔案
    fs.renameSync(tempPath, inputPath);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(1)}KB → ${(compressedSize/1024).toFixed(1)}KB (減少 ${reduction}%)`);
    
    return { originalSize, compressedSize, reduction };
  } catch (error) {
    console.error(`❌ 壓縮失敗 ${inputPath}:`, error.message);
    // 清理臨時檔案
    const tempPath = inputPath + '.tmp';
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
};

const compressLargeImages = async () => {
  const largeImages = [
    'public/blog/_astro/my-first-article-1.B2hsdhKS.png',
    'public/blog/_astro/work-one-month-reflection-1.CkRbiLGO.png',
    'public/images/projects/png/app-hub.png',
    'public/images/projects/png/aws-ab-testing-a.png',
    'public/images/projects/png/aws-ab-testing-b.png',
    'public/images/projects/png/aws-deployment-strategies.png',
    'public/images/projects/png/go-shorturl.png'
  ];
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  
  for (const imagePath of largeImages) {
    if (fs.existsSync(imagePath)) {
      const result = await compressImage(imagePath, 60);
      if (result) {
        totalOriginalSize += result.originalSize;
        totalCompressedSize += result.compressedSize;
      }
    }
  }
  
  const totalReduction = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\n📊 總計壓縮結果:`);
  console.log(`   原始大小: ${(totalOriginalSize/1024).toFixed(1)}KB`);
  console.log(`   壓縮後: ${(totalCompressedSize/1024).toFixed(1)}KB`);
  console.log(`   總減少: ${totalReduction}%`);
};

compressLargeImages().catch(console.error);
