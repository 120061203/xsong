'use client';

import { useState, useEffect, useRef } from 'react';

interface Template {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
}

export default function WhiteboardPage() {
  const [text, setText] = useState('歡迎使用白板工具！');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isMarquee, setIsMarquee] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // 內建模板
  const templates: Template[] = [
    { id: 'modern', name: '現代簡約', backgroundColor: '#f8fafc', textColor: '#1e293b', fontSize: 48, fontFamily: 'Inter' },
    { id: 'dark', name: '深色主題', backgroundColor: '#0f172a', textColor: '#f1f5f9', fontSize: 56, fontFamily: 'Roboto' },
    { id: 'warm', name: '溫暖色調', backgroundColor: '#fef3c7', textColor: '#92400e', fontSize: 52, fontFamily: 'Georgia' },
    { id: 'cool', name: '冷色調', backgroundColor: '#dbeafe', textColor: '#1e40af', fontSize: 50, fontFamily: 'Helvetica' },
    { id: 'gradient', name: '藍紫漸層', backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff', fontSize: 54, fontFamily: 'Arial' },
    { id: 'sunset', name: '日落橙紅', backgroundColor: '#fed7aa', textColor: '#7c2d12', fontSize: 52, fontFamily: 'Georgia' },
    { id: 'ocean', name: '海洋藍', backgroundColor: '#b3e5fc', textColor: '#0c4a6e', fontSize: 50, fontFamily: 'Helvetica' },
    { id: 'forest', name: '森林綠', backgroundColor: '#c8e6c9', textColor: '#1b5e20', fontSize: 52, fontFamily: 'Inter' },
    { id: 'lavender', name: '薰衣草紫', backgroundColor: '#e1bee7', textColor: '#4a148c', fontSize: 50, fontFamily: 'Roboto' },
    { id: 'coral', name: '珊瑚粉', backgroundColor: '#ffcdd2', textColor: '#b71c1c', fontSize: 52, fontFamily: 'Arial' },
    { id: 'golden', name: '金黃色', backgroundColor: '#fff3e0', textColor: '#e65100', fontSize: 54, fontFamily: 'Georgia' },
    { id: 'midnight', name: '午夜藍', backgroundColor: '#1a237e', textColor: '#e8eaf6', fontSize: 56, fontFamily: 'Roboto' },
    { id: 'gradient-sunset', name: '日落漸層', backgroundColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)', textColor: '#7c2d12', fontSize: 52, fontFamily: 'Inter' },
    { id: 'gradient-ocean', name: '海洋漸層', backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', textColor: '#0c4a6e', fontSize: 50, fontFamily: 'Helvetica' },
    { id: 'gradient-forest', name: '森林漸層', backgroundColor: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', textColor: '#1b5e20', fontSize: 52, fontFamily: 'Georgia' }
  ];

  // 應用模板
  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setBackgroundColor(template.backgroundColor);
      setTextColor(template.textColor);
      setFontSize(template.fontSize);
      setFontFamily(template.fontFamily);
      setSelectedTemplate(templateId);
    }
  };

  // 切換全螢幕
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      whiteboardRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 截圖功能 - 修正版本
  const captureScreenshot = async () => {
    if (!whiteboardRef.current || !text.trim()) {
      alert('請先輸入文字內容');
      return;
    }
    
    setIsCapturing(true);
    try {
      // 動態載入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // 創建一個臨時的截圖容器
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.height = '600px';
      tempContainer.style.overflow = 'hidden';
      
      // 複製白板內容到臨時容器
      const whiteboardClone = whiteboardRef.current.cloneNode(true) as HTMLElement;
      whiteboardClone.style.width = '800px';
      whiteboardClone.style.height = '600px';
      whiteboardClone.style.position = 'relative';
      whiteboardClone.style.border = 'none';
      
      // 確保文字內容正確顯示
      const textElement = whiteboardClone.querySelector('.text-content') as HTMLElement;
      if (textElement) {
        textElement.style.position = 'absolute';
        textElement.style.top = '50%';
        textElement.style.left = '50%';
        textElement.style.transform = 'translate(-50%, -50%)';
        textElement.style.width = '100%';
        textElement.style.textAlign = 'center';
        textElement.style.padding = '2rem';
      }
      
      tempContainer.appendChild(whiteboardClone);
      document.body.appendChild(tempContainer);
      
      // 截圖
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: backgroundColor.includes('gradient') ? backgroundColor : backgroundColor,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 800,
        height: 600
      });
      
      // 清理臨時元素
      document.body.removeChild(tempContainer);
      
      // 下載圖片
      const link = document.createElement('a');
      link.download = `whiteboard-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    } catch (error) {
      console.error('截圖失敗:', error);
      alert('截圖失敗，請稍後再試');
    } finally {
      setIsCapturing(false);
    }
  };

  // 清空白板
  const clearWhiteboard = () => {
    setText('');
    setBackgroundColor('#ffffff');
    setTextColor('#000000');
    setFontSize(48);
    setFontFamily('Arial');
    setSelectedTemplate('');
    setIsMarquee(false);
    setMarqueeSpeed(50);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-green-400 mb-2">
            白板工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            創建、編輯和分享你的想法
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* 左側控制面板 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 文字輸入 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                文字內容
              </h3>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="輸入你的文字..."
                className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-400 focus:border-blue-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>

            {/* 樣式設定 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                樣式設定
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* 左欄 */}
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      背景顏色
                    </label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-8 rounded-md border border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      文字顏色
                    </label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-8 rounded-md border border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      字體大小: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="120"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 右欄 */}
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      字體
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-400 focus:border-blue-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isMarquee}
                        onChange={(e) => setIsMarquee(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        啟用跑馬燈
                      </span>
                    </label>
                  </div>

                  {isMarquee && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        速度: {marqueeSpeed}
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={marqueeSpeed}
                        onChange={(e) => setMarqueeSpeed(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 內建模板 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                內建模板 ({templates.length})
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template.id)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      selectedTemplate === template.id
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                操作
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors text-sm"
                >
                  {isFullscreen ? '退出全螢幕' : '全螢幕'}
                </button>
                <button
                  onClick={captureScreenshot}
                  disabled={isCapturing || !text.trim()}
                  className="px-3 py-2 bg-green-600 dark:bg-blue-600 text-white rounded-md hover:bg-green-700 dark:hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
                >
                  {isCapturing ? '截圖中...' : '截圖下載'}
                </button>
                <button
                  onClick={clearWhiteboard}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  清空白板
                </button>
                <button
                  onClick={() => setText('歡迎使用白板工具！')}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                >
                  重置文字
                </button>
              </div>
            </div>
          </div>

          {/* 右側白板區域 */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                白板預覽
              </h3>
              
              {/* 白板顯示區域 */}
              <div
                ref={whiteboardRef}
                className="relative w-full h-96 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: backgroundColor.includes('gradient') 
                    ? 'transparent' 
                    : backgroundColor,
                  background: backgroundColor.includes('gradient') 
                    ? backgroundColor 
                    : 'none'
                }}
              >
                {text && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center p-8 text-content ${
                      isMarquee ? 'overflow-hidden' : ''
                    }`}
                  >
                    {isMarquee ? (
                      <div
                        className="whitespace-nowrap"
                        style={{
                          color: textColor,
                          fontSize: `${fontSize}px`,
                          fontFamily: fontFamily,
                          animation: `marquee ${200 / marqueeSpeed}s linear infinite`
                        }}
                      >
                        {text} &nbsp;&nbsp;&nbsp;&nbsp; {text}
                      </div>
                    ) : (
                      <div
                        className="text-center break-words"
                        style={{
                          color: textColor,
                          fontSize: `${fontSize}px`,
                          fontFamily: fontFamily
                        }}
                      >
                        {text}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 跑馬燈動畫 CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
