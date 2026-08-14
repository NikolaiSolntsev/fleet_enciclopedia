<template>
  <div class="skeleton-card">
    <div class="skeleton-media"></div>
    <div class="skeleton-info">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line meta"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.skeleton-card {
  background-color: $color-card;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  overflow: hidden;
  height: 256px;
  display: flex;
  flex-direction: column;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  animation: pulse 1.5s infinite ease-in-out;

  .skeleton-media {
    height: 160px;
    background-color: rgba($color-panel, 0.6);
  }

  .skeleton-info {
    padding: 1rem;
    background-color: $color-panel;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .skeleton-line {
      background-color: rgba($color-border, 0.5);
      border-radius: $radius-sm;

      &.title {
        height: 16px;
        width: 75%;
      }
      &.meta {
        height: 12px;
        width: 50%;
      }
    }
  }
}
</style>