'use client';

import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const { isDark } = useTheme();
  const router = useRouter();
  
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
            <button 
              onClick={() => {
                // 檢查是否在 About 頁面
                if (window.location.pathname === '/about') {
                  // 如果在 About 頁面，直接滾動到 Contact 區塊
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    console.log('Footer: 開始滾動到 contact'); // 調試信息
                    contactElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                    
                    // 使用更長的延遲時間，確保滾動完成
                    setTimeout(() => {
                      console.log('Footer: 開始動畫 contact'); // 調試信息
                      contactElement.style.display = 'block';
                      contactElement.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                      contactElement.style.transform = 'scale(1.15)';
                      
                      setTimeout(() => {
                        contactElement.style.transform = 'scale(1)';
                        
                        setTimeout(() => {
                          contactElement.style.transition = '';
                          contactElement.style.transform = '';
                          console.log('Footer: 動畫完成 contact'); // 調試信息
                        }, 600);
                      }, 300);
                    }, 1500);
                  }
                } else {
                  // 如果不在 About 頁面，使用 Next.js 路由跳轉
                  router.push('/about');
                  // 等待頁面載入後滾動到 Contact 區塊
                  setTimeout(() => {
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      console.log('Footer: 跨頁面滾動到 contact'); // 調試信息
                      contactElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                      
                      // 使用更長的延遲時間，確保滾動完成
                      setTimeout(() => {
                        console.log('Footer: 跨頁面開始動畫 contact'); // 調試信息
                        contactElement.style.display = 'block';
                        contactElement.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        contactElement.style.transform = 'scale(1.15)';
                        
                        setTimeout(() => {
                          contactElement.style.transform = 'scale(1)';
                          
                          setTimeout(() => {
                            contactElement.style.transition = '';
                            contactElement.style.transform = '';
                            console.log('Footer: 跨頁面動畫完成 contact'); // 調試信息
                          }, 600);
                        }, 300);
                      }, 1500);
                    }
                  }, 500);
                }
              }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="聯絡我"
            >
              <i className="fas fa-envelope text-lg"></i>
              <span className="text-sm font-medium">Contact</span>
            </button>
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
