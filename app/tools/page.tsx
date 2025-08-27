import Link from 'next/link';

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">工具集</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 白板工具 */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">白板工具</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            創建跑馬燈文字、更換背景顏色、內建模板、截圖功能
          </p>
          <Link 
            href="/tools/whiteboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            開始使用
          </Link>
        </div>

        {/* Blog 系統 */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Blog 系統</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Markdown 編輯器、即時預覽、文章管理
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看文章
          </Link>
        </div>
      </div>
    </div>
  );
}