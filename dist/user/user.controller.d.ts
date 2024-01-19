import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDTO): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    readAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    readOne(id: number): Promise<boolean | {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException>;
    update(id: number, data: UpdateUserDTO): Promise<boolean | {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException>;
    delete(id: number): Promise<boolean | import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException>;
}
