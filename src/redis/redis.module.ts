import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * RedisModule provides RedisService.
 */
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
