import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { KafkaModule } from '../kafka/kafka.module';

/**
 * IngestionModule sets up the ingestion service and its dependencies.
 */
@Module({
  imports: [KafkaModule],
  controllers: [IngestionController],
})
export class IngestionModule {}
