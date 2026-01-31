import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeExampleProps {
  examples: Array<{
    key: string;
    label: string;
    code: string;
  }>;
  title?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ examples, title }) => {
  const [activeTab, setActiveTab] = useState(examples[0]?.key || '');
  const [copied, setCopied] = useState(false);

  const activeExample = examples.find(ex => ex.key === activeTab) || examples[0];

  const handleCopy = async () => {
    if (activeExample?.code) {
      try {
        await navigator.clipboard.writeText(activeExample.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Syntax highlighting function
  const highlightCode = (code: string): string => {
    if (!code) return '';

    const keywords = /\b(import|from|const|let|var|function|return|if|else|for|while|class|new|await|async|export|default|try|catch|finally|throw|typeof|instanceof|this|super|extends|implements|interface|type|enum|namespace|module|require|package|public|private|protected|static|final|abstract|volatile|synchronized|transient|native|strictfp|goto|do|switch|case|break|continue|with|in|of|delete|void|null|undefined|true|false|NaN|Infinity|yield|generator)\b/g;
    const strings = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g;
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;
    const properties = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    const urls = /(https?:\/\/[^\s"'`<>)]+)/g;

    const placeholders = new Map<string, string>();
    let placeholderIndex = 0;

    let highlighted = code;
    const stringRegex = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g;
    const stringMatches: Array<{full: string, quote: string, content: string, index: number}> = [];

    stringRegex.lastIndex = 0;
    let match;
    while ((match = stringRegex.exec(code)) !== null) {
      stringMatches.push({
        full: match[0],
        quote: match[1],
        content: match[2],
        index: match.index
      });
    }

    for (let i = stringMatches.length - 1; i >= 0; i--) {
      const { full, quote, content, index } = stringMatches[i];
      const placeholder = `__PL${placeholderIndex++}__`;
      const escapedContent = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const highlightedString = `<span style="color: #ce9178;">${quote}${escapedContent}${quote}</span>`;
      placeholders.set(placeholder, highlightedString);
      highlighted = highlighted.substring(0, index) + placeholder + highlighted.substring(index + full.length);
    }

    highlighted = highlighted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    placeholders.forEach((replacement, placeholder) => {
      highlighted = highlighted.replace(placeholder, replacement);
    });

    highlighted = highlighted.replace(urls, '<span style="color: #9cdcfe;">$1</span>');

    highlighted = highlighted
      .replace(comments, '<span style="color: #6a9955;">$1</span>')
      .replace(keywords, '<span style="color: #569cd6;">$1</span>')
      .replace(numbers, '<span style="color: #b5cea8;">$1</span>')
      .replace(functions, '<span style="color: #dcdcaa;">$1</span>');

    highlighted = highlighted.replace(properties, (match, p1, offset, string) => {
      const before = string.substring(0, offset);
      const openSpans = (before.match(/<span[^>]*>/g) || []).length;
      const closeSpans = (before.match(/<\/span>/g) || []).length;
      if (openSpans > closeSpans) {
        return match;
      }
      return '.<span style="color: #9cdcfe;">' + p1 + '</span>';
    });

    return highlighted;
  };

  const renderCodeWithLineNumbers = (code: string) => {
    if (!code) return null;
    const lines = code.split('\n');

    return lines.map((line, index) => (
      <div key={index} className="flex" style={{ minWidth: 'max-content' }}>
        <span
          className="inline-block w-8 sm:w-12 text-right pr-2 sm:pr-4 select-none text-gray-500 dark:text-gray-500 font-mono text-xs flex-shrink-0"
          style={{ minWidth: '2rem', userSelect: 'none' }}
        >
          {index + 1}
        </span>
        <span
          className="text-xs sm:text-sm"
          style={{ whiteSpace: 'pre' }}
          dangerouslySetInnerHTML={{ __html: highlightCode(line) || '&nbsp;' }}
        />
      </div>
    ));
  };

  return (
    <div className="space-y-4 not-content max-w-full overflow-x-visible">
      {title && (
        <h2 className="text-xl font-semibold text-gray-950 dark:text-gray-50 mb-4 tracking-tight">
          {title}
        </h2>
      )}

      <div className="rounded-lg overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-lg max-w-full">
        <div
          className="px-4 py-2 flex items-center justify-between overflow-x-auto"
          style={{
            backgroundColor: '#252526'
          }}
        >
          <div className="flex gap-1 flex-nowrap">
            {examples.map((example) => (
              <button
                key={example.key}
                onClick={() => setActiveTab(example.key)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-50 whitespace-nowrap ${
                  activeTab === example.key
                    ? 'text-white border-b-2 border-blue-500'
                    : 'hover:text-white hover:bg-gray-700/30'
                }`}
                style={{
                  backgroundColor: activeTab === example.key ? '#1e1e1e' : 'transparent',
                  color: activeTab === example.key ? '#ffffff' : '#cccccc',
                  transition: 'all 0.05s ease'
                }}
              >
                {example.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700/50 rounded transition-all duration-50 flex items-center justify-center"
            style={{
              color: '#cccccc',
              transition: 'all 0.05s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#cccccc';
            }}
            title={copied ? 'Copied!' : 'Copy code'}
            aria-label="Copy code"
          >
            {copied ? (
              <Check size={18} style={{ color: '#4ade80' }} />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>

        <div className="bg-[#1e1e1e] dark:bg-[#1e1e1e] p-3 sm:p-4 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <pre
            className="text-xs sm:text-sm font-mono leading-relaxed m-0"
            style={{
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              color: '#d4d4d4',
              whiteSpace: 'pre',
              wordWrap: 'normal',
              overflowWrap: 'normal',
              transition: 'opacity 0.05s ease'
            }}
          >
            <code className="block">
              {renderCodeWithLineNumbers(activeExample?.code || '')}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeExample;
