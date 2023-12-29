import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { UserService } from "src/user/user.service";
import { MailerService } from "@nestjs-modules/mailer";
export declare class AuthService {
    private readonly jwtService;
    private readonly Prisma;
    private readonly UserService;
    private readonly MailerService;
    constructor(jwtService: JwtService, Prisma: PrismaService, UserService: UserService, MailerService: MailerService);
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
