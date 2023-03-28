import { Module } from '@nestjs/common';
import MainRepository from './mainRepository.service';

@Module({
  providers: [MainRepository],
})
export class MainRepositoryModule {}