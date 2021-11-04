<template>
  <div class="edit">
    <div class="content">
      <div class="left">
        <div class="avatar">
          <Camera v-if="avatarStatus === 'capturing'" />
          <img
            v-if="avatarStatus === 'saved'"
            :src="avatarDataUri"
            class="avatar__image"
          >
        </div>
        <div class="avatar-action">
          <Button
            v-if="avatarStatus === 'saved'"
            @click="handleStartCapture"
          >
            重拍
          </Button>
          <Button
            v-if="avatarStatus === 'capturing'"
            type="success"
            @click="handleSaveAvatar"
          >
            保存
          </Button>
          <Button
            v-if="avatarStatus === 'capturing'"
            @click="avatarStatus = 'saved'"
          >
            取消
          </Button>
        </div>
      </div>
      <div class="right">
        <div
          v-if="editData"
          class="form"
        >
          <FormItem label="编号">
            {{ editData.id }}
          </FormItem>
          <FormItem label="姓名">
            <Input v-model="editData.name" />
          </FormItem>
          <FormItem label="密码">
            <Input
              v-model="editData.password"
              type="password"
            />
          </FormItem>
        </div>
        <div class="form-action">
          <Button
            type="success"
            @click="handleEditUser"
          >
            保存
          </Button>
          <Button
            type="warning"
            @click="handleDeleteUser"
          >
            删除
          </Button>
        </div>
      </div>
    </div>
    <!-- <div class="action">
      12321
    </div> -->
  </div>
</template>

<script lang="ts">
import type { PropType, Ref} from 'vue';
import { defineComponent, onMounted, ref } from 'vue';
import Camera from './components/Camera';
import type { IUser } from '/@/types/user';
import Button from '/@/components/Button.vue';
import FormItem from '/@/components/FormItem.vue';
import Input from '/@/components/Input.vue';
import { requestAddUser, requestDeleteUser, requestEditUser, requestSaveUserAvatar } from '/@/apis/admin';
import { notify } from '@kyvg/vue3-notification';
import swal from 'sweetalert';

export default defineComponent({
  components: { Camera, Button, FormItem, Input },
  props: {
    data: {
      type: Object as PropType<IUser>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const avatarStatus: Ref<'saved'|'capturing'> = ref('saved');
    const avatarDataUri = ref('');
    const editData: Ref<IUser|null> = ref(null);

    onMounted(() => {
      if (props.data) {
        editData.value = props.data;
        avatarDataUri.value = `http://localhost:5000/admin/user/avatar?id=${props.data.id}`;
        avatarStatus.value = 'saved';
      } else {
        getNewUserInfo();
        avatarStatus.value = 'capturing';
      }
    });

    async function getNewUserInfo() {
      try {
        const res = await requestAddUser();
        editData.value = res.data;
        avatarDataUri.value = `http://localhost:5000/admin/user/avatar?id=${res.data.id}`;
      } catch (e) {
        console.log(e);
      }
    }

    function handleStartCapture() {
      avatarStatus.value = 'capturing';
    }

    async function handleSaveAvatar() {
      // notify({
      //   title: '请稍候',
      //   text: '保存中，请稍候'
      // })

      try {
        await requestSaveUserAvatar({
          id: editData.value!.id,
        });
        const randNum = Math.round(Math.random() * 10000000);
        avatarDataUri.value = `http://localhost:5000/admin/user/avatar?id=${editData.value!.id}&_r=${randNum}`;
        avatarStatus.value = 'saved';

        notify({
          type: 'success',
          title: '保存成功',
          text: '人脸信息已更新',
        });
      } catch (e) {
        console.log(e);
      }
    }

    async function handleEditUser() {
      try {
        await requestEditUser(editData.value!);
        notify({
          type: 'success',
          title: '保存成功',
          text: '用户信息已更新',
        });
      } catch (e) {
        console.log(e);
      }
    }

    async function handleDeleteUser() {
      const confirm = await swal({
        title: '删除确认',
        text: '是否确认删除该用户？',
        icon: 'warning',
        buttons: ['取消', '确定'],
        dangerMode: true,
      });
      if (!confirm) return;

      try {
        await requestDeleteUser({ id: editData.value!.id });
        notify({
          type: 'success',
          title: '删除成功',
          text: '用户删除成功',
        });
        emit('back');
      } catch (e) {
        console.log(e);
      }
    }

    return {
      avatarStatus,
      avatarDataUri,
      handleStartCapture,
      handleSaveAvatar,
      editData,
      handleEditUser,
      handleDeleteUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
}

.content {
  width: 100%;
  height: 300px;
  // height: 230px;
  display: flex;

  .left {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 150px;
      height: 100px;

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__blank {
        width: 100%;
        height: 100%;
        background: #666666;
      }
    }

    .avatar-action {
      margin-top: 24px;
      width: 170px;
      display: flex;
      justify-content: space-around;
    }
  }

  .right {
    margin-left: 32px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form-action {
      width: 180px;
      display: flex;
      justify-content: space-around;
    }
  }
}

.action {
  margin-top: 20px;
  width: 100%;
  height: 60px;
}
</style>
