export interface TajweedRuleInfo {
  id: 'ghunnah' | 'ikhfa' | 'idgham' | 'qalqalah' | 'madd';
  nameAr: string;
  nameUr: string;
  nameEn: string;
  colorClass: string;
  badgeBg: string;
  hexColor: string;
  descriptionUr: string;
  descriptionEn: string;
  letters: string[];
  rulesExplanationUr: string;
  rulesExplanationEn: string;
  exampleAyah: {
    ar: string;
    word: string;
    surahAyah: string;
  };
}

export const TAJWEED_RULES: TajweedRuleInfo[] = [
  {
    id: 'ghunnah',
    nameAr: 'غُنَّة',
    nameUr: 'غنہ (Ghunnah)',
    nameEn: 'Ghunnah (Nasalization)',
    colorClass: 'tajweed-ghunnah',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    hexColor: '#059669',
    letters: ['نّ', 'مّ'],
    descriptionUr: 'ناک کے بانسے سے گنگناہٹ کی آواز نکالنا۔ نون مشدد یا میم مشدد پر دو حرکات کے برابر غنہ کیا جاتا ہے۔',
    descriptionEn: 'A nasal sound produced from the nasal cavity. Held for 2 counts on Noon or Meem with Shaddah (Tashdeed).',
    rulesExplanationUr: 'جب بھی نون یا میم پر تشدید (ّ) ہو تو غنہ کرنا واجب ہے۔ آواز کو ناک میں 2 سیکنڈ (2 حرکات) روک کر ادا کریں۔',
    rulesExplanationEn: 'Mandatory on Noon Musaddadah (نّ) or Meem Musaddadah (مّ). Hold the sound for approximately two vowel counts.',
    exampleAyah: {
      ar: 'إِنَّا جَعَلْنَا',
      word: 'إِنَّا',
      surahAyah: 'Surah Yaseen (36:8)',
    },
  },
  {
    id: 'ikhfa',
    nameAr: 'إِخْفَاء',
    nameUr: 'اخفاء (Ikhfa)',
    nameEn: 'Ikhfa (Concealment)',
    colorClass: 'tajweed-ikhfa',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    hexColor: '#d97706',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    descriptionUr: 'نون ساکن یا تنوین کی آواز کو ناک میں چھپا کر ہلکے غنہ کے ساتھ ادا کرنا۔',
    descriptionEn: 'Hiding the sound of Noon Sakinah or Tanween with a light nasalization when followed by one of the 15 Ikhfa letters.',
    rulesExplanationUr: 'نون ساکن (نْ) یا تنوین (ً ٍ ٌ) کے بعد اگر حروفِ اخفاء (15 حروف: ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك) میں سے کوئی حرف آئے تو اخفاء ہوتا ہے۔',
    rulesExplanationEn: 'When Noon Sakin or Tanween is followed by any of the 15 Ikhfa letters, pronounce between Izhar (clear) and Idgham (merging) with ghunnah.',
    exampleAyah: {
      ar: 'لِّتُنذِرَ قَوْمًا',
      word: 'لِّتُنذِرَ',
      surahAyah: 'Surah Yaseen (36:6)',
    },
  },
  {
    id: 'idgham',
    nameAr: 'إِدْغَام',
    nameUr: 'ادغام (Idgham)',
    nameEn: 'Idgham (Assimilation / Merging)',
    colorClass: 'tajweed-idgham',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    hexColor: '#2563eb',
    letters: ['ي', 'ر', 'م', 'ل', 'و', 'ن'], // يرملون
    descriptionUr: 'نون ساکن یا تنوین کو اگلے حرف میں ملا کر پڑھنا۔ اس کے حروف "یَرْمَلُوْن" ہیں۔',
    descriptionEn: 'Merging Noon Sakinah or Tanween into the next letter. The letters of Idgham are Yarmaloon (ي، ر، م، ل، و، ن).',
    rulesExplanationUr: 'یرملون کے حروف دو اقسام میں ہیں: ادغام مع الغنہ (ی، ن، م، و) اور ادغام بلا غنہ (ل، ر)۔',
    rulesExplanationEn: 'Divided into Idgham with Ghunnah (ي, ن, م, و) and Idgham without Ghunnah (ل, ر).',
    exampleAyah: {
      ar: 'مِّن مَّرْقَدِنَا',
      word: 'مِّن مَّرْقَدِنَا',
      surahAyah: 'Surah Yaseen (36:52)',
    },
  },
  {
    id: 'qalqalah',
    nameAr: 'قَلْقَلَة',
    nameUr: 'قلقلہ (Qalqalah)',
    nameEn: 'Qalqalah (Echoing / Bouncing Sound)',
    colorClass: 'tajweed-qalqalah',
    badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    hexColor: '#dc2626',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'], // قطب جد
    descriptionUr: 'مخصوص حروف کے ساکن ہونے پر مخرج میں جھٹکا دے کر گونج پیدا کرنا۔ حروف "قُطْبُ جَدٍّ" ہیں۔',
    descriptionEn: 'Echoing or bouncing sound produced at the articulation point when one of the 5 letters (ق، ط، ب، ج، د) has Sukoon.',
    rulesExplanationUr: 'جب حروفِ قلقلہ (ق، ط، ب، ج، د) پر جزم (سکون) ہو یا وقف کی حالت میں وہ ساکن ہو جائیں، تو آواز جھٹکے کے ساتھ گونجتی ہے۔',
    rulesExplanationEn: 'When any of the five letters of Qutb Jad (ق، ط، ب، ج، د) has a Sukoon or when stopping on them, an echoing reverberation is made.',
    exampleAyah: {
      ar: 'لَقَدْ حَقَّ الْقَوْلُ',
      word: 'لَقَدْ',
      surahAyah: 'Surah Yaseen (36:7)',
    },
  },
  {
    id: 'madd',
    nameAr: 'مَدّ',
    nameUr: 'مد (Madd)',
    nameEn: 'Madd (Elongation)',
    colorClass: 'tajweed-madd',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    hexColor: '#7c3aed',
    letters: ['ا', 'و', 'ي'],
    descriptionUr: 'آواز کو 2 سے 6 حرکات (سیکنڈز) تک لمبا کر کے پڑھنا۔ جیسے مد متصل، مد منفصل، مد لازم۔',
    descriptionEn: 'Elongating the sound of vowel letters (Alif, Waw, Yaa) from 2 to 6 counts according to Tajweed rules.',
    rulesExplanationUr: 'حروف مدہ کے بعد ہمزہ یا سکون آنے پر مد کی جاتی ہے۔ مد لازم میں 6 حرکات، اور مد متصل/منفصل میں 4 یا 5 حرکات لمبا کیا جاتا ہے۔',
    rulesExplanationEn: 'Prolonging the vowel sound when followed by Hamzah or Sukoon/Shaddah (e.g. Madd Lazim for 6 counts, Madd Muttasil/Munfasil for 4-5 counts).',
    exampleAyah: {
      ar: 'يسٓ',
      word: 'يسٓ (ياء + سينٓ)',
      surahAyah: 'Surah Yaseen (36:1)',
    },
  },
];
