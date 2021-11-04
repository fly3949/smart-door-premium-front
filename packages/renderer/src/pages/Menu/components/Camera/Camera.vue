<template>
  <div class="menu-camera">
    <img
      v-if="socketConnected"
      :src="imageDataUrl"
      class="camera__image"
    >
    <div
      v-else
      class="disconnect"
    >
      <span class="iconfont iconwarning disconnect__icon" />
      <div class="disconnect__text">
        服务未连接
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

.disconnect {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ff5c10;

  &__icon {
    font-size: 60px;
  }

  &__text {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
