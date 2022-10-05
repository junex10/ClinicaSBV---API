import {
	Controller,
	Post,
	Get,
	Res,
	HttpStatus,
	Body,
	UseInterceptors,
	UploadedFile,
	Param,
	UnprocessableEntityException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PetitionService } from './petition.service';
import { PetitionsDTO } from './petition.entity';

@ApiTags('Petition')
@Controller('api/petition')
export class PetitionController {

	constructor(private readonly petitionService: PetitionService) {

	}

    @Get('getPetitions/:page?/:user_id?')
    async getPetitions(@Res() response: Response, @Param() params: PetitionsDTO) {
		try {
			const petitions = await this.petitionService.getPetitions(params);
            return response.status(HttpStatus.OK).json({
				data: petitions
			});
		}
		catch (e) {
			throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
		}
    }
}
