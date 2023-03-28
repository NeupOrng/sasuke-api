import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export default abstract class BaseRepository extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
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
