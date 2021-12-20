import { WebSocketService } from './WebSocketService';

export async function loadSettings() {
  const ws = WebSocketService.getInstance();
  ws.emit('get_config');
  console.log('get_config');
}
