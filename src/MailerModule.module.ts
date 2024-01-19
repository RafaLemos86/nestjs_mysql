import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'mary.kuvalis60@ethereal.email',
                    pass: '5AJ5B5rfNZY5aeY821'
                }

            },
            defaults: {
                from: '"Rafael Nests" <modules@nestjs.com>',
            },
        }),
    ]
})
export class EmailModule { }
