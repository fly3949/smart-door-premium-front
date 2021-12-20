<template>
  <div class="header">
    <div class="left flex">
      <div class="block block--blue" />
      <div class="title">
        {{ name }}
      </div>
    </div>
    <div class="right flex">
      <div class="block block--purple" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore }from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const name = computed(() => {
      return store.getters.settings.name;
    });

    return {name};
  },
});
</script>


<style lang="scss" scoped>
.header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;

  .block {
    width: 8px;
    height: 26px;

    &--blue {
      background-color: #0ca0f6;
    }

    &--purple {
      background-color: #6d71ee;
    }
  }

  .left {
    .title {
      margin-left: 8px;
      opacity: 0.9;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
}
</style>
