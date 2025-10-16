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
    // 檢查是否是 blog 路由
    if (req.path.startsWith('/blog/')) {
      // 對於 blog 路由，嘗試找到對應的 HTML 文件
      const blogPath = path.join(__dirname, 'out', req.path);
      const indexPath = path.join(blogPath, 'index.html');
      
      // 如果文件存在，直接返回
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
      
      // 如果不存在，嘗試添加 trailing slash
      const pathWithSlash = req.path.endsWith('/') ? req.path : req.path + '/';
      const indexPathWithSlash = path.join(__dirname, 'out', pathWithSlash, 'index.html');
      
      if (fs.existsSync(indexPathWithSlash)) {
        return res.redirect(301, pathWithSlash);
      }
    }
    
    // 對於其他路由，返回主頁
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
} else {
  console.log("🏗️ Running in local / GitHub Actions - build only...");
  execSync("next build && node scripts/copy-404.js", { stdio: "inherit" });
}
