<template>
  <section class="ship-grid-container">
    <div v-if="store.isLoading" class="grid-layout">
      <ShipCardSkeleton v-for="i in 12" :key="i" />
    </div>

    <div v-else-if="store.error" class="state-box error">
      <p class="title">{{ t('filed_to_load') || "Failed to load fleet data"}}</p>
      <p class="subtitle">{{ store.error }}</p>
      <button @click="store.loadData" class="retry-btn">{{ t('retry') || "Retry" }}</button>
    </div>

    <div v-else-if="store.filteredShips.length === 0" class="state-box empty">
      <div class="icon">🔍</div>
      <h3 class="title">{{ t('not_found') || "Shps not found" }}</h3>
      <p class="subtitle">{{ t('to_simplify') || "Try relaxing your search query or filters."}}</p>
      <button @click="store.resetFilters" class="reset-btn">
        {{ t('reset_filters') || "Reset all filters" }}
      </button>
    </div>

    <div v-else>
      <div v-if="store.viewMode === 'grid'" class="grid-layout">
        <ShipCard v-for="ship in store.filteredShips" :key="ship.id" :ship="ship" />
      </div>

      <div v-else class="list-layout">
        <ShipListItem v-for="ship in store.filteredShips" :key="ship.id" :ship="ship" />
      </div>

      <div
        ref="statsRef"
        class="grid-stats"
        :class="{ 'has-more': store.hasMore }"
      >
       {{ t('showing') || 'Showing'}} {{ store.filteredShips.length }} {{ t('of') || 'of'}} {{ store.totalFilteredCount }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useShipsStore } from '@/store/useShipsStore';
import ShipCard from './ShipCard.vue';
import ShipListItem from './ShipListItem.vue';
import ShipCardSkeleton from './ShipCardSkeleton.vue';
import { onUnmounted, ref, watch } from 'vue';
import { useTranslation } from 'i18next-vue';

const store = useShipsStore();
const { t } = useTranslation();
const statsRef = ref<HTMLElement>();

const STATS_MARGIN_BOTTOM = 32;

const LOAD_MORE_DELAY = 800;

let intersectionObserver: IntersectionObserver | null = null;
let loadMoreTimer: ReturnType<typeof setTimeout> | null = null;

function cancelPendingLoad() {
  if (loadMoreTimer === null) return;
  clearTimeout(loadMoreTimer);
  loadMoreTimer = null;
}

function observeStats(el: HTMLElement) {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) {
        cancelPendingLoad();
        return;
      }
      if (!store.hasMore || loadMoreTimer !== null) return;

      loadMoreTimer = setTimeout(() => {
        loadMoreTimer = null;
        if (store.hasMore) store.loadMore();
      }, LOAD_MORE_DELAY);
    },
    {
      threshold: 1,
      rootMargin: `0px 0px -${STATS_MARGIN_BOTTOM}px 0px`
    }
  );

  intersectionObserver.observe(el);
}

watch(statsRef, (el) => {
  intersectionObserver?.disconnect();
  intersectionObserver = null;
  cancelPendingLoad();
  if (el) observeStats(el);
});

onUnmounted(() => {
  intersectionObserver?.disconnect();
  cancelPendingLoad();
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

.list-layout {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
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
    color: $color-text;
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

.grid-stats {
  text-align: center;
  padding: 1rem;
  color: $color-text;
  font-size: 0.875rem;
  margin-top: 1rem;
  margin-bottom: 0;

  &.has-more {
    margin-bottom: 2rem;
  }
}
</style>