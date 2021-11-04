<template>
  <div
    class="form-item"
    :class="[`form-item-style--${formItemStyle}`]"
  >
    <div
      v-if="label"
      class="form-item__label"
      :style="{width: `${labelWidth}px`}"
    >
      {{ label }}
    </div>
    <div
      v-if="label"
      class="form-item__colon"
    >
      ：
    </div>
    <div class="form-item__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    formItemStyle: {
      type: String as PropType<'inline'|'wrap'>,
      default: 'inline',
    },
    labelWidth: {
      type: Number,
      default: 40,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.form-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 16px;

  &__label {
    text-align: justify;
    text-align-last: justify;
    line-height: 20px;
  }

  &__content {
    flex: 1;
    line-height: 20px;
  }
}
</style>
