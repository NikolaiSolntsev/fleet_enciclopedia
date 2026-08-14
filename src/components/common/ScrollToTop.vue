<template>
  <transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top"
      :title="t('back_to_top', 'Back to top')"
      aria-label="Back to top"
    >
      ↑
    </button>
  </transition>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue';
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
const { t } = useTranslation();

function handleScroll() {
  isVisible.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(180deg, rgba($color-panel, 0.5) 0%, rgba(#1fffbc, 0.5) 100%);
  border: 2px solid rgba($color-gold, 0.5);
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 40;
  backdrop-filter: blur(5px);

  &:hover {
    background: linear-gradient(180deg, rgba(#00aaff, 0.9) 0%, rgba(#1fffbc, 0.9) 100%);
    border-color: #1fffbc;
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(#1fffbc, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
