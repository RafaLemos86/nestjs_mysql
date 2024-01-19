import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './MailerModule.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    EmailModule
  ],
})
export class AppModule { }
