'use client';

import { useState } from 'react';

interface MarkdownEditorProps {
  initialValue?: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}

export default function MarkdownEditor({ 
  initialValue = '', 
  onSave, 
  onCancel 
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setContent(initialValue);
    setIsEditing(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (!isEditing) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Markdown 編輯器</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            編輯
          </button>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded">
            {content || '沒有內容'}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">編輯 Markdown</h3>
        <div className="space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            儲存
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 編輯區域 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            編輯
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none font-mono text-sm"
            placeholder="輸入 Markdown 內容..."
          />
        </div>
        
        {/* 預覽區域 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            預覽
          </label>
          <div className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-y-auto">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm">
                {content || '沒有內容'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
