import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './fa.json';
import en from './en.json';

const saved = localStorage.getItem('lang') || 'fa';

i18n
  .use(initReactI18next)
  .init({
    resources: { fa: { translation: fa }, en: { translation: en } },
    lng: saved,
    fallbackLng: 'fa',
    interpolation: { escapeValue: false },
  });

export default i18n;
