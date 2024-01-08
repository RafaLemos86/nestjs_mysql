import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../enums/role.enum";


export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsOptional()
    @IsEnum(Role)
    role: string;
}