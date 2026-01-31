import React from 'react';
import { Info, Lightbulb, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const configs = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-900 dark:text-blue-200',
    },
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-900 dark:text-green-200',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      titleColor: 'text-yellow-900 dark:text-yellow-200',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-900 dark:text-green-200',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
      titleColor: 'text-red-900 dark:text-red-200',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const defaultTitles = {
    info: 'Info',
    tip: 'Tip',
    warning: 'Warning',
    success: 'Success',
    error: 'Error',
  };

  return (
    <div
      className={`not-content rounded-lg border p-4 my-4 ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 flex-shrink-0 ${config.iconColor}`} size={20} />
        <div className="flex-1">
          {(title || defaultTitles[type]) && (
            <div className={`font-semibold mb-1 ${config.titleColor}`}>
              {title || defaultTitles[type]}
            </div>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
