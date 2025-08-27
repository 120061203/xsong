'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // 首頁不需要麵包屑
  if (pathname === '/') {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // 處理動態路由
      let label = segment;
      if (segment.startsWith('[') && segment.endsWith(']')) {
        // 如果是動態路由，嘗試從路徑中提取實際值
        const actualSegment = segments[index + 1] || segment;
        label = actualSegment.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      } else {
        // 一般路由，轉換為可讀標籤
        label = segment
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
      
      // 自訂標籤
      const customLabels: Record<string, string> = {
        'about': 'About',
        'blog': 'Blog',
        'projects': 'Projects',
        'tools': 'Tools',
        'whiteboard': '白板工具',
        'linktree': 'LinkTree',
        'secret': 'Secret',
        'download': 'Download'
      };
      
      label = customLabels[segment] || label;
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            首頁
          </Link>
          
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center space-x-2">
              <span className="text-gray-400 dark:text-gray-500">/</span>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
