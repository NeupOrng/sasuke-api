import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MainRepositoryModule } from './repository/mainRepository/mainRepository.module';
import { UserModule } from './module/user/user.module';
import { HashUtilModule } from './utils/hash/hash.module';

@Module({
  imports: [
    AuthModule,
    HashUtilModule,
    MainRepositoryModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule { }
