import { execSync, spawn } from "child_process";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查是否是静态导出模式（检查 out 目录是否存在）
const isStaticExport = fs.existsSync(path.join(__dirname, 'out', 'index.html'));

if (process.env.ZEABUR === "true" || process.env.ZEABUR === "1") {
  if (isStaticExport) {
    // 静态导出模式：使用 Express 服务静态文件
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
    // 非静态导出模式：使用 Next.js 标准服务器（支持 API Routes）
    console.log("🚀 Running in Zeabur - using Next.js server (API Routes enabled)...");
    console.log("📦 Starting Next.js server...");
    
    // 使用 next start 启动 Next.js 服务器
    const nextServer = spawn('npx', ['next', 'start'], {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        PORT: process.env.PORT || '3000',
      },
    });
    
    nextServer.on('error', (error) => {
      console.error('❌ Failed to start Next.js server:', error);
      process.exit(1);
    });
    
    nextServer.on('exit', (code) => {
      console.log(`Next.js server exited with code ${code}`);
      process.exit(code || 0);
    });
  }
} else {
  console.log("🏗️ Running in local / GitHub Actions - build only...");
  execSync("next build && node scripts/copy-404.js", { stdio: "inherit" });
}
