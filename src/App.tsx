/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Ayah, QuranWord, Bookmark, TadabburNote, ThemeMode } from './types';
import {
  SURAH_YASEEN_AYAHS,
  normalizeArabic,
} from './data/surahYaseen';
import { TopNav } from './components/TopNav';
import { AyahCard } from './components/AyahCard';
import { AudioPlayer } from './components/AudioPlayer';
import { WordGrammarModal } from './components/WordGrammarModal';
import { TajweedGuideModal } from './components/TajweedGuideModal';
import { HifzMemorizeModal } from './components/HifzMemorizeModal';
import { SurahOverviewModal } from './components/SurahOverviewModal';
import { BookmarksNotesDrawer } from './components/BookmarksNotesDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';
import { NoteModal } from './components/NoteModal';
import { InstallAppModal } from './components/InstallAppModal';
import { SplashScreen } from './components/SplashScreen';
import { TasbihModal } from './components/TasbihModal';
import { MushafView } from './components/MushafView';
import { usePWAInstall } from './hooks/usePWAInstall';
import {
  Search,
  X,
  BookOpen,
  Sparkles,
  Brain,
  Heart,
  Sliders,
  Bookmark as BookmarkIcon,
  Compass,
  CheckCircle2,
  Volume2,
  Download,
} from 'lucide-react';

