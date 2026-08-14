<template>
  <div class="language-switcher">
    <button class="globe-btn" @click="isOpen = !isOpen" title="Select Language">
      <GlobalIcon size="24" color="#9ca3af"/>
      <span class="lang-code">{{ store.currentLanguage.toUpperCase() }}</span>
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
import { useShipsStore } from '@/store/useShipsStore';
import  GlobalIcon from '../ui/BaseGlobalIcon.vue';

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
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      transform: scale(1.05);
    }

    .lang-code {
      font-size: 0.75rem;
      font-weight: bold;
      color: #9ca3af;
      letter-spacing: 1px;
      min-width: 24px;
      text-align: center;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: rgba($color-panel, 0.9);
    border: 2px solid $color-emerald;
    border-radius: 0.375rem;
    margin-top: 0.5rem;
    min-width: 200px;
    max-height: 320px;
    overflow-y: auto;
    box-shadow:
      inset 1px 1px 0px rgba(255, 255, 255, 0.1),
      0 10px 15px -3px rgba(0, 0, 0, 0.5);
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
      color: $color-muted;
      border-bottom: 2px solid #3a7f8f;
      position: sticky;
      top: 0;
      background: $color-panel;
      z-index: 1;
    }

    .lang-option {
      width: 100%;
      padding: 0.75rem 1rem;
      background: none;
      text-align: left;
      cursor: pointer;
      color: $color-muted;
      font-size: 0.875rem;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      transition: all 0.15s ease-in-out;

      &:hover {
        box-shadow:  inset 0 0 20px 5px $color-emerald;
        color: #1fffbc;
      }

      &.active {
        border-top: 1px solid $color-emerald;
        border-bottom: 1px solid $color-emerald;
        box-shadow:  inset 0 0 20px 5px $color-emerald;
        color: $color-text;
        font-weight: bold;
        padding-left: 0.75rem;
      }
    }
  }
}
</style>
