'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '../../components/MarkdownEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // 檢查作者權限
    const authorToken = localStorage.getItem('blog-author');
    if (authorToken !== 'xsong-dev-2025') {
      router.push('/blog');
      return;
    }
    setIsAuthor(true);
  }, [router]);

  if (!isAuthor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-green-400 mb-2">
            寫新文章
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            使用 Markdown 語法撰寫你的文章
          </p>
        </div>
        
        <MarkdownEditor mode="new" />
      </div>
    </div>
  );
}
