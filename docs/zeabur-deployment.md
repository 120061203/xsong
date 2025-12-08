# Zeabur 部署指南

## 📋 概述

本指南将帮助你将网站部署到 Zeabur，以启用统计 API 功能。

## 🚀 为什么选择 Zeabur？

- ✅ **支持 Next.js API Routes**：统计功能可以正常工作
- ✅ **免费层**：适合个人项目
- ✅ **自动部署**：连接 GitHub 后自动部署
- ✅ **简单易用**：界面友好，配置简单
- ✅ **全球 CDN**：快速访问速度

## 📝 部署步骤

### 1. 准备配置文件

项目已包含 `zeabur.json` 配置文件，无需额外配置。

### 2. 在 Zeabur 创建项目

1. 访问 [Zeabur](https://zeabur.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库 (`xsong`)

### 3. 配置部署设置

Zeabur 会自动检测 Next.js 项目，但你可以手动设置：

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (或留空，Zeabur 会自动检测)
- **Node Version**: 18.x 或更高

### 4. 环境变量设置

在 Zeabur 项目设置中添加环境变量（如果需要）：

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常 2-5 分钟）
3. 部署完成后，Zeabur 会提供一个 URL（例如：`xsong-xxx.zeabur.app`）

### 6. 自定义域名（可选）

1. 在项目设置中找到 "Domains"
2. 添加你的域名 `xsong.us`
3. 按照提示配置 DNS 记录：
   - 类型：CNAME
   - 名称：@ 或 www
   - 值：Zeabur 提供的域名

## 🔄 切换配置文件

如果需要在 GitHub Pages 和 Zeabur 之间切换：

### 使用 Zeabur 配置（支持 API Routes）

```bash
# 临时重命名配置文件
mv next.config.ts next.config.pages.ts
mv next.config.zeabur.ts next.config.ts
```

### 使用 GitHub Pages 配置（静态导出）

```bash
# 切换回静态导出配置
mv next.config.ts next.config.zeabur.ts
mv next.config.pages.ts next.config.ts
```

## 📊 验证统计功能

部署完成后：

1. 访问 `https://你的域名/status`
2. 浏览网站，触发一些点击事件
3. 刷新 `/status` 页面，查看统计数据是否更新

## 🔧 故障排除

### API Routes 不工作

1. 确认 `next.config.ts` 中没有 `output: 'export'`
2. 检查 Zeabur 构建日志，确认没有错误
3. 确认 API route 文件在 `app/api/analytics/route.ts`

### 统计数据不更新

1. 检查浏览器控制台是否有错误
2. 确认 API route 可以访问（访问 `/api/analytics`）
3. 检查 Zeabur 日志，查看是否有错误

### 构建失败

1. 检查 `package.json` 中的依赖是否正确
2. 确认 Node.js 版本兼容（建议 18.x）
3. 查看 Zeabur 构建日志中的错误信息

## 💡 推荐方案

### 方案 A：完全迁移到 Zeabur（推荐）

- 所有功能都在 Zeabur 上运行
- 统计 API 完全可用
- 可以继续使用 GitHub Pages 作为备份

### 方案 B：双部署

- **主站**：Zeabur（支持 API Routes）
- **备份**：GitHub Pages（静态版本，统计功能使用客户端存储）

### 方案 C：使用 Upstash Redis

即使使用静态导出，也可以集成 Upstash Redis 来存储统计数据：

1. 创建 Upstash Redis 数据库
2. 修改 `app/api/analytics/route.ts` 使用 Redis
3. 将 API 部署为独立的 Serverless Function

## 📚 相关资源

- [Zeabur 文档](https://zeabur.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Upstash Redis 文档](https://docs.upstash.com/redis)

## 🎯 下一步

部署完成后，建议：

1. ✅ 测试统计功能是否正常
2. ✅ 配置自定义域名
3. ✅ 设置环境变量
4. ✅ 配置自动部署（GitHub 推送自动部署）

