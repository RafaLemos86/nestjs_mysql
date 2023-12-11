import { IsEmail, IsJWT, IsNotEmpty } from "class-validator";

export class AuthResetDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsJWT()
    token: string
}