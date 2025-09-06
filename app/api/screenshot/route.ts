import { NextRequest, NextResponse } from 'next/server';

// 允許的域名白名單（只允許我們自己的專案）
const ALLOWED_DOMAINS = [
  'xsong.us',
  'go-shorturl.vercel.app',
  '120061203.github.io',
  'localhost:3000',
  '127.0.0.1:3000'
];

// 危險的協議和模式
const DANGEROUS_PATTERNS = [
  /^file:\/\//,           // 本地文件
  /^ftp:\/\//,            // FTP
  /^data:/,               // Data URLs
  /^javascript:/,         // JavaScript URLs
  /^mailto:/,             // Email
  /^tel:/,                // Phone
  /^127\.0\.0\.1/,        // 本地回環
  /^192\.168\./,          // 私有網路
  /^10\./,                // 私有網路
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 私有網路
];

// 速率限制：每個 IP 每分鐘最多 10 次請求
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1分鐘
    return true;
  }
  
  if (limit.count >= 10) {
    return false; // 超過限制
  }
  
  limit.count++;
  return true;
}

function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url);
    
    // 檢查協議
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
    }
    
    // 檢查危險模式
    for (const pattern of DANGEROUS_PATTERNS) {
      if (pattern.test(url)) {
        return { isValid: false, error: 'URL contains dangerous patterns' };
      }
    }
    
    // 檢查域名白名單
    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      return { isValid: false, error: 'Domain not in allowed list' };
    }
    
    // 檢查 URL 長度
    if (url.length > 2048) {
      return { isValid: false, error: 'URL too long' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

export async function GET(request: NextRequest) {
  try {
    // 獲取客戶端 IP
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // 速率限制檢查
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' }, 
        { status: 429 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }
    
    // URL 驗證
    const validation = validateUrl(url);
    if (!validation.isValid) {
      console.warn(`Screenshot API: Invalid URL from ${ip}: ${url} - ${validation.error}`);
      return NextResponse.json(
        { error: `Invalid URL: ${validation.error}` }, 
        { status: 400 }
      );
    }
    
    // 記錄請求
    console.log(`Screenshot API: Processing request from ${ip} for ${url}`);
    
    const screenshotUrl = `https://urlscan.io/liveshot/?width=1280&height=720&url=${encodeURIComponent(url)}`;
    
    // 設置超時和重試機制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超時
    
    const response = await fetch(screenshotUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Screenshot service returned ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    
    // 檢查圖片大小（防止過大的圖片）
    if (imageBuffer.byteLength > 10 * 1024 * 1024) { // 10MB
      return NextResponse.json(
        { error: 'Image too large' }, 
        { status: 413 }
      );
    }
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // 緩存 1 小時
        'X-Content-Type-Options': 'nosniff', // 防止 MIME 類型嗅探
        'X-Frame-Options': 'DENY', // 防止點擊劫持
        'Referrer-Policy': 'strict-origin-when-cross-origin', // 控制 referrer 信息
      },
    });
  } catch (error) {
    console.error('Screenshot API error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout' }, 
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate screenshot' }, 
      { status: 500 }
    );
  }
}
