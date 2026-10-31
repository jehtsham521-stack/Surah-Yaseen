import React from 'react';
import { ThemeMode } from '../types';
import { Sliders, X, Sun, Moon, BookOpen, Type, Sparkles, Check } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  arabicFontSize: number;
  onArabicFontSizeChange: (size: number) => void;
  translationFontSize: number;
  onTranslationFontSizeChange: (size: number) => void;
  arabicFontFamily: 'amiri' | 'scheherazade';
  onArabicFontFamilyChange: (font: 'amiri' | 'scheherazade') => void;
  showUrdu: boolean;
  onToggleShowUrdu: () => void;
  showEnglish: boolean;
  onToggleShowEnglish: () => void;
  showWordByWord: boolean;
  onToggleShowWordByWord: () => void;
  showTajweed: boolean;
  onToggleShowTajweed: () => void;
  urduTranslator: 'jalandhry' | 'kanzuliman';
  onUrduTranslatorChange: (trans: 'jalandhry' | 'kanzuliman') => void;
  englishTranslator: 'sahih' | 'usmani';
  onEnglishTranslatorChange: (trans: 'sahih' | 'usmani') => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  arabicFontSize,
  onArabicFontSizeChange,
  translationFontSize,
  onTranslationFontSizeChange,
  arabicFontFamily,
  onArabicFontFamilyChange,
  showUrdu,
  onToggleShowUrdu,
  showEnglish,
  onToggleShowEnglish,
  showWordByWord,
  onToggleShowWordByWord,
  showTajweed,
  onToggleShowTajweed,
  urduTranslator,
  onUrduTranslatorChange,
  englishTranslator,
  onEnglishTranslatorChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Reading Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Theme Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Color Theme (تھیم)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onThemeChange('light')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  theme === 'light'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" /> Light
              </button>
              <button
                onClick={() => onThemeChange('sepia')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  theme === 'sepia'
                    ? 'border-amber-700 bg-amber-100 text-amber-950'
                    : 'border-slate-200 dark:border-slate-700 bg-[#fbf7ee] text-amber-950'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-700" /> Sepia Mushaf
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  theme === 'dark'
                    ? 'border-emerald-500 bg-slate-800 text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-300'
                }`}
              >
                <Moon className="w-4 h-4 text-emerald-400" /> Dark Night
              </button>
            </div>
          </div>

          {/* Arabic Font Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Arabic Font Style (خط قرآن)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onArabicFontFamilyChange('amiri')}
                className={`p-3 rounded-xl border text-center transition ${
                  arabicFontFamily === 'amiri'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="font-amiri text-xl block mb-1">يسٓ وَالْقُرْآنِ</span>
                <span className="text-xs font-medium">Amiri Quran (شاہی)</span>
              </button>
              <button
                onClick={() => onArabicFontFamilyChange('scheherazade')}
                className={`p-3 rounded-xl border text-center transition ${
                  arabicFontFamily === 'scheherazade'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="font-scheherazade text-xl block mb-1">يسٓ وَالْقُرْآنِ</span>
                <span className="text-xs font-medium">Scheherazade (شہرزاد)</span>
              </button>
            </div>
          </div>

          {/* Arabic Font Size Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Arabic Font Size (عربی خط کا حجم)
              </label>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {arabicFontSize}px
              </span>
            </div>
            <input
              type="range"
              min="24"
              max="48"
              step="2"
              value={arabicFontSize}
              onChange={(e) => onArabicFontSizeChange(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Translation Font Size Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Translation Font Size (ترجمہ کا حجم)
              </label>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {translationFontSize}px
              </span>
            </div>
            <input
              type="range"
              min="13"
              max="22"
              step="1"
              value={translationFontSize}
              onChange={(e) => onTranslationFontSizeChange(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Display Content Toggles (نمائش کے اختیارات)
            </label>

            {/* Word by word inline */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Inline Word-by-Word (لفظ بہ لفظ ترجمہ)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Show meanings under each Arabic word
                </p>
              </div>
              <input
                type="checkbox"
                checked={showWordByWord}
                onChange={onToggleShowWordByWord}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </div>

            {/* Tajweed color coding */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Tajweed Color Highlights (تجوید رنگین حروف)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Highlight Ghunnah, Ikhfa, Qalqalah, Madd
                </p>
              </div>
              <input
                type="checkbox"
                checked={showTajweed}
                onChange={onToggleShowTajweed}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </div>

            {/* Urdu translation */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Urdu Translation (اردو ترجمہ)
                </p>
              </div>
              <input
                type="checkbox"
                checked={showUrdu}
                onChange={onToggleShowUrdu}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </div>

            {/* English translation */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  English Translation (انگریزی ترجمہ)
                </p>
              </div>
              <input
                type="checkbox"
                checked={showEnglish}
                onChange={onToggleShowEnglish}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
            </div>
          </div>

          {/* Translator Choice */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Translators (مترجمین)
            </label>

            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                Urdu Translator:
              </span>
              <select
                value={urduTranslator}
                onChange={(e) => onUrduTranslatorChange(e.target.value as any)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
              >
                <option value="jalandhry">فتح محمد جالندھری (Fateh Muhammad Jalandhry)</option>
                <option value="kanzuliman">احمد رضا خان - کنز الایمان (Ahmed Raza Khan)</option>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                English Translator:
              </span>
              <select
                value={englishTranslator}
                onChange={(e) => onEnglishTranslatorChange(e.target.value as any)}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
              >
                <option value="sahih">Sahih International</option>
                <option value="usmani">Mufti Taqi Usmani</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
