import React from 'react';
import { Ayah } from '../types';

interface MushafViewProps {
  ayahs: Ayah[];
  activeAyahNumber: number;
  arabicFontSize: number;
  arabicFontFamily: 'amiri' | 'scheherazade';
  onSelectAyah: (ayahNum: number) => void;
  showTajweed: boolean;
}

export const MushafView: React.FC<MushafViewProps> = ({
  ayahs,
  activeAyahNumber,
  arabicFontSize,
  arabicFontFamily,
  onSelectAyah,
  showTajweed,
}) => {
  const fontClass = arabicFontFamily === 'scheherazade' ? 'font-scheherazade' : 'font-amiri';

  return (
    <div className="bg-[#fffef8] dark:bg-slate-900 rounded-3xl border-2 border-emerald-900/10 dark:border-slate-800 p-6 md:p-10 shadow-lg space-y-6">
      {/* Ornate Mushaf Surah Header Ribbon */}
      <div className="relative overflow-hidden rounded-2xl bg-radial from-emerald-800 to-emerald-950 text-white p-5 text-center border-2 border-amber-400/60 shadow-md">
        <div className="flex items-center justify-between text-xs text-amber-200/90 font-medium px-4">
          <span>آياتها ٨٣ (83 Verses)</span>
          <span className="font-amiri text-2xl font-bold text-white">سُورَةُ يسٓ</span>
          <span>مَكِّيَّةٌ (Makki)</span>
        </div>
      </div>

      {/* Bismillah Calligraphy */}
      <div className="text-center py-4 border-b border-amber-200/40 dark:border-slate-800">
        <p className="font-amiri text-3xl md:text-4xl text-emerald-900 dark:text-emerald-200 leading-loose" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      {/* Continuous Quranic Arabic Text Flow */}
      <div
        className="text-justify leading-[2.6] md:leading-[2.9] select-text py-2"
        dir="rtl"
        style={{ textAlignLast: 'center' }}
      >
        {ayahs.map((ayah) => {
          const isActive = activeAyahNumber === ayah.number;

          return (
            <span
              key={ayah.number}
              id={`mushaf-ayah-${ayah.number}`}
              onClick={() => onSelectAyah(ayah.number)}
              className={`inline transition-colors rounded-md px-1 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-950/60 ${
                isActive
                  ? 'bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 font-bold'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {ayah.words.map((w) => (
                <span
                  key={w.id}
                  className={`${fontClass} px-0.5 ${
                    showTajweed && w.tajweedRule ? `tajweed-${w.tajweedRule}` : ''
                  }`}
                  style={{ fontSize: `${arabicFontSize + 4}px` }}
                >
                  {w.arabic}{' '}
                </span>
              ))}

              {/* Ornate End of Verse Marker ۝ */}
              <span
                className="inline-flex items-center justify-center font-amiri font-bold text-emerald-700 dark:text-emerald-400 mx-1 text-xl select-none"
                title={`Ayah ${ayah.number}`}
              >
                ۝{ayah.number}
              </span>
            </span>
          );
        })}
      </div>

      {/* Mushaf Footer Note */}
      <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
        Tap on any verse to listen, view grammar analysis, or read word-by-word translation.
      </div>
    </div>
  );
};
