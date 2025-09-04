'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  title: string;
  date: string;
  slug: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  'hello-world': {
    title: 'Hello World',
    date: '2025-01-20',
    slug: 'hello-world',
    content: `
# Hello World

這是我的第一篇文章。

## 介紹
歡迎來到我的部落格！

## 內容
這裡可以寫很多內容...

### 技術分享
我將在這裡分享我的技術心得和學習經驗。

### 生活點滴
除了技術，我也會分享一些生活上的想法和經歷。

---

*這是我部落格的第一篇文章，未來會持續更新更多內容！*
    `
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              文章未找到
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              抱歉，這篇文章不存在或已被移除。
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              返回部落格
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-green-400 hover:text-blue-700 dark:hover:text-green-300 font-medium transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回部落格
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-8">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold mb-4">${line.substring(2)}</h1>`;
                      }
                      if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold mb-3 mt-6">${line.substring(3)}</h2>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-bold mb-2 mt-4">${line.substring(4)}</h3>`;
                      }
                      if (line.startsWith('---')) {
                        return '<hr class="my-6 border-gray-300 dark:border-gray-600">';
                      }
                      if (line.trim() === '') {
                        return '<br>';
                      }
                      return `<p class="mb-4 leading-relaxed">${line}</p>`;
                    })
                    .join('')
                }}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
