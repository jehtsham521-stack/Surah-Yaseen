import { Ayah, Reciter } from '../types';
import { AYAHS_1_TO_20 } from './ayahs1to20';
import { AYAHS_21_TO_40 } from './ayahs21to40';
import { AYAHS_41_TO_60 } from './ayahs41to60';
import { AYAHS_61_TO_83 } from './ayahs61to83';

export const SURAH_YASEEN_AYAHS: Ayah[] = [
  ...AYAHS_1_TO_20,
  ...AYAHS_21_TO_40,
  ...AYAHS_41_TO_60,
  ...AYAHS_61_TO_83,
];

export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    nameUr: 'مشاری راشد العفاسی',
    subfolder: 'Alafasy_128kbps',
    bitrate: '128kbps',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad (Murattal)',
    nameUr: 'عبد الباسط عبد الصمد (مرتل)',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    bitrate: '192kbps',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary (Teacher of Tajweed)',
    nameUr: 'محمود خلیل الحصری (معلم تجوید)',
    subfolder: 'Husary_128kbps',
    bitrate: '128kbps',
  },
  {
    id: 'sudais',
    name: 'Abdur-Rahman As-Sudais (Imam of Haram)',
    nameUr: 'عبد الرحمن السدیس (امام حرم کعبہ)',
    subfolder: 'Abdurrahmaan_As-Sudais_192kbps',
    bitrate: '192kbps',
  },
];

/**
 * Returns the authentic CDN audio URL for a given ayah and reciter
 */
export function getAyahAudioUrl(ayahNumber: number, reciterId: string = 'alafasy'): string {
  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];
  const formattedAyah = String(ayahNumber).padStart(3, '0');
  // Surah 36 (Yaseen)
  return `https://everyayah.com/data/${reciter.subfolder}/036${formattedAyah}.mp3`;
}

/**
 * Normalize Arabic text by removing tashkeel / diacritics and unifying letters for searching
 */
export function normalizeArabic(text: string): string {
  return text
    // Remove diacritical marks (harakat, sukoon, shaddah, etc.)
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // Normalize Alefs
    .replace(/[إأآٱ]/g, 'ا')
    // Normalize Taa Marboota to Haa
    .replace(/ة/g, 'ه')
    // Normalize Yaa
    .replace(/[ىي]/g, 'ي')
    // Normalize Hamzas
    .replace(/[ؤئ]/g, 'ء')
    .trim();
}
