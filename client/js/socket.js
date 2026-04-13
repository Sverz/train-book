import { io }    from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js';
import { WS_URL } from './config.js';

export const socket = io(WS_URL, {
  auth:           { token: localStorage.getItem('token') },
  reconnection:   true,
  reconnectionDelay: 2000,
});

socket.on('connect_error', (err) => {
  console.warn('Socket error:', err.message);
});