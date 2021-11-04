<template>
  <div class="wrapper">
    <div class="time">
      {{ timeText }}
    </div>
    <div class="date">
      {{ dateText }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import dayjs from '/@/utils/dayjs';

export default defineComponent({
  setup() {
    const date = ref(dayjs());

    const timeText = computed(() => {
      return date.value.format('HH:mm');
    });

    const dateText = computed(() => {
      return date.value.format('YYYY / MM / DD    dddd');
    });

    onMounted(() => {
      setInterval(() => {
        date.value = dayjs();
      }, 1000);
    });

    return { timeText, dateText };
  },
});
</script>

<style lang="scss" scoped>
  .wrapper {
    .time {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 200;
      font-size: 48px;
    }
    .date {
      font-size: 16px;
      white-space: pre-wrap;
    }
  }

</style>
