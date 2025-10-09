'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

type RGB = { r: number; g: number; b: number };

function clamp(n: number, min = 0, max = 255) { return Math.max(min, Math.min(max, n)); }
function toHex(n: number) { return n.toString(16).padStart(2, '0'); }
function rgbToHex({ r, g, b }: RGB) { return `#${toHex(r)}${toHex(g)}${toHex(b)}`; }
// 保留如需之後擴充，先移除未使用函式以通過 ESLint
function rgbToCmyk({ r, g, b }: RGB) {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = ((1 - rr - k) / (1 - k)) * 100;
  const m = ((1 - gg - k) / (1 - k)) * 100;
  const y = ((1 - bb - k) / (1 - k)) * 100;
  return { c: Math.round(c), m: Math.round(m), y: Math.round(y), k: Math.round(k * 100) };
}
function scale(rgb: RGB, factor: number): RGB {
  return { r: clamp(Math.round(rgb.r * factor)), g: clamp(Math.round(rgb.g * factor)), b: clamp(Math.round(rgb.b * factor)) };
}

export default function ColorToolPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dominant, setDominant] = useState<RGB | null>(null);
  const [fromHex, setFromHex] = useState<string>('#222222');
  const [toHex, setToHex] = useState<string>('#666666');
  const [angleDeg, setAngleDeg] = useState<number>(135); // CSS 角度，預設右下（to bottom right）
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 小型複製按鈕（成功後短暫變綠）
  const CopyBtn: React.FC<{ text: string; title?: string }> = ({ text, title }) => {
    const [ok, setOk] = useState(false);
    return (
      <button
        onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1200); }}
        className={`ml-2 px-2 py-1 text-xs rounded border transition-colors ${ok ? 'bg-green-600 text-white border-green-600' : 'bg-white/10 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
        title={title || '複製'}
      >
        {ok ? '已複製' : '複製'}
      </button>
    );
  };

  // 匯出圖片參數與工具
  const [outWidth, setOutWidth] = useState<number>(800);
  const [outHeight, setOutHeight] = useState<number>(400);
  const [unit, setUnit] = useState<'px' | 'cm' | 'mm'>('px');
  const [dpi, setDpi] = useState<number>(96);

  const toPixels = (v: number, u: 'px'|'cm'|'mm', dpiVal: number) => {
    if (u === 'px') return Math.max(1, Math.round(v));
    if (u === 'cm') return Math.max(1, Math.round((v / 2.54) * dpiVal));
    return Math.max(1, Math.round((v / 25.4) * dpiVal)); // mm
  };

  const onDrop = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const computeDominant = useCallback(async (src: string) => {
    return new Promise<RGB>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('No 2d context'));
        const w = 16, h = 16;
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
        resolve({ r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) });
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!imageSrc) return;
    const d = await computeDominant(imageSrc);
    setDominant(d);
    const strongFrom = scale(d, 0.70);
    const strongTo = d;
    setFromHex(rgbToHex(strongFrom));
    setToHex(rgbToHex(strongTo));
  }, [imageSrc, computeDominant]);

  const gradientCss = useMemo(() => `linear-gradient(${angleDeg}deg, ${fromHex}, ${toHex})`, [fromHex, toHex, angleDeg]);

  const exportData = useMemo(() => {
    if (!dominant) return null;
    const softFrom = scale(dominant, 0.85);
    const softTo = scale(dominant, 1.15);
    const domHex = rgbToHex(dominant);
    const cmyk = rgbToCmyk(dominant);
    return {
      dominant: { rgb: dominant, hex: domHex, cmyk },
      gradient: {
        strong: { from: fromHex, to: toHex, angle: angleDeg, twClass: `bg-[linear-gradient(${angleDeg}deg,${fromHex},${toHex})]` },
        soft: { from: rgbToHex(softFrom), to: rgbToHex(softTo), angle: angleDeg, twClass: `bg-[linear-gradient(${angleDeg}deg,${rgbToHex(softFrom)},${rgbToHex(softTo)})]` }
      }
    };
  }, [dominant, fromHex, toHex, angleDeg]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">圖片主色與漸層生成</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">拖放圖片或點擊上傳，擷取主色並產生漸層，可手動微調與匯出顏色。</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onDrop(e.dataTransfer.files); }}
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-64 flex items-center justify-center"
      >
        <input type="file" accept="image/*" className="hidden" id="file-input"
          onChange={(e) => onDrop(e.target.files)} />

        {!imageSrc ? (
          <label htmlFor="file-input" className="cursor-pointer inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
            {/* 手型圖示 */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11V5a2 2 0 114 0v6m0-4a2 2 0 114 0v4m0-2a2 2 0 114 0v2m-8 0a2 2 0 11-4 0v-1m0 0a2 2 0 10-4 0v2a8 8 0 008 8h2a8 8 0 008-8v-3"/>
            </svg>
            拖放圖片到此處，或點擊選擇圖片
          </label>
        ) : (
          <div className="relative w-full h-full">
            {/* 使用原生 img 便於即時載入 DataURL，此處預覽不參與 LCP */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="preview"
              className="absolute inset-0 m-auto max-h-full max-w-full object-contain rounded border border-gray-200 dark:border-gray-700"
            />
            {/* 移除圖片按鈕（固定在右上角） */}
            <button
              type="button"
              onClick={() => { setImageSrc(null); setDominant(null); }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow ring-1 ring-white/60"
              aria-label="移除圖片"
              title="移除圖片"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-3 mb-6">
        <button onClick={handleAnalyze} disabled={!imageSrc}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
          擷取主色並生成漸層
        </button>
        {dominant && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            主色：<span className="inline-block w-5 h-5 rounded" style={{ background: rgbToHex(dominant) }}></span>
            {rgbToHex(dominant)}
            <CopyBtn text={rgbToHex(dominant)} title="複製主色 HEX" />
          </div>
        )}
      </div>

      {/* Gradient editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center">
          <label className="block text-sm">From 色</label>
          <input type="color" value={fromHex} onChange={(e) => setFromHex(e.target.value)} className="w-12 h-10 p-0 border rounded ml-2" />
          <span className="ml-3 text-sm">{fromHex}</span>
          <CopyBtn text={fromHex} title="複製 From HEX" />
        </div>
        <div className="flex items-center">
          <label className="block text-sm">To 色</label>
          <input type="color" value={toHex} onChange={(e) => setToHex(e.target.value)} className="w-12 h-10 p-0 border rounded ml-2" />
          <span className="ml-3 text-sm">{toHex}</span>
          <CopyBtn text={toHex} title="複製 To HEX" />
        </div>
      </div>

      {/* Angle editor */}
      <div className="mb-6">
        <label className="block text-sm mb-2">漸層角度：<span className="font-mono">{angleDeg}°</span></label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={360}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
            className="w-64"
          />
          <input
            type="number"
            min={0}
            max={360}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Math.max(0, Math.min(360, Number(e.target.value))))}
            className="w-20 px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <div className="flex flex-wrap gap-2 text-sm">
            {[45, 90, 135, 180, 225, 270].map(a => (
              <button key={a} onClick={() => setAngleDeg(a)} className={`px-2 py-1 rounded border ${angleDeg===a?'bg-blue-600 text-white border-blue-600':'bg-white/10 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}>{a}°</button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl h-40 border border-gray-200 dark:border-gray-700 mb-4" style={{ backgroundImage: gradientCss }} />

      {/* Export */}
      {exportData && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold mb-3">匯出</h2>
          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center flex-wrap gap-2">Dominant HEX: <code>{exportData.dominant.hex}</code><CopyBtn text={exportData.dominant.hex} title="複製 HEX" /></div>
              <div className="flex items-center flex-wrap gap-2">Dominant RGB: <code>{`rgb(${exportData.dominant.rgb.r}, ${exportData.dominant.rgb.g}, ${exportData.dominant.rgb.b})`}</code><CopyBtn text={`rgb(${exportData.dominant.rgb.r}, ${exportData.dominant.rgb.g}, ${exportData.dominant.rgb.b})`} title="複製 RGB" /></div>
              <div className="flex items-center flex-wrap gap-2">Dominant CMYK: <code>{`cmyk(${rgbToCmyk(exportData.dominant.rgb).c}%, ${rgbToCmyk(exportData.dominant.rgb).m}%, ${rgbToCmyk(exportData.dominant.rgb).y}%, ${rgbToCmyk(exportData.dominant.rgb).k}%)`}</code><CopyBtn text={`cmyk(${rgbToCmyk(exportData.dominant.rgb).c}%, ${rgbToCmyk(exportData.dominant.rgb).m}%, ${rgbToCmyk(exportData.dominant.rgb).y}%, ${rgbToCmyk(exportData.dominant.rgb).k}%)`} title="複製 CMYK" /></div>
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">Strong TW Class: <code className="break-all">{exportData.gradient.strong.twClass}</code><CopyBtn text={exportData.gradient.strong.twClass} title="複製 Strong 類別" /></div>
              <div className="flex items-center flex-wrap gap-2">Soft TW Class: <code className="break-all">{exportData.gradient.soft.twClass}</code><CopyBtn text={exportData.gradient.soft.twClass} title="複製 Soft 類別" /></div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))}
              className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              複製 JSON
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'color-suggestions.json'; a.click(); URL.revokeObjectURL(url);
              }}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              下載 JSON
            </button>
          </div>
        </div>
      )}

      {/* 下載圖片（自訂尺寸/單位） */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-3">下載圖片</h2>
        <div className="flex flex-wrap items-end gap-3 mb-3 text-sm">
          <div>
            <label className="block mb-1">寬度</label>
            <input type="number" value={outWidth} onChange={(e) => setOutWidth(Number(e.target.value))} className="w-28 px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" placeholder="寬度" />
          </div>
          <div>
            <label className="block mb-1">高度</label>
            <input type="number" value={outHeight} onChange={(e) => setOutHeight(Number(e.target.value))} className="w-28 px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" placeholder="高度" />
          </div>
          <div>
            <label className="block mb-1">單位</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value as 'px' | 'cm' | 'mm')} className="px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <option value="px">px</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">DPI</label>
            <input type="number" value={dpi} onChange={(e) => setDpi(Number(e.target.value))} className="w-24 px-2 py-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" placeholder="DPI" />
          </div>
          <button
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => {
              const w = toPixels(outWidth, unit, dpi);
              const h = toPixels(outHeight, unit, dpi);
              const c = document.createElement('canvas');
              c.width = w; c.height = h;
              const ctx = c.getContext('2d');
              if (!ctx) return;
              // Canvas 方向與 CSS 角度定義不同，這裡將 CSS 角度轉為畫布向量
              const rad = (Math.PI / 180) * (90 - angleDeg); // 將 0°(上) -> 90°(右) 轉成數學角度
              const cx = w / 2; const cy = h / 2;
              const rx = Math.cos(rad); const ry = Math.sin(rad);
              const x0 = cx - rx * w; const y0 = cy + ry * h;
              const x1 = cx + rx * w; const y1 = cy - ry * h;
              const grad = ctx.createLinearGradient(x0, y0, x1, y1);
              grad.addColorStop(0, fromHex);
              grad.addColorStop(1, toHex);
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, w, h);
              c.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `gradient_${w}x${h}.png`;
                a.click();
                URL.revokeObjectURL(url);
              });
            }}
          >
            下載 PNG
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
