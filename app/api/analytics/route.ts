import { NextRequest, NextResponse } from 'next/server';

// 告诉 Next.js 这个路由需要动态处理（即使使用静态导出）
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// 简单的内存存储（开发环境）
// 生产环境建议使用 Upstash Redis 或 Supabase
let stats = {
  totalVisits: 0,
  totalClicks: 0,
  uniqueVisitors: new Set<string>(),
  pageViews: {} as Record<string, number>,
  clickEvents: {} as Record<string, number>,
  dailyStats: {} as Record<string, { visits: number; clicks: number }>,
  lastUpdated: new Date().toISOString(),
};

// 获取客户端 IP（用于统计独立访客）
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'visits') {
    return NextResponse.json({ 
      totalVisits: stats.totalVisits,
      uniqueVisitors: stats.uniqueVisitors.size,
      pageViews: stats.pageViews 
    });
  }

  if (type === 'clicks') {
    return NextResponse.json({ 
      totalClicks: stats.totalClicks,
      clickEvents: stats.clickEvents 
    });
  }

  if (type === 'daily') {
    return NextResponse.json({ 
      dailyStats: stats.dailyStats 
    });
  }

  // 返回所有统计数据
  return NextResponse.json({
    totalVisits: stats.totalVisits,
    totalClicks: stats.totalClicks,
    uniqueVisitors: stats.uniqueVisitors.size,
    pageViews: stats.pageViews,
    clickEvents: stats.clickEvents,
    dailyStats: stats.dailyStats,
    lastUpdated: stats.lastUpdated,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, element, referrer, userAgent } = body;
    const clientIP = getClientIP(request);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // 初始化今日统计
    if (!stats.dailyStats[today]) {
      stats.dailyStats[today] = { visits: 0, clicks: 0 };
    }

    if (event === 'pageview') {
      stats.totalVisits += 1;
      stats.uniqueVisitors.add(clientIP);
      stats.pageViews[page] = (stats.pageViews[page] || 0) + 1;
      stats.dailyStats[today].visits += 1;
    } else if (event === 'click') {
      stats.totalClicks += 1;
      const key = element || 'unknown';
      stats.clickEvents[key] = (stats.clickEvents[key] || 0) + 1;
      stats.dailyStats[today].clicks += 1;
    }

    stats.lastUpdated = new Date().toISOString();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

