#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始完整性能測試...');

// 測試網站載入速度
async function testWebsitePerformance(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        resolve({
          responseTime,
          statusCode: response.statusCode,
          contentLength: data.length,
          headers: response.headers
        });
      });
    });
    
    request.on('error', (error) => {
      resolve({
        error: error.message,
        responseTime: 0
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        error: 'Timeout',
        responseTime: 0
      });
    });
  });
}

// 測試多個頁面
async function testMultiplePages() {
  const pages = [
    'https://xsong.us',
    'https://xsong.us/about',
    'https://xsong.us/projects',
    'https://xsong.us/blog'
  ];
  
  const results = [];
  
  for (const page of pages) {
    console.log(`📄 測試 ${page}...`);
    const result = await testWebsitePerformance(page);
    results.push({ page, ...result });
    
    if (result.error) {
      console.log(`❌ ${page}: ${result.error}`);
    } else {
      console.log(`✅ ${page}: ${result.responseTime}ms (${result.statusCode})`);
    }
    
    // 等待 1 秒避免過於頻繁的請求
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// 生成性能報告
function generatePerformanceReport(results) {
  const validResults = results.filter(r => !r.error);
  const avgResponseTime = validResults.reduce((sum, r) => sum + r.responseTime, 0) / validResults.length;
  
  // 性能評分
  let performanceGrade;
  if (avgResponseTime < 500) {
    performanceGrade = 'A+';
  } else if (avgResponseTime < 1000) {
    performanceGrade = 'A';
  } else if (avgResponseTime < 2000) {
    performanceGrade = 'B';
  } else {
    performanceGrade = 'C';
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      averageResponseTime: Math.round(avgResponseTime),
      performanceGrade,
      totalPages: results.length,
      successfulPages: validResults.length,
      failedPages: results.length - validResults.length
    },
    details: results,
    recommendations: [
      '使用 CDN 加速靜態資源',
      '啟用 HTTP/2',
      '優化圖片格式和大小',
      '使用 Service Worker 快取',
      '減少第三方腳本',
      '優化關鍵渲染路徑'
    ]
  };
  
  return report;
}

// 主函數
async function runPerformanceTest() {
  try {
    console.log('🌐 開始測試多個頁面...');
    const results = await testMultiplePages();
    
    console.log('\n📊 性能測試結果:');
    console.log('='.repeat(50));
    
    const validResults = results.filter(r => !r.error);
    const avgResponseTime = validResults.reduce((sum, r) => sum + r.responseTime, 0) / validResults.length;
    
    console.log(`📈 平均響應時間: ${Math.round(avgResponseTime)}ms`);
    console.log(`🎯 成功頁面: ${validResults.length}/${results.length}`);
    
    // 性能評分
    let performanceGrade;
    if (avgResponseTime < 500) {
      performanceGrade = 'A+';
    } else if (avgResponseTime < 1000) {
      performanceGrade = 'A';
    } else if (avgResponseTime < 2000) {
      performanceGrade = 'B';
    } else {
      performanceGrade = 'C';
    }
    
    console.log(`🏆 性能等級: ${performanceGrade}`);
    
    // 生成詳細報告
    const report = generatePerformanceReport(results);
    fs.writeFileSync(
      path.join(__dirname, '../comprehensive-performance-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n✅ 完整性能測試完成！');
    console.log('📄 詳細報告已保存: comprehensive-performance-report.json');
    
    return report;
  } catch (error) {
    console.error('❌ 性能測試失敗:', error.message);
  }
}

runPerformanceTest();
