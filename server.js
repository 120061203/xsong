import { execSync } from "child_process";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.ZEABUR === "true") {
  console.log("🚀 Running in Zeabur - serving static build...");
  
  const app = express();
  const port = process.env.PORT || 3000;
  
  // 服務靜態文件
  app.use(express.static(path.join(__dirname, 'out')));
  
  // 處理 SPA 路由 - 所有未匹配的路由都返回 index.html
  app.get('*', (req, res) => {
    console.log(`🔍 請求路徑: ${req.path}`);
    
    // 檢查是否是 blog 路由
    if (req.path.startsWith('/blog/')) {
      // 對於 blog 路由，嘗試找到對應的 HTML 文件
      // 由於 Astro 的 base: '/blog' 配置，實際文件在 /out/blog/blog/ 下
      const blogPath = path.join(__dirname, 'out', 'blog', req.path);
      const indexPath = path.join(blogPath, 'index.html');
      
      console.log(`📁 檢查文件: ${indexPath}`);
      
      // 如果文件存在，直接返回
      if (fs.existsSync(indexPath)) {
        console.log(`✅ 找到文件: ${indexPath}`);
        return res.sendFile(indexPath);
      }
      
      // 如果不存在，嘗試添加 trailing slash
      const pathWithSlash = req.path.endsWith('/') ? req.path : req.path + '/';
      const indexPathWithSlash = path.join(__dirname, 'out', 'blog', pathWithSlash, 'index.html');
      
      console.log(`📁 檢查文件 (with slash): ${indexPathWithSlash}`);
      
      if (fs.existsSync(indexPathWithSlash)) {
        console.log(`🔄 重定向到: ${pathWithSlash}`);
        return res.redirect(301, pathWithSlash);
      }
      
      console.log(`❌ 找不到 blog 文件: ${req.path}`);
    }
    
    // 對於其他路由，返回主頁
    console.log(`🏠 返回主頁: ${req.path}`);
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
} else {
  console.log("🏗️ Running in local / GitHub Actions - build only...");
  execSync("next build && node scripts/copy-404.js", { stdio: "inherit" });
}
