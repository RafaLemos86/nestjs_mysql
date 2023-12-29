import { Module, forwardRef } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
