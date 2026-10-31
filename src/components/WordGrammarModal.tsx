import React from 'react';
import { QuranWord } from '../types';
import { BookOpen, X, Sparkles, Hash, Layers, ShieldCheck } from 'lucide-react';

interface WordGrammarModalProps {
  word: QuranWord | null;
  ayahNumber?: number;
  onClose: () => void;
  onPlayPronunciation?: (wordText: string) => void;
}

export const WordGrammarModal: React.FC<WordGrammarModalProps> = ({
  word,
  ayahNumber,
  onClose,
}) => {
  if (!word) return null;

  const posColor =
    word.grammar.pos === 'fil'
      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
      : word.grammar.pos === 'ism'
      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
      : 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Word Analysis & Grammar (قواعد و لغت)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Word Display */}
          <div className="text-center py-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-4xl md:text-5xl font-amiri text-emerald-950 dark:text-emerald-100 mb-2 leading-relaxed" dir="rtl">
              {word.arabic}
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {word.transliteration} {ayahNumber && <span className="text-xs text-emerald-700 dark:text-emerald-400">· Ayah 36:{ayahNumber}</span>}
            </p>
          </div>

          {/* Meaning Cards (Urdu & English) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                لفظی ترجمہ (Urdu)
              </span>
              <p className="font-urdu text-lg text-slate-800 dark:text-slate-100" dir="rtl">
                {word.translation.ur}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                English Meaning
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {word.translation.en}
              </p>
            </div>
          </div>

          {/* Grammatical Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              صرف و نحو (Quranic Morphology & Syntax)
            </h4>

            {/* Part of Speech */}
            <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-850 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">حرف کی قسم (Part of Speech)</span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${posColor}`}>
                {word.grammar.posLabel.ar} · {word.grammar.posLabel.ur} ({word.grammar.posLabel.en})
              </span>
            </div>

            {/* Root Letters */}
            {word.grammar.root && (
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-slate-400" />
                  الجذر (Root Letters)
                </span>
                <span className="text-base font-bold font-amiri text-emerald-700 dark:text-emerald-300 tracking-widest" dir="rtl">
                  {word.grammar.root}
                </span>
              </div>
            )}

            {/* Subtype / Form */}
            {(word.grammar.subType || word.grammar.subTypeUr) && (
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  صیغہ و باب (Form / Verb Type)
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 text-right">
                  {word.grammar.subTypeUr || word.grammar.subType}
                </span>
              </div>
            )}

            {/* I'rab / Grammatical Case */}
            {(word.grammar.irab || word.grammar.irabUr) && (
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  اعراب (Grammatical State)
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 text-right">
                  {word.grammar.irabUr || word.grammar.irab}
                </span>
              </div>
            )}

            {/* Detailed Notes */}
            {(word.grammar.notesUr || word.grammar.notes) && (
              <div className="p-3.5 rounded-lg bg-emerald-50/40 dark:bg-slate-800/40 border border-emerald-100 dark:border-slate-800 text-xs space-y-1.5">
                {word.grammar.notesUr && (
                  <p className="font-urdu text-sm text-slate-700 dark:text-slate-300 leading-relaxed" dir="rtl">
                    {word.grammar.notesUr}
                  </p>
                )}
                {word.grammar.notes && (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    {word.grammar.notes}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
