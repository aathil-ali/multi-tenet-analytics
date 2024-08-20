import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectKafka , ClientKafka } from '@nestjs/microservices';

import { RedisService } from 'src/redis/redis.service';
import { MongoService } from 'src/mongo/mongo.service';
/**
 * ProcessingService handles the consumption and processing of events from Kafka.
 */
@Injectable()
export class ProcessingService implements OnModuleInit {
  private readonly logger = new Logger(ProcessingService.name);

  constructor(
    @InjectKafka('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly redisService: RedisService,
    private readonly mongoService: MongoService,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('analytics_topic');
    await this.kafkaClient.connect();
  }

  /**
   * Handles the event received from Kafka.
   * @param data - Event data.
   * @param context - Kafka context.
   */
  async handleEvent(data: any) {
    try {
      const { tenantId, eventType, timestamp, data: eventData } = data.value;
      await this.redisService.storeEvent(
        tenantId,
        eventType,
        timestamp,
        eventData,
      );
      await this.mongoService.storeEvent(
        tenantId,
        eventType,
        timestamp,
        eventData,
      );
    } catch (error) {
      this.logger.error('Error processing event:', error);
    }
  }
}
