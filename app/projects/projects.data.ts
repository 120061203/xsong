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
    technologies: ['Jenkins', 'Grafana Cloud', 'Docker', 'YAML', 'JSON', 'CI/CD', 'Pipeline', 'Monitoring'],
    date: '2025-10-08',
    features: [
      '自動化 Dashboard 部署流程',
      'Jenkins Pipeline 整合',
      'Grafana Cloud API 整合',
      '版本控制與回滾機制',
      '監控告警設定',
      '多環境部署支援'
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
    technologies: ['Ansible', 'YAML', 'Docker', 'AWS', 'Terraform', 'Security', 'DevOps'],
    date: '2025-10-14',
    features: [
      '多環境自動化部署',
      '安全配置管理',
      '雲端平台整合',
      '監控與日誌收集',
      '災難恢復機制'
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
    technologies: ['LaTeX', 'GitHub Actions', 'PDF', 'Automation'],
    date: '2025-10-01',
    features: [
      'LaTeX 模板設計',
      '自動化編譯',
      '多格式輸出',
      '版本控制整合'
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
    technologies: ['Terraform', 'GCP', 'Infrastructure as Code', 'DevOps'],
    date: '2025-09-15',
    features: [
      '基礎設施即代碼',
      '模組化設計',
      '環境管理',
      '資源最佳化'
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
      '飲料客製化功能',
      '購物車系統',
      '訂單管理',
      '用戶管理系統'
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
      '分頁搜尋功能',
      '分頁序列化',
      '群組管理',
      '快速存取'
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
      '藍綠部署策略',
      '金絲雀部署',
      'A/B 測試',
      '零停機部署'
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
      '基礎設施即代碼',
      '微服務架構',
      'CI/CD 整合',
      '容器化部署'
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
      'URL 縮短功能',
      '統計分析',
      '用戶管理',
      'API 服務'
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
      '響應式設計',
      '作品集展示',
      '部落格系統',
      '工具集合'
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
      '日曆視圖',
      '待辦事項管理',
      '任務分類',
      '即時同步'
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
      '跑馬燈模式',
      '倒數計時',
      '文字顯示',
      '多模式切換'
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


