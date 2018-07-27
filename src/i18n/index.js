
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import ElementLocale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

const messages = {
    zh: Object.assign(require('~/i18n/locales/zh'), zhLocale),
    en: Object.assign(require('~/i18n/locales/en'), enLocale)
}

const i18n = new VueI18n({
    fallbackLocale: 'zh',
    locale: 'zh', // set locale
    messages // set locale messages
})

// element-ui
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;