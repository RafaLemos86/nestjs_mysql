import { BadRequestException, Body, Controller, Headers, Post, Request, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./DTO/auth.login.dto";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { AuthForgetDTO } from "./DTO/auth.forget.dto";
import { AuthResetDTO } from "./DTO/auth.reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly UserService: UserService,
        private readonly AuthService: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.AuthService.login(email, password)

    }

    @Post('register')
    async register(@Body() data: AuthRegisterDTO) {
        return this.AuthService.register(data)

    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return this.AuthService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return this.AuthService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user: string) {
        return { user }
    }

}