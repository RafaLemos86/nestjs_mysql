import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

}