'use client';

import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when clicking on menu links
  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to get link classes based on current path
  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `text-lg font-medium transition-colors ${
      isActive 
        ? 'text-blue-600 dark:text-green-400' 
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400'
    }`;
  };

  // Helper function to get mobile link classes based on current path
  const getMobileLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `block px-3 py-2 text-lg font-medium transition-colors rounded-md ${
      isActive 
        ? 'text-blue-600 dark:text-green-400 bg-blue-50 dark:bg-green-900/20' 
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;
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
            <Link href="/about" className={getLinkClasses('/about')}>
              About
            </Link>
            <Link href="/blog" className={getLinkClasses('/blog')}>
              Blog
            </Link>
            <Link href="/projects" className={getLinkClasses('/projects')}>
              Projects
            </Link>
            <Link href="/tools" className={getLinkClasses('/tools')}>
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
                className={getMobileLinkClasses('/about')}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                onClick={handleMenuLinkClick}
                className={getMobileLinkClasses('/blog')}
              >
                Blog
              </Link>
              <Link 
                href="/projects" 
                onClick={handleMenuLinkClick}
                className={getMobileLinkClasses('/projects')}
              >
                Projects
              </Link>
              <Link 
                href="/tools" 
                onClick={handleMenuLinkClick}
                className={getMobileLinkClasses('/tools')}
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
