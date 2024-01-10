import { Test } from "@nestjs/testing"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDTO } from "./DTO/create.user.dto";
import { userEntityList } from "./testing/user-entity-list.mock";
import { CreateUserDTOMock } from "./testing/create-user-dot.mock";
import { userEmailNull } from "./testing/emailNull-user.mock";
import { UpdateUserDTOMock } from "./testing/update-user-dot.mock";


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
    })
})