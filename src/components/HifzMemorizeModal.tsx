import React, { useState } from 'react';
import { Ayah } from '../types';
import { SURAH_YASEEN_AYAHS } from '../data/surahYaseen';
import { Brain, Eye, EyeOff, RotateCcw, CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';

interface HifzMemorizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAyahNumber: number;
  onPlayAyahAudio?: (ayahNum: number) => void;
}

export const HifzMemorizeModal: React.FC<HifzMemorizeModalProps> = ({
  isOpen,
  onClose,
  currentAyahNumber,
  onPlayAyahAudio,
}) => {
  const [activeTab, setActiveTab] = useState<'reveal' | 'quiz'>('reveal');
  const [targetAyahIndex, setTargetAyahIndex] = useState<number>(
    Math.max(0, Math.min(SURAH_YASEEN_AYAHS.length - 1, currentAyahNumber - 1))
  );
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Quiz state
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAyah = SURAH_YASEEN_AYAHS[targetAyahIndex];

  // Generate 3 choices for the quiz (the correct next ayah + 2 random ayahs)
  const nextAyah =
    targetAyahIndex < SURAH_YASEEN_AYAHS.length - 1
      ? SURAH_YASEEN_AYAHS[targetAyahIndex + 1]
      : SURAH_YASEEN_AYAHS[0];

  const handleNextAyah = () => {
    if (targetAyahIndex < SURAH_YASEEN_AYAHS.length - 1) {
      setTargetAyahIndex((prev) => prev + 1);
      setIsRevealed(false);
      setIsAnswered(false);
      setSelectedOption(null);
    }
  };

  const handlePrevAyah = () => {
    if (targetAyahIndex > 0) {
      setTargetAyahIndex((prev) => prev - 1);
      setIsRevealed(false);
      setIsAnswered(false);
      setSelectedOption(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Hifz & Memorization Mode
            </h3>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            Exit
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 gap-2 bg-slate-50/30 dark:bg-slate-850">
          <button
            onClick={() => setActiveTab('reveal')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'reveal'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            Hide & Reveal Test
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Next Verse Quiz
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Ayah Navigator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrevAyah}
              disabled={targetAyahIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Ayah
            </button>
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              Surah Yaseen · Ayah {currentAyah.number} / 83 (Ruku {currentAyah.ruku})
            </span>
            <button
              onClick={handleNextAyah}
              disabled={targetAyahIndex === SURAH_YASEEN_AYAHS.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Next Ayah <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeTab === 'reveal' ? (
            /* Mode 1: Hide & Reveal */
            <div className="space-y-6">
              <div className="text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-emerald-50/30 dark:bg-slate-800/40 relative min-h-[160px] flex flex-col justify-center items-center">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-3 block">
                  Recite this verse from memory, then tap below to verify:
                </span>

                <div
                  className={`transition-all duration-300 w-full ${
                    isRevealed
                      ? 'filter-none opacity-100'
                      : 'blur-md select-none opacity-40 cursor-pointer'
                  }`}
                  onClick={() => setIsRevealed(true)}
                >
                  <p className="text-3xl md:text-4xl font-amiri text-slate-900 dark:text-white leading-loose text-center" dir="rtl">
                    {currentAyah.arabic}
                  </p>
                </div>

                {!isRevealed && (
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white shadow-md hover:bg-emerald-800 transition flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" /> Tap to Reveal
                  </button>
                )}
              </div>

              {/* Translation hint (Shown even when blurred to assist memory) */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Urdu Translation Hint
                </span>
                <p className="font-urdu text-base text-slate-800 dark:text-slate-200 leading-relaxed" dir="rtl">
                  {currentAyah.translation.ur}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsRevealed(!isRevealed)}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isRevealed ? 'Hide Again' : 'Reveal Verse'}
                </button>

                {onPlayAyahAudio && (
                  <button
                    onClick={() => onPlayAyahAudio(currentAyah.number)}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition"
                  >
                    Play Recitation
                  </button>
                )}

                <button
                  onClick={handleNextAyah}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition flex items-center gap-1.5"
                >
                  Next Verse <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Mode 2: Next Ayah Quiz */
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-emerald-50/40 dark:bg-slate-800/40 text-center">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-2">
                  Question: What is the very NEXT verse after Ayah {currentAyah.number}?
                </span>
                <p className="text-2xl font-amiri text-slate-900 dark:text-white leading-loose" dir="rtl">
                  {currentAyah.arabic}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Choose the correct next verse:
                </span>

                {/* We create 3 choices: Next ayah, and two distant ayahs */}
                {[
                  nextAyah,
                  SURAH_YASEEN_AYAHS[(targetAyahIndex + 7) % SURAH_YASEEN_AYAHS.length],
                  SURAH_YASEEN_AYAHS[(targetAyahIndex + 19) % SURAH_YASEEN_AYAHS.length],
                ]
                  .sort(() => (currentAyah.number % 2 === 0 ? 1 : -1))
                  .map((opt, idx) => {
                    const isCorrect = opt.number === nextAyah.number;
                    const isChosen = selectedOption === idx;

                    let btnStyle =
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100';
                      } else if (isChosen) {
                        btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-100';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => {
                          setSelectedOption(idx);
                          setIsAnswered(true);
                          setQuizScore((prev) => ({
                            correct: isCorrect ? prev.correct + 1 : prev.correct,
                            total: prev.total + 1,
                          }));
                        }}
                        className={`w-full p-4 rounded-xl border text-right transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex-1" dir="rtl">
                          <p className="text-xl font-amiri text-slate-900 dark:text-white leading-loose">
                            {opt.arabic}
                          </p>
                          <p className="font-urdu text-sm text-slate-600 dark:text-slate-300 mt-1">
                            {opt.translation.ur}
                          </p>
                        </div>
                        {isAnswered && (
                          <div className="shrink-0 mt-1">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : isChosen ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* Quiz Score & Next button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Score: {quizScore.correct} / {quizScore.total} correct
                </span>
                {isAnswered && (
                  <button
                    onClick={handleNextAyah}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition flex items-center gap-1.5"
                  >
                    Continue to Next Ayah <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
