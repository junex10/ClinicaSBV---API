import { IsNotEmpty, IsEmail, MinLength, IsUrl, ValidateIf } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PetitionsDTO {
    @ApiProperty()
    user_id?: number;
    @ApiProperty()
    page?: number;
}