export default function App() {
  const { isInstalled } = usePWAInstall();

  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('yaseen_theme') as ThemeMode) || 'light';
  });

  // Reading preferences
  const [arabicFontSize, setArabicFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('yaseen_arabic_font_size')) || 32;
  });
  const [translationFontSize, setTranslationFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('yaseen_trans_font_size')) || 16;
  });
  const [arabicFontFamily, setArabicFontFamily] = useState<'amiri' | 'scheherazade'>(() => {
    return (localStorage.getItem('yaseen_font_family') as any) || 'amiri';
  });
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [showWordByWord, setShowWordByWord] = useState<boolean>(false);
  const [showTajweed, setShowTajweed] = useState<boolean>(true);
  const [urduTranslator, setUrduTranslator] = useState<'jalandhry' | 'kanzuliman'>('jalandhry');
  const [englishTranslator, setEnglishTranslator] = useState<'sahih' | 'usmani'>('sahih');

  // Audio & playback state
  const [activeAyahNumber, setActiveAyahNumber] = useState<number>(() => {
    return Number(localStorage.getItem('yaseen_last_read')) || 1;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRuku, setSelectedRuku] = useState<number | 'all'>('all');

  // Bookmarks & Notes state
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('yaseen_bookmarks');
      return saved ? JSON.parse(saved) : [{ ayahNumber: 1, addedAt: Date.now() }];
    } catch {
      return [{ ayahNumber: 1, addedAt: Date.now() }];
    }
  });

  const [notes, setNotes] = useState<TadabburNote[]>(() => {
    try {
      const saved = localStorage.getItem('yaseen_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & New Features state
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash screen on launch
    return true;
  });
  const [readingMode, setReadingMode] = useState<'study' | 'mushaf'>('study');
  const [isTasbihOpen, setIsTasbihOpen] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<{ word: QuranWord; ayahNum: number } | null>(null);
  const [isTajweedOpen, setIsTajweedOpen] = useState<boolean>(false);
  const [isHifzOpen, setIsHifzOpen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [noteAyahTarget, setNoteAyahTarget] = useState<number | null>(null);

  // Sync theme to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
    localStorage.setItem('yaseen_theme', theme);
  }, [theme]);

  // Persist font settings
  useEffect(() => {
    localStorage.setItem('yaseen_arabic_font_size', String(arabicFontSize));
  }, [arabicFontSize]);

  useEffect(() => {
    localStorage.setItem('yaseen_trans_font_size', String(translationFontSize));
  }, [translationFontSize]);

  useEffect(() => {
    localStorage.setItem('yaseen_font_family', arabicFontFamily);
  }, [arabicFontFamily]);

  // Persist bookmarks & notes & last read
  useEffect(() => {
    localStorage.setItem('yaseen_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('yaseen_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('yaseen_last_read', String(activeAyahNumber));
  }, [activeAyahNumber]);

  // Auto-scroll handler
  useEffect(() => {
    if (!autoScroll) return;
    const element = document.getElementById(`ayah-${activeAyahNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeAyahNumber, autoScroll]);

  // Bookmarks handlers
  const handleToggleBookmark = (ayahNum: number) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.ayahNumber === ayahNum);
      if (exists) {
        return prev.filter((b) => b.ayahNumber !== ayahNum);
      } else {
        return [...prev, { ayahNumber: ayahNum, addedAt: Date.now() }];
      }
    });
  };

  const handleSaveNote = (ayahNum: number, text: string) => {
    if (!text.trim()) {
      setNotes((prev) => prev.filter((n) => n.ayahNumber !== ayahNum));
      return;
    }
    setNotes((prev) => {
      const filtered = prev.filter((n) => n.ayahNumber !== ayahNum);
      return [...filtered, { ayahNumber: ayahNum, note: text.trim(), updatedAt: Date.now() }];
    });
  };

  const handleDeleteNote = (ayahNum: number) => {
    setNotes((prev) => prev.filter((n) => n.ayahNumber !== ayahNum));
  };

  // Filtered Ayahs based on search query & selected Ruku
  const filteredAyahs = useMemo(() => {
    let list = SURAH_YASEEN_AYAHS;

    // Filter by Ruku
    if (selectedRuku !== 'all') {
      list = list.filter((a) => a.ruku === selectedRuku);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      const normalizedQuery = normalizeArabic(query);

      list = list.filter((a) => {
        // Match Ayah number (e.g. "36" or "12")
        if (String(a.number) === query) return true;

        // Match Normalized Arabic
        const normalizedAyahArabic = normalizeArabic(a.arabic);
        if (normalizedAyahArabic.includes(normalizedQuery)) return true;

        // Match Urdu
        if (a.translation.ur.toLowerCase().includes(query)) return true;
        if (a.translation.urAlt.toLowerCase().includes(query)) return true;

        // Match English
        if (a.translation.en.toLowerCase().includes(query)) return true;
        if (a.translation.enAlt.toLowerCase().includes(query)) return true;

        // Match Transliteration
        if (a.transliteration.toLowerCase().includes(query)) return true;

        // Match Root or Grammar in words
        const matchesWord = a.words.some(
          (w) =>
            w.grammar.root?.includes(query) ||
            w.translation.ur.includes(query) ||
            w.translation.en.toLowerCase().includes(query)
        );
        if (matchesWord) return true;

        return false;
      });
    }

    return list;
  }, [searchQuery, selectedRuku]);

  return (
    <div className="min-h-screen flex flex-col font-app bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-28">
      {/* Top Bar Navigation */}
      <TopNav
        onOpenTajweed={() => setIsTajweedOpen(true)}
        onOpenHifz={() => setIsHifzOpen(true)}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenTasbih={() => setIsTasbihOpen(true)}
        bookmarksCount={bookmarks.length}
      />

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 w-full pt-6 md:pt-8 space-y-6">
        {/* Hero Surah Header Card */}
        <section className="relative overflow-hidden rounded-3xl bg-radial from-emerald-800 to-emerald-950 text-white p-6 md:p-8 shadow-xl border border-emerald-700/50">
          {/* Subtle Islamic Motif Background */}
          <div className="absolute -right-8 -top-8 w-48 h-48 opacity-10 pointer-events-none font-amiri text-[160px] select-none text-emerald-200">
            يس
          </div>

          <div className="relative z-10 text-center space-y-3">
            {/* Bismillah calligraphy */}
            <p className="font-amiri text-2xl md:text-3xl text-emerald-200 leading-relaxed" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-amiri text-white">
              سُورَةُ يسٓ
            </h1>

            <p className="text-xs md:text-sm text-emerald-100/90 max-w-lg mx-auto">
              Surah Yaseen · The Heart of the Quran (قلب القرآن) · Makki Revelation
            </p>

            {/* Quick Metadata Strip (Zero-Pill Discipline) */}
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-200/90 pt-1">
              <span>83 Verses</span>
              <span aria-hidden="true">·</span>
              <span>5 Rukus</span>
              <span aria-hidden="true">·</span>
              <span>Word-by-Word Grammar</span>
              <span aria-hidden="true">·</span>
              <span>Audio Recitation</span>
            </div>

            {/* Interactive Feature Shortcuts Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              <button
                onClick={() => setShowWordByWord(!showWordByWord)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  showWordByWord
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Word-by-Word: {showWordByWord ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setIsTajweedOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Tajweed Rules
              </button>

              <button
                onClick={() => setIsHifzOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5 text-sky-300" />
                Hifz & Quiz Test
              </button>

              <button
                onClick={() => setIsOverviewOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-300" />
                Virtues & Themes
              </button>

              <button
                onClick={() => setIsTasbihOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <span className="text-xs">📿</span>
                Digital Tasbih
              </button>

              {!isInstalled && (
                <button
                  onClick={() => setIsInstallModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Install App
                </button>
              )}
            </div>

            {/* Reading Mode Switcher (Study Mode vs Mushaf Page) */}
            <div className="pt-2 flex items-center justify-center">
              <div className="bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/50 flex items-center gap-1 text-xs font-semibold">
                <button
                  onClick={() => setReadingMode('study')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    readingMode === 'study'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Study Mode (ترجمہ و قواعد)
                </button>

                <button
                  onClick={() => setReadingMode('mushaf')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    readingMode === 'mushaf'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Mushaf Mode (مسلسل تلاوت)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mode Content: Either Mushaf Mode or Study Mode */}
        {readingMode === 'mushaf' ? (
          <MushafView
            ayahs={SURAH_YASEEN_AYAHS}
            activeAyahNumber={activeAyahNumber}
            arabicFontSize={arabicFontSize}
            arabicFontFamily={arabicFontFamily}
            onSelectAyah={(num) => {
              setActiveAyahNumber(num);
              setIsPlaying(true);
            }}
            showTajweed={showTajweed}
          />
        ) : (
          <>
            {/* Search & Navigation Bar */}
            <section id="verses" className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Arabic, Urdu translation, English, or Ayah number (e.g. 'wisdom', '36')..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Ruku Selector Tabs (Segmented Control) */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedRuku('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                    selectedRuku === 'all'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All Verses (83)
                </button>
                {[1, 2, 3, 4, 5].map((rukuNum) => (
                  <button
                    key={rukuNum}
                    onClick={() => setSelectedRuku(rukuNum)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                      selectedRuku === rukuNum
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Ruku {rukuNum}
                  </button>
                ))}
              </div>

              {/* Result Count Status */}
              {searchQuery && (
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                  <span>Found {filteredAyahs.length} matching verses</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </section>

            {/* Verses List */}
            <section className="space-y-4">
              {filteredAyahs.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                  <Search className="w-10 h-10 mx-auto text-slate-400" />
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    No verses found matching "{searchQuery}"
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Try searching for words like "قلب", "رسول", "حکمت", "رحمت", or enter any verse number from 1 to 83.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition"
                  >
                    Show All Verses
                  </button>
                </div>
              ) : (
                filteredAyahs.map((ayah) => {
                  const isBookmarked = bookmarks.some((b) => b.ayahNumber === ayah.number);
                  const noteItem = notes.find((n) => n.ayahNumber === ayah.number);

                  return (
                    <AyahCard
                      key={ayah.number}
                      ayah={ayah}
                      isActive={activeAyahNumber === ayah.number}
                      isPlaying={isPlaying}
                      isBookmarked={isBookmarked}
                      hasNote={!!noteItem}
                      arabicFontSize={arabicFontSize}
                      translationFontSize={translationFontSize}
                      arabicFontFamily={arabicFontFamily}
                      showUrdu={showUrdu}
                      showEnglish={showEnglish}
                      showWordByWord={showWordByWord}
                      showTajweed={showTajweed}
                      urduTranslator={urduTranslator}
                      englishTranslator={englishTranslator}
                      onPlayAyah={(num) => {
                        if (activeAyahNumber === num && isPlaying) {
                          setIsPlaying(false);
                        } else {
                          setActiveAyahNumber(num);
                          setIsPlaying(true);
                        }
                      }}
                      onToggleBookmark={handleToggleBookmark}
                      onOpenNoteModal={(num) => setNoteAyahTarget(num)}
                      onSelectWord={(word, ayahNum) => setSelectedWord({ word, ayahNum })}
                    />
                  );
                })
              )}
            </section>
          </>
        )}
      </main>

      {/* Sticky Bottom Audio Player */}
      <AudioPlayer
        currentAyahNumber={activeAyahNumber}
        onAyahChange={(newNum) => setActiveAyahNumber(newNum)}
        isPlaying={isPlaying}
        onPlayPauseToggle={(playing) => setIsPlaying(playing)}
        autoScroll={autoScroll}
        onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
      />

      {/* Word-by-Word & Grammar Modal */}
      <WordGrammarModal
        word={selectedWord?.word || null}
        ayahNumber={selectedWord?.ayahNum}
        onClose={() => setSelectedWord(null)}
      />

      {/* Tajweed Guide Modal */}
      <TajweedGuideModal
        isOpen={isTajweedOpen}
        onClose={() => setIsTajweedOpen(false)}
      />

      {/* Hifz & Quiz Test Modal */}
      <HifzMemorizeModal
        isOpen={isHifzOpen}
        onClose={() => setIsHifzOpen(false)}
        currentAyahNumber={activeAyahNumber}
        onPlayAyahAudio={(num) => {
          setActiveAyahNumber(num);
          setIsPlaying(true);
        }}
      />

      {/* Surah Overview (Virtues & Rukus) Modal */}
      <SurahOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        onJumpToRuku={(rukuNum) => {
          setSelectedRuku(rukuNum);
          const firstAyah = SURAH_YASEEN_AYAHS.find((a) => a.ruku === rukuNum);
          if (firstAyah) {
            setActiveAyahNumber(firstAyah.number);
          }
        }}
      />

      {/* Bookmarks & Notes Drawer */}
      <BookmarksNotesDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        notes={notes}
        onRemoveBookmark={(num) => handleToggleBookmark(num)}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
        onJumpToAyah={(num) => {
          setSelectedRuku('all');
          setActiveAyahNumber(num);
        }}
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        arabicFontSize={arabicFontSize}
        onArabicFontSizeChange={(size) => setArabicFontSize(size)}
        translationFontSize={translationFontSize}
        onTranslationFontSizeChange={(size) => setTranslationFontSize(size)}
        arabicFontFamily={arabicFontFamily}
        onArabicFontFamilyChange={(f) => setArabicFontFamily(f)}
        showUrdu={showUrdu}
        onToggleShowUrdu={() => setShowUrdu(!showUrdu)}
        showEnglish={showEnglish}
        onToggleShowEnglish={() => setShowEnglish(!showEnglish)}
        showWordByWord={showWordByWord}
        onToggleShowWordByWord={() => setShowWordByWord(!showWordByWord)}
        showTajweed={showTajweed}
        onToggleShowTajweed={() => setShowTajweed(!showTajweed)}
        urduTranslator={urduTranslator}
        onUrduTranslatorChange={(t) => setUrduTranslator(t)}
        englishTranslator={englishTranslator}
        onEnglishTranslatorChange={(t) => setEnglishTranslator(t)}
      />

      {/* Tadabbur Note Edit Modal */}
      <NoteModal
        isOpen={noteAyahTarget !== null}
        ayahNumber={noteAyahTarget}
        initialText={notes.find((n) => n.ayahNumber === noteAyahTarget)?.note || ''}
        onClose={() => setNoteAyahTarget(null)}
        onSave={handleSaveNote}
      />

      {/* Install Mobile App Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Digital Tasbih Counter Modal */}
      <TasbihModal
        isOpen={isTasbihOpen}
        onClose={() => setIsTasbihOpen(false)}
      />

      {/* Intro Welcome / Splash Screen */}
      {showSplash && (
        <SplashScreen
          lastReadAyah={activeAyahNumber}
          onEnterApp={(targetNum) => {
            if (targetNum) {
              setActiveAyahNumber(targetNum);
            }
            setShowSplash(false);
          }}
        />
      )}
    </div>
  );
}
