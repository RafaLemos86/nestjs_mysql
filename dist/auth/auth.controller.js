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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_forget_dto_1 = require("./DTO/auth.forget.dto");
const auth_reset_dto_1 = require("./DTO/auth.reset.dto");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("../guards/auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const auth_login_dto_1 = require("./DTO/auth.login.dto");
const auth_register_dto_1 = require("./DTO/auth.register.dto");
let AuthController = class AuthController {
    constructor(UserService, AuthService) {
        this.UserService = UserService;
        this.AuthService = AuthService;
    }
    async login({ email, password }) {
        return this.AuthService.login(email, password);
    }
    async register(data) {
        return this.AuthService.register(data);
    }
    async forget({ email }) {
        return this.AuthService.forget(email);
    }
    async reset({ password, token }) {
        return this.AuthService.reset(password, token);
    }
    async me(user) {
        return { user };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_dto_1.AuthRegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forget'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forget_dto_1.AuthForgetDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forget", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_dto_1.AuthResetDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('me'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map