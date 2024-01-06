import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgetDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string
}