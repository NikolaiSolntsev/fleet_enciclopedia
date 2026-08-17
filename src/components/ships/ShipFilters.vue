<template>
  <div class="filters-panel">
    <div class="filters-grid">
      <div class="filter-group">
        <label>{{ t('search') || 'Search' }}</label>
        <input
          v-model="store.searchQuery"
          type="text"
          :placeholder="t('ship_name', 'Ship name...')"
        />
      </div>

      <div class="filter-group">
        <label>{{t('nation') || 'Nation'}}</label>
        <select v-model="store.selectedNation">
          <option :value="null">{{t('all_nation') || 'All nations'}}</option>
          <option v-for="(nation, key) in store.nations" :key="key" :value="key">
            {{ nation.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{t('class') || 'class'}}</label>
        <select v-model="store.selectedType">
          <option :value="null">{{t('all_classes') || 'All Classes'}}</option>
          <option v-for="(type, key) in store.types" :key="key" :value="key">
            {{ type.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{t('tier') || 'tier'}}</label>
        <select v-model="store.selectedTier">
          <option :value="null">{{t('all_tiers') || 'All tiers'}}</option>
          <option v-for="tier in 11" :key="tier" :value="tier">
            {{t('tier') || 'Tier'}} {{ toRomanTier(tier) }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{t('sort_by') || 'sort by'}}</label>
        <select v-model="store.sortBy">
          <option value="level-desc">{{t('sort_level_desc') || 'Tier (High to Low)'}}</option>
          <option value="level-asc">{{t('sort_level_asc') || 'Tier (Low to High)'}}</option>
          <option value="title">{{t('sort_by_name') || 'Name (A-Z)'}}</option>
        </select>
      </div>
    </div>

    <div class="filters-footer">
      <label class="checkbox-label">
        <input v-model="store.isPremiumOnly" type="checkbox" />
        <span>{{t('premium_only') || 'Premiun & Special Only'}}</span>
      </label>

      <button @click="store.resetFilters" class="reset-btn">
        {{ t('reset_filters') || 'reset filters'}}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShipsStore } from '@/store/useShipsStore';
import { toRomanTier } from '@/utils/toRomanTier';
import { useTranslation } from 'i18next-vue';

const store = useShipsStore();
const { t } = useTranslation();
</script>

<style lang="scss" scoped>

.filters-panel {
  background: linear-gradient(135deg, #2a5f6f 0%, #1a3f4f 50%, #0f2a35 100%);
  border: 2px solid #3a7f8f;
  border-radius: $radius-md;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.1),
    inset -1px -1px 2px rgba(0, 0, 0, 0.4),
    0 4px 6px rgba(0, 0, 0, 0.3);

  @media (min-width: 640px) {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }

  .filters-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;

    @media (min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .filter-group {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: $color-muted;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    input, select {
      background-color: $color-panel;
      border: 2px solid #3a7f8f;
      border-radius: $radius-sm;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: $color-text;
      outline: none;
      transition: $transition-default;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;

      &:focus {
        border-color: $color-emerald;
        box-shadow: 0 0px 15px 10px $color-emerald;
      }
    }

    select option {
      background-color: $color-panel;
      color: $color-text;
    }

    select option:checked {
      background: linear-gradient(#3a7f8f, #3a7f8f);
      color: #1fffbc;
    }
  }

  .filters-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $color-border;
    padding-top: 1rem;
    gap: 1rem;

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.875rem;
      user-select: none;

      input {
        margin-right: 0.5rem;
        width: 16px;
        height: 16px;
        accent-color: $color-gold;
      }

      span {
        color: $color-gold;
        font-weight: bold;
      }
    }

    .reset-btn {
      background: none;
      border: none;
      color: $color-muted;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-decoration: underline;
      cursor: pointer;
      transition: $transition-default;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>