<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <div class="logo">WS</div>
        <h1 class="title">
          World of Warships <span>Fleet Encyclopedia</span>
        </h1>
      </div>

      <div class="header-right">
        <div class="stats">
          Total Ships: <strong>{{ store.ships.length }}</strong> |
          Showing: <span>{{ store.filteredShips.length }}</span>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useShipsStore } from '../store/useShipsStore';
import LanguageSwitcher from './LanguageSwitcher.vue';
const store = useShipsStore();
</script>

<style lang="scss" scoped>

.app-header {
  background-color: $color-panel;
  border-bottom: 1px solid $color-border;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    @media (min-width: 640px) {
      gap: 1rem;
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .logo {
      width: 36px;
      height: 36px;
      background-color: $color-accent;
      color: $color-dark;
      border-radius: $radius-sm;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      box-shadow: 0 0 10px rgba($color-accent, 0.4);
    }

    .title {
      font-size: 1rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #fff;

      @media (min-width: 640px) {
        font-size: 1.25rem;
        letter-spacing: 1px;
      }

      span {
        font-size: 0.7rem;
        font-weight: 400;
        color: $color-accent;
        display: block;

        @media (min-width: 480px) {
          font-size: 0.8rem;
        }

        @media (min-width: 640px) {
          font-size: 0.85rem;
          display: inline;
          margin-left: 0.5rem;
        }
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stats {
    font-size: 0.7rem;
    color: $color-muted;
    white-space: nowrap;

    @media (min-width: 768px) {
      font-size: 0.8rem;
    }

    strong, span {
      color: $color-accent;
      font-weight: bold;
    }
  }
}
</style>