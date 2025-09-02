'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
  lastUpdated: string;
}

const projects: Project[] = [
  {
    id: 'xsong-personal-website',
    title: 'xsong.us',
    description: '一個現代化的個人作品集網站，展示專案、工具和專業經驗。',
    longDescription: '這個個人作品集網站使用 Next.js 建構，具有乾淨現代的設計，支援深色/淺色主題。包含專案展示、互動工具（如白板），以及跨所有裝置無縫運作的響應式佈局。網站展示了現代網頁開發實踐和各種技術技能。',
    image: 'https://urlscan.io/liveshot/?width=1280&height=720&url=https://xsong.us',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'React'],
    githubUrl: 'https://github.com/120061203/xsong',
    liveUrl: 'https://xsong.us',
    backgroundColor: 'bg-gradient-to-br from-slate-600 to-gray-700',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '現代響應式設計，支援深色/淺色主題',
      '互動式專案展示與篩選功能',
      '內建工具（白板）',
      '乾淨專業的 UI/UX 設計',
      '使用 Next.js 進行 SEO 優化',
      '快速載入與優化圖片',
      '行動優先的響應式設計',
      '無障礙導航與互動'
    ]
  },
  {
    id: 'calendar-todo-app',
    title: 'Calendar Todo App',
    description: '一個結合日曆和待辦事項管理的綜合應用程式，具有現代化 UI 和即時同步功能。',
    longDescription: '這個應用程式結合了日曆功能和任務管理，讓用戶可以直觀地組織行程和追蹤日常任務。使用 React 前端和 Material-UI 設計系統，提供美觀且易用的介面。支援拖放操作來管理事件和任務。',
    image: 'https://urlscan.io/liveshot/?width=1280&height=720&url=https://120061203.github.io/calendar-todo-app',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Material-UI', 'FullCalendar', 'Jest', 'CRUD Operations', 'RESTful API', 'Real-time Sync'],
    githubUrl: 'https://github.com/120061203/calendar-todo-app',
    liveUrl: 'https://120061203.github.io/calendar-todo-app/',
    backgroundColor: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
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
    ]
  },
  {
    id: 'whiteboard-tool',
    title: 'Whiteboard Tool',
    description: '一個多功能白板應用程式，具有多種顯示模式、文字效果和即時自訂功能。',
    longDescription: '一個互動式白板工具，支援各種顯示模式，包括靜態文字、倒數計時器和跑馬燈效果。具有進階文字樣式功能，包括陰影、邊框、漸層和發光效果。非常適合簡報、公告和數位看板使用。',
    image: 'https://urlscan.io/liveshot/?width=1280&height=720&url=https://xsong.us/tools/whiteboard',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Canvas API', 'React'],
    githubUrl: 'https://github.com/120061203/xsong/tree/main/app/tools/whiteboard',
    liveUrl: 'https://xsong.us/tools/whiteboard',
    backgroundColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    textColor: 'text-white',
    lastUpdated: '2025-09-02',
    features: [
      '多種顯示模式（靜態文字、倒數計時、跑馬燈）',
      '進階文字效果（陰影、邊框、漸層、發光）',
      '即時自訂顏色和字體',
      '內建模板和主題',
      '截圖和全螢幕功能',
      '所有裝置的響應式設計',
      '快速存取的鍵盤快捷鍵',
      '玻璃擬態和現代 UI 效果'
    ]
  }
];

// 根據更新日期排序（最新的在前）
const sortedProjects = projects.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

const allTechnologies = Array.from(new Set(projects.flatMap(project => project.technologies)));

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isDark } = useTheme();

  const filteredProjects = selectedFilter === 'All' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.technologies.includes(selectedFilter));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my projects. Click on any project to see more details.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === 'All'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedFilter(tech)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === tech
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
              onClick={() => setSelectedProject(project)}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
              
              {/* Image Container with Hover Effects */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden relative border-b-2 border-gray-200 dark:border-gray-700">
                <img 
                  src={project.image} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="text-gray-500 dark:text-gray-400 text-center hidden">
                  <i className="fas fa-image text-4xl mb-2"></i>
                  <p className="text-sm">Project Preview</p>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 border-2 border-white border-opacity-30">
                      <i className="fas fa-external-link-alt text-white text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content with Enhanced Hover Effects */}
              <div className={`p-6 ${project.backgroundColor} ${project.textColor} relative overflow-hidden`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent transform rotate-45 scale-150"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:scale-105">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-2 opacity-90 transition-all duration-300 group-hover:opacity-100">
                    {project.description}
                  </p>
                  
                  {/* Last Updated Date */}
                  <div className="mb-3">
                    <span className="text-xs opacity-75 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      更新於 {new Date(project.lastUpdated).toLocaleDateString('zh-TW', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 border border-white border-opacity-30"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 border border-white border-opacity-30">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm hover:underline cursor-pointer opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                      View Details
                    </span>
                    <i className="fas fa-external-link-alt opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col border-2 border-gray-300 dark:border-gray-600 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start p-6 border-b-2 border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-300 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    最後更新：{new Date(selectedProject.lastUpdated).toLocaleDateString('zh-TW', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Project Image */}
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                      <img 
                        src={selectedProject.image} 
                        alt={`${selectedProject.title} screenshot`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="text-gray-500 dark:text-gray-400 text-center hidden">
                        <i className="fas fa-image text-6xl mb-4"></i>
                        <p className="text-lg">Project Screenshot</p>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">關於專案</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors border-2 border-gray-500 hover:border-gray-600"
                          >
                            <i className="fab fa-github"></i>
                            View on GitHub
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors border-2 border-green-400 hover:border-green-500"
                          >
                            <i className="fas fa-external-link-alt"></i>
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      功能特色
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <i className="fas fa-check text-green-500 mt-1"></i>
                          <span className="text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
  