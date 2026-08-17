<template>
  <div
    @click="store.selectedShip = ship"
    class="ship-list-item"
    :class="{ 'is-premium': ship.is_premium }"
  >
    <div class="item-text">
      <h3 class="ship-title">
        {{ ship.title }}
      </h3>

      <span class="item-meta">
        <span class="ship-nation">{{ nationTitle }}</span>
        <span class="ship-type">{{ typeTitle }}</span>
      </span>
    </div>

    <div class="item-badges">
      <span class="tier-badge">
        {{ toRomanTier(ship.level) }}
      </span>

      <span
        v-if="ship.is_premium"
        class="premium-badge"
        :title="t('premium') || 'PREMIUM'"
      >★</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Ship } from '@/types/shipTypes';
import { useShipsStore } from '@/store/useShipsStore';
import { toRomanTier } from '@/utils/toRomanTier';
import { useTranslation } from 'i18next-vue';

const props = defineProps<{ ship: Ship }>();
const store = useShipsStore();

const nationTitle = computed(() => store.nations[props.ship.nation]?.title || props.ship.nation);
const typeTitle = computed(() => store.types[props.ship.type]?.title || props.ship.type);
const { t } = useTranslation();
</script>

<style lang="scss" scoped>

.ship-list-item {
  background: linear-gradient(135deg, #2a5f6f 0%, #1a3f4f 50%, #0f2a35 100%);
  border: 2px solid #3a7f8f;
  border-radius: $radius-md;
  cursor: pointer;
  transition: $transition-default;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.9rem;
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.1),
    inset -1px -1px 2px rgba(0, 0, 0, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 640px) {
    gap: 1rem;
    padding: 0.75rem 1rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: $color-accent;

    .ship-title {
      color: $color-accent;
    }
  }

  &.is-premium {
    border-color: rgba($color-gold, 0.4);

    &:hover {
      border-color: $color-gold;

      .ship-title {
        color: $color-gold-hover;
      }
    }

    .ship-title {
      color: $color-gold;
    }

    .tier-badge {
      background-color: $color-gold;
      color: $color-dark;
    }
  }

  .item-text {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.15rem 0.5rem;
    flex: 1 1 auto;
    min-width: 0;
    margin: 0.5rem 0;

    h3 {
      margin: 0;
    }
  }

  .item-meta {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex: 0 1 auto;
    min-width: 0;
  }

  .item-badges {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: none;
    margin-left: auto;
  }

  @media (min-width: 640px) {
    .item-text {
      display: contents;
    }
  }

  .ship-title {
    font-weight: bold;
    font-size: 1rem;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: $transition-default;
    flex: 0 1 auto;
    min-width: 0;
  }

  .ship-nation,
  .ship-type {
    font-size: 0.75rem;
    color: $color-muted;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 0 1 auto;
    min-width: 0;
  }

  .tier-badge {
    flex: none;
    font-weight: 900;
    font-size: 0.85rem;
    padding: 0.15rem 0.5rem;
    border-radius: $radius-sm;
    background-color: rgba($color-dark, 0.85);
    color: $color-accent;
    border: 1px solid $color-border;
  }

  .premium-badge {
    flex: none;
    font-size: 0.7rem;
    font-weight: bold;
    color: $color-gold;
    background-color: rgba($color-dark, 0.85);
    padding: 0.15rem 0.5rem;
    border-radius: $radius-sm;
    border: 1px solid rgba($color-gold, 0.4);
  }
}
</style>
