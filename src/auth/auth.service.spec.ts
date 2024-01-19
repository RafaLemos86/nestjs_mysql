import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { PrismaService } from "../prisma/prisma.service"
import { UserService } from "../user/user.service"
import { AuthService } from "./auth.service"
import { EmailModule } from "../MailerModule.module"
import { mockedAcessToken } from "../user/testing/token-auth-dot.mock"
import { mockUser } from "../user/testing/user-token-dot.mock"
import * as bcrypt from "bcrypt";


describe("authService", () => {

    // uma boa prática chamar a instância que está sendo testada de SUT(System Under Test)
    let sut: AuthService
    let jwtService: JwtService
    let prisma: PrismaService
    let userService: UserService

    beforeEach(async () => {

        const moduleRef = await Test.createTestingModule({
            imports: [EmailModule],
            providers: [
                AuthService,
                JwtService,
                PrismaService,
                UserService,]
        }).compile()

        sut = moduleRef.get<AuthService>(AuthService)
        jwtService = moduleRef.get<JwtService>(JwtService)
        prisma = moduleRef.get<PrismaService>(PrismaService)
        userService = moduleRef.get<UserService>(UserService)
    });

    it("should be defined", () => {
        expect(sut).toBeDefined();
    });

    describe("Token", () => {

        it("should to create a new token", async () => {

            // Mock JwtService sign method
            jest.spyOn(jwtService, "sign").mockReturnValue(mockedAcessToken);

            const result = sut.createToken(mockUser)


            expect(jwtService.sign).toHaveBeenCalledWith(
                {
                    id: mockUser.id,
                    name: mockUser.name,
                    email: mockUser.email,
                },
                {
                    expiresIn: "7 days",
                    subject: String(mockUser.id),
                    issuer: "API Login nestJS",
                    audience: "users",
                }
            );

            expect(result.accessToken).toEqual(mockedAcessToken)
        })
    })

    it("should verify a valid JWT token", async () => {
        // Mock JwtService sign method
        jest.spyOn(jwtService, "verify").mockReturnValue(mockUser);

        const result = sut.checkToken(mockedAcessToken)

        expect(jwtService.verify).toHaveBeenCalledWith(mockedAcessToken, {
            audience: "users",
        });

        expect(result).toEqual(mockUser)
    });

    it("should return true for a valid token", () => {

        jest.spyOn(jwtService, "verify").mockReturnValue(mockUser)

        const result = sut.isValidToken(mockedAcessToken)

        expect(jwtService.verify).toHaveBeenCalledWith(mockedAcessToken, {
            audience: "users",
        });

        expect(result).toEqual(true)

    });

    describe("authentication", () => {


        it("should authenticate a user and return a JWT token", async () => {
            prisma.user.findFirst = jest.fn().mockResolvedValue(mockUser)

            jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);

            jest.spyOn(jwtService, "sign").mockReturnValue(mockedAcessToken);

            const result = await sut.login(mockUser.email, mockUser.password)

            // Assertions
            expect(prisma.user.findFirst).toHaveBeenCalledWith({
                where: { email: "rafael@gmail.com" },
            });

            expect(result).toEqual({ accessToken: mockedAcessToken });
        })


    })

})