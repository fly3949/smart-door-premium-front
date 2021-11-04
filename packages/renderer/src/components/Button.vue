<template>
  <div
    class="button"
    :class="[
      `button-type--${type}`,
      `button-size--${size}`
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String as PropType<'default'|'medium'|'small'|'large'>,
      default: 'default',
    },
    type: {
      type: String as PropType<'default'|'success'|'warning'|'error'>,
      default: 'default',
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  padding: 8px 16px;
  cursor: pointer;

  &-size {
    &--default, &--medium {
      height: 20px;
      font-size: 16px;
    }
  }
  &-type {
    &--default {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &--success {
      background-color: rgba(0, 173, 52, 0.6);
    }
    &--warning {
      background-color: rgba(255, 104, 34, 0.6);
    }
  }
}
</style>
