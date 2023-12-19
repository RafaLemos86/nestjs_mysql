import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly Prisma;
    private readonly UserService;
    constructor(jwtService: JwtService, Prisma: PrismaService, UserService: UserService);
    createToken(user: User): {
        accessToken: string;
    };
    checkToken(token: string): any;
    isValidToken(token: string): boolean;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    forget(email: string): Promise<boolean>;
    reset(password: string, token: string): Promise<{
        accessToken: string;
    }>;
    register(data: AuthRegisterDTO): Promise<{
        accessToken: string;
    }>;
}
