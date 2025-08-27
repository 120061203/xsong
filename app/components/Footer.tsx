'use client';

import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 xsong All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
