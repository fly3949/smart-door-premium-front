import websocketConfig from '../../../main/config/websocket';
import store from '../store';
import { notify } from '@kyvg/vue3-notification';

import { io } from 'socket.io-client';
import router from '../router';
import { loadSettings } from './SettingService';

export class WebSocketService {
  private socket = io(websocketConfig.websocketUrl, {
    autoConnect: false,
  });

  private interval = 0;

  static instance: WebSocketService;

  connect() {
    this.socket.connect();
  }

  constructor() {
    // console.log(this.socket)
    this.socket.on('connect', () => {
      console.log('WebSocket connected, ID:' + this.socket.id);
      store.commit('setSocketConnected', { value: true });
      this.startIntervalFunction();
      loadSettings();
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected.');
      store.commit('setSocketConnected', { value: false });
      this.stopIntervalFunction();
    });

    this.socket.on('camera', (data: string) => {
      if (data && data.length) {
        store.commit('setImage', { value: 'data:image/jpg;base64,' + data });
      } else {
        store.commit('setImage', { value: '' });
      }
    });

    this.socket.on('face_detected', (data:
      {
        success: boolean,
        name: string
      },
    ) => {
      if (data.success) {
        notify({
          type: 'success',
          title: '识别成功',
          text: `欢迎回来，${data.name}`,
        });
      } else {
        notify({
          type: 'error',
          title: '识别失败',
          text: '未注册的人脸信息',
        });
      }
      console.log(data);
    });

    this.socket.on('remote_open', (data:
      {
        success: boolean
      },
    ) => {
      if (data.success) {
        notify({
          type: 'success',
          title: '开锁成功',
          text: '远程开锁成功',
        });
      } else {
        notify({
          type: 'error',
          title: '开锁失败',
          text: '远程开锁失败',
        });
      }
      console.log(data);
    });
  }

  startIntervalFunction() {
    this.interval = window.setInterval(() => {
      const isInHomePage = router.currentRoute.value.path === '/';
      this.socket.emit('status', {
        isInHomePage,
      });
    }, 1000);
  }

  stopIntervalFunction() {
    window.clearInterval(this.interval);
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }
}
