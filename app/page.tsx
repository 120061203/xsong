'use client';

import Image from "next/image"
import { useState } from "react"
import AvatarModal from "./components/AvatarModal"
import TypewriterEffect from "./components/TypewriterEffect"

export default function Home() {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-[calc(100vh-200px)] flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 左側：文字區塊 */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start space-y-6 max-w-2xl md:ml-0 lg:ml-0 xl:ml-0">
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 text-center md:text-left">
            <TypewriterEffect 
              text="HI  !  I'm" 
              speed={150}
              delay={500}
            />
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-center md:text-left">
            <span className="text-gray-900 dark:text-white">
              <TypewriterEffect 
                text="小松 XiaoSong" 
                speed={200}
                delay={1000}
              />
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left">
            <TypewriterEffect 
              text="Passionate about" 
              speed={80}
              delay={2000}
            />
            <span className="text-blue-600 dark:text-teal-400 font-bold">
              <TypewriterEffect 
                text=" Maker and Development" 
                speed={80}
                delay={3500}
              />
            </span>
            <br/>
            <TypewriterEffect 
              text="Currently exploring " 
              speed={80}
              delay={5000}
            />
            <span className="text-blue-600 dark:text-orange-400">
              <TypewriterEffect 
                text="Devops" 
                speed={80}
                delay={6500}
              />
            </span>
            <TypewriterEffect 
              text=" and " 
              speed={80}
              delay={7000}
            />
            <span className="text-gray-600 dark:text-green-500">
              <TypewriterEffect 
                text="AI" 
                speed={80}
                delay={7200}
              />
            </span>
            <TypewriterEffect 
              text="." 
              speed={80}
              delay={7400}
            />
          </p>

          {/* 社交連結 */}
          <div className="flex justify-center md:justify-start space-x-4 pt-4">
            <a
              href="https://github.com/120061203"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-600 dark:border-green-400 text-blue-600 dark:text-green-400 hover:bg-blue-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a
              href="https://linkedin.com/in/songlinchen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-600 dark:border-green-400 text-blue-600 dark:text-green-400 hover:bg-blue-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
            <a
              href="https://instagram.com/c.s.l.0922"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-600 dark:border-green-400 text-blue-600 dark:text-green-400 hover:bg-blue-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
        </div>

        {/* 右側：頭像 */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <button
            onClick={() => setIsAvatarModalOpen(true)}
            className="group relative transition-transform hover:scale-105 active:scale-95"
            aria-label="點擊查看社交媒體 QR Code"
          >
            <Image
              src="/avatar.png"
              alt="avatar"
              width={300}
              height={300}
              className="rounded-full border-4 border-blue-600 dark:border-green-400 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer"
            />
            {/* 點擊提示 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                點擊查看 QR Code
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Avatar Modal */}
      <AvatarModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />
    </>
  )
}
