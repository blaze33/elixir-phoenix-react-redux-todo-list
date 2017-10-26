import { Socket } from '../vendor/phoenix'
// import io from 'socket.io-client';


export function configureChannel() {
  let socket = new Socket('ws://127.0.0.1:4000/socket');
  // const socket = io('ws://127.0.0.1:4000/ws');
  socket.connect();

  let channel = socket.channel('todo');
  
  // channel.on('new:todo', msg => console.log('new:todo', msg));

  // channel.join()
  //   .receive('ok', messages => console.log('catching up', messages))
  //   .receive('error', reason => console.log('failed join', reason))

  return channel
}