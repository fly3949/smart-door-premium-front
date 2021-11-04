<template>
  <div class="user-list">
    <div class="list">
      <Item
        v-for="item in userListDiaplayed"
        :key="item.id"
        :data="item"
        class="list-item"
        @click="handleEdit(item)"
      />
    </div>
    <div class="paginate">
      <div
        class="paginate__prev"
        :class="{disabled: !hasPrev}"
        @click="handleClickPrevPage"
      >
        上一页
      </div>
      <div class="paginate__num">
        {{ currentPage }} / {{ totalPage }}
      </div>
      <div
        class="paginate__next"
        :class="{disabled: !hasNext}"
        @click="handleClickNextPage"
      >
        下一页
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref} from 'vue';
import { defineComponent, onMounted, ref, computed } from 'vue';
import Item from './ListItem.vue';
import { requestGetUserList } from '/@/apis/admin';
import type { IUser } from '/@/types/user';

const ITEM_PER_PAGE = 4;

export default defineComponent({
  components: { Item },
  emits: ['edit'],
  setup(props, { emit }) {
    const userList: Ref<Array<IUser>> = ref([]);

    onMounted(async () => {
      try {
        const res = await requestGetUserList();
        userList.value = res.data;
      } catch (e) {
        console.log(e);
      }
    });

    const currentPage = ref(1);
    const totalPage = computed(() => {
      return Math.ceil(userList.value.length / ITEM_PER_PAGE);
    });
    const userListDiaplayed = computed(() => {
      return userList.value.slice((currentPage.value - 1) * ITEM_PER_PAGE, currentPage.value * ITEM_PER_PAGE);
    });
    const hasPrev = computed(() => {
      return currentPage.value !== 1;
    });
    const hasNext = computed(() => {
      return currentPage.value !== totalPage.value;
    });
    function handleClickPrevPage() {
      currentPage.value--;
    }
    function handleClickNextPage() {
      currentPage.value++;
    }

    function handleEdit(data: IUser) {
      emit('edit', data);
    }

    return {
      currentPage,
      totalPage,
      userListDiaplayed,
      hasPrev,
      hasNext,
      handleClickPrevPage,
      handleClickNextPage,
      handleEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-list {
  width: 100%;
}

.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 256px;

  .list-item {
    margin-bottom: 16px;
  }
}

.paginate {
  margin-top: 24px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  font-size: 24px;
  color: #ffffff;

  &__prev, &__next {
    cursor: pointer;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .disabled {
    pointer-events: none;
    color: rgba(255, 255, 255, 0.3);
    text-shadow: none;
  }
}
</style>
