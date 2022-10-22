import { 
    Body, 
    Controller,
    Get,
    HttpStatus, 
    Param, 
    Post, 
    Res, 
    UnprocessableEntityException, 
    UseInterceptors,
    UseGuards
} from '@nestjs/common';

import { Response } from 'express';
import { SystemService } from './system.service';
import {
    
} from './system.entity';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards';

@ApiTags('System Modules')
@UseGuards(AdminGuard)
@Controller('api/admin/system-modules')
export class SystemController {
    constructor(
        private readonly systemService: SystemService
    ) {}
    
    @Get('test')
    async test(@Res() response: Response) {
        return response.status(HttpStatus.OK).json({
            message: 'Acceso permitido'
        });
    }
    
}
