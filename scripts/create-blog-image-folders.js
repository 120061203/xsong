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
  
  // 遞迴讀取所有 .md 文章（支援巢狀目錄，如 2025/10/*.md）
  const findMarkdownFiles = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
    return results;
  };

  const mdFilePaths = findMarkdownFiles(blogDir);
  console.log(`📄 找到 ${mdFilePaths.length} 篇 blog 文章`);

  mdFilePaths.forEach((absFilePath) => {
    // 取得相對於 blogDir 的路徑，並移除副檔名，作為圖片資料夾路徑
    const relativePath = path.relative(blogDir, absFilePath);
    const folderPathWithoutExt = relativePath.replace(/\.md$/, '');

    const publicFolderPath = path.join(publicImagesDir, folderPathWithoutExt);
    const assetsFolderPath = path.join(assetsImagesDir, folderPathWithoutExt);

    // 創建 public/images 對應巢狀資料夾
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath, { recursive: true });
      console.log(`✅ 創建 public/images/${folderPathWithoutExt} 資料夾`);
    } else {
      console.log(`📁 public/images/${folderPathWithoutExt} 資料夾已存在`);
    }

    // 創建 src/assets/images 對應巢狀資料夾
    if (!fs.existsSync(assetsFolderPath)) {
      fs.mkdirSync(assetsFolderPath, { recursive: true });
      console.log(`✅ 創建 src/assets/images/${folderPathWithoutExt} 資料夾`);
    } else {
      console.log(`📁 src/assets/images/${folderPathWithoutExt} 資料夾已存在`);
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
