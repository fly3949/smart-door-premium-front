<template>
  <div class="back">
    <div class="back__content">
      <div
        class="back__content__icon"
        @click="handleBackHome"
      >
        <span class="iconfont icondirection-left" />
      </div>
      <div class="back__content__title">
        {{ title }}
      </div>
    </div>
    <div class="back__right">
      <slot />
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
    customBack: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['back'],
  setup(props, { emit }) {
    const router = useRouter();

    function handleBackHome() {
      if (props.customBack) {
        emit('back');
      } else {
        router.push({
          path: '/',
        });
      }
    }

    return { handleBackHome };
  },
});
</script>

<style lang="scss">
.back {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back__content {
  display: flex;
  align-items: center;

  &__icon {
    box-sizing: border-box;
    display: flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px solid #ffffff;
    border-radius: 100%;

    .iconfont {
      font-size: 22px;
    }
  }

  &__title {
    font-size: 24px;
    line-height: 36px;
    margin-left: 12px;
  }
}
</style>
