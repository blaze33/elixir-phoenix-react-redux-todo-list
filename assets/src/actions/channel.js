import { Socket } from 'phoenix'

export function configureChannel() {
  const socket = new Socket('ws://127.0.0.1:4000/socket');
  socket.connect();
  const channel = socket.channel('todo');
  return channel
}