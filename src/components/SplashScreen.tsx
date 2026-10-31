import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, ArrowRight, Play, Heart, Volume2 } from 'lucide-react';

interface SplashScreenProps {
  lastReadAyah: number;
  onEnterApp: (targetAyah?: number) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ lastReadAyah, onEnterApp }) => {
  const [autoDismiss, setAutoDismiss] = useState<boolean>(true);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-radial from-emerald-800 via-emerald-950 to-[#022c22] text-white p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Subtle Islamic Calligraphy Background Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <span className="font-amiri text-[280px] md:text-[420px] font-bold text-emerald-200">
          يس
        </span>
      </div>

      {/* Top Header Badge */}
      <div className="relative z-10 pt-4 text-center">
        <p className="font-amiri text-2xl md:text-3xl text-emerald-200 tracking-wide" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-xs text-emerald-300/80 tracking-widest uppercase mt-1">
          In the Name of Allah, Most Gracious, Most Merciful
        </p>
      </div>

      {/* Central Emblem & Title */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md my-auto space-y-5">
        {/* Ornate Gold & Emerald Medallion */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-radial from-emerald-600 to-emerald-900 border-2 border-amber-400/80 flex items-center justify-center shadow-2xl shadow-emerald-950/80 p-3 transform hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-1.5 rounded-2xl border border-amber-300/40" />
          <span className="font-amiri text-5xl md:text-6xl font-bold text-amber-200 drop-shadow-md">
            يس
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-amiri text-white drop-shadow-sm">
            سُورَةُ يسٓ
          </h1>
          <p className="text-sm font-semibold text-amber-300/90">
            Surah Yaseen · The Heart of the Quran
          </p>
          <p className="text-xs text-emerald-200/80 max-w-xs mx-auto">
            Makki · 83 Verses · 5 Rukus · Authentic Word-by-Word & Tajweed
          </p>
        </div>

        {/* Virtues Quote Strip */}
        <div className="bg-emerald-900/60 backdrop-blur-xs border border-emerald-700/50 rounded-2xl p-3.5 text-center text-xs text-emerald-100/90 shadow-sm max-w-sm">
          <p className="font-amiri text-base text-amber-200 mb-0.5" dir="rtl">
            "إِنَّ لِكُلِّ شَيْءٍ قَلْبًا، وَقَلْبُ الْقُرْآنِ يسٓ"
          </p>
          <p className="text-[11px] text-emerald-200/80 italic">
            "Everything has a heart, and the heart of the Quran is Surah Yaseen." (Tirmidhi)
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="relative z-10 w-full max-w-sm space-y-3 pb-4">
        {lastReadAyah > 1 ? (
          <button
            onClick={() => onEnterApp(lastReadAyah)}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Resume Reading (Ayah {lastReadAyah})</span>
          </button>
        ) : null}

        <button
          onClick={() => onEnterApp(1)}
          className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer ${
            lastReadAyah > 1
              ? 'bg-emerald-900/90 hover:bg-emerald-800 text-white border border-emerald-700/60'
              : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold'
          }`}
        >
          <span>Begin Recitation (آغاز تلاوت)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
