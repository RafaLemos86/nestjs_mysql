import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'otho.maggio@ethereal.email',
          pass: 'W3STZSbaTN9DF1VDB3'
        }

      },
      defaults: {
        from: '"Rafael Nests" <modules@nestjs.com>',
      },
    }),
  ],
  controllers: []
})
export class AppModule { }
