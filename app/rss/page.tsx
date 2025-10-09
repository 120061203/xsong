'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  categories?: string[];
  tags?: string[];
}

export default function RSSPage() {
  const [copied, setCopied] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 從 Astro 部落格獲取最新文章
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        // 嘗試從 Astro 部落格 API 獲取文章
        const response = await fetch('/blog/data-store.json');
        if (response.ok) {
          const data = await response.json();
          const posts = data.entries || [];
          
          // 轉換格式並限制為最近的文章
          const formattedPosts = posts
            .slice(0, 6) // 只取最新的 6 篇文章
            .map((post: any) => ({
              title: post.title || '無標題',
              slug: post.id?.replace(/\.(md|mdx)$/, '') || '',
              date: post.pubDate ? new Date(post.pubDate).toLocaleString('zh-TW') : '未知日期',
              description: post.description || '無描述',
              categories: post.categories || [],
              tags: post.tags || []
            }));
          
          setRecentPosts(formattedPosts);
        } else {
          // 如果無法獲取，使用預設數據
          setRecentPosts([
            {
              title: "工作兩個月的心態反思",
              slug: "work-two-month-reflection",
              date: "2025-09-05 14:07",
              description: "分享新鮮人進入職場兩個月的心得與反思，包含技術學習、團隊合作和職涯規劃...",
              categories: ["職涯分享"],
              tags: ["工作心得", "職涯發展"]
            },
            {
              title: "我的第一個技術部落格",
              slug: "my-first-article", 
              date: "2025-09-04 10:30",
              description: "記錄建立個人技術部落格的過程，從技術選型到部署上線的完整經驗分享...",
              categories: ["技術分享"],
              tags: ["部落格", "技術選型"]
            }
          ]);
        }
      } catch (error) {
        console.error('獲取文章數據失敗:', error);
        // 使用預設數據
        setRecentPosts([
          {
            title: "工作兩個月的心態反思",
            slug: "work-two-month-reflection",
            date: "2025-09-05 14:07",
            description: "分享新鮮人進入職場兩個月的心得與反思，包含技術學習、團隊合作和職涯規劃...",
            categories: ["職涯分享"],
            tags: ["工作心得", "職涯發展"]
          },
          {
            title: "我的第一個技術部落格",
            slug: "my-first-article", 
            date: "2025-09-04 10:30",
            description: "記錄建立個人技術部落格的過程，從技術選型到部署上線的完整經驗分享...",
            categories: ["技術分享"],
            tags: ["部落格", "技術選型"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const copyRSSUrl = async () => {
    try {
      await navigator.clipboard.writeText('https://xsong.us/blog/rss.xml');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'https://xsong.us/blog/rss.xml';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <i className="fas fa-rss text-4xl text-orange-600 dark:text-orange-400"></i>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            xsong.us RSS Feed
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            歡迎將這個網址加入你的RSS閱讀器喔！
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2 sm:mb-0">
                  <i className="fas fa-link mr-2"></i>
                  RSS 網址：
                </p>
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm break-all">
                  https://xsong.us/blog/rss.xml
                </code>
              </div>
              <button
                onClick={copyRSSUrl}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${
                  copied 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <>
                    <i className="fas fa-check"></i>
                    <span>已複製！</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-copy"></i>
                    <span>複製</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RSS Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mr-2"></i>
              什麼是 RSS？
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              RSS (Really Simple Syndication) 是一種讓你可以追蹤網站更新的技術。
              透過RSS閱讀器，你可以：
            </p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                即時接收新文章通知
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                避免被演算法操控
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                統一管理多個網站
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                保護隱私，無需註冊
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-tools text-orange-600 dark:text-orange-400 mr-2"></i>
              推薦的 RSS 閱讀器
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">FreshRSS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">開源、自架，功能完整</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Feedly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">介面美觀，適合新手</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Inoreader</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">功能強大，支援多平台</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Thunderbird</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">郵件軟體內建RSS功能</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <i className="fas fa-newspaper text-green-600 dark:text-green-400 mr-2"></i>
            最新文章預覽
            {loading && <span className="text-sm text-gray-500 ml-2">(載入中...)</span>}
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">正在載入最新文章...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {recentPosts.map((post, index) => (
                <Link 
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {post.date}
                  </p>
                  
                  {/* 分類和標籤 */}
                  <div className="mb-3">
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">分類：</span>
                        <div className="inline-flex flex-wrap gap-1">
                          {post.categories.map((category, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">標籤：</span>
                        <div className="inline-flex flex-wrap gap-1">
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                    <span>閱讀更多</span>
                    <i className="fas fa-arrow-right ml-1"></i>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {!loading && recentPosts.length === 0 && (
            <div className="text-center py-8">
              <i className="fas fa-newspaper text-4xl text-gray-400 dark:text-gray-600 mb-4"></i>
              <p className="text-gray-600 dark:text-gray-400">
                目前還沒有文章
              </p>
            </div>
          )}
        </div>

        {/* How to Subscribe */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <i className="fas fa-download text-blue-600 dark:text-blue-400 mr-2"></i>
            如何訂閱？
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">複製網址</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                複製上面的RSS網址
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">開啟閱讀器</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                開啟你喜歡的RSS閱讀器
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">新增訂閱</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                貼上網址完成訂閱
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            有其他問題嗎？歡迎
            <Link href="/about#contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              聯絡我
            </Link>
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            回到部落格首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
