"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, UserService, MailerService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.UserService = UserService;
        this.MailerService = MailerService;
    }
    createToken(user) {
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
        };
    }
    ;
    checkToken(token) {
        try {
            return this.jwtService.verify(token, {
                audience: "users"
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    isValidToken(token) {
        try {
            this.checkToken(token);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async login(email, password) {
        const user = await this.usersRepository.findOneBy({
            email
        });
        const isValidUser = user && (await bcrypt.compare(password, user.password));
        if (!isValidUser) {
            throw new common_1.UnauthorizedException(`Email e/ou senha incorreto`);
        }
        return this.createToken(user);
    }
    async forget(email) {
        const user = await this.usersRepository.findOneBy({
            email
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`Email não encontrado`);
        }
        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: "API forget nestJS",
            audience: "users"
        });
        try {
            await this.MailerService.sendMail({
                subject: "Recuperação de Senha",
                to: user.email,
                text: `Prezado ${user.name}, seu token de recuperação de senha é este: ${token}`,
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
        return true;
    }
    ;
    async reset(password, token) {
        try {
            const { id } = this.checkToken(token);
            await this.UserService.put(id, { password });
            return true;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    ;
    async register(data) {
        try {
            const user = await this.UserService.createLogin(data);
            return this.createToken(user);
        }
        catch (error) {
            throw new common_1.NotFoundException(`User not found`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        user_service_1.UserService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map