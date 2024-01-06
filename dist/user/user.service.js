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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(data) {
        try {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
            const result = this.usersRepository.create(data);
            await this.usersRepository.save(result);
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException(`o email já está sendo utilizado`);
        }
    }
    async createLogin({ email, password }) {
        const name = '';
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const result = this.usersRepository.create({
            email,
            password
        });
        await this.usersRepository.save(result);
        return result;
    }
    async getAll() {
        const result = await this.usersRepository.find();
        return result;
    }
    async getOne(id) {
        const result = await this.checkId(id);
        if (result) {
            return this.show(id);
        }
    }
    async show(id) {
        const result = await this.usersRepository.findOneBy({ id });
        return result;
    }
    async put(id, data) {
        const result = await this.checkId(id);
        if (data.password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        }
        await this.usersRepository.update(id, data);
        return this.show(id);
    }
    ;
    async delete(id) {
        const result = await this.checkId(id);
        if (result) {
            const user = await this.usersRepository.delete(id);
            return user;
        }
        return result;
    }
    async checkId(id) {
        if (id <= 0) {
            throw new common_1.BadRequestException(`id ${id} invalid`);
        }
        const result = await this.usersRepository.findOneBy({ id });
        if (!result) {
            throw new common_1.NotFoundException(`The id ${id} not found`);
        }
        return true;
    }
    ;
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map