<template>
  <div class="language-switcher">
    <button class="globe-btn" @click="isOpen = !isOpen" title="Select Language">
      <GlobalIcon size="24" color="#9ca3af"/>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="dropdown-header">Select Language</div>
      <button
        v-for="lang in store.availableLanguages"
        :key="lang"
        @click="selectLanguage(lang)"
        class="lang-option"
        :class="{ active: store.currentLanguage === lang }"
      >
        {{ getLanguageName(lang) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useShipsStore } from '../store/useShipsStore';
import  GlobalIcon from './GlobalIcon.vue';

const store = useShipsStore();
const isOpen = ref(false);

const languageNames: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  es_mx: 'Español (México)',
  pt_br: 'Português (Brasil)',
  nl: 'Nederlands',
  it: 'Italiano',
  pl: 'Polski',
  uk: 'Українська',
  cs: 'Čeština',
  tr: 'Türkçe',
  ja: '日本語',
  ko: '한국어',
  zh_cn: '中文 (简体)',
  zh_sg: '中文 (新加坡)',
  zh_tw: '中文 (繁體)',
  th: 'ไทย'
};

function getLanguageName(lang: string): string {
  return languageNames[lang] || lang;
}

function selectLanguage(lang: string) {
  store.setLanguage(lang);
  isOpen.value = false;
}
</script>

<style lang="scss" scoped>

.language-switcher {
  position: relative;

  .globe-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.1);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #1a1f2e;
    border: 1px solid #2d3748;
    border-radius: 0.375rem;
    margin-top: 0.5rem;
    min-width: 200px;
    max-height: 320px;
    overflow-y: auto;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    z-index: 100;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .dropdown-header {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: bold;
      text-transform: uppercase;
      color: #9ca3af;
      border-bottom: 1px solid #2d3748;
      position: sticky;
      top: 0;
      background-color: #1a1f2e;
      z-index: 1;
    }

    .lang-option {
      width: 100%;
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      color: #e5e7eb;
      font-size: 0.875rem;
      transition: all 0.2s;

      &:hover {
        background-color: #2d3748;
        color: #60a5fa;
      }

      &.active {
        background-color: #3b82f6;
        color: white;
        font-weight: bold;
      }
    }
  }
}
</style>
