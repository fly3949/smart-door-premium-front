import { createApp } from 'vue';
import App from './App.vue';
import './index.scss';
import router from './router';
import { WebSocketService } from './services/WebSocketService';
import store from './store';
import Notifications from '@kyvg/vue3-notification';

function connectWebsocket() {
  const ws = WebSocketService.getInstance();
  ws.connect();
}

const app = createApp(App);

app.use(router);
app.use(store);

app.use(Notifications);

app.mount('#app');

connectWebsocket();
