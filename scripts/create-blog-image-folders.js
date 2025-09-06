const fs = require('fs');
const path = require('path');

console.log('📁 開始為 blog 文章創建圖片資料夾...');

try {
  const blogDir = path.join(__dirname, '../blog-astro/src/content/blog');
  const publicImagesDir = path.join(__dirname, '../blog-astro/public/images');
  const assetsImagesDir = path.join(__dirname, '../blog-astro/src/assets/images');
  
  // 確保 images 目錄存在
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
    console.log('✅ 創建 public/images 主目錄');
  }
  
  if (!fs.existsSync(assetsImagesDir)) {
    fs.mkdirSync(assetsImagesDir, { recursive: true });
    console.log('✅ 創建 src/assets/images 主目錄');
  }
  
  // 讀取所有 blog 文章
  const files = fs.readdirSync(blogDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  console.log(`📄 找到 ${mdFiles.length} 篇 blog 文章`);
  
  mdFiles.forEach(file => {
    // 移除 .md 副檔名作為資料夾名稱
    const folderName = file.replace(/\.md$/, '');
    const publicFolderPath = path.join(publicImagesDir, folderName);
    const assetsFolderPath = path.join(assetsImagesDir, folderName);
    
    // 創建 public/images 資料夾
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath, { recursive: true });
      console.log(`✅ 創建 public/images/${folderName} 資料夾`);
    } else {
      console.log(`📁 public/images/${folderName} 資料夾已存在`);
    }
    
    // 創建 src/assets/images 資料夾
    if (!fs.existsSync(assetsFolderPath)) {
      fs.mkdirSync(assetsFolderPath, { recursive: true });
      console.log(`✅ 創建 src/assets/images/${folderName} 資料夾`);
    } else {
      console.log(`📁 src/assets/images/${folderName} 資料夾已存在`);
    }
  });
  
  console.log('🎉 所有 blog 圖片資料夾創建完成！');
  
  // 顯示最終結構
  console.log('\n📋 當前圖片資料夾結構:');
  console.log('  📁 public/images/');
  const publicFolders = fs.readdirSync(publicImagesDir);
  publicFolders.forEach(folder => {
    console.log(`    📁 ${folder}/`);
  });
  
  console.log('  📁 src/assets/images/');
  const assetsFolders = fs.readdirSync(assetsImagesDir);
  assetsFolders.forEach(folder => {
    console.log(`    📁 ${folder}/`);
  });
  
} catch (error) {
  console.error('❌ 創建資料夾時發生錯誤:', error.message);
  process.exit(1);
}
