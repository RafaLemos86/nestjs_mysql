import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { UserService } from "src/user/user.service";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../user/entity/user.entity";
import { Repository } from "typeorm";
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly UserService;
    private readonly MailerService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, UserService: UserService, MailerService: MailerService);
    createToken(user: User): {
        accessToken: string;
    };
    checkToken(token: string): any;
    isValidToken(token: string): boolean;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    forget(email: string): Promise<boolean>;
    reset(password: string, token: string): Promise<boolean>;
    register(data: AuthRegisterDTO): Promise<{
        accessToken: string;
    }>;
}
