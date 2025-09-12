'use client';

export default function CriticalCSS() {
  return (
    <style jsx global>{`
      /* 關鍵 CSS - 首屏渲染優化 */
      body {
        font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
        line-height: 1.6;
        color: rgb(17, 24, 39);
        background-color: rgb(249, 250, 251);
      }
      
      .dark body {
        color: rgb(255, 255, 255);
        background-color: rgb(17, 24, 39);
      }
      
      /* 防止 FOUC (Flash of Unstyled Content) */
      .loading {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      .loaded {
        opacity: 1;
      }
      
      /* 關鍵動畫 */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
    `}</style>
  );
}
