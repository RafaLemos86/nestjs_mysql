import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {

        const result = await this.prisma.user.create({
            data
        });

        return result
    }

    async getAll() {
        const result = await this.prisma.user.findMany()

        return result

    }

    async getOne(id: number) {

        if (id <= 0) {
            throw new BadRequestException(`id ${id} invalid`)
        }

        const result = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!result) {
            throw new NotFoundException(`The id ${id} not found`)
        }

        return result
    }

    async put(id: number, data: UpdateUserDTO) {

        const result = await this.checkId(id)

        if (result) {
            const user = this.prisma.user.update({
                where: {
                    id
                },
                data
            });

            return user
        }
    };

    async delete(id: number) {
        const result = await this.checkId(id)

        if (result) {

            const user = await this.prisma.user.delete({
                where: {
                    id
                }
            })

            return user
        }

        return new BadRequestException(`User ${id} not found`)

    }

    async checkId(id: number) {
        const result = await this.getOne(id)

        if (!result) {
            return false
        }

        return true
    }

}