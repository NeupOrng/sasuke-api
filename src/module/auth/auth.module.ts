import { Module } from '@nestjs/common';
import MainRepository from 'src/repository/mainRepository/mainRepository.service';
import HashService from 'src/utils/hash/hash.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashService, MainRepository],
})
export class AuthModule {}