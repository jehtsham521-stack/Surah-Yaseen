import React, { useState } from 'react';
import { TAJWEED_RULES, TajweedRuleInfo } from '../data/tajweedRules';
import { BookOpen, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface TajweedGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TajweedGuideModal: React.FC<TajweedGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRule, setSelectedRule] = useState<TajweedRuleInfo>(TAJWEED_RULES[0]);

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
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Tajweed & Pronunciation Guide (احکامِ تجوید و تلفظ)
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

        {/* Rule Selector Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          {TAJWEED_RULES.map((rule) => {
            const isSelected = selectedRule.id === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: rule.hexColor }}
                />
                {rule.nameUr}
              </button>
            );
          })}
        </div>

        {/* Rule Detail Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Title Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold font-amiri text-slate-900 dark:text-white" dir="rtl">
                {selectedRule.nameAr}
              </span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${selectedRule.badgeBg}`}>
                {selectedRule.nameEn}
              </span>
            </div>
            <p className="font-urdu text-base text-slate-800 dark:text-slate-200 leading-relaxed" dir="rtl">
              {selectedRule.descriptionUr}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
              {selectedRule.descriptionEn}
            </p>
          </div>

          {/* Rule Letters */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              اس قاعدے کے حروف (Letters)
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedRule.letters.map((letter, idx) => (
                <span
                  key={idx}
                  className="w-10 h-10 flex items-center justify-center rounded-lg font-amiri text-xl font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Instructions in Urdu & English */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              ادائیگی کا صحیح طریقہ (How to Pronounce Correctly)
            </span>
            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
              <p className="font-urdu text-base text-slate-800 dark:text-slate-200 leading-loose" dir="rtl">
                {selectedRule.rulesExplanationUr}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {selectedRule.rulesExplanationEn}
              </p>
            </div>
          </div>

          {/* Example in Surah Yaseen */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">مثال سورۃ یٰسٓ سے (Example from Surah Yaseen)</span>
              <span>{selectedRule.exampleAyah.surahAyah}</span>
            </div>
            <p className="text-2xl font-amiri text-center py-2 text-slate-900 dark:text-white" dir="rtl">
              {selectedRule.exampleAyah.ar}
            </p>
            <p className="text-center text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              محل تجوید: {selectedRule.exampleAyah.word}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Colored Tajweed rules can be toggled on/off in settings</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
