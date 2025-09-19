const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../public/images/projects');
const pngDir = path.join(projectsDir, 'png');
const webpDir = path.join(projectsDir, 'webp');

async function convertImages() {
  try {
    // 確保資料夾存在
    if (!fs.existsSync(pngDir)) {
      fs.mkdirSync(pngDir, { recursive: true });
    }
    if (!fs.existsSync(webpDir)) {
      fs.mkdirSync(webpDir, { recursive: true });
    }

    const files = fs.readdirSync(pngDir);
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );

    console.log(`找到 ${imageFiles.length} 個圖片文件`);

    for (const file of imageFiles) {
      const inputPath = path.join(pngDir, file);
      const outputPath = path.join(webpDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      
      // 檢查是否已經存在 WebP 版本
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  跳過 ${file} (WebP 已存在)`);
        continue;
      }

      console.log(`🔄 轉換 ${file} -> ${path.basename(outputPath)}`);
      
      await sharp(inputPath)
        .webp({ 
          quality: 80, // 80% 品質，平衡檔案大小和品質
          effort: 6    // 壓縮努力程度 (0-6)
        })
        .toFile(outputPath);

      // 獲取檔案大小比較
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${file} 轉換完成 (減少 ${reduction}%)`);
      console.log(`📁 PNG: ${pngDir}/${file}`);
      console.log(`📁 WebP: ${webpDir}/${path.basename(outputPath)}`);
    }

    console.log('🎉 所有圖片轉換完成！');
    console.log('💡 PNG 檔案存放在: png/ 資料夾');
    console.log('💡 WebP 檔案存放在: webp/ 資料夾');
    console.log('🚀 瀏覽器會自動選擇最佳格式');
  } catch (error) {
    console.error('❌ 轉換過程中發生錯誤:', error);
  }
}

convertImages();
