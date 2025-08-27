'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

interface Template {
  name: string;
  backgroundColor: string;
  textColor: string;
}

const templates: Template[] = [
  { name: '預設', backgroundColor: '#ffffff', textColor: '#000000' },
  { name: '深色', backgroundColor: '#1f2937', textColor: '#ffffff' },
  { name: '藍色', backgroundColor: '#3b82f6', textColor: '#ffffff' },
  { name: '綠色', backgroundColor: '#10b981', textColor: '#ffffff' },
  { name: '紅色', backgroundColor: '#ef4444', textColor: '#ffffff' },
  { name: '紫色', backgroundColor: '#8b5cf6', textColor: '#ffffff' },
  { name: '橙色', backgroundColor: '#f97316', textColor: '#ffffff' },
  { name: '粉色', backgroundColor: '#ec4899', textColor: '#ffffff' },
  { name: '黃色', backgroundColor: '#eab308', textColor: '#000000' },
  { name: '青色', backgroundColor: '#06b6d4', textColor: '#ffffff' },
];

export default function WhiteboardPage() {
  const [text, setText] = useState('輸入你的文字...');
  const [speed, setSpeed] = useState(50);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const whiteboardRef = useRef<HTMLDivElement>(null);

  const handleTemplateChange = (index: number) => {
    const template = templates[index];
    setBackgroundColor(template.backgroundColor);
    setTextColor(template.textColor);
    setSelectedTemplate(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const captureScreenshot = async () => {
    if (whiteboardRef.current) {
      try {
        const canvas = await html2canvas(whiteboardRef.current, {
          backgroundColor: backgroundColor,
          scale: 2,
        });
        
        const link = document.createElement('a');
        link.download = 'whiteboard-screenshot.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('截圖失敗:', error);
        alert('截圖失敗，請重試');
      }
    }
  };

  const toggleFullscreen = () => {
    if (whiteboardRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        whiteboardRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">白板工具</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側控制面板 */}
        <div className="space-y-6">
          {/* 文字輸入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文字內容
            </label>
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="輸入你的文字..."
            />
          </div>

          {/* 跑馬燈速度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              跑馬燈速度: {speed}
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={speed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>慢</span>
              <span>快</span>
            </div>
          </div>

          {/* 背景顏色 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              背景顏色
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* 文字顏色 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文字顏色
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* 內建模板 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              內建模板
            </label>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateChange(index)}
                  className={`p-2 text-xs rounded border ${
                    selectedTemplate === index
                      ? 'ring-2 ring-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: template.backgroundColor, color: template.textColor }}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* 控制按鈕 */}
          <div className="space-y-2">
            <button
              onClick={togglePlay}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? '停止' : '開始'} 跑馬燈
            </button>
            
            <button
              onClick={captureScreenshot}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              截圖
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              全螢幕
            </button>
          </div>
        </div>

        {/* 右側白板區域 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div
              ref={whiteboardRef}
              className="relative w-full h-96 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor }}
            >
              <div
                className={`text-4xl font-bold whitespace-nowrap ${
                  isPlaying ? 'animate-marquee' : ''
                }`}
                style={{
                  color: textColor,
                  animationDuration: `${200 - speed}ms`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear',
                }}
              >
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 自訂 CSS 動畫 */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
