import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MainRepositoryModule } from './repository/mainRepository/mainRepository.module';
import { UserModule } from './module/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadFileModule } from './module/uploadFile/uploadFile.module';

@Module({
  imports: [
    AuthModule,
    MainRepositoryModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    CacheModule.register(),
    UploadFileModule,
  ],
})
export class AppModule { }
