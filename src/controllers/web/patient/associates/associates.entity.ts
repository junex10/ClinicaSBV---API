import { IsNotEmpty, IsEmail } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociatedDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre es requerido' })
    name: string;

    @ApiProperty()
    lastname?: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo email es requerido' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;

    @ApiProperty()
    phone?: string;
    @ApiProperty()
    birthdate?: Date | string;
    @ApiProperty()
    document?: string;
    @ApiProperty()
    level_id?: number;
    @ApiProperty()
    address?: string;
    @ApiProperty()
    associated_id: number;
}

export class GetAssociatedDTO {
    @ApiProperty()
    user_id: number;
}

export class ModifyAssociatedDTO {
    @ApiProperty()
    user_id: number;

    @IsNotEmpty({ message: 'El campo email es requerido' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre es requerido' })
    name: string;

    @ApiProperty()
    lastname?: string;
    @ApiProperty()
    phone?: string;
    @ApiProperty()
    address?: string;
    @ApiProperty()
    birthdate?: Date | string;
}