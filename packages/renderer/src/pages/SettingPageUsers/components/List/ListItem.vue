<template>
  <div class="list-item">
    <div class="avatar">
      <img
        :src="`http://localhost:5000/admin/user/avatar?id=${data.id}`"
        class="avatar__image"
      >
    </div>
    <div class="info">
      <div class="info__name">
        {{ data.name }}
      </div>
      <div class="info__uid">
        {{ data.id }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { IUser } from '/@/types/user';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IUser>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
  width: 237px;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  .avatar {
    &__image {
      display: block;
      width: 100px;
      height: 70px;
      object-fit: cover;
    }
  }

  .info {
    margin-left: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__name {
      font-size: 18px;
    }

    &__uid {
      margin-top: 8px;
      font-size: 14px;
    }
  }
}
</style>
