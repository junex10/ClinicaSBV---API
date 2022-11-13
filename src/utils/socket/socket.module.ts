import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SequelizeModule } from "@nestjs/sequelize";
import {
  Chats,
  ChatUsers
} from 'src/models'

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      Chats,
      ChatUsers
    ])
  ],
  exports: [
    SocketService
  ],
  providers: [
    SocketService
  ]
})
export class SocketModule {}
