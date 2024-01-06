import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";
import { CreateLoginUserDTO } from "./DTO/create-login.user.dto"
import * as bcrypt from 'bcrypt'
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    async create(data: CreateUserDTO): Promise<User> {

        try {
            const salt = await bcrypt.genSalt()

            data.password = await bcrypt.hash(data.password, salt)

            const result = this.usersRepository.create(data)

            await this.usersRepository.save(result)

            return result
        } catch (e) {
            throw new BadRequestException(`o email já está sendo utilizado`)
        }


    }

    async createLogin({ email, password }: CreateLoginUserDTO) {
        const name = ''

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        const result = this.usersRepository.create({
            email,
            password
        });

        await this.usersRepository.save(result)

        return result
    }

    async getAll() {
        const result = await this.usersRepository.find()
        return result

    }

    async getOne(id: number) {
        const result = await this.checkId(id)

        if (result) {
            return this.show(id)
        }
    }

    async show(id: number) {
        const result = await this.usersRepository.findOneBy({ id })
        return result
    }

    async put(id: number, data: UpdateUserDTO) {

        const result = await this.checkId(id)

        if (data.password) {
            const salt = await bcrypt.genSalt()
            data.password = await bcrypt.hash(data.password, salt)
        }


        await this.usersRepository.update(id, data);

        return this.show(id)

    };

    async delete(id: number) {
        const result = await this.checkId(id)

        if (result) {

            const user = await this.usersRepository.delete(id)

            return user
        }

        return result

    }

    async checkId(id: number) {
        if (id <= 0) {
            throw new BadRequestException(`id ${id} invalid`)
        }

        const result = await this.usersRepository.findOneBy({ id })

        if (!result) {
            throw new NotFoundException(`The id ${id} not found`)
        }

        return true
    };



}