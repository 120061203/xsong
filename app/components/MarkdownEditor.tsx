'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MarkdownEditorProps {
  mode: 'new' | 'edit';
  post?: any;
}

export default function MarkdownEditor({ mode, post }: MarkdownEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // 儲存文章
  const savePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('請填寫標題和內容');
      return;
    }

    setIsSaving(true);
    try {
      const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
      const now = new Date().toISOString();

      if (mode === 'new') {
        // 新文章
        const newPost = {
          id: `post-${Date.now()}`,
          title: title.trim(),
          content: content.trim(),
          excerpt: content.trim().substring(0, 150) + (content.trim().length > 150 ? '...' : ''),
          createdAt: now,
          updatedAt: now
        };
        posts.unshift(newPost);
      } else {
        // 編輯文章
        const postIndex = posts.findIndex((p: any) => p.id === post.id);
        if (postIndex !== -1) {
          posts[postIndex] = {
            ...posts[postIndex],
            title: title.trim(),
            content: content.trim(),
            excerpt: content.trim().substring(0, 150) + (content.trim().length > 150 ? '...' : ''),
            updatedAt: now
          };
        }
      }

      localStorage.setItem('blog-posts', JSON.stringify(posts));
      alert(mode === 'new' ? '文章已儲存！' : '文章已更新！');
      router.push('/blog');
    } catch (error) {
      console.error('儲存失敗:', error);
      alert('儲存失敗，請稍後再試');
    } finally {
      setIsSaving(false);
    }
  };

  // 預覽 Markdown
  const renderMarkdown = (text: string) => {
    // 簡單的 Markdown 渲染（可以替換為更強大的庫如 marked.js）
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">$1</code>')
      .replace(/\n/gim, '<br>');
  };

  return (
    <div className="space-y-6">
      {/* 標題輸入 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          文章標題
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="輸入文章標題..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-400 focus:border-blue-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* 控制按鈕 */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-md transition-colors ${
              showPreview
                ? 'bg-blue-600 dark:bg-green-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {showPreview ? '隱藏預覽' : '顯示預覽'}
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => router.push('/blog')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            取消
          </button>
          <button
            onClick={savePost}
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 dark:bg-blue-600 text-white rounded-md hover:bg-green-700 dark:hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? '儲存中...' : '儲存文章'}
          </button>
        </div>
      </div>

      {/* 編輯器和預覽 */}
      <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-6`}>
        {/* Markdown 編輯器 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Markdown 編輯器
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在這裡使用 Markdown 語法撰寫文章...
            
# 標題
## 副標題
**粗體文字**
*斜體文字*
`程式碼`
- 列表項目
1. 編號列表

支援所有標準 Markdown 語法！"
            className="w-full h-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-400 focus:border-blue-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono resize-none"
          />
          
          {/* Markdown 語法提示 */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Markdown 語法提示：</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div># 一級標題</div>
              <div>## 二級標題</div>
              <div>**粗體** *斜體* `程式碼`</div>
              <div>- 無序列表 1. 有序列表</div>
              <div>[連結文字](URL)</div>
            </div>
          </div>
        </div>

        {/* 即時預覽 */}
        {showPreview && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              即時預覽
            </h3>
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
