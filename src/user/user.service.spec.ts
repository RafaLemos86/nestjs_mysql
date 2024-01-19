import { Test } from "@nestjs/testing"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { userEntityList } from "./testing/user-entity-list.mock";
import { CreateUserDTOMock } from "./testing/create-user-dot.mock";
import { userEmailNull } from "./testing/emailNull-user.mock";
import { UpdateUserDTOMock } from "./testing/update-user-dot.mock";
import { UpdateUserDTO } from "./DTO/update.user.dto";
import { DeleteUserMock } from "./testing/delete-user-dot.mock";
import { NotFoundException } from "@nestjs/common";


describe("userService", () => {

    // uma boa prática chamar a instância que está sendo testada de SUT(System Under Test)
    let sut: UserService
    let prisma: PrismaService


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [UserService, PrismaService]
        }).compile()


        sut = moduleRef.get<UserService>(UserService)
        prisma = moduleRef.get<PrismaService>(PrismaService)
    });

    it("should be defined", () => {
        expect(sut).toBeDefined();
    });

    describe("Create", () => {
        it('should to create  a new user and show it', async () => {
            //Aqui é o mock dos dados
            prisma.user.create = jest.fn().mockResolvedValue(userEntityList[0]);

            //Mandando criar o usuário
            const result: CreateUserDTO = await sut.create(CreateUserDTOMock);

            //Avaliando o retorno
            expect(result).toMatchObject(userEntityList[0]);
        })

        it("should not to create a new user if the email is missing and throw a error", async () => {
            const data: CreateUserDTO = userEmailNull

            expect(async () => {
                await sut.create(data)
            }).rejects.toThrow()
        });


    })


    describe("Read", () => {

        it("should return all datas", async () => {
            //Aqui é o mock dos dados
            prisma.user.findMany = jest.fn().mockResolvedValue(userEntityList)

            //Mandando criar o usuário
            const result = await sut.getAll();

            expect(result).toEqual(userEntityList)

        })

        it("should return the data used as id", async () => {
            //Aqui é o mock dos dados
            prisma.user.findUnique = jest.fn().mockResolvedValue(userEntityList[1])

            //Mandando criar o usuário
            const result = await sut.getOne(userEntityList[1].id);

            expect(result).toEqual(userEntityList[1])

        })

        it("should return error if the id not exists", async () => {
            expect(async () => {
                await sut.getOne(2000)
            }).rejects.toThrow()
        })
    });

    describe('put', () => {
        it('should update a user if the ID is found', async () => {
            // Mock dos dados e comportamento esperado
            const id = 1;
            const data: UpdateUserDTO = { role: "admin" };
            const userMock = UpdateUserDTOMock;

            prisma.user.findUnique = jest.fn().mockResolvedValue(userMock);
            prisma.user.update = jest.fn().mockResolvedValue(userMock);

            // Executar a função e verificar o resultado
            const result = await sut.put(id, data);

            expect(result).toEqual(userMock);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id }
            });
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id },
                data
            });
        })


        it('should throw NotFoundException if the ID is not found', async () => {
            // Mock dos dados e comportamento esperado
            const id = 1;
            const data: UpdateUserDTO = { name: "lemos" };

            prisma.user.findUnique = jest.fn().mockResolvedValue(null);

            // Executar a função e verificar o lançamento da exceção
            await expect(sut.put(id, data)).rejects.toThrow()

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id }
            });

        });
    });


    describe("delete", () => {
        it("should delete a user if the ID is found", async () => {
            // Mock dos dados e comportamento esperado
            const id = 2;

            // Mock do método findUnique
            jest.spyOn(sut, 'checkId').mockResolvedValue(true);

            // retorno esperado do delete
            prisma.user.delete = jest.fn().mockResolvedValue(DeleteUserMock)

            // Executar a função e verificar o resultado
            const result = await sut.delete(id);

            // Verificar se a função checkId foi chamada corretamente
            expect(sut.checkId).toHaveBeenCalledWith(id);

            // Verificar se a função delete foi chamada corretamente
            expect(prisma.user.delete).toHaveBeenCalledWith({
                where: { id },
            });

            // Verificar se o resultado é verdadeiro (indicando que o usuário foi excluído)
            expect(result).toEqual(true);
        })

        it('should return false and throw NotFoundException if the ID is not found', async () => {
            // Mock dos dados e comportamento esperado
            const id = 999; // Um ID que não existe no seu mock

            // Mock do método checkId para retornar false
            jest.spyOn(sut, 'checkId').mockResolvedValue(new NotFoundException);

            // Executar a função e verificar o resultado
            await expect(sut.delete(id)).rejects.toThrow();

            // Verificar se a função checkId foi chamada corretamente
            expect(sut.checkId).toHaveBeenCalledWith(id);

        });
    })


})