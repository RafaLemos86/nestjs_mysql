import { IsJWT, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsJWT()
    token: string
}