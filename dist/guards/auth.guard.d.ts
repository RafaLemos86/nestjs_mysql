import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly AuthService;
    private readonly UserService;
    constructor(AuthService: AuthService, UserService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
