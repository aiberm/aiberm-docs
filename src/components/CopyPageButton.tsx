import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ui, type Locale } from '../i18n';

interface CopyPageButtonProps {
  lang: Locale;
}

const CopyPageButton: React.FC<CopyPageButtonProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const strings = ui[lang] ?? ui.en;

  const label = strings.copyPage;
  const successLabel = strings.copied;

  const handleCopyPage = async () => {
    const article = document.querySelector('article.docs-content');
    if (!article) return;
    const text = article.innerText || article.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy page:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopyPage}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md border border-gray-200 bg-white transition-colors"
      title={copied ? successLabel : label}
      aria-label={label}
    >
      {copied ? (
        <Check size={18} className="text-green-600 shrink-0" />
      ) : (
        <Copy size={18} className="shrink-0" />
      )}
      <span>{copied ? successLabel : label}</span>
    </button>
  );
};

export default CopyPageButton;
