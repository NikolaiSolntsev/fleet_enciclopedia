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

      <div class="filter-group collapsible" :class="{ 'is-open': showMoreFilters }">
        <label>{{t('nation') || 'Nation'}}</label>
        <CustomSelect v-model="store.selectedNation" :options="nationOptions" />
      </div>

      <div class="filter-group collapsible" :class="{ 'is-open': showMoreFilters }">
        <label>{{t('class') || 'class'}}</label>
        <CustomSelect v-model="store.selectedType" :options="typeOptions" :icon-size="32" />
      </div>

      <div class="filter-group collapsible" :class="{ 'is-open': showMoreFilters }">
        <label>{{t('tier') || 'tier'}}</label>
        <CustomSelect v-model="store.selectedTier" :options="tierOptions" />
      </div>

      <div class="filter-group collapsible" :class="{ 'is-open': showMoreFilters }">
        <label>{{t('sort_by') || 'sort by'}}</label>
        <CustomSelect v-model="store.sortBy" :options="sortOptions" />
      </div>
    </div>

    <div class="filters-footer">
      <div class="footer-main">
        <label class="checkbox-label">
          <input v-model="store.isPremiumOnly" type="checkbox" />
          <span>{{t('premium_only') || 'Premiun & Special Only'}}</span>
        </label>

        <div class="view-toggle">
          <button
            type="button"
            class="view-btn"
            :class="{ 'is-active': store.viewMode === 'list' }"
            :aria-pressed="store.viewMode === 'list'"
            :aria-label="t('view_list', 'List view')"
            :data-tooltip="t('view_list', 'List view')"
            @click="store.viewMode = 'list'"
          >
            <ListIcon size="18" />
          </button>

          <button
            type="button"
            class="view-btn"
            :class="{ 'is-active': store.viewMode === 'grid' }"
            :aria-pressed="store.viewMode === 'grid'"
            :aria-label="t('view_grid', 'Grid view')"
            :data-tooltip="t('view_grid', 'Grid view')"
            data-tooltip-align="right"
            @click="store.viewMode = 'grid'"
          >
            <GridIcon size="18" />
          </button>
        </div>
      </div>

      <div class="footer-actions">
        <button
          @click="showMoreFilters = !showMoreFilters"
          class="reset-btn more-filters-btn"
        >
          {{ showMoreFilters
            ? t('less_filters', 'Less filters')
            : t('more_filters', 'More filters') }}
        </button>

        <button
          @click="store.resetFilters"
          class="reset-btn"
          :class="{ 'is-open': showMoreFilters }"
        >
          {{ t('reset_filters') || 'reset filters'}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useShipsStore } from '@/store/useShipsStore';
import { toRomanTier } from '@/utils/toRomanTier';
import { useTranslation } from 'i18next-vue';
import ListIcon from '../ui/BaseListIcon.vue';
import GridIcon from '../ui/BaseGridIcon.vue';
import CustomSelect from '../ui/CustomSelect.vue';

const store = useShipsStore();
const { t } = useTranslation();

const showMoreFilters = ref(false);

const nationOptions = computed(() => [
  { value: null, label: t('all_nation') || 'All nations' },
  ...Object.entries(store.nations).map(([key, nation]) => ({
    value: key,
    label: nation.title,
    icon: nation.icons?.tiny
  }))
]);

const typeOptions = computed(() => [
  { value: null, label: t('all_classes') || 'All Classes' },
  ...Object.entries(store.types).map(([key, type]) => ({
    value: key,
    label: type.title,
    icon: type.icons?.normal
  }))
]);

const tierOptions = computed(() => [
  { value: null, label: t('all_tiers') || 'All tiers' },
  ...Array.from({ length: 11 }, (_, index) => ({
    value: index + 1,
    label: `${t('tier') || 'Tier'} ${toRomanTier(index + 1)}`
  }))
]);

const sortOptions = computed(() => [
  { value: 'level-desc' as const, label: t('sort_level_desc') || 'Tier (High to Low)' },
  { value: 'level-asc' as const, label: t('sort_level_asc') || 'Tier (Low to High)' },
  { value: 'title' as const, label: t('sort_by_name') || 'Name (A-Z)' }
]);
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

    @media (max-width: 639px) {
      .collapsible {
        display: none;

        &.is-open {
          display: flex;
        }
      }
    }

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

    .footer-main {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: 639px) {
        flex: 1 0 100%;
        justify-content: space-between;
      }
    }

    .view-toggle {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      background: none;
      border: none;
      border-radius: $radius-sm;
      color: $color-muted;
      cursor: pointer;
      transition: $transition-default;

      &:hover {
        color: #fff;
        font-weight: bold;
       
      }

      &.is-active {
        color:$color-gold;
        font-weight: bold;
      }
    }

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

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
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
      white-space: nowrap;

      &:hover {
        color: #fff;
      }
    }

    .more-filters-btn {
      display: none;
    }

    @media (max-width: 639px) {
      .footer-actions {
        margin-left: auto;
      }

      .more-filters-btn {
        display: inline-block;
      }

      .reset-btn:not(.more-filters-btn) {
        display: none;

        &.is-open {
          display: inline-block;
        }
      }
    }
  }
}
</style>