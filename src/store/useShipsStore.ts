import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchShipsData } from '../services/api';
import type { Ship, Nation, VehicleType } from '../types/shipTypes';

const LANG_STORAGE_KEY = 'wow-catalog-lang';
const DEFAULT_LANG = 'en';
const ITEMS_PER_PAGE = 20;

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
  const ships = ref<Ship[]>([]);
  const nations = ref<Record<string, Nation>>({});
  const types = ref<Record<string, VehicleType>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentLanguage = ref<string>(getSavedLanguage());
  const availableLanguages = ref<string[]>([]);

  const currentPage = ref(1);
  const isLoadingMore = ref(false);

  const searchQuery = ref('');
  const selectedNation = ref<string | null>(null);
  const selectedType = ref<string | null>(null);
  const selectedTier = ref<number | null>(null);
  const isPremiumOnly = ref(false);
  const sortBy = ref<'level-desc' | 'level-asc' | 'title'>('level-desc');
  const selectedShip = ref<Ship | null>(null);

  async function loadData() {
    isLoading.value = true;
    error.value = null;
    currentPage.value = 1;
    try {
      const data = await fetchShipsData(currentLanguage.value);
      ships.value = data.ships;
      nations.value = data.nations;
      types.value = data.types;
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
    loadData();
  }

  function resetFilters() {
    searchQuery.value = '';
    selectedNation.value = null;
    selectedType.value = null;
    selectedTier.value = null;
    isPremiumOnly.value = false;
    sortBy.value = 'level-desc';
    currentPage.value = 1;
  }

  function loadMore() {
    currentPage.value++;
  }

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
      result.sort((a, b) => a.title.localeCompare(b.title));
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
    isLoadingMore,
    error,
    searchQuery,
    selectedNation,
    selectedType,
    selectedTier,
    isPremiumOnly,
    sortBy,
    selectedShip,
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