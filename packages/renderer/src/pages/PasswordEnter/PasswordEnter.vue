<template>
  <div class="password-enter">
    <NavBar title="密码开锁" />
    <NumberPasswordKeyboard
      v-model="password"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue';
import { requestOpenDoorByPassword } from '/@/apis/door';
import NumberPasswordKeyboard from '/@/components/NumberPasswordKeyboard.vue';

export default defineComponent({
  components: { NavBar, NumberPasswordKeyboard },
  setup() {
    const router = useRouter();

    const password = ref('');

    const handleSubmit = async () => {
      if (password.value === '') {
        notify({
          type: 'error',
          title: '错误',
          text: '请输入密码',
        });
        return;
      }

      try {
        const res = await requestOpenDoorByPassword({ password: password.value });
        router.push({ path: '/' });
        notify({
          type: 'success',
          title: '开锁成功',
          text: `欢迎回来，${res.data.name}`,
        });
      } catch (e) {
        console.log(e);
      }
    };

    return { password, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
.password-enter {
  width: 700px;
}
</style>
