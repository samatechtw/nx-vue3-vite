import { createI18n } from 'vue-i18n';

import en from './translations/en.json';

type MessageSchema = typeof en;

export default createI18n<[MessageSchema], 'en'>({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: { en },
});
