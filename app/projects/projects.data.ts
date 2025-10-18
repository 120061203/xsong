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
    date: '2024-08',
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
      github: 'https://github.com/120061203/jenkins-grafana-deployment',
      documentation: 'https://docs.example.com/jenkins-grafana'
    }
  },
  { 
    id: 'ansible-tutorial', 
    title: 'Ansible 基礎設施自動部署', 
    description: '專業級 Ansible 自動化部署解決方案，展示企業級 DevOps 實踐與安全最佳實踐。',
    fullDescription: '這是一個全面的 Ansible 自動化部署教學專案，涵蓋從基礎到進階的企業級應用場景。包含多種部署策略、安全最佳實踐、以及與各種雲端平台的整合。',
    technologies: ['Ansible', 'YAML', 'Docker', 'AWS', 'Terraform', 'Security', 'DevOps'],
    date: '2024-07',
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
    ]
  },
  { 
    id: 'cv-latex', 
    title: '履歷自動編譯系統', 
    description: '專業的 LaTeX 履歷專案，支援自動化編譯與 GitHub Pages 部署。',
    fullDescription: '使用 LaTeX 建立專業履歷模板，整合 GitHub Actions 實現自動化編譯與部署，支援多種格式輸出。',
    technologies: ['LaTeX', 'GitHub Actions', 'PDF', 'Automation'],
    date: '2024-06',
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
    ]
  }
];

export function getProjectMeta(id: string): ProjectMeta | undefined {
  return PROJECTS.find(p => p.id === id);
}


