'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              href="/cv.pdf" 
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

        {/* 標籤頁切換 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <div className="flex space-x-1 mb-8">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              學經歷
            </button>
            <button
              onClick={() => setActiveTab('speaking')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'speaking'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              演講經歷
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              專案經驗
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              聯絡方式
            </button>
          </div>

          {/* 學經歷時間軸 */}
          {activeTab === 'experience' && (
            <div>
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
          )}

          {/* 演講經歷 */}
          {activeTab === 'speaking' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">演講經歷</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 演講項目 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LLM Comparator: Running Comparative Evaluations with Google Vertex AI</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024.11.30</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">2024 DevFest Taipei - Google Official Workshop</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    在 Vertex AI 平台上如何評估兩個語言模型，分享 LLM 比較評估的實戰經驗。
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">Vertex AI</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">LLM</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">AI 評估</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 專案經驗 */}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">專案經驗</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Air Pocket APP */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Air Pocket APP</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2021</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Industry Award and Honorable Mention, Graduation Project Competition</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    建立了一個 IoT 解決方案，用於即時空氣品質監測和視覺化。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    使用 Python Flask 開發後端 API，採用 MQTT 協議進行輕量級數據通信。
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">IoT</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">Python Flask</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">MQTT</span>
                  </div>
                </div>

                {/* Smart Watch */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Watch</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2022</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Honorable Mention, Intelligent Application Competition</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    設計了一個可穿戴 IoT 設備，用於即時生理監測，捕捉心率、體溫等指標。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    實現 Python Django 後端，並整合 Line Bot 提供即時健康警報通知。
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">IoT</span>
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">Python Django</span>
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">Line Bot</span>
                  </div>
                </div>

                {/* Solar Smart Blinds */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solar Smart Blinds</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2020</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Top 20, Taiwan Energy Technology Innovation Competition</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      開發了一個太陽能優化的智能窗簾系統，最大化自然光照效率。
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      使用 Arduino NodeMCU 開發控制系統，整合亮度感測器和馬達模組，實現即時太陽追蹤和自動調整。
                    </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">Arduino</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">NodeMCU</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">IoT</span>
                  </div>
                </div>

                {/* GoGoShop Ordering System */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GoGoShop Ordering System</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2020</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Ranked 1st, Website Design class projects</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    開發了一個輕量級的線上食品訂購平台，使用 PHP 和 MySQL。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    設計了響應式 RWD 前端，支援產品管理和訂單處理。
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded">PHP</span>
                    <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded">MySQL</span>
                    <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded">RWD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 聯絡方式 */}
          {activeTab === 'contact' && (
            <div>
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
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Pinterest</h3>
                    <a href="https://pinterest.com/songlin" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">pinterest.com/songlin</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  