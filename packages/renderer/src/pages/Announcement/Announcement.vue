<template>
  <div class="announcement">
    <NavBar title="宿舍文化" />
    <div class="content">
      文化？能有啥文化？👇
      <div class="pay">
        <img
          src="../../assets/images/pay-wechat.png"
          class="pay-image pay-image__wechat"
        >
        <img
          src="../../assets/images/pay-alipay.jpg"
          class="pay-image pay-image__alipay"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
});
</script>

<style lang="scss">
.announcement {
  width: 480px;

  .content {
    text-align: center;
  }

  .pay {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .pay-image {
      height: 240px;

      & + .pay-image {
        margin-left: 20px;
      }
    }
  }
}
</style>
