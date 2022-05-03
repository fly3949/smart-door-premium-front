<template>
  <div class="grids">
    <div class="grid grid--face">
      <Camera />
    </div>
    <div class="grid grid--weather">
      <Weather v-if="showWeather" />
    </div>
    <div
      class="grid grid--single grid--1"
      :class="{'grid--disabled': !socketConnected}"
      @click="navigateTo('/password-enter')"
    >
      <div class="grid__icon">
        <span class="iconfont iconkeyboard-9" />
      </div>
      <div class="grid__text">
        密码开锁
      </div>
    </div>
    <div
      class="grid grid--single grid--2"
      @click="navigateTo('/announcement')"
    >
      <div class="grid__icon">
        <span class="iconfont iconimage-text" />
      </div>
      <div class="grid__text">
        宿舍状态
      </div>
    </div>
    <div
      class="grid grid--single grid--3"
      :class="{'grid--disabled': !socketConnected}"
      @click="navigateTo('/setting-auth')"
    >
      <div class="grid__icon">
        <span class="iconfont iconsetting" />
      </div>
      <div class="grid__text">
        设置
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Weather from './components/Weather';
import Camera from './components/Camera';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Weather, Camera },
  setup() {
    const router = useRouter();
    const store = useStore();

    const showWeather = ref(true);

    // flush weather per 30 minutes
    onMounted(() => {
      setInterval(async () => {
        showWeather.value = false;
        await nextTick();
        showWeather.value = true;
      }, 1800000);
    });

    function navigateTo(path: string) {
      router.push({
        path,
      });
    }

    const socketConnected = computed(() => {
      return store.getters.socketConnected;
    });

    return { showWeather, navigateTo, socketConnected };
  },
});
</script>

<style lang="scss" scoped>
.grids {
  margin-top: 20px;
  width: 700px;
  height: 440px;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: 65% 35%;
  grid-row-gap: 10px;
  grid-column-gap: 10px;

  .grid {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    &--single {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .grid__icon {
        margin-bottom: 5px;

        .iconfont {
          color: #ffffff;
          font-size: 60px;
        }
      }

      .grid__text {
        color: #ffffff;
        font-size: 18x;
      }
    }

    &--disabled {
      background-color: #666666!important;
      pointer-events: none;
    }

    &--face {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    &--1 {
      background-color: #00bf9e;
    }

    &--2 {
      background-color: #9772d1;
    }

    &--3 {
      background-color: #06a3f2;
    }

    &--weather {
      height: 287px;
      width: 233px;
      /* transform: scale(0.89625); */
      transform-origin: 0 0;
      pointer-events: none;
    }
  }
}
</style>
