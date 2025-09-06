const fs = require('fs');
const path = require('path');

console.log('📁 開始為 blog 文章創建圖片資料夾...');

try {
  const blogDir = path.join(__dirname, '../blog-astro/src/content/blog');
  const imagesDir = path.join(__dirname, '../blog-astro/public/images');
  
  // 確保 images 目錄存在
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('✅ 創建 images 主目錄');
  }
  
  // 讀取所有 blog 文章
  const files = fs.readdirSync(blogDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  console.log(`📄 找到 ${mdFiles.length} 篇 blog 文章`);
  
  mdFiles.forEach(file => {
    // 移除 .md 副檔名作為資料夾名稱
    const folderName = file.replace(/\.md$/, '');
    const folderPath = path.join(imagesDir, folderName);
    
    // 如果資料夾不存在，就創建它
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ 創建資料夾: ${folderName}`);
    } else {
      console.log(`📁 資料夾已存在: ${folderName}`);
    }
  });
  
  console.log('🎉 所有 blog 圖片資料夾創建完成！');
  
  // 顯示最終結構
  console.log('\n📋 當前圖片資料夾結構:');
  const folders = fs.readdirSync(imagesDir);
  folders.forEach(folder => {
    console.log(`  📁 ${folder}/`);
  });
  
} catch (error) {
  console.error('❌ 創建資料夾時發生錯誤:', error.message);
  process.exit(1);
}
