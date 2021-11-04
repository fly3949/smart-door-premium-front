<template>
  <div class="setting-auth">
    <NavBar title="验证管理密码" />
    <NumberPasswordKeyboard
      v-model="password"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { requestAdminLogin } from '/@/apis/admin';
import NavBar from '../../components/NavBar.vue';
import NumberPasswordKeyboard from '/@/components/NumberPasswordKeyboard.vue';
import { notify } from '@kyvg/vue3-notification';

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
        await requestAdminLogin({ password: password.value });
        router.push({ path: '/setting-menu' });
      } catch (e) {
        console.log(e);
      }
    };

    return { password, handleSubmit };
  },
});
</script>

<style lang="scss">
.setting-auth {
  width: 480px;
}
</style>
