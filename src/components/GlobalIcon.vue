<template>
  <svg 
    viewBox="0 0 24 24" 
    :width="size" 
    :height="size" 
    stroke="currentColor" 
    stroke-width="2" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 18
  }
})
</script>