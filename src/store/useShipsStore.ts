import { defineStore } from 'pinia';
import { ref, computed, shallowRef, markRaw, watch } from 'vue';
import { fetchShipsData } from '../services/api';
import { pickLocalized } from '@/utils/localization';
import type { RawShip, RawNation, RawVehicleType, Ship, Nation, VehicleType } from '../types/shipTypes';

const LANG_STORAGE_KEY = 'wow-catalog-lang';
const DEFAULT_LANG = 'en';
const ITEMS_PER_PAGE = 20;


const titleCollator = new Intl.Collator(undefined);

function getSavedLanguage(): string {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
  }
  return DEFAULT_LANG;
}

function saveLanguage(lang: string): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }
}

export const useShipsStore = defineStore('ships', () => {
  const rawShips = shallowRef<RawShip[]>([]);
  const rawNations = shallowRef<Record<string, RawNation>>({});
  const rawTypes = shallowRef<Record<string, RawVehicleType>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentLanguage = ref<string>(getSavedLanguage());
  const availableLanguages = ref<string[]>([]);

  const currentPage = ref(1);

  const searchQuery = ref('');
  const selectedNation = ref<string | null>(null);
  const selectedType = ref<string | null>(null);
  const selectedTier = ref<number | null>(null);
  const isPremiumOnly = ref(false);
  const sortBy = ref<'level-desc' | 'level-asc' | 'title'>('level-asc');
  const selectedShip = ref<Ship | null>(null);
  const viewMode = ref<'grid' | 'list'>('grid');


  const nations = computed<Record<string, Nation>>(() => {
    const result: Record<string, Nation> = {};
    Object.entries(rawNations.value).forEach(([key, nation]) => {
      result[key] = {
        ...nation,
        title: pickLocalized(nation.localization, 'mark', currentLanguage.value, nation.name || key)
      };
    });
    return result;
  });

  const types = computed<Record<string, VehicleType>>(() => {
    const result: Record<string, VehicleType> = {};
    Object.entries(rawTypes.value).forEach(([key, type]) => {
      result[key] = {
        ...type,
        title: pickLocalized(type.localization, 'mark', currentLanguage.value, key)
      };
    });
    return result;
  });

  const ships = computed<Ship[]>(() => {
    return rawShips.value.map(ship => ({
      ...ship,
      title: pickLocalized(ship.localization, 'shortmark', currentLanguage.value, ship.name),
      description: pickLocalized(ship.localization, 'description', currentLanguage.value)
    }));
  });

  async function loadData() {
    isLoading.value = true;
    error.value = null;
    currentPage.value = 1;
    try {
      const data = await fetchShipsData();
      rawShips.value = markRaw(data.ships);
      rawNations.value = data.nations;
      rawTypes.value = data.types;
      if (data.languages) {
        availableLanguages.value = data.languages;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load data';
      console.error('Failed to load ships data:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function setLanguage(lang: string) {
    currentLanguage.value = lang;
    saveLanguage(lang);
  }

  function resetFilters() {
    searchQuery.value = '';
    selectedNation.value = null;
    selectedType.value = null;
    selectedTier.value = null;
    isPremiumOnly.value = false;
    sortBy.value = 'level-asc';
    currentPage.value = 1;
  }

  function loadMore() {
    currentPage.value++;
  }

  // Без сброса страницы новый результат фильтрации сразу отрисуется столько сколько было отрисовано
  watch(
    [searchQuery, selectedNation, selectedType, selectedTier, isPremiumOnly, sortBy],
    () => {
      currentPage.value = 1;
    }
  );

  const allFilteredShips = computed(() => {
    let result = ships.value.filter(ship => {
      if (searchQuery.value && !ship.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false;
      }
      if (selectedNation.value && ship.nation !== selectedNation.value) return false;
      if (selectedType.value && ship.type !== selectedType.value) return false;
      if (selectedTier.value && ship.level !== selectedTier.value) return false;
      if (isPremiumOnly.value && !ship.is_premium) return false;
      return true;
    });

    if (sortBy.value === 'level-desc') {
      result.sort((a, b) => b.level - a.level);
    } else if (sortBy.value === 'level-asc') {
      result.sort((a, b) => a.level - b.level);
    } else if (sortBy.value === 'title') {
      result.sort((a, b) => titleCollator.compare(a.title, b.title));
    }

    return result;
  });

  const filteredShips = computed(() => {
    const start = 0;
    const end = currentPage.value * ITEMS_PER_PAGE;
    return allFilteredShips.value.slice(start, end);
  });

  const totalFilteredCount = computed(() => allFilteredShips.value.length);

  const hasMore = computed(() => {
    return filteredShips.value.length < totalFilteredCount.value;
  });

  return {
    ships,
    nations,
    types,
    isLoading,
    error,
    searchQuery,
    selectedNation,
    selectedType,
    selectedTier,
    isPremiumOnly,
    sortBy,
    selectedShip,
    viewMode,
    currentLanguage,
    availableLanguages,
    currentPage,
    filteredShips,
    totalFilteredCount,
    hasMore,
    loadData,
    loadMore,
    resetFilters,
    setLanguage
  };
});