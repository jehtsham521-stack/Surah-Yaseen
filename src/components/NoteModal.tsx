import React, { useState, useEffect } from 'react';
import { X, Edit3, Save } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  ayahNumber: number | null;
  initialText: string;
  onClose: () => void;
  onSave: (ayahNumber: number, text: string) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  ayahNumber,
  initialText,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(initialText);
  }, [initialText, isOpen]);

  if (!isOpen || ayahNumber === null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(ayahNumber, text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Tadabbur Note · تدبر بر آیت {ayahNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Write down your reflections, spiritual lessons, or reminders for Ayah 36:{ayahNumber}.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="مثلاً: اس آیت میں اللہ تعالیٰ نے قدرت کی نشانیوں پر غور کرنے کا حکم دیا ہے..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Reflection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
