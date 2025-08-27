'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // 首頁不顯示麵包屑
  if (pathname === '/') return null;

  // 生成麵包屑項目
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // 根據路徑生成標籤
      let label = '';
      switch (path) {
        case 'about':
          label = 'about';
          break;
        case 'blog':
          label = 'Blog';
          break;
        case 'projects':
          label = 'Projects';
          break;
        case 'tools':
          label = 'Tools';
          break;
        case 'linktree':
          label = 'Linktree';
          break;
        case 'secret':
          label = 'Secret';
          break;
        case 'download':
          label = 'Download';
          break;
        case 'shorturl':
          label = '短網址產生器';
          break;
        case 'whiteboard':
          label = '白板工具';
          break;
        case 'new':
          label = '寫新文章';
          break;
        case 'edit':
          label = '編輯文章';
          break;
        default:
          // 如果是動態路由（如文章 ID），嘗試從 localStorage 獲取標題
          if (path === 'shorturl' || path === 'whiteboard') {
            label = path;
          } else if (path.length > 10 && path.startsWith('post-')) {
            // 文章 ID，嘗試獲取標題
            try {
              const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
              const post = posts.find((p: any) => p.id === path);
              label = post ? post.title : '文章';
            } catch {
              label = '文章';
            }
          } else {
            label = path.charAt(0).toUpperCase() + path.slice(1);
          }
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: index === paths.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-blue-600 dark:text-green-400 hover:text-blue-800 dark:hover:text-green-300 transition-colors"
            >
              首頁
            </Link>
          </li>
          
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
              {item.isCurrent ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-blue-600 dark:text-green-400 hover:text-blue-800 dark:hover:text-green-300 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
