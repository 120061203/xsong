'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8">
            <img 
              src="/avatar.png" 
              alt="小松" 
              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            關於我
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            專案協調人與領導者，專注於 DevOps 工程與技術創新
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/songLinResume20250505.pdf" 
              download
              className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-green-600 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              下載 CV
            </a>
            <a 
              href="https://github.com/120061203" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* 個人簡介 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">個人簡介</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              你好！我是陳松林，目前居住在台中，是一位 DevOps 工程師。我專注於專案協調與領導，致力於技術創新和團隊合作。
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              在技術學習的過程中，我發現很多時候「寫下來」是最好的學習方式，因此決定建立這個技術部落格，分享我的技術心得、演講內容、課程教學，以及個人成長記錄。
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              我專注於 DevOps 技術，包括 React、Docker、Kubernetes、Terraform 等現代開發工具，同時也涉獵 IoT 和AWS雲端技術相關知識。
            </p>
          </div>
        </div>



          {/* 學經歷時間軸 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">學經歷</h2>
            <div className="relative">
              {/* 時間軸線 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* 時間軸項目 */}
              <div className="space-y-8">
                {/* 工作經歷 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DevOps 工程師</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                        2025.08 - 現在
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">台中某軟體公司</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      負責 DevOps 相關工作，專注於專案協調與領導，致力於技術創新和團隊合作。
                    </p>
                  </div>
                </div>

                {/* 碩士學歷 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">網路學習科技研究所</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                        2023 - 2025
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">國立中央大學</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      專注於網路學習科技研究，深入探討教育技術與數位學習領域。
                    </p>
                  </div>
                </div>

                {/* 學士學歷 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">資訊工程學系</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full">
                        2018 - 2022
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">國立高雄大學</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      主修資訊工程，專注於軟體開發和系統設計。參與多個專案，並擔任專案組長。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 演講經歷時間軸 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 mx-4 sm:mx-8 lg:mx-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">演講經歷</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 演講項目 */}
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LLM Comparator: Running Comparative Evaluations with Google Vertex AI</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024.11.30</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">2024 DevFest Taipei - Google Official Workshop</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    在 Vertex AI 平台上如何評估兩個語言模型，分享 LLM 比較評估的實戰經驗。
                  </p>
                  
                  {/* 連結區域 */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <a 
                      href="https://www.youtube.com/watch?v=XwVvr38aO4U" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                    <a 
                      href="https://docs.google.com/presentation/d/150t0ppvSmcPPfs7YnsXUXoqGm73F3trhX0uv1Ez1KXA/edit?slide=id.g2efaa4a1007_0_0#slide=id.g2efaa4a1007_0_0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5v10H6V3h7z"/>
                      </svg>
                      簡報
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">Vertex AI</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">LLM</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">AI 評估</span>
                  </div>
                </div>
                
                {/* 第二個演講項目 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Git程式碼時光機-新手入門</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2023.10.04</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Google Developer Student Club NCU</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    為 GDSC NCU 成員介紹 Git 版本控制的基本概念和實用技巧，幫助新手快速上手。
                  </p>
                  
                  {/* 連結區域 */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <a 
                      href="https://www.youtube.com/watch?v=s3LWK39HWHM" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                    <a 
                      href="https://docs.google.com/presentation/d/1PnOpOlVngBYEOAh6d558Ejq0hUugGaq1dGL4VTcLuIc/edit" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5v10H6V3h7z"/>
                      </svg>
                      簡報
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">Git</span>
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">版本控制</span>
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">新手教學</span>
                  </div>
                </div>
                
                {/* 第三個演講項目 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Maker之旅 x 個性化木紋杯墊</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024.09.28</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Google Developer Student Club NCU</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    結合 AI 技術與 Maker 精神，帶領學員製作個性化木紋杯墊，體驗 AI 在創意設計中的應用。
                  </p>
                  
                  {/* 連結區域 */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <a 
                      href="https://www.youtube.com/watch?v=GYC4Ka9UJFI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                    <a 
                      href="https://docs.google.com/presentation/d/1DhGk2vi2WLfZkJbNWvd-G4Gah9nT-efk2AjN8wXoegE/edit?slide=id.g2efaa4a1007_0_621#slide=id.g2efaa4a1007_0_621" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5v10H6V3h7z"/>
                      </svg>
                      簡報
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">AI</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">Maker</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">創意設計</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 得獎經驗時間軸 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 mx-4 sm:mx-8 lg:mx-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">得獎經驗</h2>
            <div className="relative">
              {/* 時間軸線 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
                            {/* 時間軸項目 */}
              <div className="space-y-8">
                {/* Smart Watch */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Watch</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                        2022
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">2022數位聯網智動化創新應用競賽 - 佳作</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      設計了一個可穿戴 IoT 設備，用於即時生理監測，捕捉心率、體溫等指標。實現 Python Django 後端，並整合 Line Bot 提供即時健康警報通知。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">IoT</span>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">Python Django</span>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">Line Bot</span>
                    </div>
                  </div>
                </div>

                {/* Air Pocket APP */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Air Pocket APP</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                        2021
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">畢業專題競賽 - 佳作 及 廠商獎</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      建立了一個 IoT 解決方案，用於即時空氣品質監測和視覺化。使用 Python Flask 開發後端 API，採用 MQTT 協議進行輕量級數據通信。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">IoT</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">Python Flask</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">MQTT</span>
                    </div>
                  </div>
                </div>

                {/* Solar Smart Blinds */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">太陽能百葉窗結合物聯網app解決西曬問題</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full">
                        2020
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">台灣能潔能科技創意實作競賽 - 全國20強 & 第九屆激發學生創意競賽 - 第二名</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發了一個太陽能優化的智能窗簾系統，最大化自然光照效率。使用 Arduino NodeMCU 開發控制系統，整合亮度感測器和馬達模組，實現即時太陽追蹤和自動調整。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded">Arduino</span>
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded">NodeMCU</span>
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded">IoT</span>
                    </div>
                  </div>
                </div>

                {/* GoGoShop Ordering System */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GoGoShop Ordering System</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full">
                        2020
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">網頁程式設計課程 - 第一名</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發了一個輕量級的線上食品訂購平台，使用 PHP 和 MySQL。設計了響應式 RWD 前端，支援產品管理和訂單處理。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">PHP</span>
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">MySQL</span>
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">RWD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 參賽經歷時間軸 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 mx-4 sm:mx-8 lg:mx-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">參賽經歷</h2>
            <div className="relative">
              {/* 時間軸線 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* 時間軸項目 */}
              <div className="space-y-8">
                {/* AWS臺灣生成式AI應用黑客松競賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-red-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AWS臺灣生成式AI應用黑客松競賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full">
                        2025.4
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">黑客組</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      參與 AWS 生成式 AI 應用開發競賽，運用 AWS 雲端服務和 AI 技術進行創新應用開發。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 3a1 1 0 0 0-1 1v1h2V4a1 1 0 0 0-1-1zM1 7v2h2V7H1zm0 4v2h2v-2H1zm0 4v2h2v-2H1zm0 4v1a1 1 0 0 0 1 1h1v-2H1zm4 0v2h2v-2H5zm4 0v2h2v-2H9zm4 0v2h2v-2h-2zm4 0v2h1a1 1 0 0 0 1-1v-1h-2zm0-4v-2h2v2h-2zm0-4V7h2v2h-2zm0-4V4a1 1 0 0 0-1-1h-1v2h2zm-4 0V3h-2v2h2zm-4 0V3H9v2h2z"/>
                        </svg>
                        AWS
                      </span>
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        生成式AI
                      </span>
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        雲端服務
                      </span>
                    </div>
                  </div>
                </div>

                {/* APAC亞太區 Google Solution Challenge */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">APAC亞太區 Google Solution Challenge</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                        2025.4
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">SDG 3 Good Health and Well-being 邊緣運算機器狗</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發邊緣運算機器狗解決方案，專注於健康與福祉議題，運用 Google 技術進行創新應用。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        邊緣運算
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        機器狗
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        SDG 3
                      </span>
                    </div>
                  </div>
                </div>

                {/* PicoCTF 資安挑戰賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PicoCTF 資安挑戰賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                        2025.3
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">參賽</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      參與國際資安競賽，挑戰網路安全、密碼學、逆向工程等資安技術。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                        </svg>
                        資安
                      </span>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                        </svg>
                        密碼學
                      </span>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                        </svg>
                        逆向工程
                      </span>
                    </div>
                  </div>
                </div>

                {/* 全國台北城市通黑客松 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">全國台北城市通黑客松</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full">
                        2024.9
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">決賽入選 - 城市通APP微服務實作LLM RAG Flutter APP 後端資料API</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發城市通APP，整合微服務架構、LLM RAG技術和Flutter前端，提供智慧城市解決方案。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        微服務
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        LLM RAG
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Flutter
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google Solution Challenge */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Google Solution Challenge</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full">
                        2024.2
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">SDG 15 Life On Land議題 - Flutter App</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發 Flutter 應用程式，專注於陸地生態保護議題，運用 Google 技術解決環境問題。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Flutter
                      </span>
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        SDG 15
                      </span>
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        環境保護
                      </span>
                    </div>
                  </div>
                </div>

                {/* 校際數位聯網智動化創新應用競賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">校際數位聯網智動化創新應用競賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full">
                        2022.6
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">佳作 - 使用Python Django框架實作Linebot及串接雲端MQTT物聯網感測器</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發智慧化應用系統，整合 Python Django 後端、Line Bot 和 MQTT 物聯網感測器技術。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Python Django
                      </span>
                      <span className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Line Bot
                      </span>
                      <span className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        MQTT
                      </span>
                    </div>
                  </div>
                </div>

                {/* 資訊工程學系畢業專題競賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-pink-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">資訊工程學系畢業專題競賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 rounded-full">
                        2021.11
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">佳作及廠商獎 - 透過Adobe XD設計及實作空氣品質檢測APP及後端API</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      設計並開發空氣品質檢測應用程式，使用 Adobe XD 進行 UI/UX 設計，實作完整的 APP 和後端 API。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Adobe XD
                      </span>
                      <span className="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        空氣品質檢測
                      </span>
                      <span className="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        API
                      </span>
                    </div>
                  </div>
                </div>

                {/* 第九屆激發學生創意競賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-teal-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">第九屆激發學生創意競賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded-full">
                        2021.11
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">第二名 - 實作太陽能百葉窗APP即時角度調整系統</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發太陽能百葉窗智慧控制系統，實現即時角度調整功能，結合 APP 控制和硬體整合。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        太陽能百葉窗
                      </span>
                      <span className="px-2 py-1 text-xs bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        即時控制
                      </span>
                      <span className="px-2 py-1 text-xs bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        硬體整合
                      </span>
                    </div>
                  </div>
                </div>

                {/* 台灣能潔能科技創意實作競賽 */}
                <div className="relative">
                  <div className="absolute left-6 top-2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="ml-16">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">台灣能潔能科技創意實作競賽</h3>
                      <span className="ml-4 px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-full">
                        2020.10
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">全國20強 - 實作太陽能百葉窗APP即時角度調整系統</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      開發太陽能百葉窗智慧控制系統，運用潔能科技實現節能環保的智慧建築解決方案。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        潔能科技
                      </span>
                      <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        智慧建築
                      </span>
                      <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        節能環保
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 社群參與 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">社群參與</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* COSCUP開源人年會 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">COSCUP開源人年會</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2023 - 2025</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">製播組成員</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  負責直播串流和議程剪輯，協助開源社群活動的順利進行。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">直播串流</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">議程剪輯</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">開源社群</span>
                </div>
                
              </div>

              {/* SITCON學生計算機年會 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SITCON學生計算機年會</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2022.12</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">記錄組成員</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  負責平面攝影和後製出圖，記錄學生技術交流的重要時刻。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">平面攝影</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">後製出圖</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">學生社群</span>
                </div>
              </div>

              {/* LIS情境科學教材 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LIS情境科學教材</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2022.1 - 7</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">編輯志工</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  負責課程重點的摘錄與統整，協助科學教育內容的品質提升。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">課程編輯</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">內容統整</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">科學教育</span>
                </div>
              </div>
            </div>
          </div>

          {/* 教學經驗 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">教學經驗</h2>
            <div className="space-y-8">
              {/* GDSC */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">國立中央大學 Google Developer Student Club</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2023 - 2025</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">社群技術顧問兼講師</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  在碩士一年級時加入GDSC技術組核心團隊，樂於向全校對資訊有熱忱但不知如何開始的同學分享資訊技能。
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  在課程中不斷精進自身的技能和表達能力，課後滿意度達到4.9/5。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">技術顧問</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">資訊技能</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">教學</span>
                </div>
              </div>

              {/* 國光高中 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">高雄中山大學附屬國光高級中學</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2021.9 - 2022.6</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">物聯科學社講師</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  作為講師，自行備課，鼓勵學生在課堂上發揮創意。
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  在學生了解物聯網程式的基礎概念後，協助他們完成程式練習。透過教學過程，個人對程式和硬體操作也更加熟悉。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">物聯網</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">程式教學</span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">硬體操作</span>
                </div>
              </div>

              {/* 高雄大學創客坊 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">國立高雄大學</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2022.4</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">創客坊物聯網講師</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  畢業前在母校開設課程，將所學的物聯網等專業知識，結合鐳射切割、平面設計等專業技能，讓更多人學習跨領域知識。
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  最讓個人有成就感的是在遠距教學情況下仍能協助同學進行程式除錯（debug），並認為自己的學習和理解能力因此得到提升。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">物聯網</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">鐳射切割</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">平面設計</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">遠距教學</span>
                </div>
              </div>
            </div>
          </div>

          {/* 聯絡方式 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">聯絡方式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">ccssll120061203@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                  <a href="https://github.com/120061203" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/120061203</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                  <a href="https://linkedin.com/in/songlinchen" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">linkedin.com/in/songlinchen</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Instagram</h3>
                  <a href="https://instagram.com/c.s.l.0922" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">instagram.com/c.s.l.0922</a>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
