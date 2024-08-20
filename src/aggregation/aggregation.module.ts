import { Module, CacheModule } from '@nestjs/common';
import { AggregationController } from './aggregation.controller';
import { AggregationService } from './aggregation.service';
import { RedisModule } from '../redis/redis.module';
import { MongoModule } from '../mongo/mongo.module';

/**
 * AggregationModule sets up the aggregation service and its dependencies.
 */
@Module({
  imports: [
    RedisModule,
    MongoModule,
    CacheModule.register({
      ttl: 60, // Default cache time-to-live in seconds
    }),
  ],
  controllers: [AggregationController],
  providers: [AggregationService],
})
export class AggregationModule {}
