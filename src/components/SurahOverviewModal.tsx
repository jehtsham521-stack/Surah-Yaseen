import React, { useState } from 'react';
import { SURAH_YASEEN_OVERVIEW } from '../data/surahOverview';
import { BookOpen, X, Heart, Shield, Compass, Sparkles } from 'lucide-react';

interface SurahOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToRuku?: (rukuNum: number) => void;
}

export const SurahOverviewModal: React.FC<SurahOverviewModalProps> = ({
  isOpen,
  onClose,
  onJumpToRuku,
}) => {
  const [activeTab, setActiveTab] = useState<'virtues' | 'rukus'>('virtues');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400 fill-current" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              About Surah Yaseen · فضائل و رکوعات
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 gap-2 bg-slate-50/30 dark:bg-slate-850">
          <button
            onClick={() => setActiveTab('virtues')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'virtues'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            فضائل و احادیث مبارکہ (Virtues & Hadith)
          </button>
          <button
            onClick={() => setActiveTab('rukus')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'rukus'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            پانچ رکوعات کا خلاصہ (5 Rukus Overview)
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'virtues' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                  قلب القرآن (The Heart of the Quran)
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Surah Yaseen contains the core pillars of Islamic Iman: Tawheed (Oneness of Allah), Risalah (Truth of Prophethood), and Akhirah (Resurrection and Judgment).
                </p>
              </div>

              {SURAH_YASEEN_OVERVIEW.virtues.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2 shadow-2xs"
                >
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    {v.titleUr}
                  </h5>

                  {v.hadithAr && (
                    <p className="font-amiri text-lg text-emerald-800 dark:text-emerald-300 text-right py-1 leading-loose" dir="rtl">
                      "{v.hadithAr}"
                    </p>
                  )}

                  <p className="font-urdu text-sm text-slate-700 dark:text-slate-300 leading-relaxed" dir="rtl">
                    {v.hadithUr}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    {v.hadithEn}
                  </p>

                  <span className="inline-block text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    حوالہ: {v.source}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Surah Yaseen is structured into 5 Rukus (thematic sections). Tap any Ruku to jump directly to its opening verse:
              </p>

              {SURAH_YASEEN_OVERVIEW.rukus.map((r) => (
                <div
                  key={r.rukuNumber}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                        Ruku {r.rukuNumber}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {r.ayahRange}
                      </span>
                    </div>

                    {onJumpToRuku && (
                      <button
                        onClick={() => {
                          onJumpToRuku(r.rukuNumber);
                          onClose();
                        }}
                        className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        Jump to Ayahs →
                      </button>
                    )}
                  </div>

                  <h5 className="text-sm font-bold text-slate-900 dark:text-white" dir="rtl">
                    {r.titleUr}
                  </h5>

                  <p className="font-urdu text-sm text-slate-700 dark:text-slate-300 leading-relaxed" dir="rtl">
                    {r.summaryUr}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {r.summaryEn}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {r.keyThemes.map((theme, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
