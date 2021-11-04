<template>
  <div class="sleep">
    <img
      src="../../../assets/images/sleep-cat.png"
      class="sleep__image"
    >
    <div class="sleep__title">
      请勿打扰
    </div>
    <!-- <div class="sleep__tip">
      睡觉中 ಠಿ_ಠ
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.sleep {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    margin-left: 15px;
    width: 150px;
    display: block;
  }

  &__title {
    margin-top: 16px;
    // font-size: 28px;
    font-size: 20px;
    color: #ffffff;
  }

  &__tip {
    font-size: 14px;
  }
}
</style>
