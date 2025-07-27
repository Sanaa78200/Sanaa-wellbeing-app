import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar' | 'tr';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { fr: 'Accueil', ar: 'الرئيسية', tr: 'Ana Sayfa' },
  prayers: { fr: 'Prières', ar: 'الصلوات', tr: 'Namazlar' },
  nutrition: { fr: 'Nutrition & Régime', ar: 'التغذية والنظام الغذائي', tr: 'Beslenme ve Diyet' },
  quran: { fr: 'Coran', ar: 'القرآن الكريم', tr: 'Kuran' },
  ramadan: { fr: 'Ramadan', ar: 'رمضان', tr: 'Ramazan' },
  profile: { fr: 'Profil', ar: 'الملف الشخصي', tr: 'Profil' },
  
  // Common
  save: { fr: 'Enregistrer', ar: 'حفظ', tr: 'Kaydet' },
  cancel: { fr: 'Annuler', ar: 'إلغاء', tr: 'İptal' },
  loading: { fr: 'Chargement...', ar: 'جاري التحميل...', tr: 'Yükleniyor...' },
  error: { fr: 'Erreur', ar: 'خطأ', tr: 'Hata' },
  
  // Profile
  personalInfo: { fr: 'Informations personnelles', ar: 'المعلومات الشخصية', tr: 'Kişisel Bilgiler' },
  preferences: { fr: 'Préférences', ar: 'التفضيلات', tr: 'Tercihler' },
  objectives: { fr: 'Objectifs', ar: 'الأهداف', tr: 'Hedefler' },
  
  // Food preferences
  halal: { fr: 'Halal uniquement', ar: 'حلال فقط', tr: 'Sadece Helal' },
  vegetarian: { fr: 'Végétarien', ar: 'نباتي', tr: 'Vejetaryen' },
  vegan: { fr: 'Végétalien', ar: 'نباتي صرف', tr: 'Vegan' },
  
  // Prayer times
  fajr: { fr: 'Fajr', ar: 'الفجر', tr: 'Sabah' },
  dhuhr: { fr: 'Dhuhr', ar: 'الظهر', tr: 'Öğle' },
  asr: { fr: 'Asr', ar: 'العصر', tr: 'İkindi' },
  maghrib: { fr: 'Maghrib', ar: 'المغرب', tr: 'Akşam' },
  isha: { fr: 'Isha', ar: 'العشاء', tr: 'Yatsı' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    // Force complete re-render of the page for language change
    const event = new CustomEvent('languageChanged', { detail: { language } });
    window.dispatchEvent(event);
    
    // Reload page to ensure complete translation
    if (localStorage.getItem('language-changed')) {
      localStorage.removeItem('language-changed');
      window.location.reload();
    }
  }, [language]);

  const setLanguageWithReload = (lang: Language) => {
    if (lang !== language) {
      localStorage.setItem('language-changed', 'true');
      setLanguage(lang);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithReload, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};