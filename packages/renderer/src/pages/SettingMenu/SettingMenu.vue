<template>
  <div class="setting-menu">
    <NavBar title="设置菜单" />
    <div class="items">
      <Item
        title="更新配置"
        class="item"
        @click="handleUpdateConfig"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar.vue';
import Item from './components/Item.vue';
import { WebSocketService } from '../../services/WebSocketService';

export default defineComponent({
  components: { NavBar, Item },
  setup() {
    const handleUpdateConfig = () => {
      const ws = WebSocketService.getInstance();
      ws.emit('get_config', {});
    };

    return {
      handleUpdateConfig,
    };
  },
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
