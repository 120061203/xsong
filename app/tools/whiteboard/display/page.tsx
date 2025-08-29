'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function WhiteboardDisplayPage() {
  const searchParams = useSearchParams();
  const [displayData, setDisplayData] = useState({
    text: '載入中...',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: 48,
    currentMode: 'static' as 'static' | 'current-time' | 'countdown' | 'countup',
    isPlaying: false,
    speed: 20,
    countdownTime: 0,
    countupTime: 0,
    isCountdownRunning: false,
    isCountupRunning: false
  });

  // 添加計時器狀態來強制重新渲染
  const [timeTick, setTimeTick] = useState(0);

  // 從 URL 參數載入初始設定
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDisplayData({
      text: params.get('text') || '載入中...',
      backgroundColor: params.get('backgroundColor') || '#ffffff',
      textColor: params.get('textColor') || '#000000',
      fontSize: Number(params.get('fontSize')) || 48,
      currentMode: (params.get('currentMode') as any) || 'static',
      isPlaying: params.get('isPlaying') === 'true',
      speed: Number(params.get('speed')) || 20,
      countdownTime: Number(params.get('countdownTime')) || 0,
      countupTime: Number(params.get('countupTime')) || 0,
      isCountdownRunning: params.get('isCountdownRunning') === 'true',
      isCountupRunning: params.get('isCountupRunning') === 'true'
    });
  }, []);

  // 監聽來自主視窗的狀態更新
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'STATE_UPDATE') {
        console.log('🔄 收到狀態更新:', event.data.data);
        setDisplayData(prev => ({
          ...prev,
          ...event.data.data
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 目前時間更新邏輯 - 每秒更新一次來強制重新渲染
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 計算動畫持續時間
  const getAnimationDuration = (speedValue: number) => {
    const minDuration = 6000; // 6秒（最慢）
    const maxDuration = 50;   // 0.05秒（最快）
    const duration = minDuration - (speedValue - 10) * (minDuration - maxDuration) / 90;
    return Math.max(maxDuration, Math.min(minDuration, duration));
  };

  // 獲取顯示文字
  const getDisplayText = () => {
    if (displayData.currentMode === 'current-time') {
      // 實時獲取當前時間，依賴 timeTick 來強制更新
      const now = new Date();
      return now.toLocaleTimeString('zh-TW', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } else if (displayData.currentMode === 'countdown') {
      const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
          return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      return `倒數: ${formatTime(displayData.countdownTime)}`;
    } else if (displayData.currentMode === 'countup') {
      const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
          return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      return `計時: ${formatTime(displayData.countupTime)}`;
    }
    return displayData.text;
  };

  // 使用 useEffect 來完全替換頁面內容，繞過 Next.js layout
  useEffect(() => {
    // 創建完整的 HTML 內容
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-TW">
        <head>
          <title>白板 - 另開視窗</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: marquee linear infinite;
            }
            ::-webkit-scrollbar { display: none; }
            * { 
              -webkit-user-select: none; 
              -moz-user-select: none; 
              -ms-user-select: none; 
              user-select: none; 
            }
            body { margin: 0; padding: 0; }
            #whiteboard-display {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              position: relative;
            }
            #display-text {
              font-weight: bold;
              white-space: nowrap;
              user-select: none;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
          </style>
        </head>
        <body>
          <div id="whiteboard-display">
            <div id="display-text" style="font-size: ${displayData.fontSize}px; color: ${displayData.textColor};">
              ${getDisplayText()}
            </div>
          </div>
        </body>
      </html>
    `;

    // 完全替換頁面內容
    document.documentElement.innerHTML = htmlContent;
    
    // 設置背景顏色
    const displayDiv = document.getElementById('whiteboard-display');
    if (displayDiv) {
      (displayDiv as HTMLElement).style.backgroundColor = displayData.backgroundColor;
    }

    // 設置動畫和速度
    const textDiv = document.getElementById('display-text');
    if (textDiv) {
      if (displayData.isPlaying) {
        textDiv.classList.add('animate-marquee');
        const duration = getAnimationDuration(displayData.speed);
        (textDiv as HTMLElement).style.animationDuration = `${duration}ms`;
        console.log('🎬 設置動畫持續時間:', duration, 'ms, 速度值:', displayData.speed);
      } else {
        textDiv.classList.remove('animate-marquee');
      }
    }
  }, []); // 只在組件掛載時運行一次

  // 專門處理狀態更新的 useEffect
  useEffect(() => {
    // 更新文字內容
    const textDiv = document.getElementById('display-text');
    if (textDiv) {
      textDiv.textContent = getDisplayText();
      (textDiv as HTMLElement).style.fontSize = `${displayData.fontSize}px`;
      (textDiv as HTMLElement).style.color = displayData.textColor;
    }

    // 更新背景顏色
    const displayDiv = document.getElementById('whiteboard-display');
    if (displayDiv) {
      (displayDiv as HTMLElement).style.backgroundColor = displayData.backgroundColor;
    }

    // 更新動畫狀態和速度
    if (textDiv) {
      if (displayData.isPlaying) {
        textDiv.classList.add('animate-marquee');
        const duration = getAnimationDuration(displayData.speed);
        (textDiv as HTMLElement).style.animationDuration = `${duration}ms`;
        console.log('🔄 更新動畫持續時間:', duration, 'ms, 速度值:', displayData.speed);
      } else {
        textDiv.classList.remove('animate-marquee');
      }
    }
  }, [displayData, timeTick]);

  // 返回一個簡單的載入頁面，實際內容會被 useEffect 替換
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">載入白板顯示頁面...</p>
      </div>
    </div>
  );
}
