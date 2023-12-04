import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { UpdateUserDTO } from "./DTO/update.user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    };

    @Get()
    async readAll() {
        return this.userService.getAll()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDTO) {
        return this.userService.put(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}