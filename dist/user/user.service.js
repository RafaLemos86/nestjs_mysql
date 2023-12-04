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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const result = await this.prisma.user.create({
            data
        });
        return result;
    }
    async getAll() {
        const result = await this.prisma.user.findMany();
        return result;
    }
    async getOne(id) {
        if (id <= 0) {
            throw new common_1.BadRequestException(`id ${id} invalid`);
        }
        const result = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!result) {
            throw new common_1.NotFoundException(`The id ${id} not found`);
        }
        return result;
    }
    async put(id, data) {
        const result = await this.checkId(id);
        if (result) {
            const user = this.prisma.user.update({
                where: {
                    id
                },
                data
            });
            return user;
        }
    }
    ;
    async delete(id) {
        const result = await this.checkId(id);
        if (result) {
            const user = await this.prisma.user.delete({
                where: {
                    id
                }
            });
            return user;
        }
        return new common_1.BadRequestException(`User ${id} not found`);
    }
    async checkId(id) {
        const result = await this.getOne(id);
        if (!result) {
            return false;
        }
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map