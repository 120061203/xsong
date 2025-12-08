'use client';

import { useEffect, useState } from 'react';
import { getStats } from '@/lib/analytics';

interface Stats {
  totalVisits: number;
  totalClicks: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  clickEvents: Record<string, number>;
  dailyStats: Record<string, { visits: number; clicks: number }>;
  lastUpdated: string;
}

export default function StatusPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getStats();
      if (data) {
        setStats(data);
        setError(null);
      } else {
        setError('無法獲取統計數據');
      }
    } catch (err) {
      setError('載入統計數據時發生錯誤');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // 每30秒自動刷新
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // 格式化日期
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  // 获取热门页面（前10名）
  const getTopPages = () => {
    if (!stats?.pageViews) return [];
    return Object.entries(stats.pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  // 获取热门点击事件（前10名）
  const getTopClicks = () => {
    if (!stats?.clickEvents) return [];
    return Object.entries(stats.clickEvents)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  // 获取最近7天的统计数据
  const getRecentDays = () => {
    if (!stats?.dailyStats) return [];
    const days = Object.entries(stats.dailyStats)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 7);
    return days;
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">載入統計數據中...</p>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重試
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题和刷新按钮 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            網站統計儀表板
          </h1>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                刷新中...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                刷新
              </>
            )}
          </button>
        </div>

        {stats && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            最後更新：{formatDate(stats.lastUpdated)}
          </div>
        )}

        {/* 主要统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 总访问次数 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">總訪問次數</div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.totalVisits.toLocaleString() || 0}
            </div>
          </div>

          {/* 独立访客 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">獨立訪客</div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.uniqueVisitors.toLocaleString() || 0}
            </div>
          </div>

          {/* 总点击次数 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">總點擊次數</div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.totalClicks.toLocaleString() || 0}
            </div>
          </div>

          {/* 页面数量 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">追蹤頁面數</div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {Object.keys(stats?.pageViews || {}).length}
            </div>
          </div>
        </div>

        {/* 最近7天统计 */}
        {getRecentDays().length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              最近 7 天統計
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">日期</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">訪問次數</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">點擊次數</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentDays().map(([date, data]) => (
                    <tr key={date} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(date).toLocaleDateString('zh-TW', {
                          month: 'short',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white font-medium">
                        {data.visits.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white font-medium">
                        {data.clicks.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 热门页面 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              熱門頁面
            </h2>
            {getTopPages().length > 0 ? (
              <div className="space-y-3">
                {getTopPages().map(([page, count], index) => (
                  <div key={page} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 dark:text-white truncate">
                          {page || '/'}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-4">
                      {count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">尚無數據</p>
            )}
          </div>

          {/* 热门点击事件 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              熱門點擊事件
            </h2>
            {getTopClicks().length > 0 ? (
              <div className="space-y-3">
                {getTopClicks().map(([event, count], index) => (
                  <div key={event} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 dark:text-white truncate">
                          {event}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-4">
                      {count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">尚無數據</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

