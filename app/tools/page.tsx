import Link from 'next/link';

export default function Tools() {
  const tools = [
    {
      title: '短網址產生器',
      description: '將長網址轉換為簡潔的短網址',
      href: '/tools/shorturl',
      icon: '🔗',
    },
    {
      title: '白板工具',
      description: '創建、編輯和分享你的想法，支援跑馬燈和模板',
      href: '/tools/whiteboard',
      icon: '📝',
    },
    {
      title: 'Blog 系統',
      description: 'Markdown 編輯器，撰寫和發布文章',
      href: '/blog',
      icon: '📚',
    },
    // 未來可以添加更多工具
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-green-400 mb-4">
            實用工具
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            精選的線上工具，提升你的工作效率
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {/* 未來工具預告 */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            更多實用工具開發中...
          </p>
        </div>
      </div>
    </div>
  );
}
  