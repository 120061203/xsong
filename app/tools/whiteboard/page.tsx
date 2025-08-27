'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface Template {
  name: string;
  backgroundColor: string;
  textColor: string;
  type: 'static' | 'current-time' | 'countdown' | 'countup';
  initialText?: string;
}

const templates: Template[] = [
  // 基礎模板
  { name: '白底黑字', backgroundColor: '#ffffff', textColor: '#000000', type: 'static', initialText: '白底黑字範例' },
  { name: '黑底白字', backgroundColor: '#000000', textColor: '#ffffff', type: 'static', initialText: '黑底黑字範例' },
  { name: '深藍白字', backgroundColor: '#1e40af', textColor: '#ffffff', type: 'static', initialText: '深藍白字範例' },
  { name: '深綠白字', backgroundColor: '#047857', textColor: '#ffffff', type: 'static', initialText: '深綠白字範例' },
  
  // 其他美觀模板
  { name: '暖灰深字', backgroundColor: '#f3f4f6', textColor: '#374151', type: 'static', initialText: '暖灰深字範例' },
  { name: '淺粉深字', backgroundColor: '#fce7f3', textColor: '#831843', type: 'static', initialText: '淺粉深字範例' },
  { name: '暖橙深字', backgroundColor: '#fed7aa', textColor: '#7c2d12', type: 'static', initialText: '暖橙深字範例' },
  { name: '淺藍深字', backgroundColor: '#dbeafe', textColor: '#1e40af', type: 'static', initialText: '淺藍深字範例' },
];

