import { Module } from '@nestjs/common';
import MainRepository from 'src/repository/mainRepository/mainRepository.service';
import HashService from 'src/utils/hash.utils';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConstaint } from 'src/utils/constaint.utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: AppConstaint.JwtSecret,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, HashService, MainRepository],
})
export class AuthModule {}