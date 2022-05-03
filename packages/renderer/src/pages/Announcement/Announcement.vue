<template>
  <div class="announcement">
    <NavBar title="宿舍状态" />
    <div class="content">
      宿舍成员信息
      <table class="table">
        <thead>
          <tr>
            <th>照片</th>
            <th>床位</th>
            <th>姓名</th>
            <th>学号</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="index"
          >
            <td>
              <img
                class="avatar"
                :src="item.avatar"
              >
            </td>
            <td>{{ item.bed }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
  setup() {
    const data = [
      {
        bed: '1',
        name: '陈鸿飞',
        id: '1910610054',
        status: '已签到（36.5°C）',
        avatar: '../../../assets/avatar/1.jpg',
      },
      {
        bed: '2',
        name: '王准衡',
        id: '1911630215',
        status: '已签到（36.2°C）',
        avatar: '../../../assets/avatar/2.jpg',
      },
      {
        bed: '3',
        name: '张涵',
        id: '1911630226',
        status: '已签到（36.8°C）',
        avatar: '../../../assets/avatar/3.jpg',
      },
    ];

    return {
      data,
    };
  },
});
</script>

<style lang="scss">
.announcement {
  width: 700px;

  .content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .table {
    margin-top: 20px;
    width: 600px;

    .avatar {
      height: 75px;
      width: 60px;
      object-fit: cover;
    }
  }
}
</style>
