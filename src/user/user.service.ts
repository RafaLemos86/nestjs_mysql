import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
import { CreateLoginUserDTO } from "./DTO/create-login.user.dto"
import * as bcrypt from 'bcrypt'
import { PrismaService } from "../prisma/prisma.service";
import { name } from "ejs";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {

        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)

        const result = await this.prisma.user.create({
            data
        });

        return result
    }

    async createLogin({ email, password }: CreateLoginUserDTO) {
        const name = ''

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        const result = await this.prisma.user.create({
            data: {
                email,
                password,
                name
            }
        });

        return result
    }

    async getAll() {
        const result = await this.prisma.user.findMany()
        return result

    }

    async getOne(id: number) {
        const result = await this.checkId(id)

        if (result) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id
                }
            })
            return user
        }

        return result
    }

    async show(id: number) {
        const result = await this.prisma.user.findFirst({
            where: {
                id
            }
        })
        return result
    }

    async put(id: number, data: UpdateUserDTO) {

        const result = await this.checkId(id)

        if (data.password) {
            const salt = await bcrypt.genSalt()
            data.password = await bcrypt.hash(data.password, salt)

        }


        if (result) {
            const user = this.prisma.user.update({
                where: {
                    id
                },
                data
            });

            return user
        }

        return result
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

        return result

    }

    async checkId(id: number) {
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

        return true
    };



}