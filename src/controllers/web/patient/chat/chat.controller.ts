import {
	Controller,
	Post,
	Res,
	HttpStatus,
	Body,
	UnprocessableEntityException,
	UseGuards,
	Delete,
	Get,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {
	GetChatsDTO,
	NewChatDTO,
	NewMessageDTO,
	GetLogsDTO,
	DeleteDTO,
	ViewedDTO
} from './chat.entity';
import { ChatService } from './chat.service';
import { PatientGuard } from 'src/guards';
import { UploadFile } from 'src/utils';

@ApiTags('Chat - Patient')
@UseGuards(PatientGuard)
@Controller('api/patient/chat')
export class ChatController {

	constructor(
		private readonly chatService: ChatService
	) {

	}

	@Post('getChats')
    async getChats(@Body() request: GetChatsDTO, @Res() response: Response) {
        try {
            const chats = await this.chatService.getChats(request)
            return response.status(HttpStatus.OK).json({
                chats
            });
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Post('newChat')
    async newChat(@Res() response: Response, @Body() request: NewChatDTO) {
        try {
            const chats = await this.chatService.newChat(request);
			if (chats !== null) {
				return response.status(HttpStatus.OK).json({
					chats
				});
			} 
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'No se pudo crear el chat'
			});
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Post('newMessage')
    @UseInterceptors(FilesInterceptor('attachments', 5,
      UploadFile('chat')
    ))

    async newMessage(
        @Res() response: Response, 
        @Body() request: NewMessageDTO, 
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        try {
            const message = await this.chatService.newMessage(request, files);
			if (message) {
				return response.status(HttpStatus.OK).json({
					message
				});
			}
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'No se pudo enviar el mensaje'
			});
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Post('getLogs')
    async getLogs(@Body() request: GetLogsDTO, @Res() response: Response) {
        try {
            const chats = await this.chatService.getLogs(request)
            return response.status(HttpStatus.OK).json({
                chats
            });
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Delete('delete')
    async delete(@Res() response: Response, @Body() request: DeleteDTO) {
        try {
            const chat = await this.chatService.delete(request);
			if (chat) {
				return response.status(HttpStatus.OK).json({
					chat: 'Se ha borrado el chat correctamente'
				});
			}
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'No se pudo borrar el chat'
			});
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Post('viewed')
    async viewed(@Res() response: Response, @Body() request: ViewedDTO) {
        try {
            const process = await this.chatService.viewed(request);
			return response.status(HttpStatus.OK).json({
				process
			});
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }

	@Get('getUsers')
    async getUsers(@Res() response: Response) {
        try {
            const users = await this.chatService.getUsers();
			return response.status(HttpStatus.OK).json({
				users
			});
        }
        catch (e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
}
