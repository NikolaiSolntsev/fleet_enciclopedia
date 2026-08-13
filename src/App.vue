<template>
  <div class="app-layout">
    <div class="background-grid"></div>

    <AppHeader />

    <main class="main-content">
      <ShipFilters />
      <ShipGrid />
    </main>

    <ShipModal />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useShipsStore } from './store/useShipsStore';
import AppHeader from './components/AppHeader.vue';
import ShipFilters from './components/ShipFilters.vue';
import ShipGrid from './components/ShipGrid.vue';
import ShipModal from './components/ShipModal.vue';

const store = useShipsStore();

onMounted(() => {
  store.loadData();
});
</script>

<style lang="scss" scoped>

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.background-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    180deg,
    #1a3a52 0%,
    #2d5a7b 40%,
    #4a7ba7 70%,
    #6ba3c5 100%
  );

  background-image:
    linear-gradient(
      rgba(100, 180, 230, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(100, 180, 230, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
      180deg,
      #1a3a52 0%,
      #2d5a7b 40%,
      #4a7ba7 70%,
      #6ba3c5 100%
    );
  background-size:
    50px 50px,
    50px 50px,
    100% 100%;
  background-position:
    0 0,
    0 0,
    0 0;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(
        rgba(100, 180, 230, 0.15) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(100, 180, 230, 0.15) 1px,
        transparent 1px
      );
    background-size: 200px 200px;
    pointer-events: none;
  }
}

.app-layout {
  position: relative;
}

.main-content {
  flex-grow: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0.75rem;
  position: relative;
  z-index: 1;

  @media (min-width: 480px) {
    padding: 1.5rem 1rem;
  }

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }
}

</style>