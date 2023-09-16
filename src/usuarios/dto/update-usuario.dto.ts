import { PartialType } from "@nestjs/mapped-types";

// import { PartialType } from '@nestjs/mapped-types';

// import { CreateUsuarioDto } from './create-usuario.dto';
import { CreateUsuarioDto } from "./create-usuario.dto";

import { IsEmail, IsNumber, IsString, MinLength, isPhoneNumber } from "class-validator";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}


//Gracias al "PartialType" hereda las mismas propiedades que el CreateUsuarioDto
// export class UpdateUsuarioDto{
//     @IsString()
//     @MinLength(1)
//     name: string;

//     @IsString()
//     @IsEmail()
//     email: string;

//     @IsNumber()
//     phone: number;
// }