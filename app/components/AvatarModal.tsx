'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

interface SocialMedia {
  name: string;
  url: string;
  icon: string;
  color: string;
  qrIconColor: string;
}

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialMedias: SocialMedia[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/120061203',
    icon: 'fa-brands fa-github',
    color: 'text-gray-900 dark:text-white',
    qrIconColor: 'text-gray-800'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/songlinchen',
    icon: 'fa-brands fa-linkedin',
    color: 'text-blue-600',
    qrIconColor: 'text-blue-600'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/c.s.l.0922',
    icon: 'fa-brands fa-instagram',
    color: 'text-pink-600',
    qrIconColor: 'text-pink-600'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/song0922',
    icon: 'fa-brands fa-telegram',
    color: 'text-blue-500',
    qrIconColor: 'text-blue-500'
  },
  {
    name: 'Portaly 贊助',
    url: 'https://portaly.cc/xsong/support',
    icon: 'fas fa-coins',
    color: 'text-yellow-600',
    qrIconColor: 'text-yellow-600'
  }
];

export default function AvatarModal({ isOpen, onClose }: AvatarModalProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [qrCodeDataUrls, setQrCodeDataUrls] = useState<string[]>(Array(socialMedias.length).fill(''));
  const [isGenerating, setIsGenerating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 初始化時生成所有 QR Code
  useEffect(() => {
    if (isOpen) {
      generateAllQRCodes();
    }
  }, [isOpen]);

  const generateAllQRCodes = async () => {
    setIsGenerating(true);
    try {
      const urls = await Promise.all(
        socialMedias.map(async (social) => {
          try {
            const url = await QRCode.toDataURL(social.url, {
              width: 300,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              },
              errorCorrectionLevel: 'H'
            });
            return url;
          } catch (error) {
            console.error(`生成 ${social.name} QR Code 失敗:`, error);
            return '';
          }
        })
      );
      setQrCodeDataUrls(urls);
    } catch (error) {
      console.error('生成 QR Code 時發生錯誤:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // 觸控事件處理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 左滑：到下一個，如果是最後一個則循環到第一個
      setCurrentIndex((prevIndex) => (prevIndex + 1) % socialMedias.length);
    } else if (isRightSwipe) {
      // 右滑：到上一個，如果是第一個則循環到最後一個
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? socialMedias.length - 1 : prevIndex - 1
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-sm max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* 標題欄 - 固定在頂部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {socialMedias[currentIndex].name}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
            type="button"
            aria-label="關閉"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* 主要內容區域 - 支援觸控滑動 */}
        <div 
          className="p-4 overflow-y-auto flex-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            {/* Badge 樣式：只顯示名字 */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                小松 XiaoSong
              </h2>
            </div>

            {/* 頭像在中間 */}
            <div className="flex justify-center mb-4">
              <Image
                src="/avatar.png"
                alt="小松 XiaoSong"
                width={80}
                height={80}
                className="rounded-full border-4 border-blue-600 dark:border-green-400"
              />
            </div>

            {/* QR Code 顯示 */}
            <div className="relative bg-white p-4 rounded-xl shadow-lg flex items-center justify-center w-full">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-gray-500">生成 QR Code 中...</p>
                </div>
              ) : qrCodeDataUrls[currentIndex] ? (
                <>
                  <Image 
                    src={qrCodeDataUrls[currentIndex]} 
                    alt={`${socialMedias[currentIndex].name} QR Code`}
                    width={250}
                    height={250}
                    className="object-contain w-full max-w-[250px] h-auto"
                  />
                  {/* 中間的社交媒體 icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                      <i className={`${socialMedias[currentIndex].icon} text-xl ${socialMedias[currentIndex].qrIconColor}`}></i>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-red-500 text-4xl mb-2">❌</div>
                  <p className="text-sm text-gray-500 mb-2">QR Code 生成失敗</p>
                  <button
                    onClick={generateAllQRCodes}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    重新生成
                  </button>
                </div>
              )}
            </div>

            {/* 社交媒體資訊 */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                掃描 QR Code 或點擊下方連結
              </p>
              <a
                href={socialMedias[currentIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors text-sm"
              >
                <i className={`${socialMedias[currentIndex].icon} mr-2`}></i>
                前往 {socialMedias[currentIndex].name}
              </a>
            </div>
          </div>
        </div>

        {/* 滑動指示器 */}
        <div className="flex justify-center items-center space-x-2 p-3 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
          {socialMedias.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-green-400'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* 滑動提示 */}
        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
          ← 左右滑動切換社交媒體 →
        </div>
      </div>
    </div>
  );
}
