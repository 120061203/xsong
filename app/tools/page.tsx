import Link from 'next/link';

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        工具集
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 白板工具 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            白板工具
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            創建文字跑馬燈、自訂背景顏色、內建模板、截圖功能
          </p>
          <a
            href="/tools/whiteboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
          >
            開始使用
          </a>
        </div>

        {/* Blog 系統 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Blog 系統
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Markdown 編輯器、即時預覽、文章管理
          </p>
          <a
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
          >
            開始使用
          </a>
        </div>
      </div>
    </div>
  )
}
  