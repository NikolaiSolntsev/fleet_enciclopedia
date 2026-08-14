<template>
  <section class="ship-grid-container">
    <div v-if="store.isLoading" class="grid-layout">
      <ShipCardSkeleton v-for="i in 12" :key="i" />
    </div>

    <div v-else-if="store.error" class="state-box error">
      <p class="title">Failed to load fleet data</p>
      <p class="subtitle">{{ store.error }}</p>
      <button @click="store.loadData" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="store.filteredShips.length === 0" class="state-box empty">
      <div class="icon">🔍</div>
      <h3 class="title">No ships found</h3>
      <p class="subtitle">Try relaxing your search query or filters.</p>
      <button @click="store.resetFilters" class="reset-btn">
        Reset All Filters
      </button>
    </div>

    <div v-else>
      <div class="grid-layout">
        <ShipCard v-for="ship in store.filteredShips" :key="ship.id" :ship="ship" />
      </div>

      <!-- Infinite Scroll Trigger -->
      <div
        v-if="store.hasMore"
        ref="loadMoreTrigger"
        class="load-more-trigger"
      >
        <button v-if="!store.isLoadingMore" @click="store.loadMore" class="load-more-btn">
          Load More Ships
        </button>
        <div v-else class="loading-indicator">
          <span>Loading...</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid-stats">
        Showing {{ store.filteredShips.length }} of {{ store.totalFilteredCount }} ships
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useShipsStore } from '@/store/useShipsStore';
import ShipCard from './ShipCard.vue';
import ShipCardSkeleton from './ShipCardSkeleton.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const store = useShipsStore();
const loadMoreTrigger = ref<HTMLElement>();

let intersectionObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (!loadMoreTrigger.value) return;

  // Intersection Observer для автоматической загрузки
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && store.hasMore && !store.isLoadingMore) {
          store.loadMore();
        }
      });
    },
    { threshold: 0.1 }
  );

  intersectionObserver.observe(loadMoreTrigger.value);
});

onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
});
</script>

<style lang="scss" scoped>

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.state-box {
  padding: 4rem 2rem;
  text-align: center;
  border-radius: $radius-md;
  border: 1px solid $color-border;
  background-color: rgba($color-panel, 0.4);

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: $color-muted;
    margin-bottom: 1rem;
  }

  &.error {
    background-color: rgba($color-danger, 0.1);
    border-color: rgba($color-danger, 0.4);

    .title {
      color: color.adjust($color-danger, $lightness:  15%);
    }

    .retry-btn {
      padding: 0.5rem 1.25rem;
      background-color: $color-danger;
      color: #fff;
      border: none;
      border-radius: $radius-sm;
      font-weight: bold;
      cursor: pointer;
      transition: $transition-default;

      &:hover {
        background-color: color.adjust($color-danger, $lightness: 10%);
      }
    }
  }

  &.empty {
    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .reset-btn {
      padding: 0.5rem 1.25rem;
      background-color: $color-accent;
      color: $color-dark;
      border: none;
      border-radius: $radius-sm;
      font-weight: bold;
      cursor: pointer;
      transition: $transition-default;

      &:hover {
        background-color: $color-accent-hover;
      }
    }
  }
}

.load-more-trigger {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;

  .load-more-btn {
    padding: 0.75rem 2rem;
    background-color: $color-accent;
    color: $color-dark;
    border: none;
    border-radius: $radius-md;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: $color-accent-hover;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .loading-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      color: $color-accent;
      font-weight: bold;
      animation: pulse 1.5s infinite;
    }
  }
}

.grid-stats {
  text-align: center;
  padding: 1rem;
  color: $color-text;
  font-size: 0.875rem;
  margin-top: 1rem;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>