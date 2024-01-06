import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDTO): Promise<import("./entity/user.entity").User>;
    readAll(): Promise<import("./entity/user.entity").User[]>;
    readOne(id: number): Promise<import("./entity/user.entity").User>;
    update(id: number, data: UpdateUserDTO): Promise<import("./entity/user.entity").User>;
    delete(id: number): Promise<boolean | import("typeorm").DeleteResult>;
}
