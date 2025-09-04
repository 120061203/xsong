const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 開始構建 Astro Blog...');

try {
  // 進入 blog-astro 目錄
  const blogDir = path.join(__dirname, '../blog-astro');
  
  // 安裝依賴
  console.log('📦 安裝依賴...');
  execSync('npm install', { cwd: blogDir, stdio: 'inherit' });
  
  // 構建 Astro 專案
  console.log('🔨 構建 Astro 專案...');
  execSync('npm run build', { cwd: blogDir, stdio: 'inherit' });
  
  // 清理重複的構建輸出
  console.log('🧹 清理重複的構建輸出...');
  execSync('node scripts/cleanup-project.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  
  console.log('✅ Astro Blog 構建完成！');
} catch (error) {
  console.error('❌ 構建失敗:', error.message);
  process.exit(1);
}
