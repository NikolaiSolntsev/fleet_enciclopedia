<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <div class="logo">
          <AnchorIcon color="white"/>
        </div>
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
import { useShipsStore } from '@/store/useShipsStore';
import AnchorIcon from '../ui/BaseAnchorIcon.vue';
import LanguageSwitcher from '../common/LanguageSwitcher.vue';
const store = useShipsStore();
</script>

<style lang="scss" scoped>

.app-header {
  background: linear-gradient(135deg, #2a5f6f 0%, #1a3f4f 50%, #0f2a35 100%);
  border-bottom: 2px solid #3a7f8f;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.1),
    inset -1px -1px 2px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.4);

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
      width: 2.5rem;
      height: 2.5rem;
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
      font-size: 1.1rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      font-family: 'Arial Black', 'Helvetica Bold', 'Impact', sans-serif;
      text-shadow:
        2px 2px 4px rgba(0, 0, 0, 0.7),
        3px 3px 8px rgba(0, 0, 0, 0.5),
        0 0 15px rgba(0, 170, 255, 0.2);
      line-height: 1.1;
      transform: scaleY(1.5);
      transform-origin: center;

      @media (min-width: 480px) {
        font-size: 1.3rem;
        letter-spacing: 1.5px;
      }

      @media (min-width: 640px) {
        font-size: 1.6rem;
        letter-spacing: 2px;
      }

      @media (min-width: 1024px) {
        font-size: 2rem;
      }

      span {
        font-size: 0.6em;
        font-weight: 600;
        color: $color-accent;
        display: block;
        letter-spacing: 0.5px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);

        @media (min-width: 480px) {
          font-size: 0.65em;
          letter-spacing: 0.7px;
        }

        @media (min-width: 640px) {
          font-size: 0.7em;
          display: inline;
          margin-left: 0.5rem;
          letter-spacing: 1px;
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