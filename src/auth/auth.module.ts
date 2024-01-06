import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";

@Module({
    imports: [JwtModule.register({
        secret: String(process.env.JWTSecret)
    }),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }