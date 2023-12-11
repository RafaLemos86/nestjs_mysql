import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    imports: [JwtModule.register({
        secret: ":c3,D^h7V^r:Lvy^%By@YtRKm}:8Rx!vJXe?"
    })],
    controllers: [AuthController]
})
export class AuthModule { }