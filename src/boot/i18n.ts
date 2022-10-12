import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import enUS from 'src/i18n/enUs.json';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    legacy: false,
    messages: {
      'en-US': enUS,
    },
  });

  app.use(i18n);
});
