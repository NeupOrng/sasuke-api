import { Module } from '@nestjs/common';
import HashService from 'src/utils/hash.utils';
import { UsersRepository, CategoriesRepository } from './tables';

@Module({
  providers: [UsersRepository, HashService, CategoriesRepository],
})
export class MainRepositoryModule {}