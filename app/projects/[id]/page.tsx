import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectMeta, PROJECTS } from '../projects.data';

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const meta = getProjectMeta(id);
  const siteUrl = 'https://xsong.us';
  const pageUrl = `${siteUrl}/projects/${id}`;
  const ogImage = `${siteUrl}/images/projects/webp/${id}.webp`;
  const title = meta ? `${meta.title} - xsong.us` : 'Project - xsong.us';
  const description = meta?.description || 'Project details on xsong.us';

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta?.title || 'Project' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meta = getProjectMeta(id);
  if (!meta) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">返回 Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按鈕 */}
        <Link href="/projects" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回 Projects
        </Link>

        {/* 專案標題與基本資訊 */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            {/* 得獎作品皇冠圖標 */}
            {(() => {
              const awardWinningProjects = ['AirPocket', 'smartWatch', 'solar-smart-blinds', 'gogoshop'];
              if (awardWinningProjects.includes(id)) {
                return (
                  <span className="text-yellow-500 text-3xl" title="得獎作品">
                    👑
                  </span>
                );
              }
              return null;
            })()}
            {meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {meta.date}
            </span>
            <div className="flex flex-wrap gap-2">
              {meta.technologies.map((tech) => (
                <span key={tech} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 專案圖片 */}
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8" style={{ aspectRatio: '16/9' }}>
          <Image src={`/images/projects/webp/${id}.webp`} alt={`${meta.title} og image`} fill className="object-cover" />
        </div>

        {/* 專案描述 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要內容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 完整描述 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">專案概述</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{meta.fullDescription}</p>
            </section>

            {/* 主要功能 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">主要功能</h2>
              <ul className="space-y-2">
                {meta.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 技術挑戰 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">技術挑戰</h2>
              <ul className="space-y-2">
                {meta.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 專案成果 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">專案成果</h2>
              <ul className="space-y-2">
                {meta.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 側邊欄 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* 專案資訊卡片 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">專案資訊</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">完成日期</span>
                    <p className="text-gray-900 dark:text-white">{meta.date}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">技術</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {meta.technologies.map((tech) => (
                        <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 相關連結 */}
              {meta.links && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">相關連結</h3>
                  <div className="space-y-3">
                    {meta.links.github && (
                      <a 
                        href={meta.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        GitHub Repository
                      </a>
                    )}
                    {meta.links.demo && (
                      <a 
                        href={meta.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {meta.links.documentation && (
                      <a 
                        href={meta.links.documentation} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Documentation
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


