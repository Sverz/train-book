import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SchedulesGateway {
  @WebSocketServer()
  server: Server;

  notifyUpdate() {
    this.server.emit('schedule:update');
  }
}
