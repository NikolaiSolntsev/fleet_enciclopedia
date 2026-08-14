<!-- <template>
  <div class="custom-select">
    <button
      class="select-trigger"
      @click="isOpen = !isOpen"
      @blur="isOpen = false"
    >
      <span class="select-value">{{ displayValue }}</span>
      <span class="select-arrow">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-list">
      <button
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="option-item"
        :class="{ active: modelValue === option.value }"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Option {
  value: any;
  label: string;
}

const props = defineProps<{
  options: Option[];
  modelValue: any;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const isOpen = ref(false);

const displayValue = computed(() => {
  const selected = props.options.find((opt: Option) => opt.value === props.modelValue);
  return selected?.label || 'Select...';
});

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};
</script>
<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;

  .select-trigger {
    width: 100%;
    background-color: $color-panel;
    border: 2px solid #3a7f8f;
    border-radius: $radius-sm;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: $color-text;
    outline: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

    &:focus {
      border-color: #3a7f8f;
    }

    .select-arrow {
      font-size: 0.6rem;
      color: #9ca3af;
      transition: transform 0.2s;
    }
  }

  .dropdown-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: rgba($color-panel, 0.9);
    border: 2px solid #3a7f8f;
    border-radius: $radius-sm;
    max-height: 200px;
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
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      color: $color-muted;
      font-size: 0.875rem;
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
</style> -->
