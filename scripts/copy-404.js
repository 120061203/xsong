const fs = require('fs');
const path = require('path');

// 複製 404.html 到輸出目錄
const sourcePath = path.join(__dirname, '../public/404.html');
const destPath = path.join(__dirname, '../out/404.html');

try {
    // 確保源文件存在
    if (fs.existsSync(sourcePath)) {
        // 複製文件
        fs.copyFileSync(sourcePath, destPath);
        console.log('✅ 404.html 已成功複製到 out/ 目錄');
    } else {
        console.error('❌ 源文件不存在:', sourcePath);
    }
    
    // 刪除測試文件（如果存在）
    const testFile = path.join(__dirname, '../out/test-redirect.html');
    if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
        console.log('✅ 測試文件已從生產版本中移除');
    }
} catch (error) {
    console.error('❌ 處理文件時發生錯誤:', error);
}
