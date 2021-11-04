<template>
  <div class="user-list">
    <NavBar
      v-if="componentName === 'List'"
      title="用户列表"
      custom-back
      @back="handleBack"
    >
      <template #default>
        <div class="add">
          <div
            class="add__icon"
            @click="handleEdit()"
          >
            <span class="iconfont iconadd" />
          </div>
        </div>
      </template>
    </NavBar>
    <NavBar
      v-if="componentName === 'Edit'"
      :title="editData ? '编辑用户' : '新建用户'"
      custom-back
      @back="handleEditBack"
    />

    <component
      :is="componentName"
      :data="editData"
      @edit="handleEdit"
      @back="handleEditBack"
    />
  </div>
</template>

<script lang="ts">
import type { Ref} from 'vue';
import { defineComponent, ref } from 'vue';
import NavBar from '../../components/NavBar.vue';
import { List, Edit } from './components';
import { useRouter } from 'vue-router';
import type { IUser } from '/@/types/user';

export default defineComponent({
  components: { NavBar, List, Edit },
  setup() {
    const componentName = ref('List');
    const editData: Ref<IUser|null> = ref(null);

    const router = useRouter();

    function handleBack() {
      router.push({
        path: '/setting-menu',
      });
    }

    function handleEditBack() {
      editData.value = null;
      componentName.value = 'List';
    }

    function handleEdit(data?: IUser) {
      editData.value = data || null;
      componentName.value = 'Edit';
    }

    return { componentName, handleBack, handleEditBack, handleEdit, editData };
  },
});
</script>

<style lang="scss" scoped>
.user-list {
  width: 490px;
}

.add {
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
}
</style>
