import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly Prisma: PrismaService,
        private readonly UserService: UserService
    ) { }

    createToken(user: User) {


        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: "API Login nestJS",
                audience: "users"
            })
        }
    };

    checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                issuer: "API Login nestJS",
                audience: "users"
            })
        } catch (e) {
            throw new BadRequestException(e)
        }

    }

    isValidToken(token: string) {
        try {

            this.checkToken(token)
            return true

        } catch (e) {
            return false
        }

    }

    async login(email: string, password: string) {


        const user = await this.Prisma.user.findFirst({
            where: {
                email
            }
        });

        const isValidUser = user && (await bcrypt.compare(password, user.password));

        if (!isValidUser) {
            throw new UnauthorizedException(`Email e/ou senha incorreto`)
        }

        return this.createToken(user)
    }

    async forget(email: string) {
        const user = await this.Prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException(`Email não encontrado`)
        }


        // TO DO: enviar email para o user

        return true

    };

    async reset(password: string, token: string) {
        // TO DO: se o token for válido

        try {
            const id = 1
            const user = await this.Prisma.user.update({
                where: {
                    id
                },
                data: {
                    password
                }
            });

            return this.createToken(user)


        } catch (error) {
            throw new NotFoundException(`User not found`);
        }
    };

    async register(data: AuthRegisterDTO) {

        try {

            const user = await this.UserService.createLogin(data)
            return this.createToken(user)


        } catch (error) {
            throw new NotFoundException(`User not found`);
        }

    }

}