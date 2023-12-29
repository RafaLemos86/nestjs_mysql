import { AuthLoginDTO } from "./DTO/auth.login.dto";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { AuthForgetDTO } from "./DTO/auth.forget.dto";
import { AuthResetDTO } from "./DTO/auth.reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly UserService;
    private readonly AuthService;
    constructor(UserService: UserService, AuthService: AuthService);
    login({ email, password }: AuthLoginDTO): Promise<{
        accessToken: string;
    }>;
    register(data: AuthRegisterDTO): Promise<{
        accessToken: string;
    }>;
    forget({ email }: AuthForgetDTO): Promise<boolean>;
    reset({ password, token }: AuthResetDTO): Promise<boolean>;
    me(user: string): Promise<{
        user: string;
    }>;
}
