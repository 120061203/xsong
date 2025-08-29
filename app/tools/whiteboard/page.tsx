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
  { name: '黑底白字', backgroundColor: '#000000', textColor: '#ffffff', type: 'static', initialText: '黑底白字範例' },
  { name: '深藍白字', backgroundColor: '#1e40af', textColor: '#ffffff', type: 'static', initialText: '深藍白字範例' },
  { name: '深綠白字', backgroundColor: '#047857', textColor: '#ffffff', type: 'static', initialText: '深綠白字範例' },
  
  // 其他美觀模板
  { name: '暖灰深字', backgroundColor: '#f3f4f6', textColor: '#374151', type: 'static', initialText: '暖灰深字範例' },
  { name: '淺粉深字', backgroundColor: '#fce7f3', textColor: '#831843', type: 'static', initialText: '淺粉深字範例' },
  { name: '暖橙深字', backgroundColor: '#fed7aa', textColor: '#7c2d12', type: 'static', initialText: '暖橙深字範例' },
  { name: '淺藍深字', backgroundColor: '#dbeafe', textColor: '#1e40af', type: 'static', initialText: '淺藍深字範例' },
];

export default function WhiteboardPage() {
  // 白板狀態
  const [text, setText] = useState('歡迎使用白板工具');
  const [speed, setSpeed] = useState(20);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(120);
  const [currentMode, setCurrentMode] = useState<'static' | 'current-time' | 'countdown' | 'countup'>('static');
  
  // 新增：OBS 直播效果設定
  const [textShadow, setTextShadow] = useState({
    enabled: false, // 改為 false，預設不啟用文字陰影
    color: '#000000',
    blur: 4,
    offsetX: 2,
    offsetY: 2
  });
  const [textBorder, setTextBorder] = useState({
    enabled: false, // 改為 false，預設不啟用邊框
    color: '#ffffff',
    width: 3
  });
  const [backgroundGradient, setBackgroundGradient] = useState({
    enabled: false,
    type: 'linear' as 'linear' | 'radial',
    colors: ['#ffffff', '#000000'],
    direction: 'to right'
  });
  const [textGlow, setTextGlow] = useState({
    enabled: false,
    color: '#00ff00',
    intensity: 10
  });
  const [animationType, setAnimationType] = useState<'marquee' | 'bounce' | 'pulse' | 'fade'>('marquee');
  
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
  
  // 播放狀態
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const newWindowRef = useRef<Window | null>(null);

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

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountdownRunning, countdownTime]);

  // 正數計時
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountupRunning) {
      interval = setInterval(() => {
        setCountupTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountupRunning]);

  // 切換模式
  const switchMode = (mode: 'static' | 'current-time' | 'countdown' | 'countup') => {
    setCurrentMode(mode);
    setIsPlaying(false);
  };

  // 設定倒數時間
  const setCountdownDuration = () => {
    const totalSeconds = countdownHours * 3600 + countdownMinutes * 60 + countdownSeconds;
    setCountdownTime(totalSeconds);
  };

  // 切換倒數計時
  const toggleCountdown = () => {
    if (countdownTime > 0) {
      setIsCountdownRunning(!isCountdownRunning);
    }
  };

  // 重置倒數計時
  const resetCountdown = () => {
    setIsCountdownRunning(false);
    setCountdownTime(0);
  };

  // 切換正數計時
  const toggleCountup = () => {
    setIsCountupRunning(!isCountupRunning);
  };

  // 重置正數計時
  const resetCountup = () => {
    setIsCountupRunning(false);
    setCountupTime(0);
  };

  // 切換播放狀態
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 截圖功能
  const captureScreenshot = async () => {
    if (whiteboardRef.current) {
      try {
        const canvas = await html2canvas(whiteboardRef.current);
        const link = document.createElement('a');
        link.download = `whiteboard-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('截圖失敗:', error);
      }
    }
  };

  // 全螢幕功能
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      whiteboardRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 另開視窗功能
  const openInNewWindow = () => {
    const params = new URLSearchParams({
      text: text,
      speed: speed.toString(),
      backgroundColor: backgroundColor,
      textColor: textColor,
      fontSize: fontSize.toString(),
      currentMode: currentMode,
      countdownHours: countdownHours.toString(),
      countdownMinutes: countdownMinutes.toString(),
      countdownSeconds: countdownSeconds.toString(),
      countdownTime: countdownTime.toString(),
      countupTime: countupTime.toString(),
      isPlaying: isPlaying.toString(),
      isCountdownRunning: isCountdownRunning.toString(),
      isCountupRunning: isCountupRunning.toString(),
      // 新增：OBS 效果參數
      textShadowEnabled: textShadow.enabled.toString(),
      textShadowColor: textShadow.color,
      textShadowBlur: textShadow.blur.toString(),
      textShadowOffsetX: textShadow.offsetX.toString(),
      textShadowOffsetY: textShadow.offsetY.toString(),
      textBorderEnabled: textBorder.enabled.toString(),
      textBorderColor: textBorder.color,
      textBorderWidth: textBorder.width.toString(),
      backgroundGradientEnabled: backgroundGradient.enabled.toString(),
      backgroundGradientType: backgroundGradient.type,
      backgroundGradientColors: backgroundGradient.colors.join(','),
      backgroundGradientDirection: backgroundGradient.direction,
      textGlowEnabled: textGlow.enabled.toString(),
      textGlowColor: textGlow.color,
      textGlowIntensity: textGlow.intensity.toString(),
      animationType: animationType
    });
    
    const windowRef = window.open(
      `/tools/whiteboard/display?${params.toString()}`,
      'whiteboard-display',
      'width=800,height=600,scrollbars=no,resizable=yes'
    );
    
    if (windowRef) {
      newWindowRef.current = windowRef;
      
      const checkClosed = setInterval(() => {
        if (windowRef.closed) {
          newWindowRef.current = null;
          clearInterval(checkClosed);
        }
      }, 1000);
    }
  };

  // 即時同步狀態到新視窗
  useEffect(() => {
    if (newWindowRef.current && !newWindowRef.current.closed) {
      const syncData = {
        text,
        speed,
        backgroundColor,
        textColor,
        fontSize,
        currentMode,
        countdownTime,
        countupTime,
        isPlaying,
        isCountdownRunning,
        isCountupRunning,
        // 新增：OBS 效果同步
        textShadow,
        textBorder,
        backgroundGradient,
        textGlow,
        animationType
      };
      
      console.log('🔄 同步狀態到新視窗:', syncData);
      
      newWindowRef.current.postMessage({
        type: 'STATE_UPDATE',
        data: syncData
      }, '*');
    }
  }, [
    text,
    speed,
    backgroundColor,
    textColor,
    fontSize,
    currentMode,
    countdownTime,
    countupTime,
    isPlaying,
    isCountdownRunning,
    isCountupRunning,
    // 新增：OBS 效果依賴
    textShadow,
    textBorder,
    backgroundGradient,
    textGlow,
    animationType
  ]);

  // 鍵盤快捷鍵
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        captureScreenshot();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openInNewWindow();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, countdownTime, countupTime, isCountdownRunning, isCountupRunning]);

  // 處理模板變更
  const handleTemplateChange = (index: number) => {
    const template = templates[index];
    setSelectedTemplate(index);
    setBackgroundColor(template.backgroundColor);
    setTextColor(template.textColor);
    
    // 重置 OBS 效果設定，避免效果殘留
    setTextShadow({
      enabled: false,
      color: '#000000',
      blur: 4,
      offsetX: 2,
      offsetY: 2
    });
    setTextBorder({
      enabled: false,
      color: '#ffffff',
      width: 3
    });
    setBackgroundGradient({
      enabled: false,
      type: 'linear',
      colors: ['#ffffff', '#000000'],
      direction: 'to right'
    });
    setTextGlow({
      enabled: false,
      color: '#00ff00',
      intensity: 10
    });
    
    // 不改變當前模式，只改變顏色
    // setCurrentMode(template.type);
    if (template.initialText && currentMode === 'static') {
      setText(template.initialText);
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

  // 生成 CSS 樣式字符串
  const generateTextStyles = () => {
    let styles = `color: ${textColor}; font-size: ${fontSize}px;`;
    
    // 文字陰影
    if (textShadow.enabled) {
      styles += `text-shadow: ${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color};`;
    }
    
    // 文字邊框
    if (textBorder.enabled) {
      styles += `-webkit-text-stroke: ${textBorder.width}px ${textBorder.color};`;
    }
    
    // 文字發光
    if (textGlow.enabled) {
      styles += `filter: drop-shadow(0 0 ${textGlow.intensity}px ${textGlow.color});`;
    }
    
    return styles;
  };

  // 生成背景樣式
  const generateBackgroundStyles = () => {
    if (backgroundGradient.enabled) {
      if (backgroundGradient.type === 'linear') {
        return `background: linear-gradient(${backgroundGradient.direction}, ${backgroundGradient.colors.join(', ')});`;
      } else {
        return `background: radial-gradient(circle, ${backgroundGradient.colors.join(', ')});`;
      }
    }
    return `background-color: ${backgroundColor};`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">白板工具 - OBS 直播版</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側控制面板 */}
        <div className="space-y-4">
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

          {/* OBS 效果設定 */}
          <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">OBS 直播效果</h3>
            
            {/* 文字陰影 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={textShadow.enabled}
                  onChange={(e) => setTextShadow(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">文字陰影</label>
              </div>
              {textShadow.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="color"
                    value={textShadow.color}
                    onChange={(e) => setTextShadow(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-8 border border-blue-300 rounded cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={textShadow.blur}
                    onChange={(e) => setTextShadow(prev => ({ ...prev, blur: Number(e.target.value) }))}
                    className="w-full h-2 bg-blue-200 rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* 文字邊框 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={textBorder.enabled}
                  onChange={(e) => setTextBorder(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">文字邊框</label>
              </div>
              {textBorder.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="color"
                    value={textBorder.color}
                    onChange={(e) => setTextBorder(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-8 border border-blue-300 rounded cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={textBorder.width}
                    onChange={(e) => setTextBorder(prev => ({ ...prev, width: Number(e.target.value) }))}
                    className="w-full h-2 bg-blue-200 rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* 漸層背景 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={backgroundGradient.enabled}
                  onChange={(e) => setBackgroundGradient(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">漸層背景</label>
              </div>
              {backgroundGradient.enabled && (
                <div className="space-y-2">
                  <select
                    value={backgroundGradient.type}
                    onChange={(e) => setBackgroundGradient(prev => ({ ...prev, type: e.target.value as 'linear' | 'radial' }))}
                    className="w-full px-2 py-1 text-sm border border-blue-300 rounded bg-white dark:bg-gray-700"
                  >
                    <option value="linear">線性漸層</option>
                    <option value="radial">放射漸層</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="color"
                      value={backgroundGradient.colors[0]}
                      onChange={(e) => setBackgroundGradient(prev => ({ 
                        ...prev, 
                        colors: [e.target.value, prev.colors[1]] 
                      }))}
                      className="w-full h-8 border border-blue-300 rounded cursor-pointer"
                    />
                    <input
                      type="color"
                      value={backgroundGradient.colors[1]}
                      onChange={(e) => setBackgroundGradient(prev => ({ 
                        ...prev, 
                        colors: [prev.colors[0], e.target.value] 
                      }))}
                      className="w-full h-8 border border-blue-300 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 文字發光 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={textGlow.enabled}
                  onChange={(e) => setTextGlow(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded"
                />
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">文字發光</label>
              </div>
              {textGlow.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="color"
                    value={textGlow.color}
                    onChange={(e) => setTextGlow(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-8 border border-blue-300 rounded cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={textGlow.intensity}
                    onChange={(e) => setTextGlow(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                    className="w-full h-2 bg-blue-200 rounded cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右側白板區域 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div
              ref={whiteboardRef}
              className="relative w-full h-80 flex items-center justify-center overflow-hidden"
              style={{ 
                ...(backgroundGradient.enabled ? {} : { backgroundColor }),
                ...(backgroundGradient.enabled ? { background: backgroundGradient.type === 'linear' 
                  ? `linear-gradient(${backgroundGradient.direction}, ${backgroundGradient.colors.join(', ')})`
                  : `radial-gradient(circle, ${backgroundGradient.colors.join(', ')})`
                } : {})
              }}
            >
              <div
                className={`font-bold whitespace-nowrap ${
                  isPlaying ? 'animate-marquee' : ''
                }`}
                style={{
                  ...(textShadow.enabled ? {
                    textShadow: `${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color}`
                  } : {}),
                  ...(textBorder.enabled ? {
                    WebkitTextStroke: `${textBorder.width}px ${textBorder.color}`
                  } : {}),
                  ...(textGlow.enabled ? {
                    filter: `drop-shadow(0 0 ${textGlow.intensity}px ${textGlow.color})`
                  } : {}),
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
            
            {/* 底部控制區域 */}
            <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {/* 控制按鈕 - 移到模板上方 */}
              <div className="mb-2">
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={togglePlay}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      isPlaying
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isPlaying ? '停止' : '開始'} 跑馬燈 (S)
                  </button>
                  
                  <button
                    onClick={captureScreenshot}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    截圖 (P)
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    全螢幕 (F)
                  </button>
                  
                  <button
                    onClick={openInNewWindow}
                    className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    另開視窗 (N)
                  </button>
                </div>
              </div>

              {/* 內建模板 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  內建模板
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleTemplateChange(index)}
                      className={`p-1 text-xs rounded border transition-all ${
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