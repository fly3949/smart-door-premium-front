import { createRouter, createMemoryHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout/MainLayout.vue';

import Menu from '/@/pages/Menu';
import PasswordEnter from '/@/pages/PasswordEnter';
import Announcement from '/@/pages/Announcement';
import SettingAuth from '/@/pages/SettingAuth';
import SettingMenu from '/@/pages/SettingMenu';
import SettingPageUsers from '/@/pages/SettingPageUsers';
import SettingPageConfig from '/@/pages/SettingPageConfig';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          component: Menu,
        },
        {
          path: '/password-enter',
          component: PasswordEnter,
        },
        {
          path: '/announcement',
          component: Announcement,
        },
        {
          path: '/setting-auth',
          component: SettingAuth,
        },
        {
          path: '/setting-menu',
          component: SettingMenu,
        },
        {
          path: '/setting-page-users',
          component: SettingPageUsers,
        },
        {
          path: '/setting-page-config',
          component: SettingPageConfig,
        },
      ],
    },
  ],
});

export default router;
