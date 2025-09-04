const fs = require('fs');
const path = require('path');

console.log('🧹 開始清理專案結構...');

// 清理函數
function cleanup() {
  try {
    // 1. 移除 Next.js 的 Blog 頁面（因為我們使用 Astro）
    const nextBlogDir = path.join(__dirname, '../app/blog');
    if (fs.existsSync(nextBlogDir)) {
      fs.rmSync(nextBlogDir, { recursive: true, force: true });
      console.log('✅ 移除 Next.js Blog 頁面');
    }

    // 2. 將 Astro 構建結果移動到正確位置
    const publicBlogDir = path.join(__dirname, '../public/blog');
    const outDir = path.join(__dirname, '../out');
    
    if (fs.existsSync(publicBlogDir)) {
      // 複製 Astro 構建結果到 out 目錄
      const copyDir = (src, dest) => {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);
          const stat = fs.statSync(srcPath);
          if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      };
      
      copyDir(publicBlogDir, path.join(outDir, 'blog'));
      console.log('✅ 將 Astro Blog 移動到 out/blog 目錄');
      
      // 移除 public/blog 目錄
      fs.rmSync(publicBlogDir, { recursive: true, force: true });
      console.log('✅ 移除 public/blog 目錄');
    }

    // 3. 清理 public 目錄中的重複文件
    const filesToRemove = [
      'public/test-redirect.html'
    ];
    
    filesToRemove.forEach(filePath => {
      const fullPath = path.join(__dirname, '..', filePath);
      if (fs.existsSync(fullPath)) {
        if (fs.statSync(fullPath).isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(fullPath);
        }
        console.log(`✅ 移除 ${filePath}`);
      }
    });

    console.log('🎉 專案清理完成！');
  } catch (error) {
    console.error('❌ 清理過程中發生錯誤:', error.message);
    process.exit(1);
  }
}

cleanup();
