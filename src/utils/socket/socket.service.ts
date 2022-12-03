import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import SocketEvents from './socket.events';
import {
	Chats,
	ChatUsers
} from "src/models";
import {
	NewMessageDTO
} from './socket.entity';
import { Constants } from 'src/utils';
import { Op } from 'sequelize';

@Injectable()
export class SocketService {

	constructor(
		@InjectModel(Chats) private chatModel: typeof Chats,
		@InjectModel(ChatUsers) private chatUsersModel: typeof ChatUsers
	) {

	}
	// Chat
	newMessage = async (request: NewMessageDTO) => {
		const chat = await this.chatModel.create({
			chat_session_id: request.session_id,
			sender_id: request.sender_id,
			message: request.message
		});
		if (chat) {
			await this.chatUsersModel.update(
				{
					viewed: Constants.CHATS.VIEWED.UNREAD
				},
				{
					where: {
						chat_session_id: request.session_id,
						user_id: {
							[Op.ne]: request.sender_id
						}
					}
				}
			);
			const getNewChat = await this.chatModel.findOne({ where: { id: chat.id }, include: ['attachments_chats'] });
			return getNewChat;
		}
		return null;
	}
}
