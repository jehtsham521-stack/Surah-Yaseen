export type PartOfSpeech = 'ism' | 'fil' | 'harf';

export interface WordGrammar {
  pos: PartOfSpeech;
  posLabel: {
    en: string;
    ur: string;
    ar: string;
  };
  subType?: string; // e.g., 'Past tense verb (Fi\'l Madi)', 'Active Participle (Ism Fa\'il)'
  subTypeUr?: string;
  root?: string; // e.g., 'ق-و-ل'
  form?: string; // e.g. Form I, Form II
  irab?: string; // Grammatical state (Marfoo', Mansoob, Majroor)
  irabUr?: string;
  notes?: string;
  notesUr?: string;
}

export interface QuranWord {
  id: string; // e.g. '36:1:1'
  position: number;
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    ur: string;
  };
  grammar: WordGrammar;
  tajweedRule?: 'ghunnah' | 'ikhfa' | 'idgham' | 'qalqalah' | 'madd' | 'none';
}

export interface Ayah {
  number: number; // 1 to 83
  globalNumber: number; // in Quran (starts at 3706 for 36:1)
  ruku: number; // 1 to 5
  arabic: string;
  transliteration: string;
  translation: {
    ur: string; // Fateh Muhammad Jalandhry
    urAlt: string; // Ahmed Raza Khan (Kanzul Iman)
    en: string; // Sahih International
    enAlt: string; // Mufti Taqi Usmani
  };
  words: QuranWord[];
  tajweedSpans?: {
    text: string;
    rule?: 'ghunnah' | 'ikhfa' | 'idgham' | 'qalqalah' | 'madd';
  }[];
  explanationUr?: string;
  explanationEn?: string;
}

export interface Reciter {
  id: string;
  name: string;
  nameUr: string;
  subfolder: string;
  bitrate: string;
}

export interface Bookmark {
  ayahNumber: number;
  addedAt: number;
}

export interface TadabburNote {
  ayahNumber: number;
  note: string;
  updatedAt: number;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';
export type ViewMode = 'reading' | 'wordByWord' | 'grammar' | 'hifz';
