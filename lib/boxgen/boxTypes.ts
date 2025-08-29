import { BoxParams, BoxLayout, PanelPath } from './types';
import { buildFingerEdgePath, roundedRectPath } from './geom';

/**
 * 基本矩形盒子
 * 標準的指接設計
 */
export function buildBasicBox(params: BoxParams): BoxLayout {
  const { width, depth, height, thickness, finger, cornerRadius } = params;
  const delta = calculateDelta(params);
  
  const panels: PanelPath[] = [];
  let currentY = 0;
  let maxWidth = 0;

  // 底部面板
  panels.push({
    name: 'BOTTOM',
    d: buildBasicPanel(width, depth, thickness, finger, delta, cornerRadius, 'female'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: depth + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, width + 2 * thickness);
  currentY += depth + 2 * thickness + 10;

  // 前後側面
  panels.push({
    name: 'FRONT',
    d: buildBasicPanel(width, height, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: height + 2 * thickness
  });
  panels.push({
    name: 'BACK',
    d: buildBasicPanel(width, height, thickness, finger, delta, cornerRadius, 'male'),
    x: width + 2 * thickness + 10,
    y: currentY,
    w: width + 2 * thickness,
    h: height + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (width + 2 * thickness) * 2 + 10);
  currentY += height + 2 * thickness + 10;

  // 左右側面
  panels.push({
    name: 'LEFT',
    d: buildBasicPanel(depth, height, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  panels.push({
    name: 'RIGHT',
    d: buildBasicPanel(depth, height, thickness, finger, delta, cornerRadius, 'male'),
    x: depth + 2 * thickness + 10,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (depth + 2 * thickness) * 2 + 10);
  currentY += height + 2 * thickness + 10;

  // 頂部面板
  if (params.lid !== 'none') {
    panels.push({
      name: 'TOP',
      d: buildBasicPanel(width, depth, thickness, finger, delta, cornerRadius, 'male'),
      x: 0,
      y: currentY,
      w: width + 2 * thickness,
      h: depth + 2 * thickness
    });
    maxWidth = Math.max(maxWidth, width + 2 * thickness);
    currentY += depth + 2 * thickness;
  }

  return { panels, viewBox: { x: 0, y: 0, width: maxWidth, height: currentY } };
}

/**
 * 角度盒子
 * 帶有傾斜側面的設計
 */
export function buildAngledBox(params: BoxParams): BoxLayout {
  const { width, depth, height, thickness, finger, cornerRadius } = params;
  const delta = calculateDelta(params);
  const angle = 15; // 15度傾斜
  
  const panels: PanelPath[] = [];
  let currentY = 0;
  let maxWidth = 0;

  // 底部面板
  panels.push({
    name: 'BOTTOM',
    d: buildBasicPanel(width, depth, thickness, finger, delta, cornerRadius, 'female'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: depth + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, width + 2 * thickness);
  currentY += depth + 2 * thickness + 10;

  // 傾斜側面
  const angledHeight = height + Math.tan(angle * Math.PI / 180) * depth;
  panels.push({
    name: 'FRONT',
    d: buildAngledPanel(width, angledHeight, thickness, finger, delta, cornerRadius, 'male', angle),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: angledHeight + 2 * thickness
  });
  panels.push({
    name: 'BACK',
    d: buildAngledPanel(width, angledHeight, thickness, finger, delta, cornerRadius, 'male', angle),
    x: width + 2 * thickness + 10,
    y: currentY,
    w: width + 2 * thickness,
    h: angledHeight + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (width + 2 * thickness) * 2 + 10);
  currentY += angledHeight + 2 * thickness + 10;

  // 左右側面（梯形）
  panels.push({
    name: 'LEFT',
    d: buildTrapezoidPanel(depth, height, thickness, finger, delta, cornerRadius, 'male', angle),
    x: 0,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  panels.push({
    name: 'RIGHT',
    d: buildTrapezoidPanel(depth, height, thickness, finger, delta, cornerRadius, 'male', angle),
    x: depth + 2 * thickness + 10,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (depth + 2 * thickness) * 2 + 10);
  currentY += height + 2 * thickness + 10;

  return { panels, viewBox: { x: 0, y: 0, width: maxWidth, height: currentY } };
}

/**
 * 彈性盒子
 * 使用活鉸鏈的設計
 */
export function buildFlexBox(params: BoxParams): BoxLayout {
  const { width, depth, height, thickness, finger, cornerRadius } = params;
  const delta = calculateDelta(params);
  
  const panels: PanelPath[] = [];
  let currentY = 0;
  let maxWidth = 0;

  // 底部面板
  panels.push({
    name: 'BOTTOM',
    d: buildBasicPanel(width, depth, thickness, finger, delta, cornerRadius, 'female'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: depth + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, width + 2 * thickness);
  currentY += depth + 2 * thickness + 10;

  // 前後側面（帶彈性切割）
  panels.push({
    name: 'FRONT',
    d: buildFlexPanel(width, height, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: height + 2 * thickness
  });
  panels.push({
    name: 'BACK',
    d: buildFlexPanel(width, height, thickness, finger, delta, cornerRadius, 'male'),
    x: width + 2 * thickness + 10,
    y: currentY,
    w: width + 2 * thickness,
    h: height + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (width + 2 * thickness) * 2 + 10);
  currentY += height + 2 * thickness + 10;

  // 左右側面
  panels.push({
    name: 'LEFT',
    d: buildBasicPanel(depth, height, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  panels.push({
    name: 'RIGHT',
    d: buildBasicPanel(depth, height, thickness, finger, delta, cornerRadius, 'male'),
    x: depth + 2 * thickness + 10,
    y: currentY,
    w: depth + 2 * thickness,
    h: height + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (depth + 2 * thickness) * 2 + 10);
  currentY += height + 2 * thickness + 10;

  return { panels, viewBox: { x: 0, y: 0, width: maxWidth, height: currentY } };
}

/**
 * 托盤盒子
 * 淺盤設計，適合收納
 */
export function buildTrayBox(params: BoxParams): BoxLayout {
  const { width, depth, height, thickness, finger, cornerRadius } = params;
  const delta = calculateDelta(params);
  
  const panels: PanelPath[] = [];
  let currentY = 0;
  let maxWidth = 0;

  // 底部面板
  panels.push({
    name: 'BOTTOM',
    d: buildBasicPanel(width, depth, thickness, finger, delta, cornerRadius, 'female'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: depth + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, width + 2 * thickness);
  currentY += depth + 2 * thickness + 10;

  // 淺側面
  const trayHeight = Math.max(height, 20); // 最小高度 20mm
  panels.push({
    name: 'FRONT',
    d: buildBasicPanel(width, trayHeight, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: width + 2 * thickness,
    h: trayHeight + 2 * thickness
  });
  panels.push({
    name: 'BACK',
    d: buildBasicPanel(width, trayHeight, thickness, finger, delta, cornerRadius, 'male'),
    x: width + 2 * thickness + 10,
    y: currentY,
    w: width + 2 * thickness,
    h: trayHeight + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (width + 2 * thickness) * 2 + 10);
  currentY += trayHeight + 2 * thickness + 10;

  // 左右側面
  panels.push({
    name: 'LEFT',
    d: buildBasicPanel(depth, trayHeight, thickness, finger, delta, cornerRadius, 'male'),
    x: 0,
    y: currentY,
    w: depth + 2 * thickness,
    h: trayHeight + 2 * thickness
  });
  panels.push({
    name: 'RIGHT',
    d: buildBasicPanel(depth, trayHeight, thickness, finger, delta, cornerRadius, 'male'),
    x: depth + 2 * thickness + 10,
    y: currentY,
    w: depth + 2 * thickness,
    h: trayHeight + 2 * thickness
  });
  maxWidth = Math.max(maxWidth, (depth + 2 * thickness) * 2 + 10);
  currentY += trayHeight + 2 * thickness + 10;

  return { panels, viewBox: { x: 0, y: 0, width: maxWidth, height: currentY } };
}

// 輔助函數
function calculateDelta(params: BoxParams): number {
  const { thickness, kerf, clearance } = params;
  const materialFactor = Math.max(1, thickness / 3);
  const burnCompensation = kerf / 2;
  const adjustedClearance = clearance * materialFactor;
  return burnCompensation - adjustedClearance;
}

function buildBasicPanel(width: number, height: number, thickness: number, finger: any, delta: number, cornerRadius: number, role: 'male' | 'female'): string {
  const w = width + 2 * thickness;
  const h = height + 2 * thickness;
  
  let path = roundedRectPath(0, 0, w, h, cornerRadius);
  
  // 添加指接槽
  path += ` M 0 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  path += ` M ${w} 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  path += ` M 0 0`;
  path += buildFingerEdgePath(width, finger, role, delta);
  
  path += ` M 0 ${h}`;
  path += buildFingerEdgePath(width, finger, role, delta);
  
  return path;
}

function buildAngledPanel(width: number, height: number, thickness: number, finger: any, delta: number, cornerRadius: number, role: 'male' | 'female', angle: number): string {
  const w = width + 2 * thickness;
  const h = height + 2 * thickness;
  
  // 創建傾斜的頂邊
  const topOffset = Math.tan(angle * Math.PI / 180) * width;
  
  let path = `M 0 0 L ${w} ${topOffset} L ${w} ${h} L 0 ${h} Z`;
  
  // 添加指接槽
  path += ` M 0 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  path += ` M ${w} ${topOffset}`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  return path;
}

function buildTrapezoidPanel(width: number, height: number, thickness: number, finger: any, delta: number, cornerRadius: number, role: 'male' | 'female', angle: number): string {
  const w = width + 2 * thickness;
  const h = height + 2 * thickness;
  
  // 創建梯形側面
  const topOffset = Math.tan(angle * Math.PI / 180) * height;
  
  let path = `M 0 0 L ${topOffset} ${h} L ${w - topOffset} ${h} L ${w} 0 Z`;
  
  // 添加指接槽
  path += ` M 0 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  path += ` M ${w} 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  return path;
}

function buildFlexPanel(width: number, height: number, thickness: number, finger: any, delta: number, cornerRadius: number, role: 'male' | 'female'): string {
  const w = width + 2 * thickness;
  const h = height + 2 * thickness;
  
  let path = roundedRectPath(0, 0, w, h, cornerRadius);
  
  // 添加彈性切割線（活鉸鏈）
  const flexSpacing = thickness * 2;
  for (let i = 1; i < Math.floor(h / flexSpacing); i++) {
    const y = i * flexSpacing;
    path += ` M 0 ${y} L ${w} ${y}`;
  }
  
  // 添加指接槽
  path += ` M 0 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  path += ` M ${w} 0`;
  path += buildFingerEdgePath(height, finger, role, delta);
  
  return path;
}
