<template>
  <div
    ref="rootRef"
    class="custom-select"
    :style="{ '--option-icon-size': `${iconSize}px` }"
  >
    <button
      type="button"
      class="select-trigger"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
    >
     
      <span class="select-value">
        <span class="option-label">{{ selected?.label ?? placeholder }}</span>
      </span>
      <span class="select-arrow">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-list">
      <button
        v-for="option in options"
        :key="String(option.value)"
        type="button"
        class="option-item"
        :class="{ active: modelValue === option.value }"
        @click="selectOption(option)"
      >
        <img v-if="option.icon" :src="option.icon" alt="" class="option-icon" />
        <span class="option-label">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number | null">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface SelectOption {
  value: T;
  label: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    modelValue: T;
    placeholder?: string;
    iconSize?: number;
  }>(),
  { placeholder: '', iconSize: 24 }
);

const emit = defineEmits<{
  'update:modelValue': [value: T];
}>();

const rootRef = ref<HTMLElement>();
const isOpen = ref(false);

const selected = computed(() => props.options.find((option) => option.value === props.modelValue));

function selectOption(option: SelectOption) {
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

function onDocumentClick(event: MouseEvent) {
  if (!isOpen.value) return;
  if (rootRef.value?.contains(event.target as Node)) return;
  isOpen.value = false;
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;

  .option-icon {
    flex: none;
    height: var(--option-icon-size);
    max-width: var(--option-icon-size);
    width: auto;
    object-fit: contain;
  }

  .option-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-trigger {
    width: 100%;
    background-color: $color-panel;
    border: 2px solid #3a7f8f;
    border-radius: $radius-sm;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: $color-text;
    outline: none;
    transition: $transition-default;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    cursor: pointer;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

    &:focus-visible,
    &.is-open {
      border-color: $color-emerald;
      box-shadow: 0 0px 15px 10px $color-emerald;
    }

    .select-value {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
    }

    .select-arrow {
      flex: none;
      font-size: 0.6rem;
      color: $color-muted;
    }
  }

  .dropdown-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: rgba($color-panel, 0.95);
    border: 2px solid #3a7f8f;
    border-radius: $radius-sm;
    max-height: 240px;
    overflow-y: auto;
    z-index: 100;
    box-shadow:
      inset 1px 1px 0px rgba(255, 255, 255, 0.1),
      0 4px 6px rgba(0, 0, 0, 0.3);

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .option-item {
      width: 100%;
      padding: 0.6rem 0.75rem;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      color: $color-muted;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      transition: all 0.15s ease-in-out;

      &:hover {
        box-shadow: inset 0 0 20px 5px #3a7f8f;
        color: #1fffbc;
      }

      &.active {
        border-top: 1px solid #3a7f8f;
        border-bottom: 1px solid #3a7f8f;
        box-shadow: inset 0 0 20px 5px #3a7f8f;
        color: $color-text;
        font-weight: bold;
      }
    }
  }
}
</style>
