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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, Prisma, UserService) {
        this.jwtService = jwtService;
        this.Prisma = Prisma;
        this.UserService = UserService;
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
                issuer: "API Login nestJS",
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
        const user = await this.Prisma.user.findFirst({
            where: {
                email
            }
        });
        const isValidUser = user && (await bcrypt.compare(password, user.password));
        if (!isValidUser) {
            throw new common_1.UnauthorizedException(`Email e/ou senha incorreto`);
        }
        return this.createToken(user);
    }
    async forget(email) {
        const user = await this.Prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`Email não encontrado`);
        }
        return true;
    }
    ;
    async reset(password, token) {
        try {
            const id = 1;
            const user = await this.Prisma.user.update({
                where: {
                    id
                },
                data: {
                    password
                }
            });
            return this.createToken(user);
        }
        catch (error) {
            throw new common_1.NotFoundException(`User not found`);
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
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map