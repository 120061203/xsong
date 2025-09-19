#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 恢復原始圖片並重新壓縮...');

// 1. 從 Git 恢復原始圖片
console.log('📥 從 Git 恢復原始圖片...');
try {
  const imagesToRestore = [
    'public/blog/_astro/my-first-article-1.B2hsdhKS.png',
    'public/blog/_astro/work-one-month-reflection-1.CkRbiLGO.png',
    'public/images/projects/png/app-hub.png',
    'public/images/projects/png/aws-ab-testing-a.png',
    'public/images/projects/png/aws-ab-testing-b.png',
    'public/images/projects/png/aws-deployment-strategies.png',
    'public/images/projects/png/go-shorturl.png'
  ];
  
  for (const imagePath of imagesToRestore) {
    try {
      execSync(`git checkout HEAD~1 -- "${imagePath}"`, { stdio: 'inherit' });
      console.log(`✅ 恢復 ${path.basename(imagePath)}`);
    } catch (error) {
      console.log(`⚠️  無法恢復 ${path.basename(imagePath)}: ${error.message}`);
    }
  }
} catch (error) {
  console.log('❌ Git 恢復失敗:', error.message);
}

// 2. 使用更溫和的壓縮重新處理
console.log('\n🎨 使用高品質壓縮重新處理...');
try {
  execSync('npm run compress:images', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ 重新壓縮失敗:', error.message);
}

console.log('\n✅ 恢復和重新壓縮完成！');
console.log('💡 現在圖片應該有更好的色彩品質');
