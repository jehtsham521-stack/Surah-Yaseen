import React, { useState } from 'react';
import { Ayah, QuranWord } from '../types';
import {
  Play,
  Pause,
  Bookmark as BookmarkIcon,
  Edit3,
  Copy,
  Check,
  Share2,
  BookOpen,
  Volume2,
} from 'lucide-react';

interface AyahCardProps {
  ayah: Ayah;
  isActive: boolean;
  isPlaying: boolean;
  isBookmarked: boolean;
  hasNote: boolean;
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFamily: 'amiri' | 'scheherazade';
  showUrdu: boolean;
  showEnglish: boolean;
  showWordByWord: boolean;
  showTajweed: boolean;
  urduTranslator: 'jalandhry' | 'kanzuliman';
  englishTranslator: 'sahih' | 'usmani';
  onPlayAyah: (ayahNumber: number) => void;
  onToggleBookmark: (ayahNumber: number) => void;
  onOpenNoteModal: (ayahNumber: number) => void;
  onSelectWord: (word: QuranWord, ayahNum: number) => void;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  isActive,
  isPlaying,
  isBookmarked,
  hasNote,
  arabicFontSize,
  translationFontSize,
  arabicFontFamily,
  showUrdu,
  showEnglish,
  showWordByWord,
  showTajweed,
  urduTranslator,
  englishTranslator,
  onPlayAyah,
  onToggleBookmark,
  onOpenNoteModal,
  onSelectWord,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${ayah.arabic}\n\nUrdu: ${
      urduTranslator === 'kanzuliman' ? ayah.translation.urAlt : ayah.translation.ur
    }\n\nEnglish: ${
      englishTranslator === 'usmani' ? ayah.translation.enAlt : ayah.translation.en
    }\n(Surah Yaseen 36:${ayah.number})`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const urduText =
    urduTranslator === 'kanzuliman' ? ayah.translation.urAlt : ayah.translation.ur;
  const englishText =
    englishTranslator === 'usmani' ? ayah.translation.enAlt : ayah.translation.en;

  const fontClass = arabicFontFamily === 'scheherazade' ? 'font-scheherazade' : 'font-amiri';

  return (
    <div
      id={`ayah-${ayah.number}`}
      className={`p-5 md:p-6 rounded-2xl border transition-all duration-200 card-surface ${
        isActive
          ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-1 ring-emerald-500'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Top Card Header: Badges & Action Buttons */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
        {/* Left: Ayah & Ruku Index */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            {ayah.number}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            36:{ayah.number} · Ruku {ayah.ruku}
          </span>
          {ayah.number === 1 && (
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              · آغاز سورت
            </span>
          )}
          {ayah.number === 58 && (
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
              قلب القرآن
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Play verse audio */}
          <button
            onClick={() => onPlayAyah(ayah.number)}
            className={`p-2 rounded-lg transition ${
              isActive && isPlaying
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Play Audio"
          >
            {isActive && isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(ayah.number)}
            className={`p-2 rounded-lg transition ${
              isBookmarked
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
          >
            <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Note / Reflection */}
          <button
            onClick={() => onOpenNoteModal(ayah.number)}
            className={`p-2 rounded-lg transition ${
              hasNote
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Add Reflection Note (تدبر)"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Copy Verse with Translation"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Arabic Text Area */}
      {showWordByWord ? (
        /* Word-by-Word Interactive Flow (RTL) */
        <div className="flex flex-wrap flex-row-reverse gap-3 items-start justify-start py-3" dir="rtl">
          {ayah.words.map((word) => (
            <div
              key={word.id}
              onClick={() => onSelectWord(word, ayah.number)}
              className="group flex flex-col items-center p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500 dark:hover:border-emerald-400 cursor-pointer transition shadow-2xs hover:shadow-xs active:scale-95"
            >
              {/* Arabic word */}
              <span
                className={`${fontClass} font-bold text-slate-900 dark:text-white leading-relaxed group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors ${
                  showTajweed && word.tajweedRule ? `tajweed-${word.tajweedRule}` : ''
                }`}
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {word.arabic}
              </span>

              {/* Transliteration */}
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-sans mt-0.5">
                {word.transliteration}
              </span>

              {/* Urdu meaning */}
              <span className="font-urdu text-xs text-slate-700 dark:text-slate-200 text-center leading-normal mt-1">
                {word.translation.ur}
              </span>

              {/* Grammar badge */}
              <span className="mt-1 px-1.5 py-0.5 text-[9px] font-semibold rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                {word.grammar.posLabel.ar}
              </span>
            </div>
          ))}

          {/* Ayah End Ornament */}
          <div className="flex items-center justify-center self-center px-2 py-1 text-emerald-700 dark:text-emerald-400 font-bold font-amiri text-lg">
            ۝{ayah.number}
          </div>
        </div>
      ) : (
        /* Traditional Quran Reading Flow (RTL) */
        <div className="py-2" dir="rtl">
          <p
            className={`${fontClass} quran-verse-text text-slate-900 dark:text-white tracking-wide`}
            style={{ fontSize: `${arabicFontSize}px` }}
          >
            {ayah.words.map((w, index) => (
              <span
                key={w.id}
                onClick={() => onSelectWord(w, ayah.number)}
                className={`cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors inline-block px-1 rounded-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/50 ${
                  showTajweed && w.tajweedRule ? `tajweed-${w.tajweedRule}` : ''
                }`}
                title={`Click for grammar: ${w.transliteration} (${w.translation.ur})`}
              >
                {w.arabic}
              </span>
            ))}
            <span className="text-emerald-700 dark:text-emerald-400 inline-block px-2 text-xl font-bold">
              ۝{ayah.number}
            </span>
          </p>
        </div>
      )}

      {/* Translations Area */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        {/* Phonetic Pronunciation Guide */}
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          {ayah.transliteration}
        </p>

        {/* Urdu Translation */}
        {showUrdu && (
          <div className="pt-1">
            <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 block mb-0.5">
              ترجمہ ({urduTranslator === 'kanzuliman' ? 'کنز الایمان' : 'فتح محمد جالندھری'}):
            </span>
            <p
              className="font-urdu text-slate-800 dark:text-slate-100 leading-loose text-right"
              dir="rtl"
              style={{ fontSize: `${translationFontSize + 2}px` }}
            >
              {urduText}
            </p>
          </div>
        )}

        {/* English Translation */}
        {showEnglish && (
          <div className="pt-1">
            <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 block mb-0.5">
              English ({englishTranslator === 'usmani' ? 'Mufti Taqi Usmani' : 'Sahih International'}):
            </span>
            <p
              className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              {englishText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
