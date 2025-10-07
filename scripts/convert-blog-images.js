#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('🔄 開始轉換博客圖片為 WebP 格式...');

const convertBlogImages = async () => {
  try {
    const blogImagesDir = path.join(__dirname, '../blog-astro/src/assets/images');
    
    // 遞歸查找所有圖片文件
    const findImageFiles = (dir) => {
      const files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...findImageFiles(fullPath));
        } else if (item.match(/\.(png|jpg|jpeg)$/i)) {
          files.push(fullPath);
        }
      }
      
      return files;
    };
    
    const imageFiles = findImageFiles(blogImagesDir);
    console.log(`📁 找到 ${imageFiles.length} 個圖片文件`);
    
    let totalOriginalSize = 0;
    let totalWebpSize = 0;
    let convertedCount = 0;
    
    for (const imagePath of imageFiles) {
      const ext = path.extname(imagePath).toLowerCase();
      const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      // 檢查是否已經存在 WebP 版本
      if (fs.existsSync(webpPath)) {
        console.log(`⏭️  跳過 ${path.basename(imagePath)} (WebP 已存在)`);
        continue;
      }
      
      console.log(`🔄 轉換 ${path.basename(imagePath)} -> ${path.basename(webpPath)}`);
      
      try {
        const originalSize = fs.statSync(imagePath).size;
        totalOriginalSize += originalSize;
        
        // 根據原始格式選擇轉換方式
        let sharpInstance = sharp(imagePath);
        
        if (ext === '.png') {
          // PNG 轉 WebP，保持透明度
          sharpInstance = sharpInstance.webp({ 
            quality: 85,
            effort: 6,
            lossless: false
          });
        } else if (ext === '.jpg' || ext === '.jpeg') {
          // JPEG 轉 WebP
          sharpInstance = sharpInstance.webp({ 
            quality: 85,
            effort: 6
          });
        }
        
        await sharpInstance.toFile(webpPath);
        
        const webpSize = fs.statSync(webpPath).size;
        totalWebpSize += webpSize;
        convertedCount++;
        
        const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${path.basename(imagePath)} 轉換完成 (減少 ${reduction}%)`);
        console.log(`   📁 原始: ${(originalSize/1024).toFixed(1)}KB`);
        console.log(`   📁 WebP: ${(webpSize/1024).toFixed(1)}KB`);
        
      } catch (error) {
        console.error(`❌ 轉換失敗 ${path.basename(imagePath)}:`, error.message);
      }
    }
    
    if (convertedCount > 0) {
      const totalReduction = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
      console.log(`\n📊 轉換完成統計:`);
      console.log(`   🔄 轉換文件: ${convertedCount} 個`);
      console.log(`   📁 原始總大小: ${(totalOriginalSize/1024/1024).toFixed(2)}MB`);
      console.log(`   📁 WebP 總大小: ${(totalWebpSize/1024/1024).toFixed(2)}MB`);
      console.log(`   📉 總減少: ${totalReduction}%`);
      console.log(`\n💡 PNG/JPEG 檔案保留在原位置`);
      console.log(`💡 WebP 檔案已生成在相同位置`);
      console.log(`🚀 瀏覽器會自動選擇最佳格式`);
    } else {
      console.log(`\n✅ 所有圖片都已經有 WebP 版本，無需轉換`);
    }
    
  } catch (error) {
    console.error('❌ 轉換過程中發生錯誤:', error);
  }
};

convertBlogImages();
