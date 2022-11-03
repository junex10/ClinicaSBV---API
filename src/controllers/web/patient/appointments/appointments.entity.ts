import { IsNotEmpty, IsEmail } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetDoctorDTO {
    @ApiProperty()
    specialization_id: number;
}
export class GetDoctorAppointmentsDTO {
    @ApiProperty()
    doctor_id: number;

    @ApiProperty()
    specialization_id: number;
}
export class RegisterAppointmentDTO {
    @ApiProperty()
    medical_reason: string;
    @ApiProperty()
    specialization: number;
    @ApiProperty()
    doctor: number;
    @ApiProperty()
    medical_description: string;
    @ApiProperty()
    patient: number;
    @ApiProperty()
    date_cite: Date | string;
}