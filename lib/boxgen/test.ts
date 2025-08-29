/**
 * 測試生成器系統
 */

import { GeneratorFactory } from './generators';
import { BoxParams } from './types';

// 測試參數
const testParams: BoxParams = {
  boxType: 'basic',
  width: 100,
  depth: 80,
  height: 60,
  thickness: 3,
  kerf: 0.15,
  clearance: 0.05,
  cornerRadius: 2,
  finger: { mode: 'width', fingerWidth: 10 },
  lid: 'flat',
  handleHole: false,
  ventPattern: 'none',
  layout: 'compact',
  cutColor: '#ff0000',
  engraveColor: '#0000ff',
  flexCuts: false,
  dovetailJoints: false,
  screwHoles: false,
  magnets: false
};

// 測試生成器
export function testGenerator() {
  try {
    console.log('Testing generator with params:', testParams);
    
    const generator = GeneratorFactory.createGenerator('basic', testParams);
    console.log('Generator created:', generator);
    
    const layout = generator.generate();
    console.log('Layout generated:', layout);
    
    return layout;
  } catch (error) {
    console.error('Generator test failed:', error);
    return null;
  }
}

// 測試邊緣系統
export function testEdges() {
  try {
    const { EdgeFactory } = require('./edges');
    console.log('Edge factory available:', EdgeFactory);
    
    const availableEdges = EdgeFactory.getAvailableEdges();
    console.log('Available edges:', availableEdges);
    
    return availableEdges;
  } catch (error) {
    console.error('Edge test failed:', error);
    return [];
  }
}
