import { IsNotEmpty, IsEmail } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetDoctorDTO {
    @ApiProperty()
    specialization_id: number;
}