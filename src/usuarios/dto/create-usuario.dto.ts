import { IsEmail, IsNumber, IsPhoneNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('AR')
    phone: number;

    @IsNumber()
    @IsPositive()
    no: number;
}
