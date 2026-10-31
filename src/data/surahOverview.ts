export interface SurahOverviewData {
  surahNumber: number;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  meaningEn: string;
  revelationPlace: 'Makkah' | 'Madinah';
  revelationOrder: 41;
  ayahCount: 83;
  rukuCount: 5;
  virtues: {
    titleUr: string;
    titleEn: string;
    hadithAr?: string;
    hadithUr: string;
    hadithEn: string;
    source: string;
  }[];
  rukus: {
    rukuNumber: number;
    ayahRange: string;
    titleUr: string;
    titleEn: string;
    summaryUr: string;
    summaryEn: string;
    keyThemes: string[];
  }[];
}

export const SURAH_YASEEN_OVERVIEW: SurahOverviewData = {
  surahNumber: 36,
  nameArabic: 'يس',
  nameUrdu: 'سورۃ یٰسٓ (قلب القرآن)',
  nameEnglish: 'Surah Yaseen',
  meaningEn: 'Ya-Seen (Heart of the Quran)',
  revelationPlace: 'Makkah',
  revelationOrder: 41,
  ayahCount: 83,
  rukuCount: 5,
  virtues: [
    {
      titleUr: 'ہر چیز کا ایک دل ہے اور قرآن کا دل سورۃ یٰسٓ ہے',
      titleEn: 'The Heart of the Quran',
      hadithAr: 'إِنَّ لِكُلِّ شَيْءٍ قَلْبًا، وَقَلْبُ الْقُرْآنِ يس',
      hadithUr: 'نبی کریم ﷺ نے ارشاد فرمایا: "بیشک ہر چیز کا ایک دل ہوتا ہے اور قرآن مجید کا دل سورۃ یٰسٓ ہے۔ جو شخص سورۃ یٰسٓ پڑھتا ہے اللہ تعالیٰ اس کے لیے دس مرتبہ پورا قرآن پڑھنے کا ثواب لکھ دیتا ہے۔"',
      hadithEn: 'The Prophet (ﷺ) said: "Indeed everything has a heart, and the heart of the Quran is Yaseen. Whoever recites Yaseen, Allah records for them the reward of reciting the Quran ten times."',
      source: 'Sunan At-Tirmidhi (2887)',
    },
    {
      titleUr: 'رات یا صبح کی تلاوت پر مغفرت',
      titleEn: 'Forgiveness for the Reciter',
      hadithAr: 'مَنْ قَرَأَ يس فِي لَيْلَةٍ ابْتِغَاءَ وَجْهِ اللَّهِ غُفِرَ لَهُ',
      hadithUr: 'رسول اللہ ﷺ نے فرمایا: "جس شخص نے اللہ تعالیٰ کی رضا کی خاطر رات کے وقت سورۃ یٰسٓ پڑھی، اس کی بخشش فرما دی جاتی ہے۔"',
      hadithEn: 'The Messenger of Allah (ﷺ) said: "Whoever recites Surah Yaseen at night seeking the pleasure of Allah, he is forgiven."',
      source: 'Sunan Ad-Darimi & Ibn Hibban',
    },
    {
      titleUr: 'حاجات کی برآری اور مشکلات کی آسانی',
      titleEn: 'Fulfillment of Needs',
      hadithUr: 'عطا بن ابی رباح روایت کرتے ہیں کہ نبی کریم ﷺ نے فرمایا: "جس شخص نے دن کے آغاز میں سورۃ یٰسٓ پڑھی، اس کی دن بھر کی تمام ضروریات اور حاجات پوری کر دی جائیں گی۔"',
      hadithEn: 'Ata ibn Abi Rabah narrated that the Prophet (ﷺ) said: "Whoever recites Surah Yaseen at the beginning of the day, all his needs for that day will be fulfilled."',
      source: 'Sunan Ad-Darimi (3418)',
    },
  ],
  rukus: [
    {
      rukuNumber: 1,
      ayahRange: 'آیات 1 تا 12',
      titleUr: 'رسالتِ محمدی ﷺ اور غافلوں کا انجام',
      titleEn: 'Prophethood of Muhammad (ﷺ) & Accountability',
      summaryUr: 'قرآن حکیم کی قسم کھا کر نبی کریم ﷺ کی رسالت کا اعلان، غافل اقوام کا رویہ، اور اس بات کا بیان کہ اللہ ہر چھوٹی بڑی چیز اور انسان کے چھوڑے ہوئے تمام آثار کو ایک واضح کتاب (امام مبین) میں درج فرما رہا ہے۔',
      summaryEn: 'An affirmation by the Wise Quran of the true Prophethood of Muhammad (ﷺ), warnings to the heedless, and assurance that every single action and legacy is inscribed in a Clear Record.',
      keyThemes: ['رسالت کی حقانیت', 'قرآن حکیم', 'امام مبین میں اعمال کا اندراج'],
    },
    {
      rukuNumber: 2,
      ayahRange: 'آیات 13 تا 32',
      titleUr: 'اہلِ قریہ (انطاکیہ) کا عبرتناک واقعہ اور حبیب نجار',
      titleEn: 'The People of the City & The Believer Habib an-Najjar',
      summaryUr: 'تین پیغمبروں کی دعوت، اہل بستی کی سرکشی، شہر کے پرلے کنارے سے ایک مومن بندے کی پرخلوص پکار، اس کی شہادت اور جنت میں داخلے کی خوشخبری، اور ہٹ دھرم بستی پر آسمانی چنگھاڑ کا عذاب۔',
      summaryEn: 'Parable of the envoys sent to a town, their rejection, the courageous arrival of a sincere believer who urged them to follow the messengers, his martyrdom, and his entry into Paradise.',
      keyThemes: ['انبیاء کی دعوت', 'مومن کی شہادت اور جنت', 'نافرمانوں پر چنگھاڑ'],
    },
    {
      rukuNumber: 3,
      ayahRange: 'آیات 33 تا 50',
      titleUr: 'کائنات میں توحید اور قدرت کے عظیم الشان دلائل',
      titleEn: 'Signs in the Cosmos: Earth, Sun, Moon & Ships',
      summaryUr: 'مردہ زمین کا زندہ ہونا، کھجوروں اور انگوروں کے باغات، رات اور دن کا نظام، سورج کا اپنے مقررہ مدار پر چلنا، چاند کی منزلیں یہاں تک کہ وہ پرانی شاخ جیسا ہو جاتا ہے، اور انسان کا کشتیوں پر سوار ہونا۔',
      summaryEn: 'Profound cosmic proofs: the revival of barren earth, sweet fruit springs, the celestial orbits of the sun and moon, day and night, and the laden Ark carrying mankind.',
      keyThemes: ['مردہ زمین کا احیاء', 'سورج اور چاند کے مدار', 'کشتی اور بحری اسفار'],
    },
    {
      rukuNumber: 4,
      ayahRange: 'آیات 51 تا 67',
      titleUr: 'صور پھونکنا، حشر اور اہل جنت و اہل دوزخ کا انجام',
      titleEn: 'The Trumpet Blow, Resurrection, Paradise & Hell',
      summaryUr: 'صور پھونکے جانے پر قبروں سے اٹھ کھڑے ہونا، اہل ایمان کے لیے پرسکون باغات اور سلامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ کا تحفہ، اور مجرموں کو الگ کر کے ان کے اعضاء اور ہاتھوں پیروں کی گواہی۔',
      summaryEn: 'The blowing of the Trumpet, rising from graves, peaceful joy of the dwellers of Paradise greeted with "Peace from a Merciful Lord", while sinners have their mouths sealed and limbs testify.',
      keyThemes: ['صور پھونکنا', 'سلام قولا من رب رحیم', 'اعضاء کی گواہی'],
    },
    {
      rukuNumber: 5,
      ayahRange: 'آیات 68 تا 83',
      titleUr: 'تخلیقِ انسان، حیاتِ بعد الموت اور کن فیکون کی شان',
      titleEn: 'Human Creation, Resurrection, & The Power of Kun Fa-Yakoon',
      summaryUr: 'انسان کی عمر کا بڑھاپے میں پلٹنا، نطفہ سے انسان کی پیدائش، بوسیدہ ہڈیوں کو دوبارہ زندہ کرنے کا چیلنج، سبز درخت سے آگ کا پیدا ہونا، اور اللہ کا امر کہ جب وہ کسی چیز کا ارادہ کرتا ہے تو فرماتا ہے "ہو جا" اور وہ ہو جاتی ہے۔',
      summaryEn: 'Answers to skeptics regarding reviving decayed bones: He who formed them the first time shall resurrect them. When He wills a thing, His command is simply "Be" and it is!',
      keyThemes: ['بوسیدہ ہڈیوں کا اعادہ', 'سبز درخت سے آگ', 'کن فیکون کی قدرت'],
    },
  ],
};
