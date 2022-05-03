<template>
  <div class="body">
    <Header />
    <div class="content">
      <div class="left">
        <img
          v-if="!isInSleepTime"
          src="../../assets/images/earth.gif"
          class="earth-img"
        >
        <Sleep v-if="isInSleepTime" />
        <div class="info">
          <Time />
        </div>
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Header from './components/Header.vue';
import Time from './components/Time.vue';
import { useStore } from 'vuex';
import Sleep from './components/Sleep.vue';
import hourjs from '/@/utils/hourjs';
import { loadSettings } from '/@/services/SettingService';

export default defineComponent({
  components: { Header, Time, Sleep },
  setup() {
    const store = useStore();

    const checkSleepTime = () => {
      const sleepTimeStr = store.getters.settings.sleepTime;
      if (!sleepTimeStr) return false;

      const sleepTimeStrArr = sleepTimeStr.split(';').map((ele: string) => {
        return ele.trim();
      });
      const now = hourjs();
      let isSleep = false;
      sleepTimeStrArr.forEach((timeStr: string) => {
        const times = timeStr.split('-');
        if (hourjs(times[1]).isBefore(times[0])) {
          // 跨天
          if (now.isBetween(times[0], '23:59:59') || now.isBetween('00:00:00', times[1])) {
            isSleep = true;
          }
        } else {
          // 非跨天
          if (now.isBetween(times[0], times[1])) {
            isSleep = true;
          }
        }
      });
      return isSleep;
    };

    const isInSleepTime = ref(checkSleepTime());

    onMounted(async () => {
      try {
        await loadSettings();
      } catch (e) {
        console.log(e);
      }
      setInterval(() => {
        isInSleepTime.value = checkSleepTime();
      }, 1000);
    });

    return { isInSleepTime };
  },
});
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-image: linear-gradient(#100d18, #0f487f);
}

.content {
  display: flex;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    padding-top: 80px;
    .earth-img {
      width: 150px;
      height: 150px;
      display: block;
    }

    .info {
      position: absolute;
      top: 450px;
    }
  }
}
</style>
