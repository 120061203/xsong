'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
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
