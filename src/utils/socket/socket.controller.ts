import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import SocketEvents from './socket.events';
import { SocketService } from './socket.service';
import fetch from 'cross-fetch';
import {
   NewMessageDTO
} from './socket.entity';

const HEADERS = {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
}

@WebSocketGateway()
export class SocketController {

   @WebSocketServer() server: Server;

   constructor(private readonly socketService: SocketService) {

   }

   // Chat

   @SubscribeMessage(SocketEvents.PATIENT.CHAT.NEW_MESSAGE)
   async newMessage(@MessageBody() request: NewMessageDTO) {
      const message = await this.socketService.newMessage(request);
      this.server.emit(SocketEvents.PATIENT.CHAT.NEW_MESSAGE, message);
   }
}