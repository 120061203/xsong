'use client';

// 统计追踪工具函数
export const trackPageView = async (page: string) => {
  try {
    // 尝试使用 API
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'pageview',
        page: page,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    });
    
    if (!response.ok) {
      // API 失败时，使用客户端存储
      trackPageViewToClientStorage(page);
    }
  } catch (error) {
    // API 不可用时，使用客户端存储
    console.debug('API not available, using client storage:', error);
    trackPageViewToClientStorage(page);
  }
};

// 使用客户端存储追踪页面访问（备用方案）
function trackPageViewToClientStorage(page: string) {
  try {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('analytics:stats');
    const stats = stored ? JSON.parse(stored) : {
      totalVisits: 0,
      totalClicks: 0,
      uniqueVisitors: {},
      pageViews: {},
      clickEvents: {},
      dailyStats: {},
      lastUpdated: new Date().toISOString(),
    };
    
    // 更新统计数据
    stats.totalVisits = (stats.totalVisits || 0) + 1;
    stats.pageViews[page] = (stats.pageViews[page] || 0) + 1;
    
    // 使用简单的唯一标识（基于 userAgent + 时间戳的哈希）
    const visitorId = getVisitorId();
    stats.uniqueVisitors[visitorId] = true;
    
    // 更新每日统计
    const today = new Date().toISOString().split('T')[0];
    if (!stats.dailyStats[today]) {
      stats.dailyStats[today] = { visits: 0, clicks: 0 };
    }
    stats.dailyStats[today].visits += 1;
    
    stats.lastUpdated = new Date().toISOString();
    
    localStorage.setItem('analytics:stats', JSON.stringify(stats));
  } catch (error) {
    console.debug('Failed to track to client storage:', error);
  }
}

// 获取访客 ID（简单的客户端标识）
function getVisitorId(): string {
  try {
    let visitorId = localStorage.getItem('analytics:visitorId');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics:visitorId', visitorId);
    }
    return visitorId;
  } catch {
    return `visitor_${Date.now()}`;
  }
}

export const trackClick = async (element: string, location?: string) => {
  try {
    // 尝试使用 API
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'click',
        element: location ? `${element}-${location}` : element,
        page: window.location.pathname,
      }),
    });
    
    if (!response.ok) {
      // API 失败时，使用客户端存储
      trackClickToClientStorage(element, location);
    }
  } catch (error) {
    // API 不可用时，使用客户端存储
    console.debug('API not available, using client storage:', error);
    trackClickToClientStorage(element, location);
  }
};

// 使用客户端存储追踪点击（备用方案）
function trackClickToClientStorage(element: string, location?: string) {
  try {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('analytics:stats');
    const stats = stored ? JSON.parse(stored) : {
      totalVisits: 0,
      totalClicks: 0,
      uniqueVisitors: {},
      pageViews: {},
      clickEvents: {},
      dailyStats: {},
      lastUpdated: new Date().toISOString(),
    };
    
    // 更新统计数据
    stats.totalClicks = (stats.totalClicks || 0) + 1;
    const key = location ? `${element}-${location}` : element;
    stats.clickEvents[key] = (stats.clickEvents[key] || 0) + 1;
    
    // 更新每日统计
    const today = new Date().toISOString().split('T')[0];
    if (!stats.dailyStats[today]) {
      stats.dailyStats[today] = { visits: 0, clicks: 0 };
    }
    stats.dailyStats[today].clicks += 1;
    
    stats.lastUpdated = new Date().toISOString();
    
    localStorage.setItem('analytics:stats', JSON.stringify(stats));
  } catch (error) {
    console.debug('Failed to track click to client storage:', error);
  }
}

// 获取统计数据（优先使用 API，失败时使用客户端存储）
export const getStats = async (type?: 'visits' | 'clicks' | 'daily' | 'all') => {
  try {
    const url = type && type !== 'all' 
      ? `/api/analytics?type=${type}`
      : '/api/analytics';
    
    const response = await fetch(url);
    if (!response.ok) {
      // API 失败时，尝试从客户端存储获取
      return getStatsFromClientStorage(type);
    }
    return await response.json();
  } catch (error) {
    // API 不可用时，使用客户端存储
    console.debug('API not available, using client storage:', error);
    return getStatsFromClientStorage(type);
  }
};

// 从客户端存储获取统计数据（备用方案）
function getStatsFromClientStorage(type?: 'visits' | 'clicks' | 'daily' | 'all') {
  try {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem('analytics:stats');
    if (!stored) {
      // 返回默认空数据
      return {
        totalVisits: 0,
        totalClicks: 0,
        uniqueVisitors: 0,
        pageViews: {},
        clickEvents: {},
        dailyStats: {},
        lastUpdated: new Date().toISOString(),
      };
    }
    
    const stats = JSON.parse(stored);
    
    // 处理 uniqueVisitors（Set 在 JSON 中会变成对象）
    if (stats.uniqueVisitors && typeof stats.uniqueVisitors === 'object') {
      stats.uniqueVisitors = Object.keys(stats.uniqueVisitors).length;
    }
    
    if (type === 'visits') {
      return {
        totalVisits: stats.totalVisits || 0,
        uniqueVisitors: stats.uniqueVisitors || 0,
        pageViews: stats.pageViews || {},
      };
    }
    
    if (type === 'clicks') {
      return {
        totalClicks: stats.totalClicks || 0,
        clickEvents: stats.clickEvents || {},
      };
    }
    
    if (type === 'daily') {
      return {
        dailyStats: stats.dailyStats || {},
      };
    }
    
    return stats;
  } catch (error) {
    console.error('Failed to get stats from client storage:', error);
    return null;
  }
}

