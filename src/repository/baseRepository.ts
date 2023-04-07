import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient, PrismaPromise } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';
import { DbException } from 'src/exception/DbException';

export default abstract class BaseRepository extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  ExecuteScript(script: string): PrismaPromise<number> {
    try {
      return this.$executeRawUnsafe(script);
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }

  QueryScript<T = any>(script: string): PrismaPromise<T> {
    try {
      return this.$queryRawUnsafe<T>(script)
    }
    catch(ex) {
      throw new DbException(ex);
    }
  }

  constructor (connectionString: string) {
    super({
      datasources: {
        db: {
          url: connectionString,
        }
      },
    });
  }
}
