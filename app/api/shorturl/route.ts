import { NextRequest, NextResponse } from 'next/server';

// 儲存短網址對應關係 (in-memory)
const urlMap = new Map<string, string>();

// 生成隨機短碼
function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, customCode } = body;

    // 驗證輸入
    if (!url) {
      return NextResponse.json(
        { error: '請提供網址' },
        { status: 400 }
      );
    }

    // 驗證 URL 格式
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: '請提供有效的網址' },
        { status: 400 }
      );
    }

    let shortCode: string;

    if (customCode && customCode.trim()) {
      // 檢查自訂短碼是否已存在
      if (urlMap.has(customCode.trim())) {
        return NextResponse.json(
          { error: '此短碼已被使用，請選擇其他短碼' },
          { status: 400 }
        );
      }
      shortCode = customCode.trim();
    } else {
      // 生成隨機短碼，確保不重複
      do {
        shortCode = generateRandomCode();
      } while (urlMap.has(shortCode));
    }

    // 儲存對應關係
    urlMap.set(shortCode, url);

    const shortUrl = `https://xsong.us/shorturl/${shortCode}`;

    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('Short URL generation error:', error);
    return NextResponse.json(
      { error: '請檢查輸入格式是否正確' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    // 回傳所有短網址列表 (用於 debug)
    const urlList = Array.from(urlMap.entries()).map(([code, url]) => ({
      code,
      url,
      shortUrl: `https://xsong.us/shorturl/${code}`,
    }));

    return NextResponse.json({ urls: urlList }); // 改為 urls
  } catch (error) {
    console.error('Get URL list error:', error);
    return NextResponse.json(
      { error: '無法獲取短網址列表' },
      { status: 500 }
    );
  }
}
