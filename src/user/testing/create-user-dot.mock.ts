import { Role } from "../../enums/role.enum";
import { CreateUserDTO } from "../DTO/create.user.dto";

export const CreateUserDTOMock: CreateUserDTO = {
    name: "Rafael Lemos",
    password: "$2b$10$/TaE9zmIQZpYdsr4NzrGNeU.3tbQLVpAseeUquVWjB9lX3gsmL6GC",
    email: "rafael@gmail.com",
    role: Role.User
}