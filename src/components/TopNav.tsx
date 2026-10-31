import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Sliders, Smartphone } from 'lucide-react';

interface TopNavProps {
  onOpenTajweed: () => void;
  onOpenHifz: () => void;
  onOpenOverview: () => void;
  onOpenBookmarks: () => void;
  onOpenSettings: () => void;
  onOpenInstallModal: () => void;
  bookmarksCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenTajweed,
  onOpenHifz,
  onOpenOverview,
  onOpenBookmarks,
  onOpenSettings,
  onOpenInstallModal,
  bookmarksCount,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstallable && !isInstalled) {
      const res = await install();
      if (!res) {
        onOpenInstallModal();
      }
    } else {
      onOpenInstallModal();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 md:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-bold tracking-tight text-emerald-950 dark:text-emerald-100 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-amiri text-base font-bold shadow-xs">
            یس
          </span>
          <span>Surah Yaseen</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#verses"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Verses
          </a>
          <button
            onClick={onOpenTajweed}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tajweed Guide
          </button>
          <button
            onClick={onOpenHifz}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Hifz Practice
          </button>
          <button
            onClick={onOpenOverview}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Virtues & Rukus
          </button>
          <button
            onClick={onOpenBookmarks}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            Bookmarks ({bookmarksCount})
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Settings trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Settings & Font Controls"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Primary Action Button: Install App */}
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            title="Install App on Phone"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
