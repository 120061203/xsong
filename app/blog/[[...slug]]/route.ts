import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 处理 Astro blog 的路由（仅在非静态导出模式下使用）
// 在静态导出模式下，Next.js 会自动从 public 目录服务文件
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const { slug } = await params;
    const slugPath = slug ? slug.join('/') : '';
    
    // 构建文件路径
    const publicDir = path.join(process.cwd(), 'public', 'blog');
    
    // 如果是根路径 (/blog 或 /blog/)，返回 index.html
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
    return new NextResponse('Blog page not found', { status: 404 });
  } catch (error) {
    console.error('Error serving blog page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

