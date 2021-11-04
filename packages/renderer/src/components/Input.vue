<template>
  <div class="input">
    <input
      :value="modelValue"
      :type="type"
      class="input__input"
      @input="handleInputChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
emits: ['update:modelValue'],
  setup(props, { emit }) {
    function handleInputChange(e: any) {
      emit('update:modelValue', e.target.value || '');
    }

    return { handleInputChange };
  },
});
</script>

<style lang="scss" scoped>
.input {
  &__input {
    box-sizing: border-box;
    width: 100%;
    font-size: 18px;
  }
}
</style>
