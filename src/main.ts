import { Module } from '@nestjs/common';
import { IngestionModule } from './ingestion/ingestion.module';
import { ProcessingModule } from './processing/processing.module';
import { AggregationModule } from './aggregation/aggregation.module';
import { RedisModule } from './redis/redis.module';
import { MongoModule } from './mongo/mongo.module';
import { KafkaModule } from './kafka/kafka.module';
import { MonitoringModule } from './monitoring/monitoring.module';

/**
 * AppModule is the root module of the application.
 */
@Module({
  imports: [
    IngestionModule,
    ProcessingModule,
    AggregationModule,
    RedisModule,
    MongoModule,
    KafkaModule,
    MonitoringModule,
  ],
})
export class AppModule {}
