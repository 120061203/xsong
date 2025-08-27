'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

interface SocialMedia {
  name: string;
  url: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
  qrIconColor: string; // 新增：QR Code 中 icon 的專用顏色
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
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    hoverBgColor: 'hover:bg-gray-200 dark:hover:bg-gray-600',
    hoverTextColor: 'hover:text-gray-900 dark:hover:text-white',
    qrIconColor: 'text-gray-800' // GitHub icon 在 QR Code 中使用深灰色
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/songlinchen',
    icon: 'fa-brands fa-linkedin',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    hoverBgColor: 'hover:bg-blue-200 dark:hover:bg-blue-800/30',
    hoverTextColor: 'hover:text-blue-700 dark:hover:text-blue-400',
    qrIconColor: 'text-blue-600' // LinkedIn icon 在 QR Code 中使用藍色
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/c.s.l.0922',
    icon: 'fa-brands fa-instagram',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    hoverBgColor: 'hover:bg-green-600 dark:hover:bg-green-600',
    hoverTextColor: 'hover:text-black dark:hover:text-black',
    qrIconColor: 'text-pink-600' // Instagram icon 在 QR Code 中使用粉色
  }
];

export default function AvatarModal({ isOpen, onClose }: AvatarModalProps) {
  const [selectedSocial, setSelectedSocial] = useState<SocialMedia | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async (url: string) => {
    try {
      setIsGenerating(true);
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,  // 固定使用大尺寸
        margin: 2,   // 增加邊距，提高清晰度
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'  // 使用最高錯誤修正等級，提高清晰度
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSocialClick = async (social: SocialMedia) => {
    console.log('Clicked social media:', social.name);
    setSelectedSocial(social);
    setIsFlipped(true);
    setTimeout(() => {
      generateQRCode(social.url);
    }, 100);
  };

  const handleBackClick = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setSelectedSocial(null);
      setQrCodeDataUrl('');
    }, 300);
  };

  const handleClose = () => {
    console.log('Close button clicked');
    setIsFlipped(false);
    setSelectedSocial(null);
    setQrCodeDataUrl('');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('Backdrop clicked');
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        {/* 正面：社交媒體選擇 */}
        {!isFlipped && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                選擇社交媒體
              </h3>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                type="button"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {socialMedias.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-green-400 transition-all hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-left`}
                  type="button"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full ${social.bgColor} ${social.hoverBgColor}`}>
                    <i className={`${social.icon} text-2xl ${social.color} ${social.hoverTextColor}`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-gray-900 dark:text-white ${social.hoverTextColor}`}>
                      {social.name}
                    </h4>
                    <p className={`text-sm text-gray-500 dark:text-gray-400 ${social.hoverTextColor}`}>
                      點擊查看 QR Code
                    </p>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 背面：QR Code 顯示 */}
        {isFlipped && selectedSocial && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackClick}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                type="button"
              >
                <i className="fas fa-arrow-left text-lg"></i>
              </button>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedSocial.name}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                type="button"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              <div className="relative bg-white p-6 rounded-xl shadow-lg flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-500">生成 QR Code 中...</p>
                  </div>
                ) : qrCodeDataUrl ? (
                  <>
                    <img 
                      src={qrCodeDataUrl} 
                      alt={`${selectedSocial.name} QR Code`}
                      className="object-contain"
                      style={{ width: '300px', height: '300px' }}
                    />
                    {/* 中間的社交媒體 icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                        <i className={`${selectedSocial.icon} text-3xl ${selectedSocial.qrIconColor}`}></i>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  掃描 QR Code 或點擊下方連結
                </p>
                <a
                  href={selectedSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
                >
                  <i className={`${selectedSocial.icon} mr-2`}></i>
                  前往 {selectedSocial.name}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
