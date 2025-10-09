'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

type RGB = { r: number; g: number; b: number };

function clamp(n: number, min = 0, max = 255) { return Math.max(min, Math.min(max, n)); }
function toHex(n: number) { return n.toString(16).padStart(2, '0'); }
function rgbToHex({ r, g, b }: RGB) { return `#${toHex(r)}${toHex(g)}${toHex(b)}`; }
function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const gradientCss = useMemo(() => `linear-gradient(to bottom right, ${fromHex}, ${toHex})`, [fromHex, toHex]);

  const exportData = useMemo(() => {
    if (!dominant) return null;
    const softFrom = scale(dominant, 0.85);
    const softTo = scale(dominant, 1.15);
    const domHex = rgbToHex(dominant);
    const cmyk = rgbToCmyk(dominant);
    return {
      dominant: { rgb: dominant, hex: domHex, cmyk },
      gradient: {
        strong: { from: fromHex, to: toHex, twClass: `bg-[linear-gradient(to_bottom_right,${fromHex},${toHex})]` },
        soft: { from: rgbToHex(softFrom), to: rgbToHex(softTo), twClass: `bg-[linear-gradient(to_bottom_right,${rgbToHex(softFrom)},${rgbToHex(softTo)})]` }
      }
    };
  }, [dominant, fromHex, toHex]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">圖片主色與漸層生成</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">拖放圖片或點擊上傳，擷取主色並產生漸層，可手動微調與匯出顏色。</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onDrop(e.dataTransfer.files); }}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <input type="file" accept="image/*" className="hidden" id="file-input"
          onChange={(e) => onDrop(e.target.files)} />
        <label htmlFor="file-input" className="cursor-pointer">
          {imageSrc ? '重新選擇圖片' : '拖放圖片到此處，或點擊選擇圖片'}
        </label>
      </div>

      {imageSrc && (
        <div className="mb-4">
          <img src={imageSrc} alt="preview" className="max-h-60 rounded border border-gray-200 dark:border-gray-700" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleAnalyze} disabled={!imageSrc}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
          擷取主色並生成漸層
        </button>
        {dominant && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            主色：<span className="inline-block w-5 h-5 rounded" style={{ background: rgbToHex(dominant) }}></span>
            {rgbToHex(dominant)}
          </div>
        )}
      </div>

      {/* Gradient editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm mb-1">From 色</label>
          <input type="color" value={fromHex} onChange={(e) => setFromHex(e.target.value)} className="w-12 h-10 p-0 border rounded" />
          <span className="ml-3 text-sm">{fromHex}</span>
        </div>
        <div>
          <label className="block text-sm mb-1">To 色</label>
          <input type="color" value={toHex} onChange={(e) => setToHex(e.target.value)} className="w-12 h-10 p-0 border rounded" />
          <span className="ml-3 text-sm">{toHex}</span>
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
              <div>Dominant HEX: <code>{exportData.dominant.hex}</code></div>
              <div>Dominant RGB: <code>{`rgb(${exportData.dominant.rgb.r}, ${exportData.dominant.rgb.g}, ${exportData.dominant.rgb.b})`}</code></div>
              <div>Dominant CMYK: <code>{`cmyk(${rgbToCmyk(exportData.dominant.rgb).c}%, ${rgbToCmyk(exportData.dominant.rgb).m}%, ${rgbToCmyk(exportData.dominant.rgb).y}%, ${rgbToCmyk(exportData.dominant.rgb).k}%)`}</code></div>
            </div>
            <div>
              <div>Strong TW Class: <code className="break-all">{exportData.gradient.strong.twClass}</code></div>
              <div>Soft TW Class: <code className="break-all">{exportData.gradient.soft.twClass}</code></div>
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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
