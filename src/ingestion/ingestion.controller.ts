import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import { CreateEventDto } from 'src/common/dto/create-event.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

/**
 * IngestionController handles incoming data ingestion requests.
 */
@Controller('ingestion')
export class IngestionController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Ingests data and publishes it to Kafka.
   * @param createEventDto - Data Transfer Object for event creation.
   */
  @Post()
  @UsePipes(new ValidationPipe())
  async ingestData(@Body() createEventDto: CreateEventDto) {
    try {
      this.kafkaClient.emit('analytics_topic', createEventDto);
    } catch (error) {
      console.error('Error ingesting data:', error);
      throw new Error('Data ingestion failed');
    }
  }
}
