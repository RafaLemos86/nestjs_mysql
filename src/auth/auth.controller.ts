import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./DTO/auth.login.dto";
import { AuthRegisterDTO } from "./DTO/auth.register";
import { AuthForgetDTO } from "./DTO/auth.forget.dto";
import { AuthResetDTO } from "./DTO/auth.reset.dto";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly UserService: UserService) { }

    @Post('login')
    async login(@Body() data: AuthLoginDTO) { }

    @Post('register')
    async register(@Body() data: AuthRegisterDTO) {

        return this.UserService.create(data)

    }

    @Post('forget')
    async forget(@Body() data: AuthForgetDTO) { }

    @Post('reset')
    async reset(@Body() data: AuthResetDTO) { }

}