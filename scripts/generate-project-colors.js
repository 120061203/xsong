const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pngDir = path.join(__dirname, '../public/images/projects/png');
const outDir = path.join(__dirname, 'output');
const outFile = path.join(outDir, 'project-color-suggestions.json');

function hex(n) {
  const h = n.toString(16).padStart(2, '0');
  return h;
}

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, v));
}

function rgbToHex({ r, g, b }) {
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function adjust({ r, g, b }, factor) {
  return {
    r: clamp(Math.round(r * factor)),
    g: clamp(Math.round(g * factor)),
    b: clamp(Math.round(b * factor)),
  };
}

async function getDominantColor(filePath) {
  const img = sharp(filePath).resize(16, 16, { fit: 'inside' });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  // k-means 簡化：用簡單平均近似主色
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const count = data.length / info.channels;
  return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) };
}

function toTailwindGradient(hex1, hex2) {
  // 提供可直接貼到 className 的建議（需手動在 Tailwind 設定中擴充自訂色時才會完全一致）
  return `bg-[linear-gradient(to_bottom_right,${hex1},${hex2})]`;
}

(async () => {
  try {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const files = fs.readdirSync(pngDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    const results = {};

    for (const file of files) {
      const filePath = path.join(pngDir, file);
      const id = file.replace(/\.(png|jpg|jpeg)$/i, '');
      const dominant = await getDominantColor(filePath);
      const dark = adjust(dominant, 0.85);
      const darker = adjust(dominant, 0.7);
      const light = adjust(dominant, 1.15);

      const baseHex = rgbToHex(dominant);
      const darkHex = rgbToHex(dark);
      const darkerHex = rgbToHex(darker);
      const lightHex = rgbToHex(light);

      results[id] = {
        dominant: baseHex,
        suggestions: {
          gradientStrong: { from: darkerHex, to: baseHex, class: toTailwindGradient(darkerHex, baseHex) },
          gradientSoft: { from: darkHex, to: lightHex, class: toTailwindGradient(darkHex, lightHex) },
        }
      };
    }

    fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf8');

    console.log('Color suggestions generated at:', outFile);
    // 同步印出易讀列表
    Object.entries(JSON.parse(fs.readFileSync(outFile, 'utf8'))).forEach(([id, v]) => {
      console.log(`\n[${id}]`);
      console.log(`  dominant: ${v.dominant}`);
      console.log(`  strong: ${v.suggestions.gradientStrong.from} -> ${v.suggestions.gradientStrong.to}`);
      console.log(`  soft:   ${v.suggestions.gradientSoft.from} -> ${v.suggestions.gradientSoft.to}`);
      console.log(`  TW class (strong): ${v.suggestions.gradientStrong.class}`);
    });
  } catch (e) {
    console.error('Failed to generate colors:', e);
    process.exit(1);
  }
})();
