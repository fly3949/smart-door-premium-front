<template>
  <div class="setting-menu">
    <NavBar title="设置菜单" />
    <div class="items">
      <Item
        title="人员管理"
        path="/setting-page-users"
        class="item"
      />
      <Item
        title="系统设置"
        path="/setting-page-config"
        class="item"
      />
      <Item
        title="系统功能"
        path="/"
        class="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar.vue';
import Item from './components/Item.vue';

export default defineComponent({
  components: { NavBar, Item },
});
</script>

<style lang="scss" scoped>
.setting-menu {
  width: 490px;
}

.items {
  .item + .item {
    margin-top: 16px;
  }
}
</style>
