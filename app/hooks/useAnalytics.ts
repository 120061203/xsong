'use client';

import { useCallback } from 'react';
import { trackEvent, trackPageView } from '../components/GoogleAnalytics';

export const useAnalytics = () => {
  // 追蹤按鈕點擊
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent('click', 'button', `${buttonName} - ${location}`);
  }, []);

  // 追蹤連結點擊
  const trackLinkClick = useCallback((linkText: string, destination: string) => {
    trackEvent('click', 'link', `${linkText} - ${destination}`);
  }, []);

  // 追蹤頁面瀏覽
  const trackPage = useCallback((pageName: string, pageUrl: string) => {
    trackPageView(pageUrl, pageName);
  }, []);

  // 追蹤專案查看
  const trackProjectView = useCallback((projectName: string) => {
    trackEvent('view', 'project', projectName);
  }, []);

  // 追蹤文章閱讀
  const trackArticleRead = useCallback((articleTitle: string) => {
    trackEvent('read', 'article', articleTitle);
  }, []);

  // 追蹤下載
  const trackDownload = useCallback((fileName: string) => {
    trackEvent('download', 'file', fileName);
  }, []);

  // 追蹤社交媒體點擊
  const trackSocialClick = useCallback((platform: string) => {
    trackEvent('click', 'social', platform);
  }, []);

  // 追蹤搜尋
  const trackSearch = useCallback((searchTerm: string) => {
    trackEvent('search', 'site', searchTerm);
  }, []);

  return {
    trackButtonClick,
    trackLinkClick,
    trackPage,
    trackProjectView,
    trackArticleRead,
    trackDownload,
    trackSocialClick,
    trackSearch,
  };
};
