import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {
	User,
	ChatSession,
	Chats,
	ChatUsers,
	AttachmentsChats
} from "src/models";
import { MailerService } from '@nestjs-modules/mailer';
import {
	DeleteDTO,
	GetChatsDTO,
	GetLogsDTO,
	NewChatDTO,
	NewMessageDTO,
	ViewedDTO
} from './chat.entity';
import { Constants } from 'src/utils';
import { Op } from 'sequelize';
import * as fs from 'fs';

@Injectable()
export class ChatService {

	constructor(
		@InjectModel(User) private userModel: typeof User,
		@InjectModel(Chats) private chatModel: typeof Chats,
		@InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
		@InjectModel(ChatUsers) private chatUsersModel: typeof ChatUsers,
		@InjectModel(AttachmentsChats) private attachmentsChatsModel: typeof AttachmentsChats,
	) {

	}

	getChats = async (request: GetChatsDTO) => {
		const chats = await this.chatUsersModel.findAll({
			where: {
				user_id: request.user_id
			},
			include: [{ model: ChatSession }]
		});
		let data = [];
		for await (const item of chats) {
			const lastMessage = await this.chatModel.findOne({
				where: {
					chat_session_id: item.chat_session.id
				},
				order: [['id', 'desc']]
			});
			data.push({
				item,
				lastMessage: lastMessage.message,
				lastDateMessage: lastMessage.created_at
			});
		}

		return data;
	}

	newChat = async (request: NewChatDTO) => {
		const chatSession = await this.chatSessionModel.create({
			host_id: request.sender_id,
			name: request.name
		});

		if (chatSession) {
			await this.chatUsersModel.create({
				chat_session_id: chatSession.id,
				user_id: request.sender_id,
				viewed: Constants.CHATS.VIEWED.UNREAD
			});
			
			return chatSession;
		}
		return null;
	};

	newMessage = async (request: NewMessageDTO, files: { attachments: Express.Multer.File[] }) => {
		//console.log(request, ' AK 47 ')
        const chat = await this.chatModel.create({
			chat_session_id: request.session_id,
			sender_id: request.sender_id,
			message: request.message
		});
		if (chat) {
			//if (files !== undefined) {
				/*await this.attachmentsChatsModel.bulkCreate([
					{

					}
				]);*/
				//console.log(typeof files, ' AQUI ')
			//}
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
			return chat;
		}
		return null;
    };

	getLogs = async (request: GetLogsDTO) => {
		const logs = await this.chatModel.findAll({ where: { chat_session_id: request.chat_session_id } });
		const chat = await this.chatSessionModel.findOne({ where: { id: request.chat_session_id } });
		return {
			logs,
			chat_name: chat.name
		};
	}

	delete = async (request: DeleteDTO): Promise<boolean> => {
		const host = await this.chatSessionModel.findOne({
			where: {
				id: request.chat_session_id,
				host_id: request.host_id
			}
		});
		if (host) {
			const chat = await this.chatModel.destroy({ where: { chat_session_id: request.chat_session_id } });
			if (chat) {
				await this.chatUsersModel.destroy({ where: { chat_session_id: request.chat_session_id } });
				await this.chatSessionModel.destroy({ where: { id: request.chat_session_id } });
				return true;
			}
			return false;
		}
	}
	viewed = async (request: ViewedDTO): Promise<boolean> => {
		const chatViewed = await this.chatUsersModel.update(
			{
				viewed: Constants.CHATS.VIEWED.READED
			},
			{
				where: {
					chat_session_id: request.chat_session_id,
					user_id: request.user_id
				}
			}
		);
		if (chatViewed) return true;

		return false;
	}

	getUsers = () => 
		this.userModel.findAll({ where: { level_id: Constants.LEVELS.DOCTOR } })
}
