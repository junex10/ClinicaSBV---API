import { Body, Controller, Post, Res, HttpStatus, UseInterceptors, UploadedFile, UnprocessableEntityException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Constants, UploadFile, JWTAuth } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
    UpdateUserDTO
} from './profile.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('api/profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) {

    }

    @Post('/update')
    @UseInterceptors(FileInterceptor('photo',
      UploadFile('users')
    ))
    async update(@Body() request: UpdateUserDTO, @Res() response: Response, @UploadedFile() file: Express.Multer.File) {
        try {
            const user = await this.profileService.update(request, file);
            const permissions = user.level.permissions;
				const userFilter = {
					id: user.id,
					email: user.email,
					level: user.level,
					google: user.google,
					google_id: user.google_id,
					facebook_id: user.facebook_id,
					facebook: user.facebook,
					photo: user.photo,
					logged_in: user.logged_in,
					verified: user.verified,
					status: user.status,
					person: user.person
				};
				const token = JWTAuth.createToken({ permissions });
				return response.status(HttpStatus.OK).json({
					data: {
						user: userFilter,
						...token
					}
				});
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo actualizar el perfil', e.message);
        }
    }
}
