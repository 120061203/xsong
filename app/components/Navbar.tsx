'use client';

import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking on menu links
  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-green-400 hover:text-blue-700 dark:hover:text-green-300 transition-colors">
            xsong.us
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors">
              Blog
            </Link>
            <Link href="/projects" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors">
              Projects
            </Link>
            <Link href="/tools" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors">
              Tools
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/about" 
                onClick={handleMenuLinkClick}
                className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                About
              </Link>
              <Link 
                href="/blog" 
                onClick={handleMenuLinkClick}
                className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/projects" 
                onClick={handleMenuLinkClick}
                className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Projects
              </Link>
              <Link 
                href="/tools" 
                onClick={handleMenuLinkClick}
                className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
