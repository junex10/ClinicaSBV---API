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
    Put,
    UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UploadFile } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
    GetDoctorDTO,
    GetDoctorAppointmentsDTO,
    RegisterAppointmentDTO,
    GetAppointmentsDTO
} from './appointments.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PatientGuard } from 'src/guards';

@ApiTags('Patient - Appointments')
@UseGuards(PatientGuard)
@Controller('api/patient/appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService
    ) {

    }

    @Post()
    async appointments(@Res() response: Response, @Body() request: GetAppointmentsDTO) {
        try {
            const data = await this.appointmentsService.appointments(request);
			return response.status(HttpStatus.OK).json({
				data
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente más tarde', e.message);
        }
    }

	@Get('/getSpecializations')
    async getSpecializations(@Res() response: Response) {
        try {
            const data = await this.appointmentsService.getSpecializations();
			return response.status(HttpStatus.OK).json({
				...data
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente más tarde', e.message);
        }
    }

    @Get('/getDoctor/:specialization_id')
    async getDoctor(@Res() response: Response, @Param() params: GetDoctorDTO) {
        try {
            const data = await this.appointmentsService.getDoctor(params.specialization_id);
			return response.status(HttpStatus.OK).json({
				...data
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente más tarde', e.message);
        }
    }

    @Get('/getDoctorControl/:doctor_id/:specialization_id')
    async getDoctorAppointments(@Res() response: Response, @Param() params: GetDoctorAppointmentsDTO) {
        try {
            const data = await this.appointmentsService.getDoctorAppointments(params.doctor_id, params.specialization_id);
			return response.status(HttpStatus.OK).json({
				data
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente más tarde', e.message);
        }
    }

    @Post('/register')
    async register(@Res() response: Response, @Body() request: RegisterAppointmentDTO) {
        try {
            const data = await this.appointmentsService.register(request);
			return response.status(HttpStatus.OK).json({
				data
			});
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente más tarde', e.message);
        }
    }
}
