<template>
  <div class="keyboard">
    <div class="input">
      <input
        v-model="value"
        type="password"
      >
    </div>
    <div class="keys">
      <div
        v-for="i in [1,2,3,4,5,6,7,8,9]"
        :key="i"
        class="key"
        @click="handleInputNumber(i)"
      >
        <span class="number">{{ i }}</span>
      </div>
      <div
        class="key"
        @click="handleDelete()"
      >
        <span class="number iconfont iconclose" />
      </div>
      <div
        class="key"
        @click="handleInputNumber(0)"
      >
        <span class="number">0</span>
      </div>
      <div
        class="key"
        @click="handleSubmit()"
      >
        <span class="number iconfont iconselect" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    function handleInputNumber(number: number) {
      value.value += number.toString();
    }

    function handleDelete() {
      value.value = '';
    }

    function handleSubmit() {
      emit('submit', value.value);
    }

    watch(value, (val) => {
      emit('update:modelValue', val);
    });

    return { value, handleInputNumber, handleDelete, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  margin-bottom: 20px;

  input {
    width: 100%;
    text-align: center;
    background: none;
    border: none;
    pointer-events: none;
    font-size: 30px;
    color: #ffffff;
  }
}

.keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  align-content: space-between;
  width: 400px;
  height: 270px;

  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;

    .number {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 400;
      font-size: 36px;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3);

      &.iconfont {
        font-size: 30px;
      }
    }
  }
}
</style>
