import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [JwtModule.register({
        secret: ":c3,D^h7V^r:Lvy^%By@YtRKm}:8Rx!vJXe?"
    }),
        PrismaModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }