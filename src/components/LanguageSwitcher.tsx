import React, { useState, useRef, useEffect } from 'react';
import { locales, localeMeta, type Locale } from '../i18n';

interface LanguageSwitcherProps {
  currentLang: Locale;
  activeId: string;
}

const Flag: React.FC<{ locale: Locale; className?: string }> = ({ locale, className = 'w-8 h-6' }) => {
  const flags: Record<Locale, React.ReactNode> = {
    en: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <clipPath id="en-flag">
          <rect width="60" height="40" rx="2" />
        </clipPath>
        <g clipPath="url(#en-flag)">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
          <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13" />
          <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
        </g>
      </svg>
    ),
    zh: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#DE2910" />
        <polygon points="12,8 13.4,12.4 18,13.2 14.5,16.4 15.5,21 12,18.4 8.5,21 9.5,16.4 6,13.2 10.6,12.4" fill="#FFDE00" />
        <polygon points="22,6 22.5,7.6 24.2,8 22.5,8.4 22,10 21.5,8.4 19.8,8 21.5,7.6" fill="#FFDE00" />
        <polygon points="25.5,10 26,11.6 27.7,12 26,12.4 25.5,14 25,12.4 23.3,12 25,11.6" fill="#FFDE00" />
        <polygon points="25.5,16 26,17.6 27.7,18 26,18.4 25.5,20 25,18.4 23.3,18 25,17.6" fill="#FFDE00" />
        <polygon points="22,20 22.5,21.6 24.2,22 22.5,22.4 22,24 21.5,22.4 19.8,22 21.5,21.6" fill="#FFDE00" />
      </svg>
    ),
    'zh-tw': (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#FE0000" />
        <rect width="30" height="20" fill="#000095" />
        <g transform="translate(15 10)" fill="#fff">
          <circle r="3.2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="-0.45" y="-7.4" width="0.9" height="3.2" transform={`rotate(${i * 30})`} />
          ))}
          <circle r="1.7" fill="#000095" />
          <circle r="1.15" fill="#fff" />
        </g>
      </svg>
    ),
    ko: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#fff" />
        <g transform="translate(30 20)">
          <path d="M-8 0 a8 8 0 1 0 16 0 a4 4 0 1 1 -8 0 a4 4 0 1 0 -8 0" fill="#CD2E3A" />
          <path d="M8 0 a8 8 0 1 0 -16 0 a4 4 0 1 1 8 0 a4 4 0 1 0 8 0" fill="#0047A0" />
          <g fill="#000">
            <rect x="-18.5" y="-11.5" width="8" height="1.4" transform="rotate(-55)" />
            <rect x="-18.5" y="-9.2" width="8" height="1.4" transform="rotate(-55)" />
            <rect x="-18.5" y="-6.9" width="8" height="1.4" transform="rotate(-55)" />
            <rect x="10.5" y="-11.5" width="8" height="1.4" transform="rotate(-55)" />
            <rect x="10.5" y="-9.2" width="3.4" height="1.4" transform="rotate(-55)" />
            <rect x="15.1" y="-9.2" width="3.4" height="1.4" transform="rotate(-55)" />
            <rect x="10.5" y="-6.9" width="8" height="1.4" transform="rotate(-55)" />
          </g>
        </g>
      </svg>
    ),
    ja: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#fff" />
        <circle cx="30" cy="20" r="8.5" fill="#BC002D" />
      </svg>
    ),
    ru: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#fff" />
        <rect y="13.33" width="60" height="13.34" fill="#0039A6" />
        <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
      </svg>
    ),
    es: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
      </svg>
    ),
    pt: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#009B3A" />
        <polygon points="30,5 55,20 30,35 5,20" fill="#FEDF00" />
        <circle cx="30" cy="20" r="8" fill="#002776" />
      </svg>
    ),
    it: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="20" height="40" fill="#009246" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#CE2B37" />
        <rect width="60" height="40" rx="2" fill="none" stroke="rgba(0,0,0,0.06)" />
      </svg>
    ),
    fr: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="20" height="40" fill="#002395" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#ED2939" />
      </svg>
    ),
    de: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="13.34" fill="#000" />
        <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
        <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
      </svg>
    ),
    vi: (
      <svg className={`${className} rounded-sm shadow-sm`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" rx="2" fill="#DA251D" />
        <polygon points="30,8 32.6,16.2 41.2,16.2 34.3,21.2 36.9,29.4 30,24.4 23.1,29.4 25.7,21.2 18.8,16.2 27.4,16.2" fill="#FFCD00" />
      </svg>
    ),
  };

  return <>{flags[locale]}</>;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const current = localeMeta[currentLang];

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
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm overflow-hidden"
        aria-label={`Switch language, current: ${current.english}`}
        title={current.native}
      >
        <Flag locale={currentLang} className="w-9 h-9 scale-110" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {locales.map((locale) => {
            const isActive = currentLang === locale;
            const href = isActive ? '#' : `/docs/${locale}/${activeId}/`;
            const meta = localeMeta[locale];

            return (
              <a
                key={locale}
                href={href}
                className={`flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                  isActive ? 'bg-gray-50' : ''
                }`}
                onClick={(e) => {
                  if (isActive) {
                    e.preventDefault();
                  }
                }}
              >
                <Flag locale={locale} className="w-8 h-5 mr-3 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{meta.english}</div>
                  <div className="text-xs text-gray-500">{meta.native}</div>
                </div>
                {isActive && (
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 16 16">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
