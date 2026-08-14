import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import i18nextVue from 'i18next-vue';
import i18next from './i18n';

const app = createApp(App);
app.use(i18nextVue, { i18next });
app.use(createPinia());
app.mount('#app');
