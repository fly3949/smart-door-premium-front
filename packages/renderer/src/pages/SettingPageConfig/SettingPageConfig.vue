<template>
  <div class="setting-page-config">
    <NavBar
      title="系统设置"
      custom-back
      @back="handleBack"
    />
    <div class="setting">
      <div class="setting__form">
        <FormItem
          label="摄像头编号"
          :label-width="90"
        >
          <Input v-model="formData.cameraIndex" />
        </FormItem>
        <FormItem
          label="管理员密码"
          :label-width="90"
        >
          <Input
            v-model="formData.adminPassword"
            type="password"
          />
        </FormItem>
        <FormItem
          label="勿扰时间段"
          :label-width="90"
        >
          <Input v-model="formData.sleepTime" />
        </FormItem>
      </div>
      <div class="setting__action">
        <Button
          type="success"
          @click="handleSave"
        >
          保存
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '/@/components/NavBar.vue';
import Button from '/@/components/Button.vue';
import FormItem from '/@/components/FormItem.vue';
import Input from '/@/components/Input.vue';
import { requestEditSettings, requestGetSettings } from '/@/apis/admin';
import { notify } from '@kyvg/vue3-notification';
import { useStore } from 'vuex';

export default defineComponent({
  components: { NavBar, Button, FormItem, Input },
  setup() {
    const router = useRouter();
    const store = useStore();

    const formData = reactive({
      cameraIndex: '',
      adminPassword: '',
      sleepTime: '',
    });

    function handleBack() {
      router.push({
        path: '/setting-menu',
      });
    }

    onMounted(async () => {
      try {
        const res = await requestGetSettings();
        formData.cameraIndex = res.data.camera_index;
        formData.adminPassword = res.data.admin_password;
        formData.sleepTime = res.data.sleep_time;
        store.commit('setSettings', Object.assign({}, formData));
      } catch (e) {
        console.log(e);
      }
    });

    async function handleSave() {
      try {
        await requestEditSettings({
          camera_index: formData.cameraIndex,
          admin_password: formData.adminPassword,
          sleep_time: formData.sleepTime,
        });
        notify({
          type: 'success',
          title: '保存成功',
          text: '系统设置已更新',
        });
        store.commit('setSettings', Object.assign({}, formData));
      } catch (e) {
        console.log(e);
      }
    }

    return { handleBack, formData, handleSave };
  },
});
</script>

<style lang="scss" scoped>
.setting-page-config {
  width: 490px;
}

.setting {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;

  &__action {
    margin-top: 36px;
  }
}
</style>
