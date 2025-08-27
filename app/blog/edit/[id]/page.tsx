'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownEditor from '../../../components/MarkdownEditor';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [isAuthor, setIsAuthor] = useState(false);
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // 檢查作者權限
    const authorToken = localStorage.getItem('blog-author');
    if (authorToken !== 'xsong-dev-2025') {
      router.push('/blog');
      return;
    }
    setIsAuthor(true);

    // 載入文章資料
    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const currentPost = posts.find((p: any) => p.id === params.id);
    if (currentPost) {
      setPost(currentPost);
    } else {
      router.push('/blog');
    }
  }, [router, params.id]);

  if (!isAuthor || !post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-green-400 mb-2">
            編輯文章
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            修改你的文章內容
          </p>
        </div>
        
        <MarkdownEditor mode="edit" post={post} />
      </div>
    </div>
  );
}
