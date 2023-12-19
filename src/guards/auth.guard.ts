import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly AuthService: AuthService,
        private readonly UserService: UserService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers
        const token = (authorization ?? "").split(' ')[1]


        try {
            const data = this.AuthService.checkToken(token);
            const user = await this.UserService.show(data.id)

            request.user = user

            return true

        } catch (e) {
            return false
        }


    }
}