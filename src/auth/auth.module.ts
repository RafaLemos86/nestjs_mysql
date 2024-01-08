import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";


@Module({
    imports: [JwtModule.register({
        secret: process.env.JWTSecret
    }),
        PrismaModule,
    forwardRef(() => UserModule)
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }