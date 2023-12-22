import { Module, forwardRef } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule),
  forwardRef(() => AuthModule)],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
