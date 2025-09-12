'use client';

import { useState, useEffect } from 'react';
export default function WhiteboardDisplayPage() {
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
    isCountupRunning: false,
    // 新增：進階效果設定
    textShadow: {
      enabled: false, // 改為 false，預設不啟用文字陰影
      color: '#000000',
      blur: 4,
      offsetX: 2,
      offsetY: 2
    },
    textBorder: {
      enabled: false, // 改為 false，預設不啟用邊框
      color: '#ffffff',
      width: 3
    },
    backgroundGradient: {
      enabled: false,
      type: 'linear' as 'linear' | 'radial',
      colors: ['#ffffff', '#000000'],
      direction: 'to right'
    },
    textGlow: {
      enabled: false,
      color: '#00ff00',
      intensity: 10
    },
    animationType: 'marquee' as 'marquee' | 'bounce' | 'pulse' | 'fade',
    // 新增：毛玻璃效果和 Material Design 陰影
    glassEffect: {
      enabled: false,
      blur: 20,
      transparency: 0.1,
      border: true,
      borderColor: '#ffffff',
      borderWidth: 1
    },
    materialElevation: {
      enabled: false,
      level: 4,
      color: '#000000',
      opacity: 0.25
    }
  });

  // 添加計時器狀態來強制重新渲染
  const [timeTick, setTimeTick] = useState(0);

  // 從 URL 參數載入初始設定
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 調試：檢查關鍵參數
    console.log('🔍 URL 參數檢查:', {
      backgroundGradientEnabled: params.get('backgroundGradientEnabled'),
      backgroundGradientType: params.get('backgroundGradientType'),
      backgroundGradientColors: params.get('backgroundGradientColors'),
      backgroundGradientDirection: params.get('backgroundGradientDirection'),
      glassEffectEnabled: params.get('glassEffectEnabled'),
      glassEffectBlur: params.get('glassEffectBlur'),
      glassEffectTransparency: params.get('glassEffectTransparency')
    });
    
    setDisplayData({
      text: params.get('text') || '載入中...',
      backgroundColor: params.get('backgroundColor') || '#ffffff',
      textColor: params.get('textColor') || '#000000',
      fontSize: Number(params.get('fontSize')) || 48,
      currentMode: (params.get('currentMode') as 'static' | 'current-time' | 'countdown' | 'countup') || 'static',
      isPlaying: params.get('isPlaying') === 'true',
      speed: Number(params.get('speed')) || 20,
      countdownTime: Number(params.get('countdownTime')) || 0,
      countupTime: Number(params.get('countupTime')) || 0,
      isCountdownRunning: params.get('isCountdownRunning') === 'true',
      isCountupRunning: params.get('isCountupRunning') === 'true',
      // 新增：進階效果設定
      textShadow: {
        enabled: params.get('textShadowEnabled') === 'true',
        color: params.get('textShadowColor') || '#000000',
        blur: Number(params.get('textShadowBlur')) || 4,
        offsetX: Number(params.get('textShadowOffsetX')) || 2,
        offsetY: Number(params.get('textShadowOffsetY')) || 2
      },
      textBorder: {
        enabled: params.get('textBorderEnabled') === 'true',
        color: params.get('textBorderColor') || '#ffffff',
        width: Number(params.get('textBorderWidth')) || 3
      },
      backgroundGradient: {
        enabled: params.get('backgroundGradientEnabled') === 'true',
        type: (params.get('backgroundGradientType') as 'linear' | 'radial') || 'linear',
        colors: params.get('backgroundGradientColors')?.split(',').map(c => c.trim()) || ['#ffffff', '#000000'],
        direction: params.get('backgroundGradientDirection') || 'to right'
      },
      textGlow: {
        enabled: params.get('textGlowEnabled') === 'true',
        color: params.get('textGlowColor') || '#00ff00',
        intensity: Number(params.get('textGlowIntensity')) || 10
      },
      animationType: (params.get('animationType') as 'marquee' | 'bounce' | 'pulse' | 'fade') || 'marquee',
      // 新增：毛玻璃效果和 Material Design 陰影
      glassEffect: {
        enabled: params.get('glassEffectEnabled') === 'true',
        blur: Number(params.get('glassEffectBlur')) || 20,
        transparency: Number(params.get('glassEffectTransparency')) || 0.1,
        border: params.get('glassEffectBorder') === 'true',
        borderColor: params.get('glassEffectBorderColor') || '#ffffff',
        borderWidth: Number(params.get('glassEffectBorderWidth')) || 1
      },
      materialElevation: {
        enabled: params.get('materialElevationEnabled') === 'true',
        level: Number(params.get('materialElevationLevel')) || 4,
        color: params.get('materialElevationColor') || '#000000',
        opacity: Number(params.get('materialElevationOpacity')) || 0.25
      }
    });
    
    // 調試：檢查設定後的狀態
    console.log('🎨 設定後的 displayData:', {
      backgroundGradient: {
        enabled: params.get('backgroundGradientEnabled') === 'true',
        type: (params.get('backgroundGradientType') as 'linear' | 'radial') || 'linear',
        colors: params.get('backgroundGradientColors')?.split(',').map(c => c.trim()) || ['#ffffff', '#000000'],
        direction: params.get('backgroundGradientDirection') || 'to right'
      },
      glassEffect: {
        enabled: params.get('glassEffectEnabled') === 'true',
        blur: Number(params.get('glassEffectBlur')) || 20,
        transparency: Number(params.get('glassEffectTransparency')) || 0.1
      }
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
    // 根據文字長度和字體大小計算更合適的動畫時間
    const textLength = displayData.text.length;
    const charWidth = displayData.fontSize * 0.6; // 估算每個字符的寬度
    const totalTextWidth = textLength * charWidth;
    
    // 動態獲取實際容器寬度
    let containerWidth = 800; // 預設值
    if (typeof window !== 'undefined') {
      containerWidth = window.innerWidth;
    }
    
    // 計算文字需要移動的總距離（從右邊開始到左邊完全消失）
    // 使用 100% 的 translateX，所以總距離是容器寬度 + 文字寬度
    const totalDistance = containerWidth + totalTextWidth;
    
    // 根據速度調整動畫時間
    const minDuration = 8000; // 8秒（最慢）
    const maxDuration = 2000; // 2秒（最快）
    const speedFactor = speedValue / 100; // 速度值越大，動畫越快
    const duration = minDuration - (minDuration - maxDuration) * speedFactor;
    
    // 根據文字長度調整，確保有足夠時間完整顯示
    // 每像素的動畫時間，確保文字能完整走完
    // 使用極激進的時間計算，確保文字完整跑完
    let pixelTime = 0.05; // 基礎時間增加
    if (containerWidth > 1200) {
      pixelTime = 0.50; // 超大視窗：極大幅增加時間
    } else if (containerWidth > 1000) {
      pixelTime = 0.40; // 大視窗：大幅增加時間
    } else if (containerWidth > 800) {
      pixelTime = 0.25; // 中等視窗：適度增加時間
    }
    
    // 使用極激進的計算方法，確保大視窗有足夠時間
    let adjustedDuration = Math.max(duration, totalDistance * pixelTime);
    
    // 對於大視窗，額外增加大量緩衝時間
    if (containerWidth > 1000) {
      adjustedDuration = Math.max(adjustedDuration, totalDistance * 0.30); // 至少0.30ms/像素
    }
    
    // 額外增加總體緩衝時間，確保文字完整跑完
    adjustedDuration = Math.round(adjustedDuration * 1.5); // 增加50%的緩衝時間
    
    console.log('🎬 動畫計算:', {
      textLength,
      fontSize: displayData.fontSize,
      charWidth,
      totalTextWidth,
      containerWidth,
      totalDistance,
      speedValue,
      duration,
      adjustedDuration,
      pixelTime
    });
    
    return Math.round(adjustedDuration);
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
      return `${formatTime(displayData.countdownTime)}`;
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
      return `${formatTime(displayData.countupTime)}`;
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
              white-space: nowrap;
              display: inline-block;
              will-change: transform;
              /* 確保動畫不會被截斷 */
              animation-fill-mode: both;
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
    console.log('🔄 狀態更新觸發，當前 displayData:', displayData);
    
    // 更新文字內容
    const textDiv = document.getElementById('display-text');
    if (textDiv) {
      textDiv.textContent = getDisplayText();
      (textDiv as HTMLElement).style.fontSize = `${displayData.fontSize}px`;
      (textDiv as HTMLElement).style.color = displayData.textColor;
      
      // 應用進階效果
      // 文字陰影
      if (displayData.textShadow.enabled) {
        (textDiv as HTMLElement).style.textShadow = `${displayData.textShadow.offsetX}px ${displayData.textShadow.offsetY}px ${displayData.textShadow.blur}px ${displayData.textShadow.color}`;
      } else {
        (textDiv as HTMLElement).style.textShadow = 'none';
      }
      
      // 文字邊框
      if (displayData.textBorder.enabled) {
        (textDiv as HTMLElement).style.webkitTextStroke = `${displayData.textBorder.width}px ${displayData.textBorder.color}`;
      } else {
        (textDiv as HTMLElement).style.webkitTextStroke = 'none';
      }
      
      // 文字發光
      if (displayData.textGlow.enabled) {
        (textDiv as HTMLElement).style.filter = `drop-shadow(0 0 ${displayData.textGlow.intensity}px ${displayData.textGlow.color})`;
      } else {
        (textDiv as HTMLElement).style.filter = 'none';
      }
    }

    // 更新背景
    const displayDiv = document.getElementById('whiteboard-display');
    if (displayDiv) {
      console.log('🎨 應用背景效果:', {
        backgroundGradient: displayData.backgroundGradient,
        glassEffect: displayData.glassEffect,
        materialElevation: displayData.materialElevation
      });
      
      if (displayData.backgroundGradient.enabled) {
        console.log('🌈 應用背景漸層:', displayData.backgroundGradient);
        if (displayData.backgroundGradient.type === 'linear') {
          (displayDiv as HTMLElement).style.background = `linear-gradient(${displayData.backgroundGradient.direction}, ${displayData.backgroundGradient.colors.join(', ')})`;
        } else {
          (displayDiv as HTMLElement).style.background = `radial-gradient(circle, ${displayData.backgroundGradient.colors.join(', ')})`;
        }
      } else {
        console.log('🎨 應用純色背景:', displayData.backgroundColor);
        (displayDiv as HTMLElement).style.background = displayData.backgroundColor;
      }
      
      // 應用毛玻璃效果（無邊框）
      if (displayData.glassEffect.enabled) {
        console.log('🔮 應用毛玻璃效果:', displayData.glassEffect);
        (displayDiv as HTMLElement).style.backdropFilter = `blur(${displayData.glassEffect.blur}px)`;
        (displayDiv as HTMLElement).style.setProperty('-webkit-backdrop-filter', `blur(${displayData.glassEffect.blur}px)`); // Safari 支援
        
        // 注意：這裡不設定 backgroundColor，避免與 background 衝突
        // 毛玻璃效果通過 backdrop-filter 實現，不需要額外的背景色
        
        (displayDiv as HTMLElement).style.border = 'none';
        // 添加定位讓毛玻璃效果更明顯
        (displayDiv as HTMLElement).style.position = 'relative';
        (displayDiv as HTMLElement).style.zIndex = '1';
      }
      
      // 應用 Material Design 陰影
      if (displayData.materialElevation.enabled) {
        console.log('📦 應用 Material Design 陰影:', displayData.materialElevation);
        (displayDiv as HTMLElement).style.boxShadow = `0 ${displayData.materialElevation.level * 0.5}px ${displayData.materialElevation.level}px rgba(0, 0, 0, ${displayData.materialElevation.opacity})`;
      }
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
  }, [displayData, timeTick, getDisplayText, getAnimationDuration]);

  // 鍵盤快捷鍵處理
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 檢查是否按下了 Ctrl 或 Cmd 鍵
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        // 全螢幕功能
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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
