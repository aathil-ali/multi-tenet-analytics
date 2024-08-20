import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { KafkaModule } from '../kafka/kafka.module';
import { RedisModule } from '../redis/redis.module';
import { MongoModule } from '../mongo/mongo.module';

/**
 * ProcessingModule sets up the processing service and its dependencies.
 */
@Module({
  imports: [KafkaModule, RedisModule, MongoModule],
  providers: [ProcessingService],
})
export class ProcessingModule {}
