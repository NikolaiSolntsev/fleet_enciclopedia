<template>
  <div
    @click="store.selectedShip = ship"
    class="ship-card"
    :class="{ 'is-premium': ship.is_premium }"
  >
    <div class="card-media">
      <img
        :src="ship.icons.medium || ship.icons.small"
        :alt="ship.title"
        loading="lazy"
      />
      
      <div class="tier-badge">
        {{ toRomanTier(ship.level) }}
      </div>

      <div v-if="ship.is_premium" class="premium-badge">
        ★ PREMIUM
      </div>
    </div>

    <div class="card-info">
      <div>
        <h3 class="ship-title">
          {{ ship.title }}
        </h3>
        <p class="ship-meta">
          {{ nationTitle }} • {{ typeTitle }}
        </p>
      </div>

      <div class="card-action">
        <span>View Details →</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Ship } from '../types/wow';
import { useShipsStore } from '../store/useShipsStore';
import { toRomanTier } from '../utils/roman';

const props = defineProps<{ ship: Ship }>();
const store = useShipsStore();

const nationTitle = computed(() => store.nations[props.ship.nation]?.title || props.ship.nation);
const typeTitle = computed(() => store.types[props.ship.type]?.title || props.ship.type);
</script>

<style lang="scss" scoped>

.ship-card {
  background-color: $color-card;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
  transition: $transition-default;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: $color-accent;

    .card-media img {
      transform: scale(1.08);
    }

    .card-action span {
      opacity: 1;
    }

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

  .card-media {
    position: relative;
    height: 140px;
    background: linear-gradient(180deg, $color-panel 0%, $color-dark 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    @media (min-width: 640px) {
      height: 160px;
    }

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      transition: $transition-default;
      z-index: 1;
    }

    .tier-badge {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      z-index: 2;
      font-weight: 900;
      font-size: 0.85rem;
      padding: 0.15rem 0.5rem;
      border-radius: $radius-sm;
      background-color: rgba($color-dark, 0.85);
      color: $color-accent;
      border: 1px solid $color-border;
    }

    .premium-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 2;
      font-size: 0.7rem;
      font-weight: bold;
      color: $color-gold;
      background-color: rgba($color-dark, 0.85);
      padding: 0.15rem 0.5rem;
      border-radius: $radius-sm;
      border: 1px solid rgba($color-gold, 0.4);
    }
  }

  .card-info {
    padding: 1rem;
    background-color: $color-panel;
    border-top: 1px solid rgba($color-border, 0.5);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .ship-title {
      font-weight: bold;
      font-size: 1rem;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: $transition-default;
    }

    .ship-meta {
      font-size: 0.75rem;
      color: $color-muted;
      margin-top: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-action {
      margin-top: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba($color-border, 0.3);
      display: flex;
      justify-content: flex-end;

      span {
        font-size: 0.75rem;
        color: $color-accent;
        font-weight: bold;
        opacity: 0;
        transition: $transition-default;
      }
    }
  }
}
</style>