import React, { useState } from 'react';
import { Bookmark, TadabburNote } from '../types';
import { SURAH_YASEEN_AYAHS } from '../data/surahYaseen';
import { Bookmark as BookmarkIcon, Edit3, Trash2, X, BookOpen, ExternalLink } from 'lucide-react';

interface BookmarksNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  notes: TadabburNote[];
  onRemoveBookmark: (ayahNum: number) => void;
  onSaveNote: (ayahNum: number, text: string) => void;
  onDeleteNote: (ayahNum: number) => void;
  onJumpToAyah: (ayahNum: number) => void;
}

export const BookmarksNotesDrawer: React.FC<BookmarksNotesDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  notes,
  onRemoveBookmark,
  onSaveNote,
  onDeleteNote,
  onJumpToAyah,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [editingNoteAyah, setEditingNoteAyah] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

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
            <BookmarkIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-current" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Bookmarks & Reflections
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
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookmarkIcon className="w-4 h-4" />
            Saved Verses ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Tadabbur Notes ({notes.length})
          </button>
        </div>

        {/* List Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {activeTab === 'bookmarks' ? (
            bookmarks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <BookmarkIcon className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-medium">No bookmarks saved yet</p>
                <p className="text-xs">Tap the bookmark icon on any ayah card to save it here for fast reading.</p>
              </div>
            ) : (
              bookmarks.map((b) => {
                const ayah = SURAH_YASEEN_AYAHS.find((a) => a.number === b.ayahNumber);
                if (!ayah) return null;

                return (
                  <div
                    key={b.ayahNumber}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-emerald-300 dark:hover:border-emerald-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Surah Yaseen · Ayah {ayah.number} (Ruku {ayah.ruku})
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onJumpToAyah(ayah.number);
                            onClose();
                          }}
                          className="p-1 text-xs text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                          title="Jump to Ayah"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(ayah.number)}
                          className="p-1 text-xs text-slate-400 hover:text-red-500 transition"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="font-amiri text-lg text-slate-900 dark:text-white leading-loose text-right" dir="rtl">
                      {ayah.arabic}
                    </p>

                    <p className="font-urdu text-xs text-slate-600 dark:text-slate-300 line-clamp-2 text-right" dir="rtl">
                      {ayah.translation.ur}
                    </p>
                  </div>
                );
              })
            )
          ) : (
            /* Notes Tab */
            notes.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Edit3 className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-medium">No personal notes yet</p>
                <p className="text-xs">Write your reflections (Tadabbur) on any ayah by tapping the note button on its card.</p>
              </div>
            ) : (
              notes.map((n) => {
                const ayah = SURAH_YASEEN_AYAHS.find((a) => a.number === n.ayahNumber);
                if (!ayah) return null;

                return (
                  <div
                    key={n.ayahNumber}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Reflection on Ayah {ayah.number}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onJumpToAyah(ayah.number);
                            onClose();
                          }}
                          className="p-1 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                          title="Jump to Ayah"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteNote(ayah.number)}
                          className="p-1 text-slate-400 hover:text-red-500 transition"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-800 dark:text-slate-200 p-2.5 rounded-lg bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                      {n.note}
                    </p>
                  </div>
                );
              })
            )
          )}
        </div>
      </div>
    </div>
  );
};
