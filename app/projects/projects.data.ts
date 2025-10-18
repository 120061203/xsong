export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  date: string;
  features: string[];
  challenges: string[];
  results: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
}

export const PROJECTS: ProjectMeta[] = [
  { 
    id: 'jenkins-grafana', 
    title: 'Jenkins + Grafana Cloud 自動部署', 
    description: 'CI/CD 自動將 Dashboard 部署到 Grafana Cloud。',
    fullDescription: '這是一個完整的 CI/CD 自動化部署解決方案，整合 Jenkins 與 Grafana Cloud，實現 Dashboard 的自動化部署與監控。透過 Jenkins Pipeline，當程式碼更新時自動觸發部署流程，將最新的 Dashboard 配置部署到 Grafana Cloud，並提供完整的監控與告警機制。',
    technologies: ['Jenkins', 'Grafana Cloud', 'Prometheus', 'AlertManager', 'Blackbox', 'Docker', 'Terraform', 'MySQL', 'Nginx', 'Cloudflare Tunnel', 'GitHub Webhook', 'CI/CD', 'DevOps', '監控系統', '自動化部署', '告警系統'],
    date: '2025-10-08',
    features: [
      '✅ 自動觸發：GitHub Webhook → Jenkins 自動建置',
      '✅ 自動部署：Dashboard 自動上傳到 Grafana Cloud',
      '✅ 自動驗證：部署結果自動檢查',
      '✅ 自動通知：告警發送到指定 email',
      'Cloudflare Tunnel 安全服務暴露',
      'GitHub Webhook 即時觸發機制',
      'Jenkins Pipeline 自動化流程',
      'Grafana Cloud Dashboard 管理',
      'Prometheus 監控數據收集',
      'AlertManager 告警規則配置',
      'Blackbox 外部網站監控',
      'Docker 容器化部署',
      'Terraform 基礎設施管理',
      'MySQL 數據庫監控',
      'Nginx 反向代理配置',
      '24/7 網站可用性監控',
      '完整的 DevOps 最佳實踐'
    ],
    challenges: [
      'Grafana API 認證與權限管理',
      'Dashboard JSON 格式轉換',
      'Jenkins Pipeline 錯誤處理',
      '多環境配置管理',
      '監控指標一致性'
    ],
    results: [
      '部署時間從 30 分鐘縮短至 5 分鐘',
      '減少 90% 的人為操作錯誤',
      '實現 24/7 自動化監控',
      '提升團隊開發效率 40%',
      '建立標準化部署流程'
    ],
    links: {
      github: 'https://github.com/120061203/jenkins-grafana',
      demo: 'https://xsong.grafana.net/a/grafana-synthetic-monitoring-app/checks'
    }
  },
  { 
    id: 'ansible-tutorial', 
    title: 'Ansible 基礎設施自動部署', 
    description: '專業級 Ansible 自動化部署解決方案，展示企業級 DevOps 實踐與安全最佳實踐。',
    fullDescription: '這是一個全面的 Ansible 自動化部署教學專案，涵蓋從基礎到進階的企業級應用場景。包含多種部署策略、安全最佳實踐、以及與各種雲端平台的整合。',
    technologies: ['Ansible', 'Python', 'Ubuntu', 'Nginx', 'SSH', 'Git', 'Vault', 'DevOps', 'IaC', '自動化部署', '安全最佳實踐', '基礎設施即代碼'],
    date: '2025-10-14',
    features: [
      'Ansible Vault 安全加密 - 企業級敏感資訊保護',
      'SSH 金鑰認證 - 無密碼自動化部署',
      '安全最佳實踐 - Git 安全與敏感資訊管理',
      'Nginx 自動化部署 - 完整的 Web 伺服器配置',
      '模組化設計 - 可擴展的基礎架構代碼',
      'Inventory 主機清單管理',
      'Playbooks 自動化劇本設計',
      'Roles 可重用角色架構',
      'Vault 敏感資訊加密管理',
      '一鍵部署解決方案',
      'Infrastructure as Code 實踐',
      '版本控制最佳實踐',
      '企業級安全標準',
      '自動化部署流程',
      '完整的專案文檔'
    ],
    challenges: [
      '複雜環境配置管理',
      '安全性最佳實踐',
      '效能優化',
      '錯誤處理與回滾'
    ],
    results: [
      '部署效率提升 80%',
      '減少配置錯誤 95%',
      '建立標準化流程',
      '提升系統穩定性'
    ],
    links: {
      github: 'https://github.com/120061203/ansible-tutorial'
    }
  },
  { 
    id: 'cv-latex', 
    title: '履歷自動編譯系統', 
    description: '專業的 LaTeX 履歷專案，支援自動化編譯與 GitHub Pages 部署。',
    fullDescription: '使用 LaTeX 建立專業履歷模板，整合 GitHub Actions 實現自動化編譯與部署，支援多種格式輸出。',
    technologies: ['LaTeX', 'PDF', 'GitHub Pages', 'Makefile', '自動化編譯', '版本管理', '專業排版', '中英文混合', '響應式設計', '個人化模板', '時間戳記', '文件管理'],
    date: '2025-10-01',
    features: [
      '現代化 LaTeX 排版設計，支援中英文混合',
      '響應式佈局優化，適合各種閱讀環境',
      '個人化標識：文件名包含個人姓名和時間戳記',
      '自動化編譯：使用 Makefile 簡化編譯流程',
      '清晰結構：源文件和輸出文件分離管理',
      '自動清理：編譯後自動清理輔助文件',
      'GitHub Pages 自動部署',
      '專業的排版效果和視覺設計',
      '易於修改和擴展的模板結構',
      '快速編譯和版本管理',
      '多種格式輸出支援',
      '時間戳記自動生成'
    ],
    challenges: [
      'LaTeX 格式調整',
      '自動化流程設計',
      '多平台相容性'
    ],
    results: [
      '履歷更新效率提升 70%',
      '格式一致性保證',
      '自動化部署流程'
    ],
    links: {
      github: 'https://github.com/120061203/cv',
      demo: 'https://120061203.github.io/cv/',
      documentation: 'https://github.com/120061203/cv/raw/main/output/songlinchen_resume_20250505.pdf'
    }
  },
  { 
    id: 'gcp-terraform', 
    title: 'GCP Terraform 教學專案', 
    description: '從基礎到生產環境的 GCP Terraform 實作教學。',
    fullDescription: '這是一個全面的 GCP Terraform 教學專案，涵蓋從基礎到生產環境的完整實作。包含基礎設施即代碼、資源管理、模組化設計等進階概念。',
    technologies: ['Terraform', 'GCP', 'VPC', 'Compute Engine', 'GKE', 'Cloud SQL', 'Modules', 'IaC', 'CI/CD', 'gcloud', '安全最佳實踐'],
    date: '2025-09-15',
    features: [
      '第1章：Terraform 基礎、Provider 與 State 管理',
      '第2章：VPC/子網/防火牆/路由配置',
      '第3章：Compute Engine、磁碟、負載平衡與自動擴展',
      '第4章：GKE 叢集、Node Pool、服務/Ingress 部署',
      '第5章：Cloud SQL 建立、備份與高可用',
      '第6章：模組化設計與版本管理',
      '第7章：生產環境範例（dev/staging/prod）與變數管理',
      '成本控管與清理腳本、實作練習與解答'
    ],
    challenges: [
      '複雜的 GCP 服務整合',
      'Terraform 狀態管理',
      '多環境配置',
      '成本優化'
    ],
    results: [
      '基礎設施部署自動化',
      '減少手動配置錯誤',
      '提升環境一致性',
      '建立標準化流程'
    ],
    links: {
      github: 'https://github.com/120061203/terraform-gcp'
    }
  },
  { 
    id: 'gogoshop', 
    title: 'GOGO茶飲 - 線上飲料店系統', 
    description: '完整電商系統，支援飲料客製化與訂單管理。',
    fullDescription: '這是一個完整的電商系統，專為茶飲店設計，支援飲料客製化、訂單管理、用戶管理等完整功能。',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', '電商系統'],
    date: '2021-01-10',
    features: [
      '完整的電商系統架構（用戶端 + 管理員後台）',
      '用戶註冊/登入系統與忘記密碼功能',
      '32種飲料商品展示與價格管理',
      '購物車功能支援客製化選項',
      '飲料客製化：甜度、冰塊、配料選擇',
      '12種配料選項（珍珠、波霸、布丁等）',
      '完整的訂單管理與狀態追蹤',
      'MySQL資料庫設計與優化',
      'PHPMailer郵件發送功能',
      '圖形驗證碼安全驗證',
      '響應式設計支援手機桌面版',
      '雙重身份系統（用戶/管理員）',
      '歷史訂單查看與管理',
      '商品管理與庫存控制'
    ],
    challenges: [
      '複雜的訂單流程',
      '支付系統整合',
      '庫存管理',
      '用戶體驗優化'
    ],
    results: [
      '完整的電商功能',
      '提升用戶體驗',
      '自動化訂單處理',
      '建立管理後台'
    ],
    links: {
      github: 'https://github.com/120061203/gogoshop'
    }
  },
  { 
    id: 'tab-library', 
    title: 'Tab Library - Chrome 擴充功能', 
    description: '分頁管理工具，支援搜尋與序列化。',
    fullDescription: '這是一個 Chrome 擴充功能，提供強大的分頁管理功能，支援分頁搜尋、序列化、群組管理等功能。',
    technologies: ['Chrome Extension', 'JavaScript', 'Chrome APIs', 'DOM Manipulation'],
    date: '2025-09-27',
    features: [
      'Chrome Extension Manifest V3 架構實作',
      'Chrome Tabs API 與 Windows API 整合',
      '事件驅動架構與 DOM 操作',
      '正則表達式搜尋演算法',
      'JSON 序列化與反序列化',
      'CSS Grid 與 Flexbox 響應式佈局',
      '事件委派機制優化效能',
      'Map 資料結構分頁分類',
      'Apache License 2.0 開源授權'
    ],
    challenges: [
      'Chrome API 限制',
      '效能優化',
      '用戶體驗設計',
      '跨瀏覽器相容性'
    ],
    results: [
      '提升分頁管理效率',
      '減少分頁混亂',
      '建立個人化工作流程',
      '獲得用戶好評'
    ],
    links: {
      github: 'https://github.com/120061203/TabLibrary-ChromeExtension',
      demo: 'https://chromewebstore.google.com/detail/tab-library/cfgmbkjbfjbkkgojnfnmlabjhbbpppnf'
    }
  },
  { 
    id: 'aws-deployment-strategies', 
    title: 'AWS 部署策略實驗平台', 
    description: '藍綠、金絲雀、A/B 測試等部署策略的實作平台。',
    fullDescription: '這是一個 AWS 部署策略實驗平台，實作藍綠部署、金絲雀部署、A/B 測試等多種部署策略，提供完整的部署解決方案。',
    technologies: ['AWS', 'Terraform', 'ALB', 'CodeDeploy', 'EC2', '藍綠部署'],
    date: '2025-09-19',
    features: [
      '藍綠部署 (Blue-Green Deployment) 實作',
      '金絲雀部署 (Canary Deployment) 策略',
      'A/B 測試部署 (A/B Testing Deployment)',
      '符號連結回滾部署 (Symlink Rollback)',
      'AWS Application Load Balancer 流量分配',
      'CodeDeploy 自動化部署管理',
      'EC2 實例群管理與切換',
      'S3 儲存桶應用程式檔案管理',
      'Target Groups 健康檢查與路由',
      '零停機部署實現',
      '風險控制與回滾機制',
      '數據驅動的部署決策',
      '完整的 AWS 雲端環境架構',
      '部署策略學習與實驗平台'
    ],
    challenges: [
      '複雜的 AWS 服務整合',
      '部署策略實作',
      '流量管理',
      '回滾機制'
    ],
    results: [
      '實現零停機部署',
      '降低部署風險',
      '提升系統穩定性',
      '建立標準化流程'
    ],
    links: {
      github: 'https://github.com/120061203/codedeploy-terraform-ec2',
      demo: 'http://blue-green-canary-alb-873311364.us-west-2.elb.amazonaws.com/'
    }
  },
  { 
    id: 'app-hub', 
    title: 'App Hub - 企業級基礎設施管理', 
    description: '以 Terraform 實作企業級 IaC 與 AWS 部署。',
    fullDescription: '這是一個企業級基礎設施管理平台，使用 Terraform 實作基礎設施即代碼，提供完整的 AWS 部署解決方案。',
    technologies: ['Terraform', 'AWS', 'VPC', 'ECR', 'App Runner', '微服務'],
    date: '2025-09-12',
    features: [
      'Terraform 基礎設施即代碼管理',
      'AWS 資源完整配置與管理',
      'VPC 網路架構設計與隔離',
      'ECR 容器映像倉庫管理',
      'App Runner 服務自動部署',
      '環境隔離 (Dev/Prod) 配置',
      'Bitbucket Pipelines CI/CD 整合',
      '團隊協作開發流程設計',
      '安全群組與 IAM 權限管理',
      'DynamoDB 狀態鎖定配置',
      'S3 存儲桶資源管理',
      '企業級最佳實踐實施'
    ],
    challenges: [
      '複雜的基礎設施設計',
      '微服務架構',
      '容器化部署',
      '監控與日誌'
    ],
    results: [
      '建立企業級基礎設施',
      '實現自動化部署',
      '提升系統可擴展性',
      '建立標準化流程'
    ],
    links: {
      github: 'https://github.com/120061203/app-hub',
      demo: 'https://ayfmhwarbk.us-east-2.awsapprunner.com/'
    }
  },
  { 
    id: 'go-shorturl', 
    title: 'Go ShortURL', 
    description: '使用 Go + Vue.js 的短網址服務。',
    fullDescription: '這是一個使用 Go 後端和 Vue.js 前端的短網址服務，提供完整的 URL 縮短功能。',
    technologies: ['Go', 'Vue.js', 'PostgreSQL', 'Supabase', 'RESTful API'],
    date: '2025-09-02',
    features: [
      '高效能 Go 後端 API',
      '現代化 Vue.js 前端介面',
      '短網址生成與重定向',
      '點擊統計與分析',
      'PostgreSQL 資料持久化',
      'Vercel 部署與 CDN',
      'RESTful API 設計',
      '高併發處理能力'
    ],
    challenges: [
      'Go 後端開發',
      'Vue.js 前端整合',
      '資料庫設計',
      '效能優化'
    ],
    results: [
      '建立完整的短網址服務',
      '實現統計分析功能',
      '提供 RESTful API',
      '部署到 Vercel'
    ],
    links: {
      github: 'https://github.com/120061203/go-shorturl',
      demo: 'https://go-shorturl.vercel.app'
    }
  },
  { 
    id: 'xsong-personal-website', 
    title: 'xsong.us', 
    description: '現代化技術分享與作品集網站。',
    fullDescription: '這是一個現代化的個人網站，展示技術作品集、部落格文章、專案展示等功能，使用 Next.js 和 TypeScript 開發。',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'React', 'Astro'],
    date: '2025-09-02',
    features: [
      '現代響應式設計，支援深色/淺色主題',
      '互動式專案展示與篩選功能',
      '內建工具（白板）',
      '乾淨專業的 UI/UX 設計',
      '使用 Next.js 進行 SEO 優化',
      '快速載入與優化圖片',
      '行動優先的響應式設計',
      '無障礙導航與互動'
    ],
    challenges: [
      '多框架整合',
      '效能優化',
      'SEO 優化',
      '用戶體驗設計'
    ],
    results: [
      '建立專業個人品牌',
      '展示技術能力',
      '提供完整作品集',
      '實現現代化設計'
    ],
    links: {
      github: 'https://github.com/120061203/xsong',
      demo: 'https://xsong.us'
    }
  },
  { 
    id: 'calendar-todo-app', 
    title: 'Calendar Todo App', 
    description: '結合日曆與待辦管理的應用。',
    fullDescription: '這是一個結合日曆與待辦管理的應用，使用 React 和 Material-UI 開發，提供完整的任務管理功能。',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Material-UI'],
    date: '2025-09-02',
    features: [
      '互動式日曆，支援拖放事件',
      '完整的 CRUD 操作（創建、讀取、更新、刪除）',
      'Supabase 後端即時資料庫',
      '任務管理，具有優先級設定',
      '跨裝置即時同步',
      'RESTful API 設計',
      '所有螢幕尺寸的響應式設計',
      '使用 PostgreSQL 進行資料持久化',
      '清潔架構實作',
      '全面測試（87+ 個測試案例）',
      '使用 Winston 的專業日誌系統'
    ],
    challenges: [
      '複雜的 UI 設計',
      '即時同步功能',
      '資料庫設計',
      '用戶體驗優化'
    ],
    results: [
      '建立完整的任務管理系統',
      '實現即時同步',
      '提供直觀的用戶界面',
      '支援多平台使用'
    ],
    links: {
      github: 'https://github.com/120061203/calendar-todo-app',
      demo: 'https://120061203.github.io/calendar-todo-app/'
    }
  },
  { 
    id: 'whiteboard-tool', 
    title: 'Whiteboard Tool', 
    description: '多模式白板工具，支援跑馬燈與倒數。',
    fullDescription: '這是一個多模式白板工具，支援跑馬燈、倒數計時、文字顯示等功能，使用 Next.js 和 Canvas API 開發。',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Canvas API'],
    date: '2025-09-02',
    features: [
      '多種顯示模式（靜態文字、倒數計時、跑馬燈）',
      '進階文字效果（陰影、邊框、漸層、發光）',
      '即時自訂顏色和字體',
      '內建模板和主題',
      '截圖和全螢幕功能',
      '所有裝置的響應式設計',
      '快速存取的鍵盤快捷鍵',
      '玻璃擬態和現代 UI 效果'
    ],
    challenges: [
      'Canvas API 使用',
      '動畫效果實現',
      '響應式設計',
      '效能優化'
    ],
    results: [
      '建立多功能白板工具',
      '實現流暢的動畫效果',
      '提供多種顯示模式',
      '優化用戶體驗'
    ],
    links: {
      github: 'https://github.com/120061203/xsong/tree/main/app/tools/whiteboard',
      demo: 'https://xsong.us/tools/whiteboard'
    }
  }
];

export function getProjectMeta(id: string): ProjectMeta | undefined {
  return PROJECTS.find(p => p.id === id);
}


