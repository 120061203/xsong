'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

// 自动追踪页面访问的组件
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 追踪页面访问
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null; // 这个组件不渲染任何内容
}

