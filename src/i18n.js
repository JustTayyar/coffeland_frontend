import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationAZ from './locales/az.json';
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';

const resources = {
  az: { translation: translationAZ },
  en: { translation: translationEN },
  ru: { translation: translationRU }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'az', // Default language
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false 
    }
  });

// Save language to localStorage when changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
