<template>
  <Teleport to="body">
    <div v-if="ship" class="modal-overlay" @click.self="close">
      <div class="modal-container" :class="{ 'is-premium': ship.is_premium }">

        <div class="modal-media">
          <button @click="close" class="close-btn">✕</button>

          <img
            :src="ship.icons.large || ship.icons.medium"
            :alt="ship.title"
          />

          <div class="modal-badges">
            <span class="tier-tag">
              Tier {{ toRomanTier(ship.level) }}
            </span>
            <span v-if="ship.is_premium" class="premium-tag">
              PREMIUM VEHICLE
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div class="ship-header">
            <h2 class="title">{{ ship.title }}</h2>
            <p class="meta">{{ nationTitle }} • {{ typeTitle }}</p>
          </div>

          <div class="ship-description">
            <h4>Overview</h4>
            <p>{{ ship.description || 'No detailed historical description available for this vehicle.' }}</p>
          </div>

          <div class="modal-actions">
            <button @click="close" class="btn-close">Close</button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useShipsStore } from '@/store/useShipsStore';
import { toRomanTier } from '@/utils/toRomanTier';

const store = useShipsStore();
const ship = computed(() => store.selectedShip);

const nationTitle = computed(() => (ship.value ? store.nations[ship.value.nation]?.title : ''));
const typeTitle = computed(() => (ship.value ? store.types[ship.value.type]?.title : ''));

function close() {
  store.selectedShip = null;
}
</script>

<style lang="scss" scoped>

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 640px;
  background-color: $color-panel;
  border: 1px solid $color-accent;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);

  &.is-premium {
    border-color: $color-gold;

    .tier-tag {
      background-color: $color-gold;
      color: $color-dark;
    }
    .title {
      color: $color-gold;
    }
  }

  .modal-media {
    position: relative;
    height: 256px;
    background: linear-gradient(180deg, $color-dark 0%, $color-panel 100%);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba($color-dark, 0.8);
      color: #fff;
      border: 1px solid $color-border;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition-default;

      &:hover {
        color: $color-accent;
      }
    }

    img {
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5));
    }

    .modal-badges {
      position: absolute;
      bottom: 1rem;
      left: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .tier-tag {
        font-weight: 900;
        font-size: 1.1rem;
        padding: 0.25rem 0.75rem;
        border-radius: $radius-sm;
        background-color: $color-accent;
        color: $color-dark;
      }

      .premium-tag {
        font-size: 0.75rem;
        font-weight: bold;
        color: $color-gold;
        background-color: rgba($color-dark, 0.9);
        border: 1px solid rgba($color-gold, 0.5);
        padding: 0.25rem 0.5rem;
        border-radius: $radius-sm;
      }
    }
  }

  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .ship-header {
      .title {
        font-size: 1.5rem;
        font-weight: 900;
        color: #fff;
      }

      .meta {
        font-size: 0.75rem;
        color: $color-muted;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 0.1rem;
      }
    }

    .ship-description {
      border-top: 1px solid $color-border;
      padding-top: 1rem;

      h4 {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: $color-muted;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.875rem;
        color: $color-text;
        line-height: 1.6;
        max-height: 160px;
        overflow-y: auto;
        padding-right: 0.5rem;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    .modal-actions {
      border-top: 1px solid $color-border;
      padding-top: 1rem;
      display: flex;
      justify-content: flex-end;

      .btn-close {
        padding: 0.5rem 1.25rem;
        background-color: $color-card;
        color: #fff;
        border: 1px solid $color-border;
        border-radius: $radius-sm;
        font-weight: bold;
        font-size: 0.875rem;
        cursor: pointer;
        transition: $transition-default;

        &:hover {
          background-color: $color-border;
        }
      }
    }
  }
}
</style>