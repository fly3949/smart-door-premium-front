import websocketConfig from '../../../main/config/websocket';
import store from '../store';
import { notify } from '@kyvg/vue3-notification';

import { io } from 'socket.io-client';
import router from '../router';

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

    this.socket.on('message', (data:
      {
        success: boolean,
        message: string,
        data: Record<string, unknown>
      },
    ) => {
      if (data.success) {
        notify({
          type: 'success',
          title: '成功',
          text: data.message,
        });
      } else {
        notify({
          type: 'error',
          title: '失败',
          text: data.message,
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

    this.socket.on('config', (data:
      {
        success: boolean,
        message: string,
        data: {
          id: number,
          name: string
        }
      },
    ) => {
      if (data.success) {
        notify({
          type: 'success',
          title: '更新配置成功',
          text: data.message,
        });
        store.commit('setSettings', data.data);
      } else {
        notify({
          type: 'error',
          title: '更新配置失败',
          text: data.message,
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

  emit(topic: string, message?: unknown) {
    this.socket.emit(topic, message);
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }
}
