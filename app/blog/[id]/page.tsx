'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // 載入文章
    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const currentPost = posts.find((p: any) => p.id === params.id);
    
    if (currentPost) {
      setPost(currentPost);
    } else {
      router.push('/blog');
      return;
    }

    // 檢查作者權限
    const authorToken = localStorage.getItem('blog-author');
    setIsAuthor(authorToken === 'xsong-dev-2025');
  }, [params.id, router]);

  if (!post) {
    return null;
  }

  // 渲染 Markdown 內容
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-2 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">$1</code>')
      .replace(/\n/gim, '<br>');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 返回按鈕 */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-green-400 hover:underline"
          >
            ← 返回文章列表
          </Link>
        </div>

        {/* 文章內容 */}
        <article className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>建立於: {new Date(post.createdAt).toLocaleDateString()}</span>
              {post.updatedAt !== post.createdAt && (
                <span>更新於: {new Date(post.updatedAt).toLocaleDateString()}</span>
              )}
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* 作者操作 */}
          {isAuthor && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <Link
                  href={`/blog/edit/${post.id}`}
                  className="px-4 py-2 bg-green-600 dark:bg-blue-600 text-white rounded-md hover:bg-green-700 dark:hover:bg-blue-700 transition-colors"
                >
                  編輯文章
                </Link>
                <button
                  onClick={() => {
                    if (confirm('確定要刪除這篇文章嗎？')) {
                      const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
                      const updatedPosts = posts.filter((p: any) => p.id !== post.id);
                      localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
                      router.push('/blog');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  刪除文章
                </button>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
