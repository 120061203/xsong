import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 检查是否在支持 API Routes 的环境（非静态导出模式）
const supportsApiRoutes = typeof process !== 'undefined' && (
  process.env.VERCEL === '1' || 
  process.env.VERCEL === 'true' || 
  process.env.ZEABUR === 'true' ||
  process.env.ZEABUR === '1'
);

// 仅在非静态导出模式下导出 dynamic
// 在静态导出模式下，这个路由不会被使用（Next.js 会从 public 目录服务文件）
if (supportsApiRoutes) {
  // 使用条件导出，避免静态导出时的错误
  // @ts-expect-error - 动态导出，避免静态导出时的错误
  exports.dynamic = 'force-dynamic';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const { slug } = await params;
    const slugPath = slug ? slug.join('/') : '';
    
    // 构建文件路径
    // Astro 构建时 base 设置为 /blog，所以文件在 public/blog/blog/ 目录下
    const publicDir = path.join(process.cwd(), 'public', 'blog', 'blog');
    
    // 如果是根路径 (/blog 或 /blog/)，返回 blog/index.html
    if (!slugPath || slugPath === '') {
      const indexPath = path.join(publicDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, 'utf-8');
        return new NextResponse(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
      }
    }
    
    // 尝试查找对应的 HTML 文件
    // 先尝试作为目录（查找 index.html）
    const dirPath = path.join(publicDir, slugPath);
    const indexPath = path.join(dirPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8');
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }
    
    // 尝试作为 HTML 文件
    const htmlPath = slugPath.endsWith('.html') 
      ? path.join(publicDir, slugPath)
      : path.join(publicDir, `${slugPath}.html`);
    
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }
    
    // 如果文件不存在，返回 404
    console.error(`Blog page not found: ${slugPath}, tried paths: ${indexPath}, ${htmlPath}`);
    return new NextResponse('Blog page not found', { status: 404 });
  } catch (error) {
    console.error('Error serving blog page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

