import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./DTO/auth.register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly UserService: UserService,
        private readonly MailerService: MailerService
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


        const user = await this.usersRepository.findOneBy({
            email
        })

        const isValidUser = user && (await bcrypt.compare(password, user.password));

        if (!isValidUser) {
            throw new UnauthorizedException(`Email e/ou senha incorreto`)
        }

        console.log(email)
        console.log(user)


        return this.createToken(user)
    }

    async forget(email: string) {
        const user = await this.usersRepository.findOneBy({
            email
        })

        if (!user) {
            throw new UnauthorizedException(`Email não encontrado`)
        }

        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: "API forget nestJS",
            audience: "users"
        })

        try {
            await this.MailerService.sendMail({
                subject: "Recuperação de Senha",
                to: user.email,
                text: `Prezado ${user.name}, seu token de recuperação de senha é este: ${token}`,

            })

        } catch (e) {
            throw new BadRequestException(e)
        }

        return true

    };

    async reset(password: string, token: string) {

        try {
            const { id } = this.checkToken(token)
            await this.UserService.put(id, { password })
            return true

        } catch (e) {
            throw new BadRequestException(e)
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