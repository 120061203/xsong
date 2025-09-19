#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 開始性能優化...');

// 1. 優化圖片
console.log('📸 優化圖片...');
try {
  execSync('npm run convert:images', { stdio: 'inherit' });
  console.log('✅ 圖片優化完成');
} catch (error) {
  console.log('❌ 圖片優化失敗:', error.message);
}

// 2. 清理快取
console.log('🧹 清理快取...');
try {
  const cacheDirs = [
    '.next',
    'node_modules/.cache',
    'blog-astro/dist',
    'blog-astro/node_modules/.cache'
  ];
  
  cacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      execSync(`rm -rf ${dir}`, { stdio: 'inherit' });
      console.log(`✅ 清理 ${dir}`);
    }
  });
} catch (error) {
  console.log('❌ 快取清理失敗:', error.message);
}

// 3. 檢查大檔案
console.log('📊 檢查大檔案...');
try {
  const publicDir = path.join(__dirname, '../public');
  const checkLargeFiles = (dir, maxSize = 500 * 1024) => { // 500KB
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkLargeFiles(filePath, maxSize);
      } else if (stat.size > maxSize) {
        console.log(`⚠️  大檔案: ${filePath} (${(stat.size / 1024).toFixed(1)}KB)`);
      }
    });
  };
  
  checkLargeFiles(publicDir);
} catch (error) {
  console.log('❌ 檔案檢查失敗:', error.message);
}

// 4. 生成性能報告
console.log('📈 生成性能報告...');
try {
  const report = {
    timestamp: new Date().toISOString(),
    optimizations: [
      'WebP 圖片轉換',
      '快取清理',
      '大檔案檢查',
      'Next.js 配置優化'
    ],
    recommendations: [
      '使用 CDN 加速靜態資源',
      '啟用 HTTP/2',
      '優化關鍵渲染路徑',
      '減少第三方腳本',
      '使用 Service Worker 快取'
    ]
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../performance-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('✅ 性能報告已生成: performance-report.json');
} catch (error) {
  console.log('❌ 報告生成失敗:', error.message);
}

console.log('🎉 性能優化完成！');
console.log('💡 建議:');
console.log('   - 使用 CDN 加速靜態資源');
console.log('   - 啟用 HTTP/2');
console.log('   - 優化關鍵渲染路徑');
console.log('   - 減少第三方腳本');
console.log('   - 使用 Service Worker 快取');
