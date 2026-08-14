// src/i18n.ts
import i18next from 'i18next';
import Backend from 'i18next-http-backend';

const savedLang = localStorage.getItem('wow-catalog-lang') || 'en';

i18next.use(Backend).init({
  lng: savedLang, 
  fallbackLng: 'en', 
  debug: false, 
  backend:{
    loadPath: '/locales/{{lng}}_{{ns}}.json',
  }
});

export default i18next;