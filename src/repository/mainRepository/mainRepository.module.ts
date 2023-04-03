import { Module } from '@nestjs/common';
import HashService from 'src/utils/hash.utils';
import MainRepository from './mainRepository.service';

@Module({
  providers: [MainRepository, HashService],
})
export class MainRepositoryModule {}