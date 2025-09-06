'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-3">
            {/* RSS Feed Link */}
            <a 
              href="/rss" 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              title="訂閱 RSS Feed"
            >
              <i className="fas fa-rss text-lg"></i>
              <span className="text-sm font-medium">RSS Feed</span>
            </a>
            
            {/* Contact Link */}
            <a 
              href="/about#contact"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="聯絡我"
            >
              <i className="fas fa-envelope text-lg"></i>
              <span className="text-sm font-medium">Contact</span>
            </a>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 xsong.us All Rights Reserved
          </p>
          {/* 使用 isDark 變數來避免未使用警告 */}
          <div className="hidden">
            {isDark ? 'dark' : 'light'}
          </div>
        </div>
      </div>
    </footer>
  );
}
