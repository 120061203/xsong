export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
}

export const PROJECTS: ProjectMeta[] = [
  { id: 'ansible-tutorial', title: 'Ansible 基礎設施自動部署', description: '專業級 Ansible 自動化部署解決方案，展示企業級 DevOps 實踐與安全最佳實踐。' },
  { id: 'cv-latex', title: '履歷自動編譯系統', description: '專業的 LaTeX 履歷專案，支援自動化編譯與 GitHub Pages 部署。' },
  { id: 'gcp-terraform', title: 'GCP Terraform 教學專案', description: '從基礎到生產環境的 GCP Terraform 實作教學。' },
  { id: 'gogoshop', title: 'GOGO茶飲 - 線上飲料店系統', description: '完整電商系統，支援飲料客製化與訂單管理。' },
  { id: 'tab-library', title: 'Tab Library - Chrome 擴充功能', description: '分頁管理工具，支援搜尋與序列化。' },
  { id: 'aws-deployment-strategies', title: 'AWS 部署策略實驗平台', description: '藍綠、金絲雀、A/B 測試等部署策略的實作平台。' },
  { id: 'app-hub', title: 'App Hub - 企業級基礎設施管理', description: '以 Terraform 實作企業級 IaC 與 AWS 部署。' },
  { id: 'go-shorturl', title: 'Go ShortURL', description: '使用 Go + Vue.js 的短網址服務。' },
  { id: 'xsong-personal-website', title: 'xsong.us', description: '現代化技術分享與作品集網站。' },
  { id: 'calendar-todo-app', title: 'Calendar Todo App', description: '結合日曆與待辦管理的應用。' },
  { id: 'whiteboard-tool', title: 'Whiteboard Tool', description: '多模式白板工具，支援跑馬燈與倒數。' },
  { id: 'jenkins-grafana', title: 'Jenkins + Grafana Cloud 自動部署', description: 'CI/CD 自動將 Dashboard 部署到 Grafana Cloud。' },
  { id: 'AirPocket', title: 'AirPocket - 空氣口袋', description: 'IoT 空氣品質監測與景點推薦系統。' },
  { id: 'smartWatch', title: 'SmartWatch - 智慧手錶', description: 'ESP8266 智慧手錶，整合多感測與 LINE Bot。' },
  { id: 'solar-smart-blinds', title: 'Solar Smart Blinds - 太陽能智能百葉窗', description: '太陽能供電與光感測智慧調節百葉窗。' },
  { id: 'seismic-Mini-Houses', title: 'Seismic Mini Houses - 耐震迷你屋', description: 'ESP32 + MQTT 加速度監測與 Node-RED 視覺化。' },
  { id: 'time-manager-master', title: 'Time Manager Master', description: '將長清單依指定數量切分批次的工具。' },
];

export function getProjectMeta(id: string): ProjectMeta | undefined {
  return PROJECTS.find(p => p.id === id);
}


