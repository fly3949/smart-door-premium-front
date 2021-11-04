import { requestGetSettings } from '../apis/admin';
import store from '../store';

export async function loadSettings() {
  const res = await requestGetSettings();
  store.commit('setSettings', {
    cameraIndex: res.data.camera_index,
    adminPassword: res.data.admin_password,
    sleepTime: res.data.sleep_time,
  });
}
