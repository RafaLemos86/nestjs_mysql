import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
import { CreateLoginUserDTO } from "./DTO/create-login.user.dto";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDTO): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createLogin({ email, password }: CreateLoginUserDTO): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getOne(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    show(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    put(id: number, data: UpdateUserDTO): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkId(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
