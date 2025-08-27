'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // 檢查是否為作者（這裡可以設定你的識別方式）
    const checkAuthor = () => {
      // 可以設定密碼、localStorage 標記等方式
      const authorToken = localStorage.getItem('blog-author');
      setIsAuthor(authorToken === 'xsong-dev-2025');
    };

    checkAuthor();
    loadPosts();
  }, []);

  const loadPosts = () => {
    // 從 localStorage 載入文章
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  };

  const unlockAuthor = () => {
    const password = prompt('請輸入作者密碼：');
    if (password === 'xsong2025') { // 你可以設定自己的密碼
      localStorage.setItem('blog-author', 'xsong-dev-2025');
      setIsAuthor(true);
      alert('作者權限已解鎖！');
    } else {
      alert('密碼錯誤！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-green-400 mb-2">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            分享我的想法和技術心得
          </p>
        </div>

        {/* 作者控制區 */}
        <div className="mb-6 text-center">
          {isAuthor ? (
            <div className="flex justify-center space-x-4">
              <Link
                href="/blog/new"
                className="px-6 py-3 bg-blue-600 dark:bg-green-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
              >
                寫新文章
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('blog-author');
                  setIsAuthor(false);
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                退出作者模式
              </button>
            </div>
          ) : (
            <button
              onClick={unlockAuthor}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              作者登入
            </button>
          )}
        </div>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>建立於: {new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.updatedAt !== post.createdAt && (
                    <span>更新於: {new Date(post.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors text-sm"
                  >
                    閱讀全文
                  </Link>
                  {isAuthor && (
                    <Link
                      href={`/blog/edit/${post.id}`}
                      className="px-4 py-2 bg-green-600 dark:bg-blue-600 text-white rounded-md hover:bg-green-700 dark:hover:bg-blue-700 transition-colors text-sm"
                    >
                      編輯
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              還沒有文章
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isAuthor ? '點擊上方按鈕開始寫作吧！' : '作者登入後可以開始寫作'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
  