export default function WhiteboardPage() {
  const [text, setText] = useState('輸入你的文字...');
  const [speed, setSpeed] = useState(20);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(48);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  
  // 計時器狀態
  const [currentTime, setCurrentTime] = useState('');
  const [countdownTime, setCountdownTime] = useState(0);
  const [countupTime, setCountupTime] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [isCountupRunning, setIsCountupRunning] = useState(false);
  
  // 計時器輸入
  const [countdownHours, setCountdownHours] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(1);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  
  // 當前模式
  const [currentMode, setCurrentMode] = useState<'static' | 'current-time' | 'countdown' | 'countup'>('static');
  
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // 更新目前時間
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('zh-TW', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 倒數計時
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime(prev => {
          if (prev <= 1) {
            setIsCountdownRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountdownRunning, countdownTime]);

  // 正數計時
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountupRunning) {
      interval = setInterval(() => {
        setCountupTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountupRunning]);

  // 設定倒數時間
  const setCountdownDuration = () => {
    const totalSeconds = countdownHours * 3600 + countdownMinutes * 60 + countdownSeconds;
    setCountdownTime(totalSeconds);
  };

  // 切換模式
  const switchMode = (mode: 'static' | 'current-time' | 'countdown' | 'countup') => {
    setCurrentMode(mode);
    setIsPlaying(false);
    
    if (mode === 'countdown') {
      setCountdownDuration();
    } else if (mode === 'countup') {
      setCountupTime(0);
      setIsCountupRunning(false);
    }
  };

  const handleTemplateChange = (index: number) => {
    const template = templates[index];
    setBackgroundColor(template.backgroundColor);
    setTextColor(template.textColor);
    setSelectedTemplate(index);
    
    if (template.initialText) {
      setText(template.initialText);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleCountdown = () => {
    if (countdownTime > 0) {
      setIsCountdownRunning(!isCountdownRunning);
    }
  };

  const toggleCountup = () => {
    setIsCountupRunning(!isCountupRunning);
  };

  const resetCountdown = () => {
    setCountdownDuration();
    setIsCountdownRunning(false);
  };

  const resetCountup = () => {
    setCountupTime(0);
    setIsCountupRunning(false);
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

  // 格式化時間顯示
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 獲取顯示文字
  const getDisplayText = () => {
    if (currentMode === 'current-time') {
      return currentTime;
    } else if (currentMode === 'countdown') {
      return `倒數: ${formatTime(countdownTime)}`;
    } else if (currentMode === 'countup') {
      return `計時: ${formatTime(countupTime)}`;
    }
    return text;
  };

  // 計算動畫持續時間
  const getAnimationDuration = (speedValue: number) => {
    const minDuration = 6000; // 6秒（最慢）
    const maxDuration = 50;   // 0.05秒（最快）
    const duration = minDuration - (speedValue - 10) * (minDuration - maxDuration) / 90;
    return Math.max(maxDuration, Math.min(minDuration, duration));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">白板工具</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側控制面板 */}
        <div className="space-y-6">
          {/* 模式選擇按鈕 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              選擇模式
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchMode('static')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentMode === 'static'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                靜態文字
              </button>
              <button
                onClick={() => switchMode('current-time')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentMode === 'current-time'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                目前時間
              </button>
              <button
                onClick={() => switchMode('countdown')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentMode === 'countdown'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                倒數計時
              </button>
              <button
                onClick={() => switchMode('countup')}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentMode === 'countup'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                正數計時
              </button>
            </div>
          </div>

          {/* 靜態文字輸入 */}
          {currentMode === 'static' && (
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
          )}

          {/* 倒數計時設定 */}
          {currentMode === 'countdown' && (
            <div className="space-y-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <label className="block text-sm font-medium text-red-700 dark:text-red-300">
                設定倒數時間
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-red-600 dark:text-red-400 mb-1">小時</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={countdownHours}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountdownHours(Number(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-red-300 dark:border-red-600 rounded bg-white dark:bg-gray-700 text-red-700 dark:text-red-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-red-600 dark:text-red-400 mb-1">分鐘</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={countdownMinutes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountdownMinutes(Number(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-red-300 dark:border-red-600 rounded bg-white dark:bg-gray-700 text-red-700 dark:text-red-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-red-600 dark:text-red-400 mb-1">秒</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={countdownSeconds}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountdownSeconds(Number(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-red-300 dark:border-red-600 rounded bg-white dark:bg-gray-700 text-red-700 dark:text-red-300"
                  />
                </div>
              </div>
              <button
                onClick={setCountdownDuration}
                className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
              >
                設定時間
              </button>
            </div>
          )}

          {/* 計時器控制 */}
          {currentMode === 'countdown' && (
            <div className="space-y-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <label className="block text-sm font-medium text-red-700 dark:text-red-300">
                倒數計時控制
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={toggleCountdown}
                  disabled={countdownTime === 0}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    countdownTime === 0
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : isCountdownRunning
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isCountdownRunning ? '暫停' : '開始'}
                </button>
                <button
                  onClick={resetCountdown}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
                >
                  重置
                </button>
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                剩餘時間: {formatTime(countdownTime)}
              </div>
            </div>
          )}

          {currentMode === 'countup' && (
            <div className="space-y-2 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <label className="block text-sm font-medium text-purple-700 dark:text-purple-300">
                正數計時控制
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={toggleCountup}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isCountupRunning
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isCountupRunning ? '暫停' : '開始'}
                </button>
                <button
                  onClick={resetCountup}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
                >
                  重置
                </button>
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                計時: {formatTime(countupTime)}
              </div>
            </div>
          )}

          {/* 文字大小控制 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文字大小: {fontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="360"
              value={fontSize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>小</span>
              <span>大</span>
            </div>
          </div>

          {/* 跑馬燈速度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              跑馬燈速度: {speed}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>慢</span>
              <span>快</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              當前動畫時間: {(getAnimationDuration(speed) / 1000).toFixed(1)}秒
            </p>
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
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateChange(index)}
                  className={`p-2 text-xs rounded border transition-all ${
                    selectedTemplate === index
                      ? 'ring-2 ring-blue-500 scale-105'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-102'
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
                className={`font-bold whitespace-nowrap ${
                  isPlaying ? 'animate-marquee' : ''
                }`}
                style={{
                  color: textColor,
                  fontSize: `${fontSize}px`,
                  animationDuration: `${getAnimationDuration(speed)}ms`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear',
                }}
              >
                {getDisplayText()}
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
        .scale-102 {
          transform: scale(1.02);
        }
        .scale-105 {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
