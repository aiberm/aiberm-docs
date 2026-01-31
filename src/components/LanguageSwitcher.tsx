import React, { useState, useRef, useEffect } from 'react';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh';
  switchUrl: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, switchUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
        aria-label="Switch language"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* English */}
          <a
            href={currentLang === 'en' ? '#' : switchUrl}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
              currentLang === 'en' ? 'bg-gray-50' : ''
            }`}
            onClick={(e) => {
              if (currentLang === 'en') {
                e.preventDefault();
              }
            }}
          >
            <svg className="w-8 h-6 mr-3 rounded" viewBox="0 0 60 30">
              <clipPath id="t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
              </clipPath>
              <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
            </svg>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">English</div>
              <div className="text-xs text-gray-500">English</div>
            </div>
            {currentLang === 'en' && (
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 16 16">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>

          {/* Chinese */}
          <a
            href={currentLang === 'zh' ? '#' : switchUrl}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
              currentLang === 'zh' ? 'bg-gray-50' : ''
            }`}
            onClick={(e) => {
              if (currentLang === 'zh') {
                e.preventDefault();
              }
            }}
          >
            <svg className="w-8 h-6 mr-3 rounded" viewBox="0 0 60 40">
              <rect width="60" height="40" fill="#de2910"/>
              <polygon points="15,8 16.18,11.82 20,13 16.18,14.18 15,18 13.82,14.18 10,13 13.82,11.82" fill="#ffde00"/>
              <polygon points="25,6 25.5,7.5 27,8 25.5,8.5 25,10 24.5,8.5 23,8 24.5,7.5" fill="#ffde00"/>
              <polygon points="28,11 28.5,12.5 30,13 28.5,13.5 28,15 27.5,13.5 26,13 27.5,12.5" fill="#ffde00"/>
              <polygon points="28,16 28.5,17.5 30,18 28.5,18.5 28,20 27.5,18.5 26,18 27.5,17.5" fill="#ffde00"/>
              <polygon points="25,21 25.5,22.5 27,23 25.5,23.5 25,25 24.5,23.5 23,23 24.5,22.5" fill="#ffde00"/>
            </svg>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Chinese</div>
              <div className="text-xs text-gray-500">中文</div>
            </div>
            {currentLang === 'zh' && (
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 16 16">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
