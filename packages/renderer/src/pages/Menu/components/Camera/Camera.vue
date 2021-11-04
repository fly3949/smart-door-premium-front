<template>
  <div class="menu-camera">
    <img
      v-if="socketConnected && imageDataUrl && imageDataUrl.length"
      :src="imageDataUrl"
      class="camera__image"
    >
    <div
      v-if="!socketConnected"
      class="unactive disconnect"
    >
      <span class="iconfont iconwarning unactive__icon" />
      <div class="unactive__text">
        服务未连接
      </div>
    </div>
    <div
      v-if="socketConnected && (!imageDataUrl || !imageDataUrl.length)"
      class="unactive no-image"
    >
      <span class="iconfont iconFaceID unactive__icon" />
      <div class="unactive__text">
        无图像信息
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const imageDataUrl = computed(() => {
      return store.getters.image;
    });

    const socketConnected = computed(() => {
      return store.getters.socketConnected;
    });

    return { imageDataUrl, socketConnected };
  },
});
</script>

<style lang="scss">
.menu-camera {
  height: 100%;
}

.camera__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.unactive {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__icon {
    font-size: 60px;
  }

  &__text {
    margin-top: 10px;
    font-size: 16px;
  }

  &.disconnect {
    background-color: #ff5c10;
  }

  &.no-image {
    background-color: #2d8ddb;
  }
}
</style>
