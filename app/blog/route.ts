import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 这个 route 专门处理 /blog 路径（不带 trailing slash）
// 在 Next.js 中，/blog 和 /blog/ 是不同的路径
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 构建文件路径
    // Astro 构建时 base 设置为 /blog，所以文件在 public/blog/blog/ 目录下
    const publicDir = path.join(process.cwd(), 'public', 'blog', 'blog');
    const indexPath = path.join(publicDir, 'index.html');
    
    console.log(`[Blog Route /blog] Serving blog index from: ${indexPath}`);
    
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8');
      console.log(`[Blog Route /blog] Successfully read blog index, length: ${html.length}`);
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    } else {
      console.error(`[Blog Route /blog] Blog index not found at: ${indexPath}`);
      return new NextResponse('Blog page not found', { status: 404 });
    }
  } catch (error) {
    console.error('[Blog Route /blog] Error serving blog page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

