import React, { useState } from 'react';
import { X, RotateCcw, Sparkles, Check, Volume2 } from 'lucide-react';

interface TasbihModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_DHIKR = [
  { ar: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ', ur: 'درود شریف', en: 'Durood Sharif', target: 100 },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', ur: 'تسبیح و حمد', en: 'SubhanAllah wa Bihamdihi', target: 33 },
  { ar: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ', ur: 'استغفار', en: 'Astaghfirullah', target: 100 },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', ur: 'کلمہ توحید', en: 'Tawheed', target: 100 },
  { ar: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ', ur: 'آیت 58 (قلب یاسین)', en: 'Ayah 58 (Heart of Yaseen)', target: 313 },
];

export const TasbihModal: React.FC<TasbihModalProps> = ({ isOpen, onClose }) => {
  const [selectedDhikr, setSelectedDhikr] = useState(PRESET_DHIKR[0]);
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(100);
  const [completedRounds, setCompletedRounds] = useState<number>(0);

  if (!isOpen) return null;

  const handleTap = () => {
    // Subtle vibration on mobile devices
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {}
    }

    const nextCount = count + 1;
    if (nextCount >= target) {
      setCount(0);
      setCompletedRounds((prev) => prev + 1);
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate([40, 80, 40]);
        } catch {}
      }
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedRounds(0);
  };

  const handleSelectDhikr = (d: typeof PRESET_DHIKR[0]) => {
    setSelectedDhikr(d);
    setTarget(d.target);
    setCount(0);
    setCompletedRounds(0);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
              📿
            </span>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Digital Tasbih Counter (تسبیح کاؤنٹر)
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
        <div className="p-6 space-y-5 flex flex-col items-center">
          {/* Preset Dhikr Selector */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1">
            {PRESET_DHIKR.map((d, i) => (
              <button
                key={i}
                onClick={() => handleSelectDhikr(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                  selectedDhikr.en === d.en
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {d.ur} ({d.target})
              </button>
            ))}
          </div>

          {/* Active Dhikr Display */}
          <div className="w-full text-center p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 space-y-1">
            <p className="font-amiri text-lg md:text-xl font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed" dir="rtl">
              {selectedDhikr.ar}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {selectedDhikr.en} · Target: {target}
            </p>
          </div>

          {/* Circular Tasbih Counter Button */}
          <div className="relative flex items-center justify-center py-2">
            {/* SVG Ring Progress */}
            <svg className="w-48 h-48 -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-200 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 84}
                strokeDashoffset={2 * Math.PI * 84 * (1 - count / target)}
                strokeLinecap="round"
                className="text-emerald-600 dark:text-emerald-400 transition-all duration-200"
                fill="transparent"
              />
            </svg>

            {/* Tap Button Inside Ring */}
            <button
              onClick={handleTap}
              className="absolute w-36 h-36 rounded-full bg-radial from-emerald-600 to-emerald-800 text-white shadow-xl hover:shadow-2xl active:scale-92 transition-all flex flex-col items-center justify-center cursor-pointer select-none"
            >
              <span className="text-4xl font-extrabold font-mono tracking-tight">
                {count}
              </span>
              <span className="text-[11px] font-semibold text-emerald-200/90 tracking-wider uppercase mt-1">
                TAP TO COUNT
              </span>
            </button>
          </div>

          {/* Stats Bar & Reset */}
          <div className="w-full flex items-center justify-between px-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span>Completed Rounds: </span>
              <strong className="text-emerald-700 dark:text-emerald-400">{completedRounds}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
