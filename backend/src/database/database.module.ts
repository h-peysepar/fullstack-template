import { PostgresService } from './postgres/postgres.service';
import { RedisService } from './redis/redis.service';
import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  providers: [PostgresService, RedisService],
  exports: [PostgresService, RedisService],
})
export class DatabaseModule {}