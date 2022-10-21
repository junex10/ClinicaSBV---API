import { 
    Body, 
    Controller, 
    Post, 
    Res, 
    HttpStatus, 
    UseInterceptors, 
    UploadedFile, 
    UnprocessableEntityException,
    Get,
    Param,
    Put
} from '@nestjs/common';
import { AssociatesService } from './associates.service';
import { UploadFile } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
    CreateAssociatedDTO, 
    GetAssociatedDTO,
    ModifyAssociatedDTO
} from './associates.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patient')
@Controller('api/patient/associates')
export class AssociatesController {
    constructor(
        private readonly associatesService: AssociatesService
    ) {

    }

	@Post('/new_associated')
    @UseInterceptors(FileInterceptor('photo',
      UploadFile('users')
    ))
    async new_associated(@Body() request: CreateAssociatedDTO, @Res() response: Response, @UploadedFile() file: Express.Multer.File) {
        try {
            const user = await this.associatesService.new_associated(request, file);
			return response.status(HttpStatus.OK).json({
				data: {
					user
				}
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo agregar el asociado', e.message);
        }
    }
    @Get('/getAll/:user_id/:page')
    async getAll(@Res() response: Response, @Param() params: { user_id: number, page?: number }) {
        try {
            const user = await this.associatesService.getAll(params.user_id, params.page);
			return response.status(HttpStatus.OK).json({
				...user
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo obtener a los asociados', e.message);
        }
    }
    @Get('/getAssociated/:user_id')
    async getAssociated(@Res() response: Response, @Param() params: GetAssociatedDTO) {
        try {
            const user = await this.associatesService.getAssociated(params.user_id);
			return response.status(HttpStatus.OK).json({
				user
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo obtener al asociado', e.message);
        }
    }
    @Put('/modifyAssociated')
    @UseInterceptors(FileInterceptor('photo',
        UploadFile('users')
    ))
    async modifyAssociated(@Res() response: Response, @Body() body: ModifyAssociatedDTO, @UploadedFile() file: Express.Multer.File) {
        try {
            const update: boolean = await this.associatesService.modifyAssociated(body, file);
			if (update) {
                return response.status(HttpStatus.OK).json({
                    message: 'Se ha actualizado el asociado'
                });
            } else {
                return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    message: 'No se pudo actualizar el asociado'
                });
            }
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo actualizar el asociado', e.message);
        }
    }
}
