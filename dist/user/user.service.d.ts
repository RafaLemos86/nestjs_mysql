import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
import { CreateLoginUserDTO } from "./DTO/create-login.user.dto";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(data: CreateUserDTO): Promise<User>;
    createLogin({ email, password }: CreateLoginUserDTO): Promise<User>;
    getAll(): Promise<User[]>;
    getOne(id: number): Promise<User>;
    show(id: number): Promise<User>;
    put(id: number, data: UpdateUserDTO): Promise<User>;
    delete(id: number): Promise<boolean | import("typeorm").DeleteResult>;
    checkId(id: number): Promise<boolean>;
}
