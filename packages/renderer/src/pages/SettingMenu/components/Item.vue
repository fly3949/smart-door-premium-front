<template>
  <div
    class="setting-item"
    @click="handleClick"
  >
    <div class="item__text">
      {{ title }}
    </div>
    <div class="item__arrow">
      <span class="number iconfont iconarrow-right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const router = useRouter();

    function handleClick() {
      if (props.path) {
        router.push({ path: props.path });
      }
    }

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.setting-item {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  .item {
    &__text {
      font-size: 20px;
      color: #ffffff;
    }

    &__arrow {
      .iconfont {
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
}
</style>
